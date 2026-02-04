import { Inject } from '@nestjs/common';
import type { Database } from "@shared/core/infrastructure/database/database.types";
import { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { Tobacco } from "../../domain/entities/tobacco.entity";
import { tobaccoTable } from "@shared/core/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";
import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo";
import { SHARED_DI_TOKENS } from "@shared/core/infrastructure/database/constants/tokens";

export class TobaccoRepository implements ITobaccoRepository {
    constructor(
        @Inject(SHARED_DI_TOKENS.DATABASE_CLIENT)
        private readonly db: Database
    ) { }

    async findById(id: string): Promise<Tobacco | null> {
        const result = await this.db.select({
            id: tobaccoTable.id,
            brand: tobaccoTable.brand,
            model: tobaccoTable.model,
            description: tobaccoTable.description,
            nicotine_content: tobaccoTable.nicotine_content,
            throat_hit: tobaccoTable.throat_hit,
            required_experience: tobaccoTable.required_experience,
            created_at: tobaccoTable.created_at,
            updated_at: tobaccoTable.updated_at,
        }).from(tobaccoTable).where(eq(tobaccoTable.id, id))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        const row = result[0];
        return Tobacco.create({
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

    async create(tobacco: Tobacco): Promise<Tobacco> {
        const [inserted] = await this.db.insert(tobaccoTable).values({
            brand: tobacco.brand,
            model: tobacco.model,
            description: tobacco.description,
            nicotine_content: tobacco.nicotineContent.getValue(),
            throat_hit: tobacco.throatHit.getValue(),
            required_experience: tobacco.requiredExperience.getValue(),
            created_at: tobacco.createdAt,
            updated_at: tobacco.updatedAt,
        }).returning();

        return Tobacco.create(
            {
                id: inserted.id,
                brand: inserted.brand,
                model: inserted.model,
                description: inserted.description,
                nicotineContent: NicotineContent.create(inserted.nicotine_content),
                throatHit: ThroatHit.create(inserted.throat_hit),
                requiredExperience: ExperienceLevel.create(inserted.required_experience),
                createdAt: inserted.created_at,
                updatedAt: inserted.updated_at,
            }
        );
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(tobaccoTable).where(eq(tobaccoTable.id, id));
    }

    async findAll(limit: number, offset: number): Promise<Tobacco[]> {
        const result = await this.db.select({
            id: tobaccoTable.id,
            brand: tobaccoTable.brand,
            model: tobaccoTable.model,
            description: tobaccoTable.description,
            nicotine_content: tobaccoTable.nicotine_content,
            throat_hit: tobaccoTable.throat_hit,
            required_experience: tobaccoTable.required_experience,
            created_at: tobaccoTable.created_at,
            updated_at: tobaccoTable.updated_at,
        }).from(tobaccoTable).limit(limit).offset(offset);

        return result.map((row) => Tobacco.create({
            id: row.id,
            brand: row.brand,
            model: row.model,
            description: row.description,
            nicotineContent: NicotineContent.create(row.nicotine_content),
            throatHit: ThroatHit.create(row.throat_hit),
            requiredExperience: ExperienceLevel.create(row.required_experience),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
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

        return Tobacco.create({
            id: updated.id,
            brand: updated.brand,
            model: updated.model,
            description: updated.description,
            nicotineContent: NicotineContent.create(updated.nicotine_content),
            throatHit: ThroatHit.create(updated.throat_hit),
            requiredExperience: ExperienceLevel.create(updated.required_experience),
            createdAt: updated.created_at,
            updatedAt: updated.updated_at,
        });
    }
}