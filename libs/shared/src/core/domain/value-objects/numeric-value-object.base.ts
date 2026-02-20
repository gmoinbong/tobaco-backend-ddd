import { ValidationError } from "../errors";

export class NumericValueObject {
    protected constructor(protected readonly value: number) {
    }

    static validateRange(value: number,
        min: number,
        max: number,
        fieldName: string): NumericValueObject {
        if (!Number.isInteger(value)) {
            throw new ValidationError(`${fieldName} must be an integer`, { value: value.toString() });
        }
        if (value < min || value > max) {
            throw new ValidationError(`${fieldName} must be between ${min} and ${max}`, { value: value.toString() });
        }
        return new NumericValueObject(value);
    }


    getValue(): number {
        return this.value;
    }

    equals(other: NumericValueObject): boolean {
        return this.getValue() === other.getValue();
    }

}