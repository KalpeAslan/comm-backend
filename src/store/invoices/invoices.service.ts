import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InvoiceEntity} from "../../entities/invoice.entity";
import {Repository} from "typeorm";
import {CreateInvoiceDto} from "../dto/createInvoice.dto";
import {CurrencyService} from "../../common/currencies/currency.service";
import {ApiKeyEntity} from "../../entities/apiKey.entity";

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(InvoiceEntity)
        private readonly invoiceRepository: Repository<InvoiceEntity>,
        private readonly currencyService: CurrencyService
    ) {
    }

    async getInvoice(id: number) {

        return this.invoiceRepository
            .createQueryBuilder('i')
            .leftJoinAndSelect('i.currency', 'currency')
            .leftJoinAndSelect('i.apiKey', 'apiKey')
            .leftJoinAndSelect('i.transaction', 'transaction')
            .leftJoinAndSelect('apiKey.userId', 'userId')
            .leftJoinAndSelect('apiKey.walletAddress', 'walletAddress')
            .where('i.id = :id', {id})
            .getOne()
    }

    async createInvoice(apiKeyEntity: ApiKeyEntity, {payload, currency, price}: CreateInvoiceDto) {
        const currencyEntity = await this.currencyService.getCurrency(currency)
        return await this.invoiceRepository.save({
            payload: payload || null,
            price,
            apiKey: apiKeyEntity,
            currency: currencyEntity
        })
    }
}
