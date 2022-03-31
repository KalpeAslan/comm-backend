import { Controller, Get, Param, Res } from "@nestjs/common";
import { MessengerService } from "./messenger.service";
import { Response } from "express";

@Controller("/api/v1/messenger")
export class MessengerController {

  constructor(private readonly messengerService: MessengerService) {
  }

  @Get("/verify/:token/:code")
  async isMessageExist(
    @Param("token") token: string,
    @Param("code") code: string,
    @Res() response: Response
  ) {
    const isMessageExist: boolean = await this.messengerService.isMessageExist(token);
    return response.send({
      message: isMessageExist,
      code: 200
    }).status(200);
  }

}
