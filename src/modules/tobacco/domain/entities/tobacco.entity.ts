import { NicotineContent } from "../value-objects/nicotine-content.vo";
import { ThroatHit } from "../value-objects/throat-hit.vo";
import { ExperinceLevel } from "../value-objects/experience-level.vo";

export interface TobaccoProps {
    id: string;
    brand: string;
    model: string;
    description: string;
    nicotineContent: NicotineContent;
    throatHit: ThroatHit;
    requiredExperience: ExperinceLevel;
    createdAt: Date;
    updatedAt: Date;
}

export class Tobacco {
    private constructor(
        public readonly id: string,
        public readonly brand: string,
        public readonly model: string,
        public readonly description: string,
        public readonly nicotineContent: NicotineContent,
        public readonly throatHit: ThroatHit,
        public readonly requiredExperience: ExperinceLevel,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static create(props: TobaccoProps): Tobacco {
        return new Tobacco(
            props.id,
            props.brand,
            props.model,
            props.description,
            props.nicotineContent,
            props.throatHit,
            props.requiredExperience,
            props.createdAt ?? new Date(),
            props.updatedAt ?? new Date(),
        );
    }


}
