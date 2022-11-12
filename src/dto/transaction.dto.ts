import { IsEthereumAddress, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class TransactionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(66)
  txnHash: string

  @IsNotEmpty()
  @IsNumber()
  block: number

  @IsNotEmpty()
  timestampString: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  status: string

  @IsNotEmpty()
  value: number

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  fromAddress: string

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  toAddress: string

  @IsNotEmpty()
  @IsString()
  currency: string

  @IsNotEmpty()
  @IsNumber()
  currencyFromId: number

  @IsNotEmpty()
  @IsNumber()
  currencyToId: number

  additionalInfo: string
}
