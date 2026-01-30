import { NumericValueObject } from '@shared/core/domain/value-objects/numeric-value-object.base';

export class ThroatHit extends NumericValueObject {
    private constructor(value: number) {
        super(value);
    }

    static create(value: number): ThroatHit {
        NumericValueObject.validateRange(value, 0, 100, 'Throat hit');
        return new ThroatHit(value)
    }
}