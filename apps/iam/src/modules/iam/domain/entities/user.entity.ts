import { uuidv4 } from "zod";
import * as bcrypt from 'bcrypt';

export interface UserProps {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly username: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>): User {

        if (!props.email || !props.username || !props.password) {
            throw new Error('Email, username and password are required');
        }

        const id = uuidv4().toString();
        const now = new Date();

        return new User(
            id,
            props.email,
            props.username,
            props.password,
            now,
            now,
        );
    }


    static reconstitute(props: UserProps): User {
        return new User(
            props.id,
            props.email,
            props.username,
            props.password,
            props.createdAt || new Date(),
            props.updatedAt,
        );
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
