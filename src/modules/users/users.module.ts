import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { MessengerModule } from "../messenger/messenger.module";
import { MulterModule } from "@nestjs/platform-express";
import { conf } from "../../../conf";
import { AddressEntity } from "../../entities/addresses.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    forwardRef(() => MessengerModule),
    MulterModule.register({
      dest: conf.fileDest
    })

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
