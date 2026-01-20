import { Inject } from '@nestjs/common';
import { Tobacco } from "../../domain/entities/tobacco.entity";
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { NotFoundError } from "@shared/core/domain";
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';

export class UpdateTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        id: string,
        tobacco: Tobacco
    }) {
        const tobacco = await this.tobaccoRepository.update(command.id, command.tobacco);
        if (!tobacco) {
            throw new NotFoundError('Tobacco not found');
        }
        return tobacco;
    }
}