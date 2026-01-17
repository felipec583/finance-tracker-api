import bcrypt from "bcrypt";
import { TypeOrmUserRepository } from "../user/user.repository.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordService {
  private saltRounds: number = 10;

  constructor(private userRepository: TypeOrmUserRepository) {}
  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(userId, { password: hashedPassword });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validatePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
