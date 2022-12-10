import {IsNotEmpty, IsString} from "class-validator";

export class BaseCreateUserDto{

    @IsNotEmpty()
    @IsString()
    password: string
}
