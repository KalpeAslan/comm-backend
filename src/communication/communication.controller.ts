import { Controller, Get, Param, Res } from "@nestjs/common";
import { CommunicationService } from "./communication.service";
import { Response } from "express";

@Controller("/api/v1/communication")
export class CommunicationController {

  constructor(private readonly messengerService: CommunicationService) {}

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
