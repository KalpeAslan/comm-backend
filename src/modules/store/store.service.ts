import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "../../entities/store.entity";
import { Repository } from "typeorm";
import { PrivateKeyService } from "../common/private-key/private-key.service";
import { CreateStoreDto } from "./dto/createStore.dto";

@Injectable()
export class StoreService {

  constructor(
    private readonly userService: UsersService,
    private readonly privateKeyService: PrivateKeyService,
    @InjectRepository(StoreEntity)
    private readonly storeEntity: Repository<StoreEntity>
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
}
