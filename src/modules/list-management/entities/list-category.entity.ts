import { Entity, OneToMany } from "typeorm";
import { ListEntity } from "./list.entity.js";
import { BilingualEntity } from "../../../common/entities/bilingual-entity.js";

@Entity("list_category")
export class ListCategoryEntity extends BilingualEntity {
  @OneToMany(() => ListEntity, (lists) => lists.listCategory)
  lists: ListEntity[];
}
