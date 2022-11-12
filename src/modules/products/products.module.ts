import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "../../entities/product.entity";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
      TypeOrmModule.forFeature([ProductEntity]),
      UsersModule
  ],
    exports: [
        ProductsService
    ]
})
export class ProductsModule {}
