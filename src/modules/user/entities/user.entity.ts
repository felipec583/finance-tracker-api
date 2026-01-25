import type { ListEntity } from "../../list-management/entities/list.entity.js";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("member")
export class UserEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany("ListEntity", (lists: ListEntity) => lists.member)
  lists: ListEntity[];
}
