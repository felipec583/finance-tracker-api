# Policy: TypeORM transactions

Status: **active**  
Scope: `finance-tracker-api`  
Last decided: 2026-10-21

## Decision

Use TypeORM’s built-in transaction API with the repository pattern:

- Everyday reads/writes → injected `@InjectRepository(...)`
- Multi-entity atomic writes → `dataSource.transaction` + `manager.getRepository(Entity)` for **every** write inside the callback
- Helpers shared by tx and non-tx paths (e.g. `addItemsToList`) may accept an optional `Repository<T>` that defaults to the injected repo

Do **not** introduce `typeorm-transactional` / `@Transactional()` / CLS-ALS bootstrap for this codebase yet.

Do **not** use manual `QueryRunner` unless we need savepoints or control that `transaction()` cannot express.

## Why (current size)

The app is small. The first real need is atomic `list` + `list_item` create in one service method. Built-in transactions solve that with:

- no extra dependency
- an explicit transaction boundary in the method
- reversible choice later (see triggers below)

## Rules for implementers

1. Inside `dataSource.transaction(async (manager) => { ... })`, do **not** call `this.*Repository` for work that must join the transaction.
2. Obtain one repo per entity from the same `manager` (`ListEntity`, `ListItemEntity`, …).
3. If any step throws, the whole callback rolls back — do not catch-and-swallow inside the callback unless you rethrow.
4. Prefer mapping rows to satisfy DB constraints (e.g. list_item XOR `item_id` / `free_text_name`) before insert; uniques alone do not replace that.

## When to revisit (refactor triggers)

Reconsider this policy if **any** of these become true:

| trigger | consider |
|---|---|
| Several services must share one transaction without threading `manager` / repos | evaluate `typeorm-transactional` (`@Transactional` + ALS) or a thin internal wrapper |
| We need nested propagation (`REQUIRED`, `REQUIRES_NEW`, …) across many call sites | same as above |
| We need savepoints / conditional commit shapes the callback API fights | `QueryRunner` for that path only |
| Transaction boilerplate is copy-pasted in many services and drifting | extract a small helper; still prefer built-in TypeORM over a global CLS package until nesting pain is real |

## Rejected for now

| option | reason deferred |
|---|---|
| `typeorm-transactional` | Extra boot wiring (`initializeTransactionalContext`, patched `DataSource`); invisible tx context; higher coupling for one/few call sites |
| QueryRunner everywhere | More ceremony; easy to leak connections if `release()` is missed |

## Reference shape

```ts
await this.dataSource.transaction(async (manager) => {
  const listRepo = manager.getRepository(ListEntity);
  const listItemRepo = manager.getRepository(ListItemEntity);
  // all writes through these repos
});
```

## Related code

- `src/modules/list-management/list.service.ts` — `create` (transaction), `addItemsToList` (optional repo)
