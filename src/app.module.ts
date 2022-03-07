import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from 'ormconfig.json'
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import { MessengerModule } from './modules/messenger/messenger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as unknown as TypeOrmModuleOptions),
    TransactionsModule, UsersModule, MessengerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
