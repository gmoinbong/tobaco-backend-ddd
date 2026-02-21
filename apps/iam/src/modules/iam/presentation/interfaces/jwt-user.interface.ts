import { LoginResponseDto } from "../dto/login-user.dto";

export interface UserJwtResponse {
  user: LoginResponseDto;
  accessToken: string;
}
