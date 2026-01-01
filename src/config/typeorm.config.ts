import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { SeederOptions } from "typeorm-extension";
config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  synchronize: false,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname, "../**/migrations/*.js"],
  seeds: [__dirname, "../**/seeds/*.js"],
  migrationsRun: false,
  seedTableName: "seeds",
  logging: true,
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
