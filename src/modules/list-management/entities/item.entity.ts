import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ItemCategoryEntity } from "./item-category.entity.js";
import type { ListItemEntity } from "./list-item.entity.js";
import { BilingualEntity } from "../../../common/entities/bilingual-entity.js";

@Entity("item")
export class ItemEntity extends BilingualEntity {
  @JoinColumn({ name: "item_category_id" })
  @ManyToOne(
    "ItemCategoryEntity",
    (itemCategory: ItemCategoryEntity) => itemCategory.items,
  )
  itemCategory: ItemCategoryEntity;

  @OneToMany("ListItemEntity", (listItems: ListItemEntity) => listItems.item)
  listItems: ListItemEntity[];
}
