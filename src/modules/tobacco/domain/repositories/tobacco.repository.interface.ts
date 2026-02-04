import { Tobacco } from "../entities/tobacco.entity";
import { ExperienceLevel } from "../value-objects/experience-level.vo";

export interface ITobaccoRepository {

    findById(id: string): Promise<Tobacco | null>;

    findAll(limit: number, offset: number): Promise<Tobacco[]>;

    create(tobacco: Tobacco): Promise<Tobacco>;

    update(id: string, tobacco: Tobacco): Promise<Tobacco>;

    delete(id: string): Promise<void>;

    findSuitableFor(
        experienceLevel: ExperienceLevel,
        pageSize: number,
        page: number,
    ): Promise<Tobacco[]>;


}
