import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { User } from "./decorators/user.decorator";
import { Firewall } from "src/auth/decorators/firewall.decorator";


@Controller("/users")
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) {
  }


  @Firewall()
  @Get('/me')
  getMe(@User() user: UserEntity) {
    return user
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
}
