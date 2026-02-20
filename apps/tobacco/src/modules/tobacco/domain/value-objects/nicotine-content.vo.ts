import { NumericValueObject } from "@shared/core/domain/value-objects/numeric-value-object.base";

export class NicotineContent extends NumericValueObject {
    private constructor(value: number) {
        super(value);
    }

    static create(value: number): NicotineContent {
        NumericValueObject.validateRange(value, 0, 100, 'Nicotine content');
        return new NicotineContent(value);
    }
}