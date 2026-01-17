import { PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(RegisterDto) {}
