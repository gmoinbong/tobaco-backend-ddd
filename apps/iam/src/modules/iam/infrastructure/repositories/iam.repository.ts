import type { Database } from "@shared/core/infrastructure/database/database.types";
import { IIAMRepository } from "../../domain/repositories/iam.repository.interface";
import { SHARED_DI_TOKENS } from "@shared/core/infrastructure/database/constants/tokens";
import { Inject } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { usersTable } from "@shared/core/infrastructure/database/schema/users.schema";
import { eq } from "drizzle-orm";
import { BadRequestError } from "@shared/index";

export class IAMRepository implements IIAMRepository {
    constructor(
        @Inject(SHARED_DI_TOKENS.DATABASE_CLIENT)
        private readonly db: Database
    ) { }

    async createUser(user: User): Promise<User> {
        const [inserted] = await this.db
            .insert(usersTable)
            .values({
                email: user.email,
                username: user.username,
                password: user.password,
            })
            .returning();

        if (!inserted) {
            throw new Error("Failed to create user");
        }

        return User.reconstitute({
            id: inserted.id,
            email: inserted.email,
            username: inserted.username,
            password: inserted.password,
            createdAt: inserted.created_at,
            updatedAt: inserted.updated_at,
        });
    }

    async getUserById(id: string): Promise<User | null> {
        const [user] = await this.db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
        return user
            ? User.reconstitute({
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
            })
            : null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const [user] = await this.db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));
        return user
            ? User.reconstitute({
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
            })
            : null;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const [updated] = await this.db
            .update(usersTable)
            .set({
                email: user.email,
                username: user.username,
                password: user.password,
                updated_at: new Date(),
            })
            .where(eq(usersTable.id, id))
            .returning();

        if (!updated) {
            throw new BadRequestError("User not found");
        }

        return User.reconstitute({
            id: updated.id,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            createdAt: updated.created_at,
            updatedAt: updated.updated_at,
        });
    }

    async deleteUser(id: string): Promise<void> {
        await this.db.delete(usersTable).where(eq(usersTable.id, id));
    }
}
