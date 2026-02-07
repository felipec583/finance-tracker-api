import { PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: "bobi@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123456s" })
  @MinLength(6)
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(RegisterDto) {}
