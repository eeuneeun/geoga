/*
  Warnings:

  - You are about to alter the column `price` on the `ledger` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ledger` MODIFY `price` INTEGER NOT NULL;
