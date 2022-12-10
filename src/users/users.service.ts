import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {AddressEntity} from "../entities/addresses.entity";

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

    async findUserById(id: number): Promise<UserEntity> {
        return await this.usersRepository.findOne({id});
    }

    findByRefreshToken(refresh_token: string) {
        return this.usersRepository.findOne({where: {
            refresh_token
        }})
    }

}
