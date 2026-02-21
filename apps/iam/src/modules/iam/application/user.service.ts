import { Injectable, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "../domain/entities/user.entity";
import type { IIAMRepository } from "../domain/repositories/iam.repository.interface";
import { IAM_DI_TOKENS } from "../iam.tokens";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@shared/index";
import { CreateUserDto } from "../presentation/dto/create-user.dto";
import { UpdateUserDto } from "../presentation/dto/update-user.dto";
import { UserResponseDto } from "../presentation/dto/user-response.dto";
import { LoginDto, LoginResponseDto } from "../presentation/dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(IAM_DI_TOKENS.IAM_REPOSITORY)
    private readonly userRepository: IIAMRepository,
  ) {}

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = User.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
    });
    const created = await this.userRepository.createUser(user);
    return this.toResponseDto(created);
  }

  async getById(id: string): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestError("User ID is required");
    }
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.toResponseDto(user);
  }

  async getByEmail(email: string): Promise<UserResponseDto | null> {
    if (!email) {
      throw new BadRequestError("Email is required");
    }
    const user = await this.userRepository.getUserByEmail(email);
    return user ? this.toResponseDto(user) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.getUserById(id);
    if (!existing) {
      throw new NotFoundError("User not found");
    }

    const email = updateUserDto.email ?? existing.email;
    const username = updateUserDto.username ?? existing.username;
    const password = updateUserDto.password
      ? await this.hashPassword(updateUserDto.password)
      : existing.password;

    const user = User.create({ email, username, password });
    const updated = await this.userRepository.updateUser(id, user);
    return this.toResponseDto(updated);
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestError("User ID is required");
    }
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await this.userRepository.deleteUser(id);
    return { message: "User deleted successfully" };
  }

  async signIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.getUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (!(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedError("Invalid password");
    }
    return {
      username: user.username,
      email: user.email,
    };
  }
}
