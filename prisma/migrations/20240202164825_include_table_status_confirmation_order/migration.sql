
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `value_of_10`,
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

-- CreateTable
CREATE TABLE `StatusConfirmationOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_full` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_status_confirmation_order_fkey` FOREIGN KEY (`id_status_confirmation_order`) REFERENCES `StatusConfirmationOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;



