import {IsEmpty, IsNotEmpty, IsNumber} from "class-validator";
import {UserEntity} from "../entities/user.entity";
import {TransactionDto} from "./transaction.dto";

export class ProductTransactionDto extends TransactionDto{
  @IsNotEmpty()
  @IsNumber()
  productId: number

  @IsEmpty()
  seller: UserEntity

  @IsEmpty()
  transaction: number
}