import {Module} from '@nestjs/common';
import {UsersModule} from "../users/users.module";
import {StoreController} from './store.controller';
import {StoreService} from './store.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StoreEntity} from "../entities/store.entity";
import {CommonModule} from "../common/common.module";
import {ProductEntity} from "../entities/product.entity";
import {ApiKeyEntity} from "../entities/apiKey.entity";
import {JwtModule} from "@nestjs/jwt";
import {authConfig} from "../configs/auth.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([StoreEntity, ProductEntity, ApiKeyEntity]),
        UsersModule, CommonModule,
        JwtModule.registerAsync({
            useFactory() {
                const config = authConfig()
                return {
                    secretOrPrivateKey: config.jwtSecretKey
                }
            }
        }),
    ],
    controllers: [StoreController],
    providers: [StoreService]
})
export class StoreModule {
}
