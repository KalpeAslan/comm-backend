import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "../../entities/transaction.entity";
import { Repository } from "typeorm";
import { TransactionDto } from "../../dto/transaction.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../../entities/user.entity";
import { AddressEntity } from "../../entities/addresses.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    private readonly userService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressEntity: Repository<AddressEntity>,
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

    const isUserFromExist = this.userService.isUserExistByAddress(transactionDto.fromAddress);
    return false;
  }

  async saveTransaction(transactionDto: TransactionDto): Promise<void> {

    const from: AddressEntity = await this.addressEntity.findOne({
      join: {
        alias: 't',
        leftJoinAndSelect: {
          user: 't.user',
        },
      },
      where: {
        address: transactionDto.fromAddress
      }
    });
    const to: AddressEntity = await this.addressEntity.findOne({
      join: {
        alias: 't',
        leftJoinAndSelect: {
          user: 't.user',
        },
      },
      where: {
        address: transactionDto.toAddress
      }
    });

    const transaction = {
      ...transactionDto,
      timestamp: new Date(transactionDto.timestampString).toString(),
      from: from.user,
      to: 1
    };
    delete transaction.fromAddress;
    delete transaction.toAddress;
    await this.transactionsRepository.save(transaction);
  }
}
