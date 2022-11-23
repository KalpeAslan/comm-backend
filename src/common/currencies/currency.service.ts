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
    },
    {
        "chainId": 5,
        "type": "ERC20",
        "address": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18,
        "logoURI": "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        "network": "Goerli",
        "toUsd": "87456500000",
        "toBtc": "1548646000"
    },
    {
        "chainId": 5,
        "type": "ERC20",
        "address": "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C",
        "name": "USDC",
        "symbol": "USDC",
        "decimals": 18,
        "logoURI": "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
        "network": "Goerli",
        "toUsd": "1",
        "toBtc": "0.00028"
    }

]