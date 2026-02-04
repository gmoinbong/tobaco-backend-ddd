import { Inject } from "@nestjs/common"
import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface"
import { TOBACCO_DI_TOKENS } from "../../tobacco.tokens"
import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo"

export class FindSuitableForUseCase {
    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository
    ) { }

    async execute(command: {
        experienceLevel: number
        pageSize: number
        page: number
    }) {
        const experienceLevel = ExperienceLevel.create(command.experienceLevel);
        return await this.tobaccoRepository.findSuitableFor(experienceLevel, command.page, command.pageSize)
    }
}
