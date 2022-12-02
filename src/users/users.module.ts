import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { MulterModule } from "@nestjs/platform-express";
import { conf } from "../../conf";
import { AddressEntity } from "../entities/addresses.entity";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    MulterModule.register({
      dest: conf.fileDest
    }),
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
