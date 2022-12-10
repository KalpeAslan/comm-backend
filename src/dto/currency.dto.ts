import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ENetwork} from "../constants/common.constants";

export class CurrencyDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    symbol: string

    @IsNotEmpty()
    @IsNumber()
    chainId: number

    @IsString()
    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    @IsNumber()
    decimals: number

    @IsString()
    @IsNotEmpty()
    logoURI: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    @IsEnum(ENetwork)
    network: string

    @IsString()
    @IsNotEmpty()
    toUsd: string

    @IsString()
    @IsNotEmpty()
    toBtc: string

}