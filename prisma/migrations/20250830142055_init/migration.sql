/*
  Warnings:

  - You are about to drop the column `date` on the `ledger` table. All the data in the column will be lost.
  - Added the required column `end` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ledger` DROP COLUMN `date`,
    ADD COLUMN `end` DATETIME(3) NOT NULL,
    ADD COLUMN `start` DATETIME(3) NOT NULL;
