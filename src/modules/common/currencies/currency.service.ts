import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CurrencyEntity} from "../../../entities/currency.entity";
import {Repository} from "typeorm";
import {CurrencyDto} from "../../../dto/currency.dto";

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(CurrencyEntity)
        private readonly currencyRepository: Repository<CurrencyEntity>
    ) {
    }


    addCurrency(currency: CurrencyDto) {
        return this.currencyRepository.save(currency)
    }

    editCurrency(id: number, currency: CurrencyDto) {
        return this.currencyRepository.update({id}, currency)
    }

    deleteCurrency(id: number) {
        return this.currencyRepository.delete({id})
    }

    getCurrency(id: number) {
        return this.currencyRepository.findOne({id})
    }

    getAllCurrencies() {
        return this.currencyRepository.find()
    }
}

const currencies = [
    {
        "chainId": 5,
        "type": "ERC20",
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "name": "Uniswap",
        "symbol": "UNI",
        "decimals": 18,
        "logoURI": "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
        "network": "Goerli",
        "toUsd": "103752900000",
        "toBtc": "4872200000"
    }
]