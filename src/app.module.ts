import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from 'ormconfig.json'
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as unknown as TypeOrmModuleOptions),
    TransactionsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
