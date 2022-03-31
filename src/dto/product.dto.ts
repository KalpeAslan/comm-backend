import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  currency: string

  @IsNotEmpty()
  @IsString()
  currencySymbol: string

  @IsNotEmpty()
  @IsNumber()
  productId: number

  additionalInfo: string

  img: string

}
