import { IsEmpty, IsEthereumAddress, IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class CreateUserDto extends UserEntity{

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  address: string

  @IsNotEmpty()
  @IsString()
  password: string


  email: string

  phone

  @IsEmpty()
  birthDate

  @IsEmpty()
  passportId


  @IsEmpty()
  photo

  @IsEmpty()
  middle

  @IsEmpty()
  name

  @IsEmpty()
  surname

  @IsEmpty()
  country

  @IsEmpty()
  confirmed

}
