import { Module } from '@nestjs/common';
import { TobaccoController } from './presentation/controllers/tobacco.controller';
import * as UseCases from './application/use-cases';
import { TobaccoRepository } from './infrastructure/repositories/tobacco.repository';
import { TOBACCO_DI_TOKENS } from './tobacco.tokens';

@Module({
    controllers: [TobaccoController],
    providers: [
        ...Object.values(UseCases),
        {
            provide: TOBACCO_DI_TOKENS.TOBACCO_REPOSITORY,
            useClass: TobaccoRepository,
        },
    ],
})
export class TobaccoModule { }