import {IsEmail} from "class-validator";
import {BaseCreateUserDto} from "./BaseCreateUser.dto";

export class RegisterEmailDto extends BaseCreateUserDto {
    @IsEmail()
    email: string
}
