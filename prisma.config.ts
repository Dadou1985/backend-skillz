import "dotenv/config";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}`, override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
