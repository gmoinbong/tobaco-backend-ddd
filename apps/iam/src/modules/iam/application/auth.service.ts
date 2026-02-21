import { Injectable } from "@nestjs/common";
import { NotFoundError } from "@shared/index";
import { LoginDto } from "../presentation/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserJwtResponse } from "../presentation/interfaces/jwt-user.interface";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<UserJwtResponse> {
    const userResponse = await this.userService.signIn(loginDto);
    if (!userResponse) {
      throw new NotFoundError("User not found");
    }

    const payload = {
      userResponse
    }
    const accessToken = this.jwtService.sign(payload);

    return {
      user: userResponse,
      accessToken,
    };
  }
}
