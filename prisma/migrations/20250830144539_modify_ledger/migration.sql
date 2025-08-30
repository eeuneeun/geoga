/*
  Warnings:

  - You are about to drop the column `title` on the `ledger` table. All the data in the column will be lost.
  - Added the required column `category` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memo` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ledger` DROP COLUMN `title`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `memo` VARCHAR(191) NOT NULL;
