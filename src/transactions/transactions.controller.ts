import { Body, Controller, Post, Res } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "../dto/transaction.dto";
import { Response } from "express";
import { IResponse } from "../ts/common.types";
import { UsersService } from "../users/users.service";

@Controller("/api/v1/transactions")
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly userService: UsersService
  ) {
  }

  @Post("/")
  async postTransaction(
    @Body() transactionDto: TransactionDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {
    const isUserFromExist = await this.userService.isUserExist(transactionDto.fromAddress);
    const isUserToExist = await this.userService.isUserExist(transactionDto.toAddress);

    console.log(isUserToExist)
    if (!isUserFromExist && !isUserToExist) return response.send({
      message: "One of users doesnt exist",
      status: 404
    }).status(400);

    await this.transactionService.saveTransaction(transactionDto);
    return response.send({
      message: "Transaction is saved",
      status: 200
    }).status(200);
  }
}
