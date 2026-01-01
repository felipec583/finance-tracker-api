import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "src/config/database.config.js";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
@Module({
  exports: [TypeOrmModule],
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (db: ConfigType<typeof databaseConfig>) => ({
        type: "postgres",
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.name,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname, "../**/migrations/*.js"],
        synchronize: false,
        migrationsRun: false,
        migrationsTableName: "migrations",
        migrationsTransactionMode: "all",
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
