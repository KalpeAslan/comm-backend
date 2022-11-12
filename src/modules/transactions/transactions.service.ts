import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TransactionDto} from "../../dto/transaction.dto";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../../entities/user.entity";
import {AddressEntity} from "../../entities/addresses.entity";
import {TransactionEntity} from "../../entities/transaction.entity";
import {ProductTransactionsEntity} from "../../entities/product-transactions.entity";

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
        @InjectRepository(ProductTransactionsEntity)
        private readonly productTransactionRepository: Repository<ProductTransactionsEntity>,
    ) {
    }

    async saveProductTransaction(data: any) {
        try {
            return this.productTransactionRepository.save(data)
        } catch (e) {
            console.log(e)
            throw new HttpException('Something Wrong Product Transactions', 500)
        }
    }

    async saveTransaction(transactionDto: TransactionDto): Promise<TransactionEntity> {

        const from: UserEntity = await this.userService.findOrCreateUserByEthAddress(transactionDto.fromAddress);
        const to: UserEntity = await this.userService.findOrCreateUserByEthAddress(transactionDto.toAddress);
        const transaction = {
            ...transactionDto,
            timestamp: new Date(+transactionDto.timestampString * 1000).toString(),
            from,
            to,
            value: +transactionDto.value || 0
        };
        return this.transactionsRepository.save(transaction);
    }


    async getTransactions(options: IPaginationOptions): Promise<Pagination<TransactionEntity>> {
        const queryBuilder = await this.transactionsRepository.createQueryBuilder("t")
        return paginate<TransactionEntity>(queryBuilder, options);
    }

    async getTransaction(txnHash: string): Promise<TransactionEntity | undefined> {
        return await this.transactionsRepository.findOne({txnHash});
    }

    async getTransactionsMeta(userId: number) {

        const cashFlow = await this.getTransactionsCashFlow(userId)
        const transactionsCount = await this.getTransactionsCount(userId)
        const clients = await this.getClientsCount(userId)
        const incomeTotal = await this.getIncome(userId)
        const productsIncomes = await this.getProductIncomes(userId)

        return {
            cashFlow,
            transactionsCount,
            clients,
            incomeTotal,
            productsIncomes
        }
    }

    public getMyTransactions(userId: number) {
        return this.transactionsRepository.find({
            where: {
                from: userId
            },
            join: {
                alias: 't',
                leftJoinAndSelect: {
                    to: 't.to'
                }
            }
        })
    }


    public async getIncome(userId: number) {
        const data = await this.getProductIncomes(userId)
        const txIncomes = await this.transactionsRepository.find({
            where: {
                to: userId
            },
            join: {
                alias: 't',
                leftJoinAndSelect: {
                    to: 't.to'
                }
            }
        })

        data.incomes = [
            ...data.incomes,
            ...txIncomes.map(tx => {
                data.incomeTotal += +tx.value
                return ({
                    date: tx.created_at,
                    value: tx.value
                })
            })
        ]
        return data
    }

    public async getClients(userId) {
        return (await this.productTransactionRepository.find({
            where: {
                seller: userId
            },
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    buyer: 'p.buyer',
                    product: 'p.product'
                }
            }
        }))
    }

    private async getProductIncomes(userId: number) {

        const data = {
            incomeTotal: 0,
            incomes: []
        }
        const productTx = (await this.productTransactionRepository.find({
            where: {
                seller: userId
            },
            join: {
                alias: 'p',
                leftJoinAndSelect: {
                    transaction: 'p.transaction',
                    product: 'p.product'
                }
            }
        }))

        data.incomes = productTx.map(product => {
            data.incomeTotal += +product.product.price
            return ({
                date: product.created_at,
                value: product.product.price
            })
        })

        return data
    }

    private async getClientsCount(userId: number) {
        return this.productTransactionRepository.count({
            where: {
                seller: userId
            }
        })
    }

    private async getTransactionsCashFlow(userId: number) {
        const allTransactions = await this.transactionsRepository.find({
            where: [
                {from: userId},
                {to: userId}
            ]
        })

        return allTransactions.reduce((acc, cur) => {
            acc += +cur.value
            return acc
        }, 0)
    }


    private getTransactionsCount(userId: number) {
        return this.transactionsRepository.count({
            where: [
                {from: userId},
                {to: userId}
            ]
        })
    }
}
