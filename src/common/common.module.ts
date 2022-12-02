import { Module } from '@nestjs/common';
import { PrivateKeyService } from './private-key/private-key.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrivateKeyEntity } from "../entities/privateKey.entity";
import { StoreEntity } from "../entities/store.entity";
import { CurrencyController } from './currencies/currency.controller';
import { CurrencyService } from './currencies/currency.service';
import { CurrencyEntity } from 'src/entities/currency.entity';

@Module({
  providers: [PrivateKeyService, CurrencyService],
  controllers: [CurrencyController],
  imports: [
    TypeOrmModule.forFeature([PrivateKeyEntity, StoreEntity, CurrencyEntity])
  ],
  exports: [PrivateKeyService, CurrencyService]
})
export class CommonModule {}
