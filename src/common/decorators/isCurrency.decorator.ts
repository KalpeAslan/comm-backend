import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {CurrencyService} from "../currencies/currency.service";

@ValidatorConstraint({async: true, name: 'isCurrency'})
export class IsCurrencyDecorator implements ValidatorConstraintInterface {

    constructor(
        private readonly currencyService: CurrencyService
    ) {
    }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        return false
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return ''
    }
}