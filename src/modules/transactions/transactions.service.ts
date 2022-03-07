import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "../../entities/transaction.entity";
import { Repository } from "typeorm";
import { TransactionDto } from "../../dto/transaction.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    private readonly userService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getTransactions(options: IPaginationOptions): Promise<Pagination<TransactionEntity>> {
    const queryBuilder = await this.transactionsRepository.createQueryBuilder("t")
      .leftJoinAndSelect("t.from", "from")
      .leftJoinAndSelect("t.to", "to");
    return paginate<TransactionEntity>(queryBuilder, options);
  }

  async getTransaction(txnHash: string): Promise<TransactionEntity | undefined> {
    return await this.transactionsRepository.findOne({ txnHash });
  }


  async isTransactionCorrect(transactionDto: TransactionDto): Promise<boolean> {

    const isUserFromExist = this.userService.isUserExist(transactionDto.fromAddress);
    return false;
  }

  async saveTransaction(transactionDto: TransactionDto): Promise<void> {

    const from = await this.userRepository.findOne({ address: transactionDto.fromAddress });
    const to = await this.userRepository.findOne({ address: transactionDto.toAddress });

    const transaction = {
      ...transactionDto,
      timestamp: new Date(transactionDto.timestampString).toString(),
      from,
      to
    };
    delete transaction.fromAddress;
    delete transaction.toAddress;
    await this.transactionsRepository.save(transaction);
  }
}
