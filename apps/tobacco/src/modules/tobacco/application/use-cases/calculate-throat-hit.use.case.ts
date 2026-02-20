import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo"
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo"

export class CalculateThroatHitUseCase {
    execute(command: {
        nicotine: NicotineContent,
        throatHit: ThroatHit,
    }) {
        const result = command.nicotine.getValue() * 0.6
            + command.throatHit.getValue() * 0.4

        return {
            throatHit: result,
        }
    }
}