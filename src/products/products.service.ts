import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../entities/product.entity";
import {AddProductDto} from "./dto/add-product.dto";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {CurrencyEntity} from "../entities/currency.entity";
import {UserEntity} from "../entities/user.entity";
import {ENetwork} from "../constants/common.constants";
import {WalletService} from "../users/wallet/wallet.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>,
        private readonly userService: UsersService,
        private readonly walletService: WalletService,
        @InjectRepository(CurrencyEntity)
        private readonly currencyEntity: Repository<CurrencyEntity>,
    ) {
    }


    public async addProduct(
        user: UserEntity,
        body: AddProductDto,
    ) {

        const wallet = await this.walletService.findOrCreateAddressByUserAndEthAddress(user, body.wallet, ENetwork.Goerli)

        return this.productEntity.save({
            ...body,
            user,
            currency: +body.currencyId,
            wallet,
        })
    }

    public getProductById(id) {
        return this.productEntity.findOne({
            where: {
                id
            },
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    user: 'p.user',
                    currency: 'p.currency',
                    wallet: 'p.wallet'
                },
            }
        })
    }


    public async getAllProducts() {
        return this.productEntity.find({
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    user: 'p.user',
                    currency: 'p.currency',
                },
            }
        })
    }

    public async getUserProducts(userId) {
        return this.productEntity.find({
            where: {
                user: userId
            },
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    user: 'p.user',
                    currency: 'p.currency',
                },
            }
        })
    }

    public async getAllAddressProducts(ethAddress: string) {
        return this.productEntity.find({
            where: {
                user: {
                    address: ethAddress
                }
            },
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    user: 'p.user',
                },
            }
        })
    }

}
