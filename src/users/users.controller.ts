import { Body, Controller, Post, Put, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IResponse } from "../ts/common.types";
import { UserDto } from "../dto/user.dto";
import { Response } from "express";


@Controller("/api/v1/users")
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) {
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
    }).status(404)
      ;
    await this.userService.saveUser(userDto);
    return response.send({
      message: "User is saved",
      status: 12
    }).status(200);
  }
}
