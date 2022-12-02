import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { communicationConfig } from 'src/configs/communication.config';
import { ICommunicationConfig } from '../ts/communication.types';
import sgMail from '@sendgrid/mail'


interface ISendMail {
  to: string;
  code: number;
}


@Injectable()
export class MailerService {

  private readonly config: ICommunicationConfig;
  private readonly sendGridService: MailService;
  private readonly senderMail: string;

  constructor() {
    this.config = communicationConfig();
    this.sendGridService = sgMail;
    this.sendGridService.setApiKey(this.config.sendgridApiKey)
    this.senderMail = this.config.emailSender;
  }

  public async sendMail({ code, to }: ISendMail) {
    return await this.sendGridService.send({
      to,
      from: this.senderMail,
      subject: "Confirm Message COMM",
      html: `<h1>Confirm link: ${this.config.websiteUrl}/verify/${code}</h1>`
    });
  }
}