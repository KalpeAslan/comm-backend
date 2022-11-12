import {IsEmpty, IsNotEmpty, IsString} from "class-validator";

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
    currency: string

    @IsNotEmpty()
    @IsString()
    status: string


    @IsEmpty()
    ethAddress: string

    files: any
}