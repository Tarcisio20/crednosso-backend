/*
  Warnings:

  - You are about to drop the column `value_of_10` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `value_of_100` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `value_of_20` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `value_of_50` on the `order` table. All the data in the column will be lost.
  - Added the required column `id_status_confirmation_order` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `atm` MODIFY `balance_cass_A` INTEGER NOT NULL,
    MODIFY `balance_cass_B` INTEGER NOT NULL,
    MODIFY `balance_cass_C` INTEGER NOT NULL,
    MODIFY `balance_cass_D` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `value_of_10`,
    DROP COLUMN `value_of_100`,
    DROP COLUMN `value_of_20`,
    DROP COLUMN `value_of_50`,
    ADD COLUMN `id_status_confirmation_order` INTEGER NOT NULL,
    ADD COLUMN `value_confirmed_10` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_confirmed_100` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_confirmed_20` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_confirmed_50` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_requested_10` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_requested_100` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_requested_20` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `value_requested_50` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `treasury` ADD COLUMN `number_count` INTEGER NOT NULL DEFAULT 0,
    MODIFY `balance_cass_10` INTEGER NOT NULL,
    MODIFY `balance_cass_20` INTEGER NOT NULL,
    MODIFY `balance_cass_50` INTEGER NOT NULL,
    MODIFY `balance_cass_100` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `StatusConfirmationOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_full` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_status_confirmation_order_fkey` FOREIGN KEY (`id_status_confirmation_order`) REFERENCES `StatusConfirmationOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;



