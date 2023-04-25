import {isJSON, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({async: false, name: 'isJsonOptional'})
export class IsJsonOptionalDecorator implements ValidatorConstraintInterface {

    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        if(value === undefined) return true
        return isJSON(JSON.stringify(value))
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Payload must be JSON or undefined'
    }

}