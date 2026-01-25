import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LoginDto, RegisterDto } from "./auth.dto.js";
import { LoginResponse } from "./auth.types.js";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Body(new ValidationPipe()) userCredentials: LoginDto,
  ): Promise<LoginResponse> {
    const loggedInUserName = await this.authService.login(userCredentials);
    return loggedInUserName;
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(new ValidationPipe()) newUserData: RegisterDto,
  ): Promise<{
    email: string;
  }> {
    return await this.authService.register(newUserData);
  }
}
