import { IsEthereumAddress, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddAddressDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}