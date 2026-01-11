import { Injectable } from "@nestjs/common";
import { TypeOrmUserRepository } from "./user.repository.js";
import { RegisterDto } from "../auth/auth.dto.js";
import {
  FindUserParamFields,
  FindUserParamFieldValues,
} from "./types/user-params.types.js";

@Injectable()
export class UserService {
  constructor(private userRepository: TypeOrmUserRepository) {}

  async create(userData: RegisterDto) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async findBy(params: FindUserParamFields, value: FindUserParamFieldValues) {
    const foundUser = await this.userRepository.findOneBy({ [params]: value });
    if (!foundUser) throw new Error("No user found");
    return foundUser;
  }
}
