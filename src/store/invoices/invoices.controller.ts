import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {Firewall} from "../../auth/decorators/firewall.decorator";
import {CreateInvoiceDto} from "../dto/createInvoice.dto";
import {InvoicesService} from "./invoices.service";
import {EFirewall} from "../../auth/auth.constants";
import {ApiKeyDecorator} from "../../auth/decorators/apiKey.decorator";
import {ApiKeyEntity} from "../../entities/apiKey.entity";

@Controller('invoices')
export class InvoicesController {

    constructor(
        private readonly invoiceService: InvoicesService
    ) {
    }

    @Firewall(EFirewall.apiKey)
    @Get('/:id')
    getInvoices(
        @Param('id') id: number
    ) {
        return this.invoiceService.getInvoice(id)
    }

    @Firewall(EFirewall.apiKey)
    @Post('/create')
    createInvoice(
        @Body() body: CreateInvoiceDto,
        @ApiKeyDecorator() apiKey: ApiKeyEntity
    ) {
        return this.invoiceService.createInvoice(apiKey, body)
    }
}
