import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from 'ormconfig.json'
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as unknown as TypeOrmModuleOptions),
    TransactionsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
