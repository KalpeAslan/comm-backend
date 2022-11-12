import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../../dto/createUser.dto";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {MessageDto} from "../../dto/message.dto";
import {MessengerService} from "../messenger/messenger.service";
import {IConfirmMessageResponse, IPassword} from "../../ts/common";
import {AddressEntity} from "../../entities/addresses.entity";
import {AddAddressDto} from "./addAddressDto.dto";
import {UpdateUserDto} from "../../dto/updateUser.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => MessengerService))
        private readonly messengerService: MessengerService,
        @InjectRepository(AddressEntity)
        private readonly addressesEntityRepository: Repository<AddressEntity>
    ) {
    }

    async getUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
        return paginate<UserEntity>(this.usersRepository, options);
    }

    async getUserByAddress(address: string): Promise<UserEntity | undefined> {
        const addressEntity: AddressEntity = await this.addressesEntityRepository.findOne({
            join: {
                alias: "address",
                leftJoinAndSelect: {
                    user: "address.user"
                }
            },
            where: {
                address
            }
        });
        if (addressEntity && addressEntity.user) {
            delete addressEntity.user.password;
            return addressEntity.user;
        }

        return undefined;
    }

    async getUserById(id: number): Promise<UserEntity> {
        return await this.usersRepository.findOne({id});
    }


    async isUserExistByAddress(address: string): Promise<boolean> {
        return !!await this.addressesEntityRepository.findOne({address});
    }

    async isUserExistById(id: number): Promise<boolean> {
        return !!await this.usersRepository.findOne({id});
    }


    async findOrCreateUserByEthAddress(address: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({address: address.toLowerCase()})
        if (user) return user

        return this.usersRepository.save({
            address: address.toLowerCase(),
            password: ''
        })
    }

    async saveUser(userDto: CreateUserDto): Promise<UserEntity> {
        const user: UserEntity = await this.usersRepository.save({
            ...userDto,
            confirmed: true
        });
        await this.addAddress({
            userId: user.id,
            address: userDto.address.toLowerCase()
        });
        return user;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
        const updatedUser = {
            ...updateUserDto
        };
        delete updatedUser.token;
        delete updatedUser.code;

        await this.usersRepository.update(userId, {
            ...updatedUser,
            confirmed: true
        });
    }


    async getUserStatus(address: string) {
        return this.usersRepository.findOne({
            address
        }).then(res => {
            if (!res) return null
            return res.confirmed
        })
    }

    async confirmUser(address: string, _message: MessageDto): Promise<IConfirmMessageResponse> {
        const {state, user, message} = await this.messengerService.confirmMessageAndGetUser(_message);
        if (state) {
            const _user: UserEntity = {
                ...user,
                confirmed: true
            };
            await this.usersRepository.update(user.id, _user);
        }
        return {
            message,
            state
        };
    }

    async addAddress(addAddressDto: AddAddressDto): Promise<void> {
        const user: UserEntity = await this.usersRepository.findOne({id: addAddressDto.userId});
        await this.addressesEntityRepository.save({
            address: addAddressDto.address.toLowerCase(),
            user,
            confirmed: true
        });
    }


    async isPasswordCorrect({userId, password}: IPassword): Promise<boolean | undefined> {
        const user: UserEntity = await this.usersRepository.findOne({id: userId})
        return user ? user.password === password : undefined
    }


    async confirmAddress(address: string, messageDto: MessageDto): Promise<IConfirmMessageResponse> {
        const confirmedMessage: IConfirmMessageResponse = await this.messengerService.confirmMessageAndGetUser(messageDto);

        if (confirmedMessage.state) {
            const user = await this.getUserByAddress(address);
            await this.addressesEntityRepository.update({address}, {
                ...user,
                confirmed: true
            });
        }

        return confirmedMessage;
    }

}
