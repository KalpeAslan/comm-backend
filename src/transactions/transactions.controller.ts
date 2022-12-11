import { Body, Controller, DefaultValuePipe, Get, Param, Post, Query, Res } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "../dto/transaction.dto";
import { Response } from "express";
import { IResponse } from "../ts/common";
import { UsersService } from "../users/users.service";
import { Pagination } from "nestjs-typeorm-paginate";
import {TransactionEntity} from "../entities/transaction.entity";
import {ProductTransactionDto} from "../dto/product-transaction.dto";
import {EPeriods} from "./constants/transaction.constants";
import {UserEntity} from "../entities/user.entity";
import {User} from "../users/decorators/user.decorator";
import {Firewall} from "../auth/decorators/firewall.decorator";

@Controller("/api/v1/transactions")
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
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

  @Firewall()
  @Get('/meta')
  async getTransactionsCount(
      @User() user: UserEntity
  ) {
    return this.transactionService.getTransactionsMeta(user.id)
  }

  @Firewall()
  @Get('/getClients')
  async getClients(
      @User() user: UserEntity
  ) {
    return this.transactionService.getClients(user.id)
  }

  @Firewall()
  @Get('/getIncomes')
  async getIncomes(
      @Query('period', new DefaultValuePipe(EPeriods.Month)) period: EPeriods,
      @User() user: UserEntity
  ) {
    return this.transactionService.getIncome(user.id, EPeriods.Week)
  }


  @Firewall()
  @Get('/my')
  async getMyTransactions(
      @User() user: UserEntity
  ) {
    return this.transactionService.getMyTransactions(user.id)
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


  @Firewall()
  @Post('/buy-product')
  async buyProductTx(
      @Body() transactionDto: ProductTransactionDto,
      @User() user: UserEntity,
      @Res() response: Response
  ) {
    return response.send({
      message: await this.transactionService.saveProductTransaction(user, transactionDto)
    })
  }



  @Post("/")
  async postTransaction(
    @Body() transactionDto: TransactionDto,
    @Res() response: Response
  ): Promise<Response<IResponse>> {
    await this.transactionService.saveTransaction(transactionDto);
    return response.send({
      message: "Transaction is saved",
      status: 200
    }).status(200);
  }
}
