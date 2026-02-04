import { ExperienceLevel } from "../value-objects/experience-level.vo";
import { NicotineContent } from "../value-objects/nicotine-content.vo";
import { ThroatHit } from "../value-objects/throat-hit.vo";

export enum TobaccoSuitability {
    LIGHT = 'light',
    MEDIUM = 'medium',
    STRONG = 'strong',
    EXTRA_STRONG = 'extra_strong',
}

export class TobaccoStrengthEvaluator {
    static evaluate(params:
        {
            nicotine: NicotineContent,
            throatHit: ThroatHit,
            userExperience: ExperienceLevel
        }): TobaccoSuitability {

        const experince = params.userExperience.getValue()

        const strength = params.nicotine.getValue() * 0.6
            + params.throatHit.getValue() * 0.4

        if (strength > experince + 40) {
            return TobaccoSuitability.EXTRA_STRONG
        }

        if (strength > experince + 20) {
            return TobaccoSuitability.STRONG
        }

        if (strength > experince - 20) {
            return TobaccoSuitability.LIGHT
        }

        return TobaccoSuitability.MEDIUM
    }
}