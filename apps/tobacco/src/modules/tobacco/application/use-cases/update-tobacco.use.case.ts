import { Inject } from '@nestjs/common';
import { Tobacco } from "../../domain/entities/tobacco.entity";
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { NotFoundError } from "@shared/core/domain";
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';
import { UpdateTobaccoDto } from '../../presentation/dto';
import { NicotineContent } from '../../domain/value-objects/nicotine-content.vo';
import { ThroatHit } from '../../domain/value-objects/throat-hit.vo';
import { ExperienceLevel } from '../../domain/value-objects/experience-level.vo';

export class UpdateTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        id: string,
        dto: UpdateTobaccoDto
    }) {
        const tobacco = await this.tobaccoRepository.update(command.id,
            Tobacco.reconstitute({
                id: command.id,
                brand: command.dto.brand,
                model: command.dto.model,
                description: command.dto.description,
                nicotineContent: NicotineContent.create(command.dto.nicotineContent),
                throatHit: ThroatHit.create(command.dto.throatHit),
                requiredExperience: ExperienceLevel.create(command.dto.requiredExperience),
                updatedAt: new Date(),
            })
        );
        if (!tobacco) {
            throw new NotFoundError('Tobacco not found');
        }
        return tobacco;
    }
}