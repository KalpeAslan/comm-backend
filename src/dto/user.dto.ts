import { IsEthereumAddress, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class UserDto extends UserEntity{

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  address: string

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(12)
  passportId: string

  @IsNotEmpty()
  @IsString()
  birthDate: Date


  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surname: string

}