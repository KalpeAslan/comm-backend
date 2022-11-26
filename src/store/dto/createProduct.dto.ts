import {ProductEntity} from "../../entities/product.entity";
import {IsEthereumAddress, IsNotEmpty, IsString} from "class-validator";

export class CreateProductDto extends ProductEntity {
    @IsNotEmpty()
    @IsString()
    name: string


    @IsNotEmpty()
    @IsString()
    description: string


    @IsNotEmpty()
    @IsString()
    currency: string


    @IsNotEmpty()
    @IsString()
    price: string

    @IsNotEmpty()
    @IsString()
    @IsEthereumAddress()
    address: string
}