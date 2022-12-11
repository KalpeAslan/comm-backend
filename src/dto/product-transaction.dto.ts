import {IsEmpty, IsNotEmpty, IsNumber} from "class-validator";
import {TransactionDto} from "./transaction.dto";

export class ProductTransactionDto extends TransactionDto{
  @IsNotEmpty()
  @IsNumber()
  productId: number

  @IsNotEmpty()
  sellerId: number

  @IsEmpty()
  transaction: number
}