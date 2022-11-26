import {
  Body,
  Controller,
  DefaultValuePipe, forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe, Patch,
  Post,
  Put,
  Query,
  Res
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "../dto/createUser.dto";
import { Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { CommunicationService } from "../communication/communication.service";
import { AddAddressDto } from "./addAddressDto.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { PrivateKeyService } from "../common/private-key/private-key.service";


@Controller("/api/v1/users")
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => CommunicationService))
    private readonly communicationService: CommunicationService,
    private readonly privateKey: PrivateKeyService

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

  @Get('/getStatus/:address')
  async getUserStatus(
      @Param("address") address: string,
  ) {
    return this.userService.getUserStatus(address)
  }

  @Get("/:address")
  async getUser(
    @Param("address") address: string,
    @Res() response: Response
  ): Promise<Response<UserEntity>> {
    const user = await this.userService.getUserByAddress(address);

    if (user === undefined || !user.confirmed) return response.send({
      message: `User with address ${address} not found`,
      status: 404
    }).status(404);

    return response.send({
      message: user,
      status: 200
    }).status(200);
  }


  @Post("/create")
  async postUser(
    @Body() userDto: CreateUserDto,
    @Res() response: Response
  ): Promise<Response<UserEntity>> {

    const isUserExist = await this.userService.isUserExistByAddress(userDto.address);

    if (isUserExist) return response.send({
      message: "User Exist",
      status: 200
    }).status(200);
    const user = await this.userService.saveUser(userDto);
    await this.communicationService.generateMessage(user, "mail");

    return response.send({
      message: "User Created",
      status: 200
    }).status(200);
  }


  @Put("/update")
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response
  ) {
    const user: UserEntity = await this.communicationService.getUserByToken(updateUserDto.token);

    if (!user) return response.send({
      message: `User not found!`,
      status: 404
    }).status(404);

    await this.userService.updateUser(user.id, updateUserDto);
    await this.communicationService.deleteMessage({token: updateUserDto.token, code: updateUserDto.code})

    return response.send({
      message: "User updated",
      status: 200
    });
  }

  @Put("/add-address")
  async addAddress(
    @Body() addAddressDto: AddAddressDto,
    @Res() response: Response
  ) {
    const isUserExist = await this.userService.isUserExistById(addAddressDto.userId);
    if (!isUserExist) return response.status(404).send({
      message: "User doesnt exist!",
      status: 404
    });
    await this.userService.addAddress(addAddressDto);
    const user: UserEntity = await this.userService.getUserById(addAddressDto.userId);
    const token: string = await this.communicationService.generateMessage(user, "mail");
    return response.status(200).send({
      message: token,
      status: 200
    });
  }

}
