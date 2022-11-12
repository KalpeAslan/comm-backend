import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../entities/product.entity";
import {AddProductDto} from "./dto/add-product.dto";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>,
        private readonly userService: UsersService
    ) {
    }


    public async addProduct(
        body: AddProductDto,
    ) {
        const user = await this.userService.findOrCreateUserByEthAddress(body.ethAddress)
        return this.productEntity.save({
            ...body,
            user
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
