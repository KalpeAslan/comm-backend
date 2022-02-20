import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {
  }

  async isUserExist(address: string): Promise<boolean> {
    console.log(await this.usersRepository.findOne({ address }))
    return !!await this.usersRepository.findOne({ address });
  }

  async saveUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.save(userDto);
  }
}
