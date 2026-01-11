import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import type { ListEntity } from "./list.entity.js";
import type { ItemEntity } from "./item.entity.js";

@Entity("list_item")
@Unique(["item_id", "list_id"])
export class ListItemEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column()
  item_id: number;

  @Column()
  list_id: number;

  @Column()
  quantity: number;

  @ManyToOne("ListEntity", (list: ListEntity) => list.listItems)
  @JoinColumn({ name: "list_id" })
  list: ListEntity;

  @ManyToOne("ItemEntity", (item: ItemEntity) => item.listItems)
  @JoinColumn({ name: "item_id" })
  item: ItemEntity;
}
