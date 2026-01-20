import { Tobacco } from "../entities/tobacco.entity";

export interface ITobaccoRepository {

    findById(id: string): Promise<Tobacco | null>;

    findAll(limit: number, offset: number): Promise<Tobacco[]>;

    create(tobacco: Tobacco): Promise<Tobacco>;

    update(id: string, tobacco: Tobacco): Promise<Tobacco>;

    delete(id: string): Promise<void>;
}
