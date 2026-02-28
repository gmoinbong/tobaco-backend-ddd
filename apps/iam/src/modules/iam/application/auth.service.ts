import { Inject, Injectable } from "@nestjs/common";
import { NotFoundError } from "@shared/index";
import { LoginDto } from "../presentation/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserJwtResponse } from "../presentation/interfaces/jwt-user.interface";
import { UserService } from "./user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";

@Injectable()
export class AuthService {

  constructor(@Inject(CACHE_MANAGER)
  private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cacheManager: Cache) { }


  // private async getAccessToken(email: string): Promise<string> {
  //   const accessToken = await this.cacheManager.get<string>(`accessToken:${email}`);

  //   if (!accessToken) {
  //     throw new NotFoundError("Access token not found");
  //   }

  //   return accessToken;
  // }
  
  async login(loginDto: LoginDto): Promise<UserJwtResponse> {
    const userResponse = await this.userService.signIn(loginDto);
    if (!userResponse) {
      throw new NotFoundError("User not found");
    }

    const payload = {
      userResponse
    }
    const accessToken = this.jwtService.sign(payload);

    await this.cacheManager.set('accessToken', accessToken, 60000)

    return {
      user: userResponse,
      accessToken,
    };
  }
}
