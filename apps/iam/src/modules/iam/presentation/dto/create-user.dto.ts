import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ description: 'Email', example: 'test@example.com' })
    email: string;

    @ApiProperty({ description: 'Username', example: 'testuser' })
    username: string;

    @ApiProperty({ description: 'Password', example: 'password' })
    password: string;
}
