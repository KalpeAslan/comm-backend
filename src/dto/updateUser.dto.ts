import { IsDate, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class UpdateUserDto extends UserEntity {

  @IsNotEmpty()
  @IsString()
  token: string

  @IsNotEmpty()
  @IsString()
  code: string

  @IsEmpty()
  address: string;

  @IsEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  birthDate: Date

  @IsNotEmpty()
  @IsString()
  passportId: string


  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsString()
  surname;

  @IsNotEmpty()
  @IsString()
  country;

}
