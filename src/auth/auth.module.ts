import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AuthHelper} from "./helpers/auth.helper";
import {UsersModule} from "../users/users.module";
import { AuthController } from './auth.controller';
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import { CommunicationModule } from '../communication/communication.module';
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";

@Module({
  imports: [
    JwtModule.register({
          secretOrPrivateKey: 'Aslan2001!!'
      }),
      TypeOrmModule.forFeature([UserEntity]),
      UsersModule,
      CommunicationModule
  ],
  providers: [AuthService, AuthHelper, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
