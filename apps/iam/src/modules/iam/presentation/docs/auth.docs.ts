import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto, LoginResponseDto } from "../dto/login-user.dto";

export class AuthDocs {
  static readonly login = () =>
    applyDecorators(
      ApiOperation({
        summary: "Login",
        description: "Authenticate user with email and password",
      }),
      ApiBody({ type: LoginDto }),
      ApiResponse({ status: 200, description: "Login successful", type: LoginResponseDto }),
      ApiResponse({ status: 401, description: "Invalid credentials" }),
      ApiResponse({ status: 404, description: "User not found" }),
    );
}
