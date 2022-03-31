import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from "../../entities/store.entity";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    UsersModule,CommonModule
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
