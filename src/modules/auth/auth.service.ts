import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service.js";
import { LoginDto, RegisterDto } from "./auth.dto.js";
import { PasswordService } from "./password.service.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async login(loginParams: LoginDto) {
    const { email, password } = loginParams;
    const user = await this.userService.findBy("email", email);

    const isValidPassword = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) throw new Error("Invalid password or email");
    const { password: _validPassword, ...result } = user;

    const payload = { sub: user.id, username: user.email };
    return {
      ...result,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerParams: RegisterDto) {
    const password = await this.passwordService.hashPassword(
      registerParams.password,
    );
    const newUser = await this.userService.create({
      ...registerParams,
      password,
    });
    return { email: newUser.email };
  }
}
