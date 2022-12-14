import {IsEmpty, IsEthereumAddress, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    modelName: string

    @IsNotEmpty()
    @IsString()
    price: string

    @IsNotEmpty()
    @IsString()
    currencyId: number

    @IsEthereumAddress()
    wallet: string

    files: any
}