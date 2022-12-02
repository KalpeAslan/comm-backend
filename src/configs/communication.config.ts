import {ICommunicationConfig} from "../ts/communication.types";
import {Env} from "../utils/env.utils";

export function communicationConfig(): ICommunicationConfig {
    return {
        sendgridApiKey: Env.readString('SENDGRID_API_KEY'),
        emailSender: Env.readString('SENDGRID_SENDER'),
        websiteUrl: Env.readString('WEBSITE_URL')
    }
}