import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "[prismaClient] DATABASE_URL is not set. Copy .env.example to .env and fill it in."
  );
}

// Single shared PrismaClient. The connection string stays on the server.
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});
