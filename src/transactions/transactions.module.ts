import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "../entities/transaction.entity";
import { UserEntity } from "../entities/user.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity]),
    UsersModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
