import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("member")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
