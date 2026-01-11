import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity.js";
import { UserService } from "./user.service.js";
import { TypeOrmUserRepository } from "./user.repository.js";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  exports: [TypeOrmModule, UserService, TypeOrmUserRepository],
  providers: [UserService, TypeOrmUserRepository],
})
export class UserModule {}
