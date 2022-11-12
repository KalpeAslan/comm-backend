import { Body, Controller, DefaultValuePipe, Get, Param, Post, Query, Res } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "../../dto/transaction.dto";
import { Response } from "express";
import { IResponse } from "../../ts/common";
import { UsersService } from "../users/users.service";
import { Pagination } from "nestjs-typeorm-paginate";
import {TransactionEntity} from "../../entities/transaction.entity";
import {ProductTransactionDto} from "../../dto/product-transaction.dto";
import {ProductsService} from "../products/products.service";

@Controller("/api/v1/transactions")
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly userService: UsersService,
    private readonly productService: ProductsService
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

  @Get('/meta/:ethAddress')
  async getTransactionsCount(
      @Param('ethAddress') ethAddress: string
  ) {
    const user = await this.userService.findOrCreateUserByEthAddress(ethAddress)
    return this.transactionService.getTransactionsMeta(user.id)
  }

  @Get('/getClients/:ethAddress')
  async getClients(
      @Param('ethAddress') ethAddress: string
  ) {
    const user = await this.userService.findOrCreateUserByEthAddress(ethAddress)
    return this.transactionService.getClients(user.id)
  }

  @Get('/getIncomes/:ethAddress')
  async getIncomes(
      @Param('ethAddress') ethAddress: string
  ) {
    const user = await this.userService.findOrCreateUserByEthAddress(ethAddress)
    return this.transactionService.getIncome(user.id)
  }


  @Get('/my/:ethAddress')
  async getMyTransactions(
      @Param('ethAddress') ethAddress: string
  ) {
    const user = await this.userService.findOrCreateUserByEthAddress(ethAddress)
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


  @Post('/buy-product')
  async buyProductTx(
      @Body() transactionDto: ProductTransactionDto,
      @Res() response: Response
  ) {
    const tx = await this.transactionService.saveTransaction(transactionDto)
    const buyer = await this.userService.findOrCreateUserByEthAddress(transactionDto.fromAddress)
    const seller = await this.userService.findOrCreateUserByEthAddress(transactionDto.toAddress)
    const product = await this.productService.getProductById(transactionDto.productId)
    return response.send({
      message: await this.transactionService.saveProductTransaction({
        transaction: tx,
        seller,
        buyer,
        product
      })
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
