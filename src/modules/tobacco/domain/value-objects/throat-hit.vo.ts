import { ValidationError } from '@shared/core/domain';

export class ThroatHit {
    private constructor(private readonly value: number) { }

    static create(value: number): ThroatHit {
        if (!Number.isInteger(value)) {
            throw new ValidationError('Throat hit must be an integer');
        }

        if (value < 0 || value > 100) {
            throw new Error('Throat hit must be between 0 and 100');
        }
        return new ThroatHit(value);
    }

    getValue(): number {
        return this.value;
    }

    equals(other: ThroatHit): boolean {
        return this.value === other.value;
    }
}