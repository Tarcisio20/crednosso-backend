/*
  Warnings:

  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_type` VARCHAR(191) NOT NULL;
