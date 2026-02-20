import { ApiProperty } from '@nestjs/swagger';
// import { z } from '@anatine/zod-nestjs'

// export tobbacoSchema = z.object({

// })



// const createTobaccoSchema = tobbacoSchema.pick()

export class CreateTobaccoDto {
    @ApiProperty({ description: 'Brand name', example: 'Camel' })
    brand: string;

    @ApiProperty({ description: 'Model name', example: 'Blue' })
    model: string;

    @ApiProperty({ description: 'Product description', example: 'Smooth and mild tobacco blend' })
    description: string;

    @ApiProperty({ description: 'Nicotine content (0-100)', example: 12, minimum: 0, maximum: 100 })
    nicotineContent: number;

    @ApiProperty({ description: 'Throat hit intensity (0-100)', example: 8, minimum: 0, maximum: 100 })
    throatHit: number;

    @ApiProperty({ description: 'Required experience level (0-100)', example: 5, minimum: 0, maximum: 100 })
    requiredExperience: number;
}
