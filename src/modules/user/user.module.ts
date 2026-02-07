import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity.js";
import { UserService } from "./user.service.js";
import { TypeOrmUserRepository } from "./user.repository.js";
import { UserController } from "./user.controller.js";
import { ListModule } from "../list-management/list.module.js";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ListModule],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, TypeOrmUserRepository],
  providers: [UserService, TypeOrmUserRepository],
})
export class UserModule {}
