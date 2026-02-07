import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GlobalExceptionFilter } from "./common/exception-filters/global-exception.js";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ["error", "warn", "log", "debug", "verbose"],
      prefix: "finance-tracker-api",
      timestamp: true,
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  const docConfig = new DocumentBuilder()
    .setTitle("Finance Tracker API")
    .setDescription("Finance Tracker API operations")
    .setVersion("1.0")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup("api/docs", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
