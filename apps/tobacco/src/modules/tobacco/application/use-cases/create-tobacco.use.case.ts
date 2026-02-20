import { Inject } from '@nestjs/common';
import type { ITobaccoRepository } from '../../domain/repositories/tobacco.repository.interface';
import { Tobacco } from '../../domain/entities/tobacco.entity';
import { BadRequestError } from '@shared/core/domain/errors/bad-request.error';
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';
import { CreateTobaccoDto } from '../../presentation/dto';
import { NicotineContent } from '../../domain/value-objects/nicotine-content.vo';
import { ExperienceLevel } from '../../domain/value-objects/experience-level.vo';
import { ThroatHit } from '../../domain/value-objects/throat-hit.vo';

export class CreateTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        dto: CreateTobaccoDto
    }) {
        const tobacco = await this.tobaccoRepository.create(Tobacco.create({
            brand: command.dto.brand,
            model: command.dto.model,
            description: command.dto.description,
            nicotineContent: NicotineContent.create(command.dto.nicotineContent),
            throatHit: ThroatHit.create(command.dto.throatHit),
            requiredExperience: ExperienceLevel.create(command.dto.requiredExperience),
        }));

        if (!tobacco) {
            throw new BadRequestError('Failed to create tobacco');
        }

        return tobacco;
    }
}