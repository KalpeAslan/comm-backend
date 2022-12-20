import {IsBoolean} from "class-validator";

export class CreateApiKeyDto {
    @IsBoolean()
    limited: boolean
}