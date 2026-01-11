import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BilingualEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ length: 255 })
  name_en: string;

  @Column({ length: 255 })
  name_es: string;
}
