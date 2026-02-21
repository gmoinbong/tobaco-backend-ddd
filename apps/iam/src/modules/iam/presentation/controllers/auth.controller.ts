import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../application/auth.service";
import { AuthDocs } from "../docs/auth.docs";
import { LoginDto } from "../dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @AuthDocs.login()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
