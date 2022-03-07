import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../../dto/user.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { MessageDto } from "../../dto/message.dto";
import { MessengerService } from "../messenger/messenger.service";
import { IConfirmMessageResponse } from "../../ts/common.types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => MessengerService))
    private readonly messengerService: MessengerService
  ) {
  }

  async getUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    return paginate<UserEntity>(this.usersRepository, options)
  }

  async getUser(address: string): Promise<UserEntity> {
    return this.usersRepository.findOne({address})
  }


  async confirmUser(address: string, _message: MessageDto): Promise<IConfirmMessageResponse> {
    const {state, user, message} = await this.messengerService.confirmMessageAndGetUser(_message)
    if(state) {
      const _user: UserEntity = {
        ...user,
        confirmed: true
      }
      await this.usersRepository.update(user.id, _user)
    }
    return {
      message,
      state
    }
  }

  async isUserExist(address: string): Promise<boolean> {
    return !!await this.usersRepository.findOne({ address });
  }

  async saveUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.save(userDto);
  }

  async updateUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.update(userDto.id, userDto);
  }
}
