import { Module } from '@nestjs/common';
import { PrivateKeyService } from './private-key/private-key.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrivateKeyEntity } from "../../entities/privateKey.entity";
import { StoreEntity } from "../../entities/store.entity";
import {CurrencyService} from "./currencies/currency.service";
import {CurrencyController} from "./currencies/currency.controller";
import {CurrencyEntity} from "../../entities/currency.entity";

@Module({
  providers: [PrivateKeyService, CurrencyService],
  controllers: [CurrencyController],
  imports: [
    TypeOrmModule.forFeature([PrivateKeyEntity, StoreEntity, CurrencyEntity])
  ],
  exports: [PrivateKeyService]
})
export class CommonModule {}
