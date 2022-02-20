import { TransactionEntity } from "../entities/transaction.entity";
import { IsDate, IsEthereumAddress, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class TransactionDto extends TransactionEntity {
  @IsNotEmpty()
  @IsString()
  @MaxLength(66)
  txnHash: string

  @IsNotEmpty()
  @IsNumber()
  block: number

  @IsNotEmpty()
  @IsString()
  timestampString: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  status: string

  @IsNotEmpty()
  @IsNumber()
  value: number

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  fromAddress: string

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  toAddress: string
}