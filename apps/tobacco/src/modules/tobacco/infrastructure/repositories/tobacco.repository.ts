import { Inject } from '@nestjs/common';
import type { Database } from "@shared/core/infrastructure/database/database.types";
import { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { Tobacco } from "../../domain/entities/tobacco.entity";
import { tobaccoTable } from "@shared/core/infrastructure/database/schema";
import { and, desc, eq, lte } from "drizzle-orm";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";
import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo";
import { SHARED_DI_TOKENS } from "@shared/core/infrastructure/database/constants/tokens";
import { InternalServerError, NotFoundError } from '@shared/core/domain';

export type TobaccoEntity = typeof tobaccoTable.$inferSelect;

export class TobaccoRepository implements ITobaccoRepository {
    constructor(
        @Inject(SHARED_DI_TOKENS.DATABASE_CLIENT)
        private readonly db: Database
    ) { }

    private mapRowToTobacco(row: any): Tobacco {
        return Tobacco.reconstitute({
            id: row.id,
            brand: row.brand,
            model: row.model,
            description: row.description,
            nicotineContent: NicotineContent.create(row.nicotine_content),
            throatHit: ThroatHit.create(row.throat_hit),
            requiredExperience: ExperienceLevel.create(row.required_experience),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    }

    async findById(id: string): Promise<Tobacco | null> {
        const result = await this.db.select()
            .from(tobaccoTable).where(eq(tobaccoTable.id, id))
            .limit(1);

        if (result.length === 0) {
            return null
        }

        const row = result[0];
        return this.mapRowToTobacco(row);
    }

    async create(tobacco: Tobacco): Promise<Tobacco> {
        const [inserted] = await this.db
            .insert(tobaccoTable)
            .values({
                brand: tobacco.brand,
                model: tobacco.model,
                description: tobacco.description,
                nicotine_content: tobacco.nicotineContent.getValue(),
                throat_hit: tobacco.throatHit.getValue(),
                required_experience: tobacco.requiredExperience.getValue(),
                created_at: tobacco.createdAt,
                updated_at: tobacco.updatedAt,
            }).returning();

        if (!inserted) {
            throw new InternalServerError('Failed to create tobacco');
        }

        return this.mapRowToTobacco(inserted[0]);
    }

    async update(id: string, tobacco: Tobacco): Promise<Tobacco> {
        const [updated] = await this.db.update(tobaccoTable).set({
            brand: tobacco.brand,
            model: tobacco.model,
            description: tobacco.description,
            nicotine_content: tobacco.nicotineContent.getValue(),
            throat_hit: tobacco.throatHit.getValue(),
            required_experience: tobacco.requiredExperience.getValue(),
            updated_at: tobacco.updatedAt,
        }).where(eq(tobaccoTable.id, id)).returning();

        if (!updated) {
            throw new NotFoundError('Tobacco not found');
        }

        return this.mapRowToTobacco(updated[0]);
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(tobaccoTable).where(eq(tobaccoTable.id, id));
    }

    async findAll(limit: number, offset: number): Promise<Tobacco[]> {
        const result = await this.db.select()
            .from(tobaccoTable)
            .limit(limit)
            .offset(offset);

        return result.map((row) => this.mapRowToTobacco(row));
    }


    async findSuitableFor(experienceLevel: ExperienceLevel, page: number, pageSize: number): Promise<Tobacco[]> {
        const result = await this.db.select()
            .from(tobaccoTable)
            .where(lte(tobaccoTable.required_experience, experienceLevel.getValue()))
            .orderBy(desc(tobaccoTable.required_experience))
            .limit(pageSize)
            .offset((page - 1) * pageSize);


        return result.map((row) => this.mapRowToTobacco(row))
    }

    async recommend(experienceLevel: ExperienceLevel, throatHit: ThroatHit, nicotineContent: NicotineContent,
        page: number, pageSize: number): Promise<Tobacco[]> {
        const result = await this.db.select()
            .from(tobaccoTable)
            .where(and(
                lte(tobaccoTable.throat_hit, throatHit.getValue()),
                lte(tobaccoTable.nicotine_content, nicotineContent.getValue()),
                lte(tobaccoTable.required_experience, experienceLevel.getValue()),
            ))
            .orderBy(desc(tobaccoTable.throat_hit))
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        return result.map((row) => this.mapRowToTobacco(row));
    }
}