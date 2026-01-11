import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { ListCategoryEntity } from "../modules/list-management/entities/list-category.entity.js";

export default class Testi1767659378875 implements Seeder {
  is;
  track = true;

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(ListCategoryEntity);

    const genericCategory = repository.create({
      name_en: "Generic",
      name_es: "Genérico",
    });

    await repository.save(genericCategory);
  }
}
