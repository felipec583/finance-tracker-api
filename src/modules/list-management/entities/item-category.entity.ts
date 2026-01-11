import { Entity, OneToMany } from "typeorm";
import type { ItemEntity } from "./item.entity.js";
import { BilingualEntity } from "../../../common/entities/bilingual-entity.js";

@Entity("item_category")
export class ItemCategoryEntity extends BilingualEntity {
  @OneToMany("ItemEntity", (items: ItemEntity) => items.itemCategory)
  items: ItemEntity[];
}
