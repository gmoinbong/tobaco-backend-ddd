import { Inject } from '@nestjs/common';
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { TOBACCO_DI_TOKENS } from '../../tobacco.tokens';

export class DeleteTobaccoUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        id: string
    }) {

        await this.tobaccoRepository.delete(command.id);
    }
}