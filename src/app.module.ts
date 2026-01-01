import { Module } from "@nestjs/common";
import { DatabaseModule } from "./modules/database/database.module.js";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/env.config.js";
import databaseConfig from "./config/database.config.js";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
