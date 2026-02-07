# Seeds

Use **relative** imports (`../modules/...`), not `src/` — `src/` can break seed loading (ERR_REQUIRE_ESM).

`npm run seed:create -- <name>` generates a file with a commented `../` import example — uncomment and replace the entity/path.
