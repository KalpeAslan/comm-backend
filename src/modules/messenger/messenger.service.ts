import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { conf } from "../../../conf";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "../../entities/messageEntity";
import { Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { sha256 } from "js-sha256";
import { MessageDto } from "../../dto/message.dto";
import { utils } from "../../utils/utils";
import { IConfirmMessageResponse } from "../../ts/common.types";
import { UsersService } from "../users/users.service";


@Injectable()
export class MessengerService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {
  }

  public async getUserByToken(token: string): Promise<UserEntity> {
    return await this.messagesRepository.findOne({ token }).then(value => value.user);
  }

  public async getMessageByToken(token: string): Promise<MessageEntity> {
    return this.messagesRepository.findOne({ token });
  }

  public async generateMessage(user: UserEntity, type: "mail" | "phone"): Promise<string> {
    const code: string = sha256(user.address + new Date().getTime().toString()).slice(0, 6);
    const token: string = sha256(code).slice(0, 10);
    const message = {
      user: user,
      date: new Date().toString(),
      code: code,
      token,
      type,
      state: false
    };


    await this.messagesRepository.delete({ user: user });
    await this.messagesRepository.save(message);

    if (type === "mail") await this.sendMail(user.email, code);

    return token;
  }

  public async confirmMessageAndGetUser(messageDto: MessageDto): Promise<IConfirmMessageResponse> {
    const message = await this.messagesRepository.findOne({
      join: {
        alias: "message",
        leftJoinAndSelect: {
          user: "message.user"
        }
      },
      where: {
        token: messageDto.token
      }
    });

    if (!message) return {
      message: "Message token is not found",
      state: false
    };

    const timeDifference = utils.getDifferentTime(new Date(), new Date(message.date));
    if (timeDifference > 60) {
      await this.messagesRepository.delete({ token: messageDto.token });
      return {
        message: "Message is overdue",
        state: false
      };
    }

    if (message.code !== messageDto.code) return {
      message: "Code is wrong!",
      state: false
    };

    const user = { ...message.user };
    await this.messagesRepository.delete({ token: messageDto.token });
    return {
      message: "Confirmed!",
      state: true,
      user
    };
  }


  private async sendMail(to: string, code: string): Promise<any> {
    await this.mailerService.sendMail({
      to,
      from: conf.userGmail,
      subject: "Confirm Message COMM",
      html: `<h1>Confirm code: ${code}</h1>`
    });
  }
}
