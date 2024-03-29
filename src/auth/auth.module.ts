import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AuthHelper} from "./helpers/auth.helper";
import {UsersModule} from "../users/users.module";
import {AuthController} from './auth.controller';
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {CommunicationModule} from '../communication/communication.module';
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {authConfig} from "../configs/auth.config";
import {StoreModule} from "../store/store.module";
import {ApiKeyMiddleware} from "./middlewares/apiKey.middleware";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory() {
                const config = authConfig()
                return {
                    secretOrPrivateKey: config.jwtSecretKey
                }
            }
        }),
        TypeOrmModule.forFeature([UserEntity]),
        UsersModule,
        CommunicationModule,
        StoreModule
    ],
    providers: [AuthService, AuthHelper, AccessTokenStrategy, RefreshTokenStrategy],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(ApiKeyMiddleware)
            .forRoutes('invoices')
    }
}
