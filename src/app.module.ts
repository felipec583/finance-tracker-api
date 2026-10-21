import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { DatabaseModule } from "./modules/database/database.module.js";
import { ConfigModule } from "@nestjs/config";
import config from "./config/env.config.js";
import databaseConfig from "./config/database.config.js";
import { UserModule } from "./modules/user/user.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { ListModule } from "./modules/list-management/list.module.js";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    AuthModule,
    ListModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, databaseConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
