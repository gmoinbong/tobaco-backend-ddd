//Remove repository logic to repository from controller 
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { CreateTobaccoUseCase } from "../../application/use-cases/create-tobacco.use.case";
import { DeleteTobaccoUseCase } from "../../application/use-cases/delete.tobacco.use.case";
import { GetAllTobaccoUseCase } from "../../application/use-cases/get-all-tobacco.use.case";
import { GetTobaccoByIdUseCase } from "../../application/use-cases/get-tobacco-by-id.use.case";
import { UpdateTobaccoUseCase } from "../../application/use-cases/update-tobacco.use.case";
import { Tobacco } from "../../domain/entities/tobacco.entity";
import { NicotineContent } from "../../domain/value-objects/nicotine-content.vo";
import { ThroatHit } from "../../domain/value-objects/throat-hit.vo";
import { ExperinceLevel } from "../../domain/value-objects/experience-level.vo";
import { v4 as uuidv4 } from 'uuid';
import { CreateTobaccoDto, UpdateTobaccoDto, TobaccoResponseDto } from "../dto";

@ApiTags('Tobacco')
@Controller('tobacco')
export class TobaccoController {
    constructor(
        private readonly createTobaccoUseCase: CreateTobaccoUseCase,
        private readonly getTobaccoByIdUseCase: GetTobaccoByIdUseCase,
        private readonly getAllTobaccoUseCase: GetAllTobaccoUseCase,
        private readonly updateTobaccoUseCase: UpdateTobaccoUseCase,
        private readonly deleteTobaccoUseCase: DeleteTobaccoUseCase
    ) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new tobacco product', description: 'Creates a new tobacco product with the provided details' })
    @ApiBody({ type: CreateTobaccoDto, description: 'Tobacco product data' })
    @ApiResponse({ status: 201, description: 'Tobacco product created successfully', type: TobaccoResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async createTobacco(@Body() dto: CreateTobaccoDto) {
        const tobacco = Tobacco.create({
            id: uuidv4(),
            brand: dto.brand,
            model: dto.model,
            description: dto.description,
            nicotineContent: NicotineContent.create(dto.nicotineContent),
            throatHit: ThroatHit.create(dto.throatHit),
            requiredExperience: ExperinceLevel.create(dto.requiredExperience),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await this.createTobaccoUseCase.execute({
            tobacco,
        })

        return result
    }

    @Get('')
    @ApiOperation({ summary: 'Get all tobacco products', description: 'Retrieves a list of all tobacco products with pagination' })
    @ApiResponse({ status: 200, description: 'List of tobacco products retrieved successfully', type: [TobaccoResponseDto] })
    async getAllTobacco() {
        return await this.getAllTobaccoUseCase.execute({
            limit: 10,
            offset: 0,
        })
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tobacco product by ID', description: 'Retrieves a specific tobacco product by its unique identifier' })
    @ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @ApiResponse({ status: 200, description: 'Tobacco product found', type: TobaccoResponseDto })
    @ApiResponse({ status: 404, description: 'Tobacco product not found' })
    async getTobaccoById(@Param('id') id: string) {
        return await this.getTobaccoByIdUseCase.execute({
            id,
        })
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update tobacco product', description: 'Updates an existing tobacco product with new data' })
    @ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @ApiBody({ type: UpdateTobaccoDto, description: 'Updated tobacco product data' })
    @ApiResponse({ status: 200, description: 'Tobacco product updated successfully', type: TobaccoResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Tobacco product not found' })
    async updateTobacco(@Param('id') id: string, @Body() dto: UpdateTobaccoDto) {
        const tobacco = await this.updateTobaccoUseCase.execute({
            id,
            tobacco: Tobacco.create({
                id,
                brand: dto.brand,
                model: dto.model,
                description: dto.description,
                nicotineContent: NicotineContent.create(dto.nicotineContent),
                throatHit: ThroatHit.create(dto.throatHit),
                requiredExperience: ExperinceLevel.create(dto.requiredExperience),
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        });
        return tobacco;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tobacco product', description: 'Deletes a tobacco product by its unique identifier' })
    @ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @ApiResponse({ status: 200, description: 'Tobacco product deleted successfully' })
    @ApiResponse({ status: 404, description: 'Tobacco product not found' })
    async deleteTobacco(@Param('id') id: string) {
        return await this.deleteTobaccoUseCase.execute({
            id,
        })
    }
}
