import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class TimestampEntity {
  @CreateDateColumn({
    nullable: false,
    type: "timestamptz",
    name: "created_at",
  })
  creetedAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: "timestamptz",
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: "timestamptz", name: "deleted_at" })
  deletedAt: Date;
}
