import {ICommunicationConfig} from "../ts/communication.types";
import {Env} from "../utils/env.utils";

export function communicationConfig(): ICommunicationConfig {
    return {
        sendgridApiKey: Env.readString('SENDGRID_API_KEY'),
        websiteUrl: Env.readString('WEBSITE_URL'),
        emailSender: Env.readString('EMAIL_SENDER_ADDRESS'),
        emailSenderPassword: Env.readString('EMAIL_SENDER_PASSWORD')
    }
}