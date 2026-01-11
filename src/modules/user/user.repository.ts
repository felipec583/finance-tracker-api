import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity.js";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmUserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager);
  }
}
