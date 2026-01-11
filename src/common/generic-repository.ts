import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export default class TypeOrmGenericRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }
}
