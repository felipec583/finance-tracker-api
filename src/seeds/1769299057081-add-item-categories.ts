import { ItemCategoryEntity } from "../modules/list-management/entities/item-category.entity.js";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class AddItemCategories1769299057081 implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(ItemCategoryEntity);

    const itemCategories = repository.create([
      { name_en: "Produce", name_es: "Frutas y Verduras" },
      { name_en: "Dairy", name_es: "Lácteos" },
      { name_en: "Meat & Seafood", name_es: "Carnes y Pescados" },
      { name_en: "Bakery", name_es: "Panadería" },
      { name_en: "Pantry / Dry Goods", name_es: "Despensa" },
      { name_en: "Frozen", name_es: "Congelados" },
      { name_en: "Snacks", name_es: "Snacks" },
      { name_en: "Beverages", name_es: "Bebidas" },
      { name_en: "Condiments & Sauces", name_es: "Condimentos y Salsas" },
      { name_en: "Household", name_es: "Limpieza del Hogar" },
      { name_en: "Personal Care", name_es: "Cuidado Personal" },
      { name_en: "Other", name_es: "Otros" },
    ]);

    await repository.save(itemCategories);
  }
}
