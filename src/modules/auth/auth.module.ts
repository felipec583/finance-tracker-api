import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { PasswordService } from "./password.service.js";
import { UserModule } from "../user/user.module.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>("SECRET_KEY"),
        signOptions: {
          expiresIn: "1h",
        },
      }),
    }),
  ],
  exports: [],
  providers: [AuthService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
