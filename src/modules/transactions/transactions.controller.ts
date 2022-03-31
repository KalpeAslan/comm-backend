import { Body, Controller, DefaultValuePipe, Get, Param, Post, Query, Res } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "../../dto/transaction.dto";
import { Response } from "express";
import { IResponse } from "../../ts/common";
import { UsersService } from "../users/users.service";
import { Pagination } from "nestjs-typeorm-paginate";
import { TransactionEntity } from "../../entities/transaction.entity";

@Controller("/api/v1/transactions")
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly userService: UsersService
  ) {
  }


  @Get("/")
  async getTransactions(
    @Query("page", new DefaultValuePipe(1)) page: number,
    @Query("limit", new DefaultValuePipe(10)) limit: number,
    @Res() response: Response
  ): Promise<Response<Pagination<TransactionEntity>>> {
    const transactions = await this.transactionService.getTransactions({ page, limit });
    return response.send({
      message: transactions,
      status: 200
    }).status(200);
  }

  @Get("/:txnHash")
  async getTransaction(
    @Param("txnHash") txnHash: string,
    @Res() response: Response
  ): Promise<Response<TransactionEntity>> {
    const transaction: TransactionEntity | undefined = await this.transactionService.getTransaction(txnHash);
    if (!transaction) return response.send({
      message: "Transaction not found",
      status: 404
    }).status(404);

    return response.send({
      message: transaction,
      status: 200
    }).status(200);
  }


  @Post("/")
  async postTransaction(
    @Body() transactionDto: TransactionDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {
    const isUserFromExist = await this.userService.isUserExistByAddress(transactionDto.fromAddress);
    const isUserToExist = await this.userService.isUserExistByAddress(transactionDto.toAddress);

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
