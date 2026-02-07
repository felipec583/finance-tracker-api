import { Module } from "@nestjs/common";
import { ListService } from "./list.service.js";
import { ListEntity } from "./entities/list.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListItemEntity } from "./entities/list-item.entity.js";
import { ListController } from "./list.controller.js";
import { ListCategoryEntity } from "./entities/list-category.entity.js";
import { ItemService } from "./item.service.js";
import { ItemEntity } from "./entities/item.entity.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListEntity,
      ListItemEntity,
      ListCategoryEntity,
      ItemEntity,
    ]),
  ],
  controllers: [ListController],
  providers: [ListService, ItemService, ItemService],
  exports: [ListService],
})
export class ListModule {}
