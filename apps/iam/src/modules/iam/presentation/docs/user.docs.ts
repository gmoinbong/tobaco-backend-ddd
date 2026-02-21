import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";

export class UserDocs {
  static readonly create = () =>
    applyDecorators(
      ApiOperation({
        summary: "Create user",
        description: "Creates a new user (registration)",
      }),
      ApiBody({ type: CreateUserDto }),
      ApiResponse({ status: 201, description: "User created", type: UserResponseDto }),
      ApiResponse({ status: 400, description: "Invalid input" }),
    );

  static readonly getById = () =>
    applyDecorators(
      ApiOperation({ summary: "Get user by ID", description: "Returns user by UUID" }),
      ApiParam({ name: "id", schema: { type: "string", format: "uuid" } }),
      ApiResponse({ status: 200, description: "User found", type: UserResponseDto }),
      ApiResponse({ status: 404, description: "User not found" }),
    );

  static readonly update = () =>
    applyDecorators(
      ApiOperation({ summary: "Update user", description: "Updates user by ID" }),
      ApiParam({ name: "id", schema: { type: "string", format: "uuid" } }),
      ApiBody({ type: UpdateUserDto }),
      ApiResponse({ status: 200, description: "User updated", type: UserResponseDto }),
      ApiResponse({ status: 400, description: "Invalid input" }),
      ApiResponse({ status: 404, description: "User not found" }),
    );

  static readonly delete = () =>
    applyDecorators(
      ApiOperation({ summary: "Delete user", description: "Deletes user by ID" }),
      ApiParam({ name: "id", schema: { type: "string", format: "uuid" } }),
      ApiResponse({ status: 200, description: "User deleted" }),
      ApiResponse({ status: 404, description: "User not found" }),
    );
}
