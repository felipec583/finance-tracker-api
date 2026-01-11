import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import type { ListCategoryEntity } from "./list-category.entity.js";
import { UserEntity } from "../../user/entities/user.entity.js";
import type { ListItemEntity } from "./list-item.entity.js";

@Entity("list")
export class ListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: "member_id" })
  @ManyToOne("UserEntity", (member: UserEntity) => member.lists)
  member: UserEntity;

  @JoinColumn({ name: "list_category_id" })
  @ManyToOne(
    "ListCategoryEntity",
    (listCategory: ListCategoryEntity) => listCategory.lists,
  )
  listCategory: ListCategoryEntity;

  @OneToMany("ListItemEntity", (listItems: ListItemEntity) => listItems.list)
  listItems: ListItemEntity[];
}
