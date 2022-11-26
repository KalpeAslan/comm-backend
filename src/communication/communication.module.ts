import { forwardRef, Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { CommunicationService } from './communication.service';
import { conf } from "../../conf";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntityEntity } from "../entities/messageEntity.entity";
import { UsersModule } from "../users/users.module";



@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntityEntity]),
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
  providers: [CommunicationService],
  exports: [CommunicationService]
})
export class CommunicationModule {

}
