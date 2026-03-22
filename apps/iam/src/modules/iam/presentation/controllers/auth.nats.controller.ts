import { Controller, UseFilters } from "@nestjs/common";
import { AuthService } from "../../application/auth.service";
import { LoginDto } from "../dto/login-user.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { DomainErrorRpcFilter } from "@shared/core/domain/mappers/domain-error.rpc-filter";

@Controller()
@UseFilters(DomainErrorRpcFilter)
export class AuthNatsController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern("auth.login")
  async loginRpc(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
