import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MoreThan, Repository} from "typeorm";
import {TransactionDto} from "../dto/transaction.dto";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../entities/user.entity";
import {AddressEntity} from "../entities/addresses.entity";
import {TransactionEntity} from "../entities/transaction.entity";
import {ProductTransactionsEntity} from "../entities/product-transactions.entity";
import {CurrencyService} from "src/common/currencies/currency.service";
import {EGrow, EPeriods} from "./constants/transaction.constants";
import {getDateFromPeriod} from "./utils/transactions.utils";
import {CurrencyEntity} from "src/entities/currency.entity";
import {WalletService} from "../users/wallet/wallet.service";
import {ENetwork} from "../constants/common.constants";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionsRepository: Repository<TransactionEntity>,
        private readonly userService: UsersService,
        private readonly walletService: WalletService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressEntity: Repository<AddressEntity>,
        @InjectRepository(ProductTransactionsEntity)
        private readonly productTransactionRepository: Repository<ProductTransactionsEntity>,
        private readonly currencyService: CurrencyService
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

        const from = await this.walletService.findOrCreateAddressEntityByEthAddress(transactionDto.fromAddress, ENetwork.Goerli);
        const to = await this.walletService.findOrCreateAddressEntityByEthAddress(transactionDto.toAddress, ENetwork.Goerli);
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

        console.log('getTransactionsMeta');
        const cashFlow = await this.getTransactionsCashFlow(userId)
        console.log('cashFlow');
        
        const transactionsCount = await this.getTransactionsCount(userId)
        console.log('transactionsCount');
        
        const clients = await this.getClientsCount(userId)
        console.log('getClientsCount');
        
        const incomeTotal = await this.getIncome(userId, EPeriods.Month)
        console.log('getIncome');
        
        const productsIncomes = await this.getProductIncomes(userId)
        console.log('productsIncomes');
        

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


    public async getIncome(userId: number, period: EPeriods) {
        const data = await this.getProductIncomes(userId)
        const computedPeriod = getDateFromPeriod(period)
        const txIncomes = await this.transactionsRepository.find({
            where: {
                // to: userId,
                created_at: MoreThan(computedPeriod)
            },
            join: {
                alias: 't',
                leftJoinAndSelect: {
                    to: 't.to',
                    currencyTo: 't.currencyTo'
                }
            }
        })

        data.incomes = [
            ...data.incomes,
            ...txIncomes.reduce((acc, tx) => {
                data.incomeTotal += +tx.value
                const prevItem = acc.slice(-1)[0] || undefined
                return [
                    ...acc,
                    {
                        date: tx.created_at,
                        value: tx.value,
                        growth: this.computeGrowthNew(prevItem && prevItem.value, prevItem && prevItem.currencyTo,
                            tx.value,
                            tx.currencyTo)
                    }
                ]
            }, [])
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

        data.incomes = productTx.reduce((acc, product) => {
            data.incomeTotal += +product.product.price
            const prevItem = acc.slice(-1)[0] ? acc.slice(-1)[0] : undefined
            const growth = this.computeGrowthNew(prevItem && prevItem.transaction.value, prevItem && prevItem.transaction.currencyTo,
                product.transaction.value, product.transaction.currencyTo)
            return [
                ...acc,
                ({
                    date: product.created_at,
                    value: product.product.price,
                    growth
                })
            ]
        }, [])

        return data
    }

    private computeGrowth(firstItem: CurrencyEntity | undefined, currentItem: CurrencyEntity) {
        if (!currentItem) return EGrow.Neutral
        if (!firstItem || +firstItem.toUsd < +currentItem.toUsd) return EGrow.Positive
        if (+firstItem.toUsd > +currentItem.toUsd) return EGrow.Negative
        return EGrow.Neutral
    }


    private computeGrowthNew(prevItemPrice: string | number | undefined, prevItemCurrency: CurrencyEntity | undefined,
                                   currentItemPrice: string | number, currentItemCurrency: CurrencyEntity): EGrow {

        if (!prevItemPrice || !prevItemCurrency) return EGrow.Positive
        const prevConvertedPrice = +prevItemPrice * +prevItemCurrency.toUsd
        const curConvertedPrice = +currentItemPrice * +currentItemCurrency.toUsd
        if (prevConvertedPrice < curConvertedPrice) return EGrow.Positive
        if (prevItemCurrency > currentItemCurrency) return EGrow.Negative
        return EGrow.Neutral
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
