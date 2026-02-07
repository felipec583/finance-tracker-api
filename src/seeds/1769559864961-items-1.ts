import { ItemCategoryEntity } from "../modules/list-management/entities/item-category.entity.js";
import { ItemEntity } from "../modules/list-management/entities/item.entity.js";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class Items_11769559864961 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepo = dataSource.getRepository(ItemCategoryEntity);
    const itemRepo = dataSource.getRepository(ItemEntity);

    const categories = await categoryRepo.find();
    const byName = (en: string) =>
      categories.find((c) => c.name_en === en) as ItemCategoryEntity;

    const produce = byName("Produce");
    const dairy = byName("Dairy");
    const meat = byName("Meat & Seafood");
    const bakery = byName("Bakery");
    const pantry = byName("Pantry / Dry Goods");
    const frozen = byName("Frozen");
    const snacks = byName("Snacks");
    const beverages = byName("Beverages");
    const condiments = byName("Condiments & Sauces");

    const items = itemRepo.create([
      // Produce
      { name_en: "Apples", name_es: "Manzanas", itemCategory: produce },
      { name_en: "Bananas", name_es: "Plátanos", itemCategory: produce },
      { name_en: "Tomatoes", name_es: "Tomates", itemCategory: produce },
      { name_en: "Onions", name_es: "Cebollas", itemCategory: produce },
      { name_en: "Garlic", name_es: "Ajo", itemCategory: produce },
      { name_en: "Lettuce", name_es: "Lechuga", itemCategory: produce },
      { name_en: "Carrots", name_es: "Zanahorias", itemCategory: produce },
      { name_en: "Potatoes", name_es: "Papas", itemCategory: produce },
      { name_en: "Avocado", name_es: "Aguacate", itemCategory: produce },
      { name_en: "Lemons", name_es: "Limones", itemCategory: produce },
      { name_en: "Broccoli", name_es: "Brócoli", itemCategory: produce },
      { name_en: "Spinach", name_es: "Espinacas", itemCategory: produce },
      { name_en: "Bell peppers", name_es: "Pimientos", itemCategory: produce },
      { name_en: "Cucumber", name_es: "Pepino", itemCategory: produce },
      // Dairy
      { name_en: "Milk", name_es: "Leche", itemCategory: dairy },
      { name_en: "Cheese", name_es: "Queso", itemCategory: dairy },
      { name_en: "Yogurt", name_es: "Yogur", itemCategory: dairy },
      { name_en: "Butter", name_es: "Mantequilla", itemCategory: dairy },
      { name_en: "Eggs", name_es: "Huevos", itemCategory: dairy },
      { name_en: "Cream", name_es: "Crema", itemCategory: dairy },
      // Meat & Seafood
      {
        name_en: "Chicken breast",
        name_es: "Pechuga de pollo",
        itemCategory: meat,
      },
      { name_en: "Ground beef", name_es: "Carne molida", itemCategory: meat },
      { name_en: "Salmon", name_es: "Salmón", itemCategory: meat },
      { name_en: "Shrimp", name_es: "Camarones", itemCategory: meat },
      { name_en: "Bacon", name_es: "Tocino", itemCategory: meat },
      { name_en: "Turkey", name_es: "Pavo", itemCategory: meat },
      // Bakery
      { name_en: "Bread", name_es: "Pan", itemCategory: bakery },
      { name_en: "Tortillas", name_es: "Tortillas", itemCategory: bakery },
      { name_en: "Bagels", name_es: "Bagels", itemCategory: bakery },
      { name_en: "Croissants", name_es: "Croissants", itemCategory: bakery },
      // Pantry / Dry Goods
      { name_en: "Rice", name_es: "Arroz", itemCategory: pantry },
      { name_en: "Pasta", name_es: "Pasta", itemCategory: pantry },
      {
        name_en: "Black beans",
        name_es: "Frijoles negros",
        itemCategory: pantry,
      },
      {
        name_en: "Olive oil",
        name_es: "Aceite de oliva",
        itemCategory: pantry,
      },
      { name_en: "Flour", name_es: "Harina", itemCategory: pantry },
      { name_en: "Sugar", name_es: "Azúcar", itemCategory: pantry },
      {
        name_en: "Canned tomatoes",
        name_es: "Tomates en lata",
        itemCategory: pantry,
      },
      { name_en: "Oats", name_es: "Avena", itemCategory: pantry },
      { name_en: "Lentils", name_es: "Lentejas", itemCategory: pantry },
      // Frozen
      {
        name_en: "Frozen vegetables",
        name_es: "Verduras congeladas",
        itemCategory: frozen,
      },
      { name_en: "Ice cream", name_es: "Helado", itemCategory: frozen },
      {
        name_en: "Frozen pizza",
        name_es: "Pizza congelada",
        itemCategory: frozen,
      },
      // Snacks
      { name_en: "Chips", name_es: "Papas fritas", itemCategory: snacks },
      {
        name_en: "Crackers",
        name_es: "Galletas saladas",
        itemCategory: snacks,
      },
      { name_en: "Nuts", name_es: "Nueces", itemCategory: snacks },
      {
        name_en: "Peanut butter",
        name_es: "Mantequilla de maní",
        itemCategory: snacks,
      },
      // Beverages
      { name_en: "Water", name_es: "Agua", itemCategory: beverages },
      { name_en: "Coffee", name_es: "Café", itemCategory: beverages },
      { name_en: "Tea", name_es: "Té", itemCategory: beverages },
      {
        name_en: "Orange juice",
        name_es: "Jugo de naranja",
        itemCategory: beverages,
      },
      // Condiments & Sauces
      { name_en: "Salt", name_es: "Sal", itemCategory: condiments },
      { name_en: "Pepper", name_es: "Pimienta", itemCategory: condiments },
      {
        name_en: "Ketchup",
        name_es: "Salsa de tomate",
        itemCategory: condiments,
      },
      { name_en: "Mustard", name_es: "Mostaza", itemCategory: condiments },
      {
        name_en: "Soy sauce",
        name_es: "Salsa de soya",
        itemCategory: condiments,
      },
      {
        name_en: "Hot sauce",
        name_es: "Salsa picante",
        itemCategory: condiments,
      },
      { name_en: "Vinegar", name_es: "Vinagre", itemCategory: condiments },
    ]);

    await itemRepo.save(items);
  }
}
