import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { SeederOptions } from "typeorm-extension";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const distDir = __dirname.replace("src", "dist");
const configService = new ConfigService();
const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  synchronize: false,
  // Match both for ts and js
  entities: [
    __dirname + "/../**/*.entity{.ts,.js}",
    distDir + "/../**/*.entity.js",
  ],
  migrations: [distDir + "/../migrations/*.js"],
  seeds: ["src/seeds/*.ts"],
  migrationsRun: false,
  seedTableName: "seeds",
  logging: true,
};
const AppDataSource = new DataSource(options);

export default AppDataSource;
