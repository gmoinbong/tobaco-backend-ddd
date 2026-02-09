import type { ITobaccoRepository } from "../../domain/repositories/tobacco.repository.interface";
import { Inject } from "@nestjs/common";
import { TOBACCO_DI_TOKENS } from "../../tobacco.tokens";
import { Tobacco } from "../../domain/entities/tobacco.entity";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";
import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo";
import { CalculateThroatHitUseCase } from "../use-cases/calculate-throat-hit.use.case";

interface RecommendTobaccoCommand {
    experienceLevel: number;
    throatHit: number;
    nicotineContent: number;
    page: number;
    pageSize: number;
}

export class RecommendTobaccoFacade {

    constructor(
        @Inject(TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY)
        private readonly tobaccoRepository: ITobaccoRepository,
        private readonly calculateThroatHitUseCase: CalculateThroatHitUseCase
    ) { }

    async execute(command: RecommendTobaccoCommand): Promise<Tobacco[]> {
        const throatHit = this.calculateThroatHitUseCase.execute({
            nicotine: NicotineContent.create(command.nicotineContent),
            throatHit: ThroatHit.create(command.throatHit),
        });

        const experienceLevel = ExperienceLevel.create(command.experienceLevel);
        const nicotineContent = NicotineContent.create(command.nicotineContent);

        const tobacco = await this.tobaccoRepository.recommend(
            experienceLevel,
            ThroatHit.create(Math.floor(throatHit.throatHit)),
            nicotineContent,
            command.page,
            command.pageSize,
        );

        return tobacco;
    }

}