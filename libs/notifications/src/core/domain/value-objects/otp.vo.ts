import { randomInt } from "crypto";

export class Otp {
    private constructor(private readonly value: string) { }
    static create(): Otp {
        const value = randomInt(100000, 999999).toString();
        return new Otp(value);
    }

    getValue(): string {
        return this.value;
    }

}