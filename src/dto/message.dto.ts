import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  code: string

}