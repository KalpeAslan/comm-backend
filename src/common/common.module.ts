import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from "../entities/store.entity";
import { CurrencyController } from './currencies/currency.controller';
import { CurrencyService } from './currencies/currency.service';
import { CurrencyEntity } from 'src/entities/currency.entity';

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
  imports: [
    TypeOrmModule.forFeature([StoreEntity, CurrencyEntity])
  ],
  exports: [CurrencyService]
})
export class CommonModule {}
