import { Inject } from '@nestjs/common';
import { NotFoundError } from "@shared/core/domain/errors/not-found.error";
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';

export class GetTobaccoByIdUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        id: string
    }) {
        const tobacco = await this.tobaccoRepository.findById(command.id);

        if (!tobacco) {
            throw new NotFoundError('Tobacco not found');
        }

        return tobacco;
    }
}