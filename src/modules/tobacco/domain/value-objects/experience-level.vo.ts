//TODO: create additional base class for validation!
import { ValidationError } from "@shared/core/domain";

export class ExperinceLevel {
    private constructor(private readonly value: number) { }

    static create(value: number): ExperinceLevel {
        if (!Number.isInteger(value)) {
            throw new ValidationError('Experience level must be an integer');
        }

        if (value < 0 || value > 100) {
            throw new ValidationError('Experience level must be between 0 and 100');
        }

        return new ExperinceLevel(value);
    }

    getValue(): number {
        return this.value;
    }

    equals(other: ExperinceLevel): boolean {
        return this.value === other.value;
    }
}
