import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateStoreDto } from "./dto/createStore.dto";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { StoreService } from "./store.service";
import { StoreEntity } from "../entities/store.entity";
import {CreateProductDto} from "./dto/createProduct.dto";
import {UserEntity} from "../entities/user.entity";
import {User} from "../users/decorators/user.decorator";
import {Firewall} from "../auth/decorators/firewall.decorator";

@Controller("/api/v1/store")
export class StoreController {

  constructor(
    private readonly userService: UsersService,
    private readonly storeService: StoreService
  ) {
  }

  @Get('products')
  async getProducts(
      @Res() response: Response
  ) {
    return response.send({
      message: await this.storeService.getProducts(),
      status: 200
    }).status(200)
  }

  @Get('/:storeId')
  async getStoreById(
    @Param('storeId') storeId: number,
    @Res() response: Response
  ) {
    const storeEntity = await this.storeService.getStore(storeId)
    return response.send({
      message: storeEntity || 'Store not found',
      status: storeEntity ? 200 : 404
    }).status(storeEntity ? 200 : 404)
  }


  @Firewall()
  @Post('create-product')
  async createProduct(
      @Body() data: CreateProductDto,
      @Res() response: Response,
      @User() user: UserEntity
  ) {
    return response.send({
      message: await this.storeService.createProduct(user, data),
      status: 200
    }).status(200)
  }
}
