import { Mapper } from "@shared/core/domain/mappers/mapper";
import { TobaccoEntity } from "../repositories/tobacco.repository";
import { Tobacco } from "../../domain/entities/tobacco.entity";
import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";

export class TobaccoMapper extends Mapper<Tobacco, TobaccoEntity> {
    toDomain(entity: { id: string; brand: string; model: string; description: string; nicotine_content: number; throat_hit: number; required_experience: number; created_at: Date; updated_at: Date; }): Tobacco {
        return Tobacco.reconstitute({
            id: entity.id,
            brand: entity.brand,
            model: entity.model,
            description: entity.description,
            nicotineContent: NicotineContent.create(entity.nicotine_content),
            throatHit: ThroatHit.create(entity.throat_hit),
            requiredExperience: ExperienceLevel.create(entity.required_experience),
            createdAt: entity.created_at,
            updatedAt: entity.updated_at,
        });
    }
    toEntity(domain: Tobacco): { id: string; brand: string; model: string; description: string; nicotine_content: number; throat_hit: number; required_experience: number; created_at: Date; updated_at: Date; } {
        throw new Error("Method not implemented.");
    }

}