import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiQuery, ApiParam } from "@nestjs/swagger"
import { CreateTobaccoDto, TobaccoResponseDto, UpdateTobaccoDto } from "../dto"

export class Tobaco {
  static readonly tags = () => applyDecorators(
    ApiTags('Authentication'),
  );

  static readonly create = () => applyDecorators(
    ApiOperation({ summary: 'Create a new tobacco product', description: 'Creates a new tobacco product with the provided details' }),
    ApiBody({ type: CreateTobaccoDto, description: 'Tobacco product data' }),
    ApiResponse({ status: 201, description: 'Tobacco product created successfully', type: TobaccoResponseDto }),
    ApiResponse({ status: 400, description: 'Invalid input data' }))

  static readonly getAll = () => applyDecorators(
    ApiOperation({ summary: 'Get all tobacco products', description: 'Retrieves a list of all tobacco products with pagination' }),
    ApiResponse({ status: 200, description: 'List of tobacco products retrieved successfully', type: [TobaccoResponseDto] }),
  )

  static readonly getById = () => applyDecorators(
    ApiOperation({ summary: 'Get tobacco product by ID', description: 'Retrieves a specific tobacco product by its unique identifier' }),
    ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    ApiResponse({ status: 200, description: 'Tobacco product found', type: TobaccoResponseDto }),
    ApiResponse({ status: 404, description: 'Tobacco product not found' }),
  )

  static readonly updateById = () => applyDecorators(
    ApiOperation({ summary: 'Update tobacco product', description: 'Updates an existing tobacco product with new data' }),
    ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    ApiBody({ type: UpdateTobaccoDto, description: 'Updated tobacco product data' }),
    ApiResponse({ status: 200, description: 'Tobacco product updated successfully', type: TobaccoResponseDto }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Tobacco product not found' }),
  )

  static readonly delete = () => applyDecorators(
    ApiOperation({ summary: 'Delete tobacco product', description: 'Deletes a tobacco product by its unique identifier' }),
    ApiParam({ name: 'id', description: 'Tobacco product ID', example: '123e4567-e89b-12d3-a456-426614174000' }),
    ApiResponse({ status: 200, description: 'Tobacco product deleted successfully' }),
    ApiResponse({ status: 404, description: 'Tobacco product not found' }),
  )

  static readonly getSuitableFor = () => applyDecorators(
    ApiOperation({ summary: 'Get tobacco products suitable for a given experience level', description: 'Retrieves a list of tobacco products that are suitable for a given experience level' }),
    ApiParam({ name: 'experienceLevel', description: 'Experience level', example: 1, type: Number, }),
    ApiResponse({ status: 200, description: 'List of tobacco products suitable for the given experience level', type: [TobaccoResponseDto] }),
  )

  static readonly recommend = () => applyDecorators(
    ApiOperation({ summary: 'Recommend tobacco products', description: 'Recommends tobacco products based on the given parameters' }),
    ApiQuery({ name: 'experienceLevel', description: 'Experience level', example: 1, type: Number }),
    ApiQuery({ name: 'throatHit', description: 'Throat hit', example: 1, type: Number }),
    ApiQuery({ name: 'nicotineContent', description: 'Nicotine content', example: 1, type: Number }),
    ApiResponse({ status: 200, description: 'List of recommended tobacco products', type: [TobaccoResponseDto] }),
  )
}



export const docs = {
  tobaco: Tobaco,
}