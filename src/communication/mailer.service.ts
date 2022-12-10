import {Injectable} from '@nestjs/common';
import sgMail, {MailService} from '@sendgrid/mail';
import {communicationConfig} from 'src/configs/communication.config';
import {ICommunicationConfig} from '../ts/communication.types';
import {MailerService as NodeMailerService} from '@nestjs-modules/mailer';


interface ISendMail {
    to: string;
    code: number;
}


@Injectable()
export class MailerService {

    private readonly config: ICommunicationConfig;
    private readonly sendGridService: MailService;
    private readonly senderMail: string;

    constructor(
        private readonly nodeMailer: NodeMailerService
    ) {
        this.config = communicationConfig();
        this.sendGridService = sgMail;
        this.sendGridService.setApiKey(this.config.sendgridApiKey)
        this.senderMail = this.config.emailSender;
    }

    public sendMailNodeMailer({code, to}: ISendMail) {
        return this.nodeMailer.sendMail({
            to, // list of receivers
            from: this.config.emailSender, // sender address
            subject: "Confirm Message COMM", // Subject line
            html: `<h1>Confirm link: ${this.config.websiteUrl}/verify/${code}</h1>`
        })
    }

    public async sendMail({code, to}: ISendMail) {
        try {
            return await this.sendGridService.send({
                to,
                from: this.senderMail,
                subject: "Confirm Message COMM",
                html: `<h1>Confirm link: ${this.config.websiteUrl}/verify/${code}</h1>`
            }).then(console.log);
        } catch (e) {
            console.log(e)
        }
    }
}