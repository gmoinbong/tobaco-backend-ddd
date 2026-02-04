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
        public readonly _brand: string,
        public readonly _model: string,
        public readonly _description: string,
        public readonly _nicotineContent: NicotineContent,
        public readonly _throatHit: ThroatHit,
        public readonly _requiredExperience: ExperienceLevel,
        public readonly _createdAt: Date,
        public readonly _updatedAt: Date,
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
    getBrand(): string { return this._brand; }
    getModel(): string { return this._model; }
    getDescription(): string { return this._description; }
    getNicotineContent(): NicotineContent { return this._nicotineContent; }
    getThroatHit(): ThroatHit { return this._throatHit; }
    getRequiredExperience(): ExperienceLevel { return this._requiredExperience; }
    getCreatedAt(): Date { return this._createdAt; }
    getUpdatedAt(): Date { return this._updatedAt; }

    getStrength(): number {
        return this._nicotineContent.getValue() * 0.6 + this._throatHit.getValue() * 0.4
    }

    compareStrength(other: Tobacco): number {
        return this.getStrength() - other.getStrength()
    }

    isSuitableFor(exprinceLevel: ExperienceLevel): boolean {
        return exprinceLevel.getValue() >= this._requiredExperience.getValue()
    }


    toProps(): TobaccoProps {
        return {
            id: this._id,
            brand: this._brand,
            model: this._model,
            description: this._description,
            nicotineContent: this._nicotineContent,
            throatHit: this._throatHit,
            requiredExperience: this._requiredExperience,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}


