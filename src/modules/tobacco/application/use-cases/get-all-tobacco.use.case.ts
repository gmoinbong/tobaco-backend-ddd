import { Inject } from '@nestjs/common';
import { NotFoundError } from "@shared/core/domain/errors/not-found.error";
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';

export class GetAllTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        limit: number,
        offset: number
    }) {
        const tobacco = await this.tobaccoRepository.findAll(command.limit, command.offset)
        if (!tobacco) {
            throw new NotFoundError('Tobacco not found');
        }
        return tobacco;
    }
}