import { ApiProperty } from '@nestjs/swagger';

export class TobaccoResponseDto {
    @ApiProperty({ description: 'Tobacco ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Brand name', example: 'Camel' })
    brand: string;

    @ApiProperty({ description: 'Model name', example: 'Blue' })
    model: string;

    @ApiProperty({ description: 'Product description', example: 'Smooth and mild tobacco blend' })
    description: string;

    @ApiProperty({ description: 'Nicotine content (0-100)', example: 12 })
    nicotineContent: number;

    @ApiProperty({ description: 'Throat hit intensity (0-100)', example: 8 })
    throatHit: number;

    @ApiProperty({ description: 'Required experience level (0-100)', example: 5 })
    requiredExperience: number;

    @ApiProperty({ description: 'Creation date', example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update date', example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date;
}
