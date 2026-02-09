import { uuidv4 } from "zod";
import { ExperienceLevel } from "../value-objects/experience-level.vo";
import { NicotineContent } from "../value-objects/nicotine-content.vo";
import { ThroatHit } from "../value-objects/throat-hit.vo";

export interface TobaccoProps {
    id: string;
    brand: string;
    model: string;
    description: string;
    nicotineContent: NicotineContent;
    throatHit: ThroatHit;
    requiredExperience: ExperienceLevel;
    createdAt: Date;
    updatedAt: Date;
}

export class Tobacco {
    private constructor(
        public readonly _id: string,
        public readonly brand: string,
        public readonly model: string,
        public readonly description: string,
        public readonly nicotineContent: NicotineContent,
        public readonly throatHit: ThroatHit,
        public readonly requiredExperience: ExperienceLevel,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static create(props: Omit<TobaccoProps, 'id' | 'createdAt' | 'updatedAt'>): Tobacco {

        if (!props.brand || !props.model) {
            throw new Error('Brand and model are required');
        }

        const id = uuidv4().toString();
        const now = new Date();

        return new Tobacco(
            id,
            props.brand,
            props.model,
            props.description,
            props.nicotineContent,
            props.throatHit,
            props.requiredExperience,
            now,
            now,
        );
    }

    static reconstitute(props: TobaccoProps): Tobacco {
        return new Tobacco(
            props.id,
            props.brand,
            props.model,
            props.description,
            props.nicotineContent,
            props.throatHit,
            props.requiredExperience,
            props.createdAt,
            props.updatedAt,
        );
    }

    //getters

    getId(): string { return this._id; }
    getBrand(): string { return this.brand; }
    getModel(): string { return this.model; }
    getDescription(): string { return this.description; }
    getNicotineContent(): NicotineContent { return this.nicotineContent; }
    getThroatHit(): ThroatHit { return this.throatHit; }
    getRequiredExperience(): ExperienceLevel { return this.requiredExperience; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }

    getStrength(): number {
        return this.nicotineContent.getValue() * 0.6 + this.throatHit.getValue() * 0.4
    }

    compareStrength(other: Tobacco): number {
        return this.getStrength() - other.getStrength()
    }

    isSuitableFor(exprinceLevel: ExperienceLevel): boolean {
        return exprinceLevel.getValue() >= this.requiredExperience.getValue()
    }


    toProps(): TobaccoProps {
        return {
            id: this._id,
            brand: this.brand,
            model: this.model,
            description: this.description,
            nicotineContent: this.nicotineContent,
            throatHit: this.throatHit,
            requiredExperience: this.requiredExperience,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}


