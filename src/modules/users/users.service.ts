import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../../dto/user.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { MessageDto } from "../../dto/message.dto";
import { MessengerService } from "../messenger/messenger.service";
import { IConfirmMessageResponse } from "../../ts/common.types";
import { AddressEntity } from "../../entities/addresses.entity";
import { AddAddressDto } from "./addAddressDto.dto";
import { MessageEntity } from "../../entities/messageEntity";

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

  async getUserByAddress(address: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({address});
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ id });
  }


  async isUserExistByAddress(address: string): Promise<boolean> {
    return !!await this.usersRepository.findOne({ address });
  }

  async isUserExistById(id: number): Promise<boolean> {
    return !!await this.usersRepository.findOne({ id });
  }

  async saveUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.save(userDto);
  }

  async updateUser(userDto: UserDto): Promise<void> {
    await this.usersRepository.update(userDto.id, userDto);
  }

  async confirmUser(address: string, _message: MessageDto): Promise<IConfirmMessageResponse> {
    const { state, user, message } = await this.messengerService.confirmMessageAndGetUser(_message);
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
    const user: UserEntity = await this.usersRepository.findOne({ id: addAddressDto.userId });
    await this.addressesEntityRepository.save({
      address: addAddressDto.address,
      user,
      confirmed: false
    });
  }


  async confirmAddress(address: string, messageDto: MessageDto): Promise<IConfirmMessageResponse> {
    const confirmedMessage: IConfirmMessageResponse = await this.messengerService.confirmMessageAndGetUser(messageDto);

    if (confirmedMessage.state) {
      const user = await this.getUserByAddress(address);
      await this.addressesEntityRepository.update({ address }, {
        ...user,
        confirmed: true
      });
    }

    return confirmedMessage;
  }

}
