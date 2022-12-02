import { IsNotEmpty, Length } from "class-validator";

export class VerifyCodeDto {
  @IsNotEmpty()
  @Length(7)
  code: string
}