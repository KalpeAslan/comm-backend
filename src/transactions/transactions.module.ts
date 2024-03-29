import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { UsersModule } from "../users/users.module";
import { AddressEntity } from "../entities/addresses.entity";
import {ProductTransactionsEntity} from "../entities/product-transactions.entity";
import {TransactionEntity} from "../entities/transaction.entity";
import {ProductsModule} from "../products/products.module";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity,UserEntity, AddressEntity, ProductTransactionsEntity]),
    UsersModule,
    ProductsModule,
    CommonModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
