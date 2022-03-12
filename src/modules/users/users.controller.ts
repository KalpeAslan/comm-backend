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
  Res, UploadedFile, UseInterceptors
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { IResponse } from "../../ts/common.types";
import { UserDto } from "../../dto/user.dto";
import { Response } from "express";
import { UserEntity } from "../../entities/user.entity";
import { MessengerService } from "../messenger/messenger.service";
import { MessageDto } from "../../dto/message.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddAddressDto } from "./addAddressDto.dto";


@Controller("/api/v1/users")
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => MessengerService))
    private readonly messengerService: MessengerService
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
    const user = await this.userService.getUserByAddress(address);

    if (user === undefined) return response.send({
      message: `User with address ${address} not found`,
      status: 404
    }).status(404);

    return response.send({
      message: user,
      status: 200
    }).status(200);
  }


  @Get("/confirm/:address")
  async confirmUserGet(
    @Param("address") address: string,
    @Res() response: Response
  ): Promise<Response> {
    const isUserExist = await this.userService.isUserExistByAddress(address);
    if (!isUserExist) return response.send({
      message: "User doesnt is exist!",
      status: 400
    }).status(400);

    const user = await this.userService.getUserByAddress(address);


    if (user.confirmed) return response.send({
      message: "User is confirmed!",
      status: 400
    }).status(400);

    const token = await this.messengerService.generateMessage(user as unknown as UserEntity, "mail");

    return response.send({
      message: token,
      status: 200
    }).status(200);
  }

  @Post("/add")
  @UseInterceptors(
    FileInterceptor("photo"),
    FileInterceptor("pass")
  )
  async postUser(
    @Body() userDto: UserDto,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Response<UserEntity>> {

    const isUserExist = await this.userService.isUserExistByAddress(userDto.address);
    if (isUserExist) return response.send({
      message: "User is Exist",
      status: 400
    }).status(400);

    await this.userService.saveUser(userDto);
    return response.send({
      message: await this.userService.getUserByAddress(userDto.address.toLowerCase()),
      status: 200
    }).status(200);
  }


  @Patch("/confirm/:address")
  async confirmUser(
    @Param("address") address: string,
    @Body() messageDto: MessageDto,
    @Res() response: Response
  ): Promise<Response> {

    const { message, state } = await this.userService.confirmUser(address, messageDto);

    if (!state) return response
      .status(400).send({
        message,
        status: 400
      });

    return response.send({
      message: "User is confirmed",
      status: 200
    }).status(200);
  }


  @Put("/")
  async putUser(
    @Body() userDto: UserDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {
    const isUserExist = await this.userService.isUserExistByAddress(userDto.address);

    if (!isUserExist) return response.send({
      message: `User with address ${userDto.address} doesnt exist!`,
      status: 404
    }).status(404);

    await this.userService.updateUser(userDto);

    return response.send({
      message: "User is saved",
      status: 12
    }).status(200);
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
    const token: string = await this.messengerService.generateMessage(user, "mail");
    return response.status(200).send({
      message: token,
      status: 200
    });
  }

  @Put("/confirm-address/:address")
  async confirmAddress(
    @Body() messageDto: MessageDto,
    @Param("address") address: string,
    @Res() response: Response
  ) {
    const confirmedMessage = await this.userService.confirmAddress(address, messageDto);
    return response.status(confirmedMessage.state ? 200 : 400).send({
      message: confirmedMessage.message,
      status: confirmedMessage.state ? 200 : 400
    });
  }
}
