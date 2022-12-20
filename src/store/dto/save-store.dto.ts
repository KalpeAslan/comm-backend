import {IsEmail, IsEthereumAddress, IsNotEmpty} from "class-validator";

export class SaveStoreDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    country: string

    @IsEthereumAddress()
    walletAddress: string

    businessUrl: string

}