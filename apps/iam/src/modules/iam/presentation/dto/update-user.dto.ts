import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ description: "Email", example: "test@example.com", required: false })
  email?: string;

  @ApiProperty({ description: "Username", example: "testuser", required: false })
  username?: string;

  @ApiProperty({ description: "Password", example: "newpassword", required: false })
  password?: string;
}
