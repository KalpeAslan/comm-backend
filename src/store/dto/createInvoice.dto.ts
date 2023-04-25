import {IsNumber, IsString, Validate} from "class-validator";
import {IsJsonOptionalDecorator} from "../decorators/isJsonOptional.decorator";

export class CreateInvoiceDto {
    @IsString()
    price: string

    @IsNumber()
    currency: number

    @Validate(IsJsonOptionalDecorator)
    payload: string
}