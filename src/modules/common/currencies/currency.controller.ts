import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CurrencyService} from "./currency.service";
import {CurrencyDto} from "../../../dto/currency.dto";

@Controller("/api/v1/currencies")
export class CurrencyController {

    constructor(
        private readonly currencyService: CurrencyService
    ) {
    }


    @Get('/')
    getAllCurrencies() {
        return this.currencyService.getAllCurrencies()
    }

    @Get('/:id')
    getCurrencyById(@Param('id') id: string) {
        return this.currencyService.getCurrency(+id)
    }

    @Post('/')
    addCurrency(@Body() body: CurrencyDto) {
        return this.currencyService.addCurrency(body)
    }

    @Post('/:id')
    editCurrency(
        @Param('id') id: string,
        @Body() body: CurrencyDto
    ) {
        return this.currencyService.editCurrency(+id, body)
    }


}
