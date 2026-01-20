import { ValidationError } from "@shared/core/domain";

export class NicotineContent {
    private constructor(private readonly value: number) { }

    static create(value: number): NicotineContent {
        if (!Number.isInteger(value)) {
            throw new ValidationError('Nicotine content must be an integer');
        }

        if (value < 0 || value > 100) {
            throw new ValidationError('Nicotine content must be between 0 and 100');
        }

        return new NicotineContent(value);
    }

    getValue(): number {
        return this.value
    }

    equals(other: NicotineContent): boolean {
        return this.value === other.value
    }
}