import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IResponse } from "../ts/common.types";
import { UserDto } from "../dto/user.dto";
import { Response } from "express";
import { UserEntity } from "../entities/user.entity";


@Controller("/api/v1/users")
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) {
  }

  @Get("/")
  async getUsers(
    @Res() response: Response,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<Response<UserEntity[]>> {

    const users = await this.userService.getUsers({ page, limit });
    return response.send({
      message: users,
      status: 200
    }).status(200);
  }

  @Get("/:address")
  async getUser(
    @Param("address") address: string,
    @Res() response: Response
  ): Promise<Response<UserEntity>> {
    const user = await this.userService.getUser(address.toLowerCase());

    console.log(user)
    if(user === undefined) return response.send({
      message: `User with address ${address} not found`,
      status: 404
    }).status(404)

    return response.send({
      message: user,
      status: 200
    }).status(200);
  }


  @Post("/")
  async postUser(
    @Body() userDto: UserDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {

    await this.userService.saveUser(userDto);
    return response.send({
      message: "User is saved",
      status: 12
    }).status(200);
  }

  @Put("/")
  async putUser(
    @Body() userDto: UserDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {
    const isUserExist = await this.userService.isUserExist(userDto.address);

    if (!isUserExist) return response.send({
      message: `User with address ${userDto.address} doesnt exist!`,
      status: 404
    }).status(404);

    await this.userService.saveUser(userDto);

    return response.send({
      message: "User is saved",
      status: 12
    }).status(200);
  }
}
