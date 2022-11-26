import {HttpException, Injectable} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "../entities/store.entity";
import { Repository } from "typeorm";
import { PrivateKeyService } from "../common/private-key/private-key.service";
import { CreateStoreDto } from "./dto/createStore.dto";
import {CreateProductDto} from "./dto/createProduct.dto";
import {ProductEntity} from "../entities/product.entity";

@Injectable()
export class StoreService {

  constructor(
    private readonly userService: UsersService,
    private readonly privateKeyService: PrivateKeyService,
    @InjectRepository(StoreEntity)
    private readonly storeEntity: Repository<StoreEntity>,
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {
  }

  public async getStore(storeId: number): Promise<StoreEntity> {
    return await this.storeEntity.findOne({id: storeId})
  }

  public async createStore(createStoreDto: CreateStoreDto) {
    const userEntity = await this.userService.getUserById(createStoreDto.ownerId);
    console.log(createStoreDto)
    console.log(userEntity)
    const storeEntity: StoreEntity = await this.storeEntity.save({
      ...createStoreDto,
      ownerId: userEntity.id
    });
    await this.privateKeyService.addPrivateKey(storeEntity);
    return storeEntity;
  }


  getProducts() {
    return this.productEntity.find({
      join: {
        alias: "p",
        leftJoinAndSelect: {
          user: 'p.user'
        }
      }
    })
  }

  async createProduct(productDto: CreateProductDto) {

    const user = await this.userService.getUserByAddress(productDto.address)

    if(!user) {
      throw new HttpException('User not found', 404)
    }

    const product = {
      ...productDto
    }
    delete productDto.address
    product.user = user

    const data = await this.productEntity.save(product)
    console.log(data)
    return data
  }
}
