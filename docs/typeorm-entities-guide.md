# TypeORM Entities Guide

## Creating TypeORM Entities

### Basic Entity Structure

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("table_name")
export class EntityName {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  created_at: Date;
}
```

### Key Decorators

- `@Entity("table_name")` - Maps class to database table
- `@PrimaryGeneratedColumn("identity")` - Auto-incrementing primary key
- `@Column()` - Maps property to database column
- `@Column({ length: 255 })` - Column with specific constraints

## Relations

### One-to-Many / Many-to-One

```typescript
// Parent Entity (One side)
@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @OneToMany(() => ItemEntity, (items) => items.category)
  items: ItemEntity[];
}

// Child Entity (Many side)
@Entity("item")
export class ItemEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column()
  category_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.items)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;
}
```

### Many-to-Many with Junction Table

```typescript
// Junction Entity
@Entity("list_item")
@Unique(["item_id", "list_id"])
export class ListItemEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @Column()
  item_id: number;

  @Column()
  list_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ListEntity, (list) => list.listItems)
  @JoinColumn({ name: "list_id" })
  list: ListEntity;

  @ManyToOne(() => ItemEntity, (item) => item.listItems)
  @JoinColumn({ name: "item_id" })
  item: ItemEntity;
}
```

### Important: Array Properties in Function Parameters

**❌ Wrong - Don't add array brackets in function parameter:**

```typescript
@OneToMany(() => ItemEntity, (items: ItemEntity[]) => items.category)
items: ItemEntity[];
```

**✅ Correct - Use singular type in function parameter:**

```typescript
@OneToMany(() => ItemEntity, (items) => items.category)
items: ItemEntity[];
```

The function parameter represents a single item from the collection, even though the property itself is an array.

## Circular Dependencies

### Problem

Circular dependencies occur when entities import each other:

```typescript
// item.entity.ts
import { ItemCategoryEntity } from "./item-category.entity.js"; // Import

// item-category.entity.ts
import { ItemEntity } from "./item.entity.js"; // Import back
```

This creates: `ItemEntity → ItemCategoryEntity → ItemEntity` (circular)

### Error Symptoms

```
ReferenceError: Cannot access 'EntityName' before initialization
```

### Solution 1: Import Type + String References

**For the "One" side (parent):**

```typescript
import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import type { ItemEntity } from "./item.entity.js"; // Type-only import

@Entity("item_category")
export class ItemCategoryEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @OneToMany("ItemEntity", (items) => items.itemCategory) // String reference
  items: ItemEntity[];
}
```

**For the "Many" side (child):**

```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ItemCategoryEntity } from "./item-category.entity.js"; // Regular import

@Entity("item")
export class ItemEntity {
  @PrimaryGeneratedColumn("identity")
  id: number;

  @ManyToOne("ItemCategoryEntity", (itemCategory) => itemCategory.items) // String reference
  @JoinColumn({ name: "item_category_id" })
  itemCategory: ItemCategoryEntity;
}
```

### Solution 2: All String References

When you have complex circular dependencies (multiple entities), use string references everywhere:

```typescript
// All entities use string references
@OneToMany("EntityName", (relation) => relation.property)
@ManyToOne("EntityName", (relation) => relation.property)

// With type-only imports
import type { EntityName } from "./entity.file.js";
```

### Circular Dependency Rules

1. **Identify the circle**: Map out which entities import each other
2. **Use `import type`**: For entities that are only needed for typing
3. **String references**: Replace `() => EntityName` with `"EntityName"`
4. **Keep one regular import**: Usually the parent entity can keep regular imports
5. **Test thoroughly**: Run migrations to ensure no initialization errors

### Common Circular Patterns

**Triangle Dependency:**

```
ListItemEntity → ListEntity → ListItemEntity
ListItemEntity → ItemEntity → ListItemEntity
```

**Solution:**

- `ListItemEntity`: Use `import type` for both `ListEntity` and `ItemEntity`
- `ListEntity` & `ItemEntity`: Use string references for `ListItemEntity`

### Best Practices

1. **Design first**: Try to avoid circular dependencies in your domain model
2. **String references**: When in doubt, use string references for relations
3. **Type imports**: Always prefer `import type` when you only need the type
4. **Test after changes**: Run migrations immediately after fixing circular dependencies
5. **Document dependencies**: Keep track of entity relationships to avoid future circles

## Migration Considerations

After creating entities with relations:

1. **Build first**: `npm run build`
2. **Run migrations**: `npm run migrate:run`
3. **Check for errors**: Look for initialization or circular dependency errors
4. **Fix imports**: Apply circular dependency solutions if needed

## Troubleshooting

### Common Errors

- `Cannot access 'EntityName' before initialization` → Circular dependency
- `Entity not found` → Check entity path in configuration
- `Relation property not defined` → Missing import or incorrect string reference

### Debug Steps

1. Check imports in all related entities
2. Draw dependency graph to identify circles
3. Apply string references and type imports
4. Rebuild and test migrations
