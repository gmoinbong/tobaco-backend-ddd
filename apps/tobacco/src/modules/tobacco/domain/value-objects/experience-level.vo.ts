import { NumericValueObject } from "@shared/core/domain/value-objects/numeric-value-object.base";

export class ExperienceLevel extends NumericValueObject {
    private constructor(value: number) {
        super(value);
    }

    static create(value: number): ExperienceLevel {
        NumericValueObject.validateRange(value, 0, 100, 'Experience level');
        return new ExperienceLevel(value);
    }
}