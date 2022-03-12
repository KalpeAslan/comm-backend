import { forwardRef, Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { MessengerService } from './messenger.service';
import { conf } from "../../../conf";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "../../entities/messageEntity";
import { UsersModule } from "../users/users.module";



@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: conf.userGmail,
          pass: conf.passwordGmail
        }
      },

      defaults: {
        from: conf.passwordGmail,
      },
      preview: true,
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [MessengerService],
  exports: [MessengerService]
})
export class MessengerModule {

}
