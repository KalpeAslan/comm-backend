import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {AddressEntity} from "../entities/addresses.entity";
import {UpdateUserDto} from "../dto/updateUser.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";
import * as bcrypt from 'bcryptjs';
import {SaveStoreDto} from "./dto/save-store.dto";
import {StoreEntity} from "../entities/store.entity";
import {WalletService} from "./wallet/wallet.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressesEntityRepository: Repository<AddressEntity>,
        @InjectRepository(StoreEntity)
        private readonly storeEntity: Repository<StoreEntity>,
        private walletService: WalletService
    ) {
    }

    async saveVerification(user: UserEntity, dto: UpdateUserDto) {
        await this.usersRepository.update({
            id: user.id
        }, {...dto})
        return this.usersRepository.findOne({id: user.id})
    }

    async changePassword(user: UserEntity, dto: ChangePasswordDto) {

        if(dto.newPassword !== dto.repeatNewPassword) throw new HttpException({
            message: 'Passwords must be equal'
        }, HttpStatus.CONFLICT)

        const salt: string = bcrypt.genSaltSync(10);

        const hashedPassword =  bcrypt.hashSync(dto.newPassword, salt)

        await this.usersRepository.update({id: user.id}, {
            password: hashedPassword
        })
        return {
            message: 'Password is changed'
        }
    }

    async getUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
        return paginate<UserEntity>(this.usersRepository, options);
    }

    async findUserById(id: number): Promise<UserEntity> {
        return await this.usersRepository.findOne({id});
    }

    findByRefreshToken(refresh_token: string) {
        return this.usersRepository.findOne({where: {
            refresh_token
        }})
    }

    async saveStore(user: UserEntity, dto: SaveStoreDto) {

        const store = await this.storeEntity.findOne({ownerId: user.id})
        const walletAddress = dto.walletAddress
        delete dto.walletAddress;

        if(store) {
            await this.storeEntity.update({ownerId: user.id},{
                ...dto
            })
        } else {
            await this.storeEntity.save({
                ownerId: user,
                ...dto
            })
        }

        await this.walletService.saveWalletAddress(user, walletAddress)
        return {
            message: 'Store is saved'
        }
    }

}
