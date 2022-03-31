import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateStoreDto } from "./dto/createStore.dto";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { StoreService } from "./store.service";
import { StoreEntity } from "../../entities/store.entity";

@Controller("/api/v1/store")
export class StoreController {

  constructor(
    private readonly userService: UsersService,
    private readonly storeService: StoreService
  ) {
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


  @Post("/create")
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @Res() response: Response
  ) {
    const isPasswordCorrect = await this.userService.isPasswordCorrect({
      password: createStoreDto.password,
      userId: createStoreDto.ownerId
    });
    if (!isPasswordCorrect) return response.send({
      message: "Password is invalid!",
      status: 403
    }).status(403);

    const storeEntity: StoreEntity = await this.storeService.createStore(createStoreDto);
    return response.send({
      message: storeEntity,
      status: 200
    }).status(200);
  }
}
