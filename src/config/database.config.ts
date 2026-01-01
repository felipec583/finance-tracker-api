import { registerAs } from "@nestjs/config";

const DATABASE_PORT =
  typeof process.env.DB_PORT === "string"
    ? parseInt(process.env.DB_PORT, 10)
    : 5432;

export default registerAs("database", () => ({
  host: process.env.DB_HOST,
  port: DATABASE_PORT,
  username: process.env.DB_USER,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
}));
