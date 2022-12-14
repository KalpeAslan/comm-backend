import {Module} from "@nestjs/common";
import {CommunicationService} from './communication.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntityEntity} from "../entities/messageEntity.entity";
import {MailerService} from "./mailer.service";
import {MailerModule} from "@nestjs-modules/mailer";
import {communicationConfig} from "../configs/communication.config";
import {Env} from "../utils/env.utils";

//Aa2240878
//Nn2240878
//Aa2440878
//Nn2440878


@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntityEntity]),
        MailerModule.forRootAsync({
            useFactory(){
                const config = communicationConfig()
                return {
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                            user: config.emailSender,
                            pass: config.emailSenderPassword,
                        },
                    },
                    defaults: {
                        from: '"No Reply" <no-reply@localhost>',
                    },
                    preview: true,
                }
            }
        }),
    ],
    providers: [CommunicationService, MailerService],
    exports: [CommunicationService]
})
export class CommunicationModule {
}
