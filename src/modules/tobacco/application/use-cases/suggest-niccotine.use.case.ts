import { ExperienceLevel } from "../../domain/value-objects/experience-level.vo";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";

export class SuggestNiccotineUseCase {
    execute(command: {
        nicotine: NicotineContent,
        userExperience: ExperienceLevel
    }) {
        const result = command.nicotine.getValue() * 0.6
            + command.userExperience.getValue() * 0.4

        return {
            nicotine: result,
        }
    }
}