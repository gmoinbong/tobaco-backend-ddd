import { Inject } from '@nestjs/common';
import type { ITobaccoRepository } from '../../domain/repositories/tobacco.repository.interface';
import { Tobacco } from '../../domain/entities/tobacco.entity';
import { BadRequestError } from '@shared/core/domain/errors/bad-request.error';
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';

export class CreateTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        tobacco: Tobacco
    }) {
        const tobacco = await this.tobaccoRepository.create(command.tobacco);

        if (!tobacco) {
            throw new BadRequestError('Failed to create tobacco');
        }

        return tobacco;
    }
}