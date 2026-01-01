import { execSync } from "node:child_process";

try {
  execSync(
    `ts-node-esm ./node_modules/typeorm-extension/bin/cli.mjs seed:run -d ./src/config/typeorm.config.ts`,
    {
      stdio: "inherit",
      encoding: "utf8",
      env: {
        ...process.env,
        NODE_OPTIONS: "--loader ts-node/esm",
      },
    },
  );
} catch (error) {
  console.log("Something went wrong trying to run seeds");
  process.exit(1);
}
