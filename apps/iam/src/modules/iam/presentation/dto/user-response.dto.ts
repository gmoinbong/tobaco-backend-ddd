import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ description: "User ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  id: string;

  @ApiProperty({ description: "Email", example: "test@example.com" })
  email: string;

  @ApiProperty({ description: "Username", example: "testuser" })
  username: string;

  @ApiProperty({ description: "Creation date" })
  createdAt: Date;

  @ApiProperty({ description: "Last update date" })
  updatedAt: Date;
}
