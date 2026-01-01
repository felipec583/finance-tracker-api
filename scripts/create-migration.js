import { execSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const migrationName = process.argv[2];
const migrationPath = ["src/migrations"].join("");
try {
  execSync(`npx typeorm migration:create ${migrationPath}/${migrationName}`, {
    stdio: "inherit",
    encoding: "utf8",
  });
} catch (error) {
  console.log("Something went wrong trying to create the migration");
  process.exit(1);
}
