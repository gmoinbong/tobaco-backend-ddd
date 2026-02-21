import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: "Email", example: "test@example.com" })
  email: string;

  @ApiProperty({ description: "Password", example: "password" })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: "Username", example: "testuser" })
  username: string;

  @ApiProperty({ description: "Email", example: "test@example.com" })
  email: string;
}
