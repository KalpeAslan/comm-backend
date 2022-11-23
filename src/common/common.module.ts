import { Module } from '@nestjs/common';
import { PrivateKeyService } from './private-key/private-key.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrivateKeyEntity } from "../entities/privateKey.entity";
import { StoreEntity } from "../entities/store.entity";

@Module({
  providers: [PrivateKeyService],
  imports: [
    TypeOrmModule.forFeature([PrivateKeyEntity, StoreEntity])
  ],
  exports: [PrivateKeyService, CurrencyService]
})
export class CommonModule {}
