import { ObjectLiteral, Repository } from "typeorm";

export interface GenericRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  findByw(propety: string): Promise<T>;
}
