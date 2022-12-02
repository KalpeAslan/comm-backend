import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntityEntity } from "../entities/messageEntity.entity";
import { Repository, UpdateResult } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import {communicationConfig} from "../configs/communication.config";
import { ICommunicationConfig } from '../ts/communication.types';
import { EMessageTypes } from 'src/communication/constants/communication.constants';
import { MailerService } from './mailer.service';

@Injectable()
export class CommunicationService {

  private readonly config: ICommunicationConfig

  constructor(
    @InjectRepository(MessageEntityEntity)
    private readonly messagesRepository: Repository<MessageEntityEntity>,
    private readonly mailerService: MailerService
  ) {
    this.config = communicationConfig();
  }


  //Setters

  public async sendSignUpMessage(user: UserEntity, type: EMessageTypes): Promise<number> {
    const code: number = (Math.floor(Math.random() * (9000000)) + 1000000);
    const message = {
      user: user,
      date: new Date().toString(),
      code,
      type,
      status: false
    };

    // await this.messagesRepository.delete({ user: user });
    await this.messagesRepository.save(message);

    if (type === EMessageTypes.Email) await this.mailerService.sendMail({
      to: user.email,
      code,
    });

    return code;
  }


  public async confirmCodeMessage(code: number): Promise<UserEntity> {
    const message = await this.messagesRepository.findOne({
      where: {
        code
      },
      join: {
        alias: 'm',
        leftJoinAndSelect: {
          user: 'm.user' 
        }
      }
    })

    if(!message) throw new HttpException('Code is not found', 404)
    
    await this.messagesRepository.delete({id: message.id})
    
    return message.user

  }

}
