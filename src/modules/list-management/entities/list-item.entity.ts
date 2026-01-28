import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { ListEntity } from "./list.entity.js";
import type { ItemEntity } from "./item.entity.js";

@Entity("list_item")
@Check(`
    (item_id IS NOT NULL AND free_text_name IS NULL)
    OR
    (item_id IS NULL AND free_text_name IS NOT NULL)
  `)
@Index("ux_list_item_item", ["list", "item"], {
  unique: true,
  where: `"item_id" IS NOT NULL`,
})
@Index("ux_list_item_free_text", ["list", "freeTextName"], {
  unique: true,
  where: `"free_text_name" IS NOT NULL`,
})
export class ListItemEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ nullable: true, type: "int" })
  quantity: number;

  @Column({
    nullable: true,
    name: "free_text_name",
    type: "varchar",
    length: 255,
  })
  freeTextName: string | null;

  @ManyToOne("ListEntity", (list: ListEntity) => list.listItems)
  @JoinColumn({ name: "list_id" })
  list: ListEntity;

  @ManyToOne("ItemEntity", (item: ItemEntity) => item.listItems, {
    nullable: true,
    cascade: false,
  })
  @JoinColumn({ name: "item_id" })
  item: ItemEntity | null;
}
