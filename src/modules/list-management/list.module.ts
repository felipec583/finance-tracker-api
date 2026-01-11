import { Module } from "@nestjs/common";
import { ListService } from "./list.service.js";
import { ListEntity } from "./entities/list.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListItemEntity } from "./entities/list-item.entity.js";
import { ListController } from "./list.controller.js";
import { UserService } from "../user/user.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([ListEntity, ListItemEntity]),
    UserService,
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
