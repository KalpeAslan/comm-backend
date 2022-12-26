import {IsEnum, IsNotEmpty} from "class-validator";
import {ESsoTypes} from "../auth.constants";

export class SsoSignUpDto {
    @IsNotEmpty()
    token: string

    @IsEnum(ESsoTypes)
    type: ESsoTypes
}
