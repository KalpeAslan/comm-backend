import {ProductEntity} from "../../entities/product.entity";
import {IsEthereumAddress, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductDto extends ProductEntity {
    @IsNotEmpty()
    @IsString()
    name: string


    @IsNotEmpty()
    @IsString()
    description: string


    @IsNotEmpty()
    @IsNumber()
    currencyId: number


    @IsNotEmpty()
    @IsString()
    price: string

    @IsNotEmpty()
    @IsString()
    @IsEthereumAddress()
    address: string
}