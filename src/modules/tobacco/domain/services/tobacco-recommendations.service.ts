import { ExperienceLevel } from "../value-objects/experience-level.vo"
import { NicotineContent } from "../value-objects/nicotine-content.vo"
import { ThroatHit } from "../value-objects/throat-hit.vo"
import { TobaccoStrengthEvaluator, TobaccoSuitability } from "./tobacco-strength-evaluator"
import { Tobacco } from "../entities/tobacco.entity"

export interface TobaccoRecommendation {
    suggestedNicotine: number;
    calculatedThroatHit: number;
    suitability: TobaccoSuitability;
}

export class TobaccoRecommendationsService {
    suggestNiccotine(nicotine: NicotineContent, userExperience: ExperienceLevel): number {
        return nicotine.getValue() * 0.6 + userExperience.getValue() * 0.4
    }
    
    calculateThroatHit(nicotine: NicotineContent, throatHit: ThroatHit): number {
        return nicotine.getValue() * 0.6 + throatHit.getValue() * 0.4
    }

    recommend(tobacco: Tobacco): TobaccoRecommendation {
        return {
            suggestedNicotine: this.suggestNiccotine(tobacco.nicotineContent, tobacco.requiredExperience),
            calculatedThroatHit: this.calculateThroatHit(tobacco.nicotineContent, tobacco.throatHit),
            suitability: TobaccoStrengthEvaluator.evaluate({
                nicotine: tobacco.nicotineContent,
                throatHit: tobacco.throatHit,
                userExperience: tobacco.requiredExperience,
            }),
        }
    }
}