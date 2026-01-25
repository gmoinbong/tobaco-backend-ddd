//TODO: Create fabric or facade
//Create transactions and reupload to service
import { ExperinceLevel } from "../../domain/value-objects/experience-level.vo";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";
import { SuggestNiccotineUseCase } from "../use-cases/suggest-niccotine.use.case";
import { EvaluateTobaccoStrengthUseCase } from "../use-cases/evaluate-tobacco-strength.use-case";
import { CalculateThroatHitUseCase } from "../use-cases/calculate-throat-hit.use.case";

export class RecommendTobaccoOrchestrator {
    constructor(
        private readonly suggestNiccotineUseCase: SuggestNiccotineUseCase,
        private readonly calculateThroatHitUseCase: CalculateThroatHitUseCase,
        private readonly evaluateTobaccoStrengthUseCase: EvaluateTobaccoStrengthUseCase,
    ) { }

    execute(command: {
        nicotine: NicotineContent,
        throatHit: ThroatHit,
        userExperience: ExperinceLevel
    }) {
        const suggestedNicotine = this.suggestNiccotineUseCase.execute(
            {
                nicotine: command.nicotine,
                userExperience: command.userExperience
            }
        );
        const calculatedThroatHit = this.calculateThroatHitUseCase.execute(
            {
                nicotine: command.nicotine,
                throatHit: command.throatHit
            }
        );
        const strengthResult = this.evaluateTobaccoStrengthUseCase.execute(
            {
                nicotine: command.nicotine,
                throatHit: command.throatHit,
                userExperience: command.userExperience
            }
        );

        return {
            suggestedNicotine: suggestedNicotine.nicotine,
            calculatedThroatHit: calculatedThroatHit.throatHit,
            tobbacoSuitability: strengthResult.suitability
        }
    }


}
