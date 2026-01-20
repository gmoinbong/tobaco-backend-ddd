import { TobaccoStrengthEvaluator } from "../../domain/services/tobacco-strength-evaluator";
import { ExperinceLevel } from "../../domain/value-objects/experience-level.vo";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";

export class EvaluateTobaccoStrengthUseCase {
    execute(command: {
        nicotine: NicotineContent,
        throatHit: ThroatHit,
        userExperience: ExperinceLevel
    }) {

        const result = TobaccoStrengthEvaluator.
            evaluate({
                nicotine: command.nicotine,
                throatHit: command.throatHit,
                userExperience: command.userExperience,
            })

        return {
            suitability: result,
        }
    }
}