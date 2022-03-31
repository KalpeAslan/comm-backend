import { StoreEntity } from "../../../entities/store.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoreDto extends StoreEntity {
  @IsNotEmpty()
  @IsString()
  storeName: string

  @IsNotEmpty()
  @IsString()
  createdAt: string

  @IsNotEmpty()
  @IsString()
  imgSrc: string

  @IsNotEmpty()
  @IsNumber()
  ownerId: number

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  tariff: number

}
