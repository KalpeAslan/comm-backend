import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from "../entities/store.entity";
import { CommonModule } from "../common/common.module";
import {ProductEntity} from "../entities/product.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, ProductEntity]),
    UsersModule,CommonModule
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
