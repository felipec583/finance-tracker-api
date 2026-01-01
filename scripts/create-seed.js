import { execSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const seedName = process.argv[2];
const seedPath = ["src/seeds"].join("");
try {
  execSync(
    `ts-node-esm ./node_modules/typeorm-extension/bin/cli.mjs seed:create -n ${seedPath}/${seedName}`,
    {
      stdio: "inherit",
      encoding: "utf8",
    },
  );
} catch (error) {
  console.log("Something went wrong trying to create the migration");
  process.exit(1);
}
