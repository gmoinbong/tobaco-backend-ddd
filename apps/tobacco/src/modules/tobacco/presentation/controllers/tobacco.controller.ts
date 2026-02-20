import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTobaccoUseCase } from "../../application/use-cases/create-tobacco.use.case";
import { DeleteTobaccoUseCase } from "../../application/use-cases/delete.tobacco.use.case";
import { GetAllTobaccoUseCase } from "../../application/use-cases/get-all-tobacco.use.case";
import { GetTobaccoByIdUseCase } from "../../application/use-cases/get-tobacco-by-id.use.case";
import { UpdateTobaccoUseCase } from "../../application/use-cases/update-tobacco.use.case";
import { FindSuitableForUseCase } from "../../application/use-cases/find-suitable-for.use.case";
import { RecommendTobaccoFacade } from "../../application/facades/recommend-tobacco.facade";
import { CreateTobaccoDto, UpdateTobaccoDto, } from "../dto";
import { docs } from "../docs/tobacco";

@ApiTags('Tobacco')
@Controller('tobacco')
export class TobaccoController {
    constructor(
        private readonly createTobaccoUseCase: CreateTobaccoUseCase,
        private readonly getTobaccoByIdUseCase: GetTobaccoByIdUseCase,
        private readonly getAllTobaccoUseCase: GetAllTobaccoUseCase,
        private readonly updateTobaccoUseCase: UpdateTobaccoUseCase,
        private readonly deleteTobaccoUseCase: DeleteTobaccoUseCase,
        private readonly getTobaccoSuitableForUseCase: FindSuitableForUseCase,
        private readonly recommendTobaccoFacade: RecommendTobaccoFacade,
    ) { }

    @Post('create')
    @docs.tobaco.create()
    async createTobacco(@Body() dto: CreateTobaccoDto) {
        return await this.createTobaccoUseCase.execute({ dto })
    }

    @Get('')
    @docs.tobaco.getAll()
    async getAllTobacco() {
        return await this.getAllTobaccoUseCase.execute({
            limit: 10,
            offset: 0,
        })
    }


    @Get('recommend')
    @docs.tobaco.recommend()
    async recommendTobacco(@Query('experienceLevel', ParseIntPipe) experienceLevel: number,
        @Query('throatHit', ParseIntPipe) throatHit: number,
        @Query('nicotineContent', ParseIntPipe) nicotineContent: number) {
        return await this.recommendTobaccoFacade.execute({
            experienceLevel,
            throatHit,
            nicotineContent,
            page: 1,
            pageSize: 10,
        });
    }

    @Get(':id')
    @docs.tobaco.getById()
    async getTobaccoById(@Param('id') id: string) {
        return await this.getTobaccoByIdUseCase.execute({
            id,
        })
    }

    @Put(':id')
    @docs.tobaco.updateById()
    async updateTobacco(@Param('id') id: string, @Body() dto: UpdateTobaccoDto) {
        const tobacco = await this.updateTobaccoUseCase.execute({
            id,
            dto
        });
        return tobacco;
    }

    @Delete(':id')
    @docs.tobaco.delete()
    async deleteTobacco(@Param('id') id: string) {
        return await this.deleteTobaccoUseCase.execute({
            id,
        })
    }

    @Get('suitable-for/:experienceLevel')
    @docs.tobaco.getSuitableFor()
    async getTobaccoSuitableFor(@Param('experienceLevel', ParseIntPipe) experienceLevel: number) {
        return await this.getTobaccoSuitableForUseCase.execute({
            experienceLevel,
            pageSize: 10,
            page: 1,
        })
    }

}
