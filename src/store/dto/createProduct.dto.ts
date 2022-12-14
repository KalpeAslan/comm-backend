import {IsEthereumAddress, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string


    @IsNotEmpty()
    @IsString()
    description: string


    @IsNotEmpty()
    @IsNumber()
    currencyId: number

    @IsEthereumAddress()
    wallet: string


    @IsNotEmpty()
    @IsString()
    price: string
}