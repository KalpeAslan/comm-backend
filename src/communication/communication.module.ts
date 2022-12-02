import { Module } from "@nestjs/common";
import { CommunicationService } from './communication.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntityEntity } from "../entities/messageEntity.entity";
import { MailerService } from "./mailer.service";

@Module({
  imports: [
  TypeOrmModule.forFeature([MessageEntityEntity]),
  ],
  providers: [CommunicationService, MailerService],
  exports: [CommunicationService]
})
export class CommunicationModule {
}
