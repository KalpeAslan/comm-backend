import {IsEthereumAddress, IsNotEmpty, IsString} from "class-validator";

export class BaseCreateUserDto{

    @IsNotEmpty()
    @IsString()
    @IsEthereumAddress()
    address: string

    @IsNotEmpty()
    @IsString()
    password: string
}
