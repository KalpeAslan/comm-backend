import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {StoreEntity} from "../entities/store.entity";
import {Repository} from "typeorm";
import {PrivateKeyService} from "../common/private-key/private-key.service";
import {ProductEntity} from "../entities/product.entity";
import {UserEntity} from "../entities/user.entity";
import {WalletService} from "../users/wallet/wallet.service";
import {SaveStoreDto} from "./dto/save-store.dto";
import {ApiKeyEntity} from "../entities/apiKey.entity";
import {CreateApiKeyDto} from "./dto/createApiKey.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class StoreService {

    constructor(
        private readonly userService: UsersService,
        private readonly privateKeyService: PrivateKeyService,
        private readonly walletService: WalletService,
        private readonly jwtService: JwtService,
        @InjectRepository(StoreEntity)
        private readonly storeEntity: Repository<StoreEntity>,
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>,
        @InjectRepository(ApiKeyEntity)
        private readonly apiKeyEntity: Repository<ApiKeyEntity>
    ) {
    }


    async saveStore(user: UserEntity, dto: SaveStoreDto) {

        const store = await this.storeEntity.findOne({ownerId: user.id})
        const walletAddress = dto.walletAddress
        delete dto.walletAddress;

        if (store) {
            await this.storeEntity.update({ownerId: user.id}, {
                ...dto
            })
        } else {
            await this.storeEntity.save({
                ownerId: user,
                ...dto
            })
        }

        await this.walletService.saveWalletAddress(user, walletAddress)
        return {
            message: 'Store is saved'
        }
    }


    async createApiKey(user: UserEntity, dto: CreateApiKeyDto) {
        const token = await this.generateApiKeyToken(user)

        return this.apiKeyEntity.save({
            userId: user.id,
            limited: dto.limited,
            key: token,
            lastUsed: new Date().toDateString()
        })
    }


    async getApiKeys(user: UserEntity) {
        return this.apiKeyEntity.find({
            userId: user.id
        })
    }

    private async generateApiKeyToken(user: UserEntity): Promise<string> {
        return `pk_test_${await this.jwtService.signAsync(
            {
                sub: user.id,
            },
            {},
        )}`
    }
}
