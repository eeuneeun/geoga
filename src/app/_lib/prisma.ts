import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // 개발시 로그 옵션
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
