import {Module} from '@nestjs/common';
import {TransactionsModule} from './transactions/transactions.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import ormConfig from 'ormconfig.json'
import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import {CommunicationModule} from './communication/communication.module';
import {CommunicationController} from './communication/communication.controller';
import {StoreModule} from "./store/store.module";
import {ProductsModule} from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import {config} from "./configs/config";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig as unknown as TypeOrmModuleOptions),
        TransactionsModule, UsersModule, CommunicationModule, StoreModule, ProductsModule,
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true
        })
    ],
    controllers: [CommunicationController],
    providers: [],
})
export class AppModule {
}
