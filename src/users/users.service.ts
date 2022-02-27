import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {
  }

  async getUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    return paginate<UserEntity>(this.usersRepository, options)
  }

  async getUser(address: string): Promise<UserEntity> {
    return this.usersRepository.findOne({address})
  }

  async isUserExist(address: string): Promise<boolean> {
    return !!await this.usersRepository.findOne({ address });
  }

  async saveUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.save(userDto);
  }
}
