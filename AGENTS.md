# AGENTS.md - Finance Tracker API

**SYSTEM INSTRUCTION:** This file contains the strict coding standards, architectural patterns, and workflows for this project. You must read and follow these rules for every interaction.

## Project Overview

A NestJS v11 TypeScript API for tracking personal finances. Uses PostgreSQL with TypeORM, ESLint + Prettier for code quality, and Jest for testing.

- **Package Manager:** npm
- **TypeScript Mode:** ESM modules (`"type": "module"`)
- **Test Framework:** Jest
- **Database:** PostgreSQL with TypeORM + typeorm-extension

## Core Architecture

### Directory Structure

```
src/
├── modules/          # Feature modules (auth, database, list-management, user)
├── common/           # Shared utilities, interfaces, generic repositories
├── config/           # Configuration files (database, env, typeorm)
├── seeds/            # Database seeders
├── migrations/       # Database migrations
└── main.ts           # Application entry point
```

### NestJS Standards

- **Modular Architecture:** strictly follow Module -> Service -> Controller pattern.
- **Dependency Injection:** Use strict DI. Avoid direct instantiation.
- **Validation:** All inputs must use DTOs with `class-validator` decorators.
- **Entities:** Entity files must end in `.entity.ts`.

## TypeScript Standards

Based on mkosir/typescript-style-guide:

### Naming Conventions

- **Classes/Types:** PascalCase (e.g., `UserEntity`, `CreateUserDto`)
- **Variables/Functions:** camelCase (e.g., `userRepository`, `findByEmail`)
- **Files:** kebab-case (e.g., `user.service.ts`, `create-user.dto.ts`)
- **Constants:** UPPER_SNAKE_CASE or camelCase depending on scope

### Critical Rules

- **NEVER use `I` prefix for interfaces** (use `User`, not `IUser`)
- **Use `undefined` instead of `null`** for optional values
- **Arrays:** Use `T[]` syntax, not `Array<T>`
- **Imports ordering:**
  1. Built-in modules (node:)
  2. External packages (@nestjs/\*, typeorm, etc.)
  3. Internal modules (../modules, ../../common, etc.)

### Linting (from eslint.config.mjs)

- `@typescript-eslint/no-explicit-any`: Off (allowed)
- Unused variables must be prefixed with `_` or they'll cause errors
- Prettier single quotes: **false** (use double quotes)
- End of line: auto

## Database Migrations & Seeds

### Naming Convention

**Migrations:** `{timestamp}-{kebab-case-name}.ts`
**Seeds:** `{timestamp}-{kebab-case-name}.ts`

**Timestamp Format:** Unix milliseconds (13 digits, e.g., `1767659378875`)

### Creating New Migrations

1. Navigate to project root
2. Run: `npm run migrate:create <name>` (e.g., `npm run migrate:create add-users-table`)
3. The script creates the file in `src/migrations/`
4. Implement `up()` and `down()` methods

### Creating New Seeds

1. Navigate to project root
2. Run: `npm run seed:create <name>` (e.g., `npm run seed:create list-category`)
3. The script creates the file in `src/seeds/`
4. Implement the `Seeder` interface from `typeorm-extension`

### Critical: Pattern Matching

**Before creating any new migration or seed file, READ the latest existing file in that folder and copy the exact structure.**

**For Seeds:**

- Export a default class implementing `Seeder`.
- Set `track = true`.
- Implement `run(dataSource, factoryManager)`.

## Testing

### Test Files

- All tests must be `.spec.ts` files
- Located alongside the code they test (e.g., `user.service.spec.ts` next to `user.service.ts`)
- Jest config: `rootDir: "src"`, `testRegex: ".*\\.spec\\.ts$"`

### Quality Rules

- **NO throwaway scripts** (no `test_script.py`, `check.ts`, etc.)
- All test code must be in proper `.spec.ts` files
- Write meaningful tests for services and controllers

## Development Workflow

### Running the Application

```bash
# Development with watch
npm run start:dev

# Production
npm run start:prod
```

### Linting & Formatting

```bash
# Format code
npm run format

# Lint and fix
npm run lint
```

**Rule:** After editing any file, run `npm run lint` before finishing.

### Database Operations

```bash
# Run migrations (development)
npm run migrate:run:dev

# Undo last migration (development)
npm run migrate:undo:dev

# Run seeds (development)
npm run seed:run:dev
```

## Policies

Standing decisions live in `docs/*.policy.md`. Read the linked policy before changing related code; update the policy when the decision changes.

- TypeORM transactions (repository pattern + `dataSource.transaction`) - [docs/transactions.policy.md](docs/transactions.policy.md)

## Agent Behavior Rules

1. **Always lint/formatter after edits:** Run `npm run lint` (or `npm run format` for formatting) after modifying any file.

2. **Update this file:** If you discover a new persistent project preference or pattern, update AGENTS.md to document it. When adding a standing architectural decision, also add a `docs/*.policy.md` and a row under **Policies**.

3. **Never commit secrets:** The `.env` files contain credentials. Never commit them or any files containing secrets.

4. **Follow existing patterns:** Before writing new code, examine existing files in the same module to match the coding style.

5. **Use environment-aware commands:** Always set `NODE_ENV` appropriately (development/production) when running database commands.

## npm Scripts Reference

| Script                     | Purpose                         |
| -------------------------- | ------------------------------- |
| `npm run build`            | Compile TypeScript to dist/     |
| `npm run format`           | Format code with Prettier       |
| `npm run lint`             | Lint and auto-fix with ESLint   |
| `npm run start:dev`        | Start in development with watch |
| `npm run start:prod`       | Start production build          |
| `npm run test`             | Run Jest tests                  |
| `npm run test:cov`         | Run tests with coverage         |
| `npm run migrate:create`   | Create new migration            |
| `npm run migrate:run:dev`  | Run migrations (dev)            |
| `npm run migrate:undo:dev` | Undo last migration (dev)       |
| `npm run seed:create`      | Create new seed                 |
| `npm run seed:run:dev`     | Run seeds (dev)                 |
