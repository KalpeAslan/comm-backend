import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {AddressEntity} from "../entities/addresses.entity";
import {UpdateUserDto} from "../dto/updateUser.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
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

    async findOrCreateUserByEthAddress(address: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({address})
        if (user) return user

        return this.usersRepository.save({
            address: address.toLowerCase(),
            password: ''
        })
    }

    public findUserByEthAddress(address: string) {
        return this.usersRepository.findOne({
            where: {address}
        })
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


    findByRefreshToken(refresh_token: string) {
        return this.usersRepository.findOne({where: {
            refresh_token
        }})
    }

}
