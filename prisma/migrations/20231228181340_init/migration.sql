-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_full` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `last_access_date` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_responsable_user` INTEGER NOT NULL,
    `log_date` DATETIME(3) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_system` INTEGER NOT NULL,
    `name_full` VARCHAR(191) NOT NULL,
    `shortened_name` VARCHAR(191) NOT NULL,
    `id_treasury` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treasury` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_systen` INTEGER NOT NULL,
    `name_full` VARCHAR(191) NOT NULL,
    `shortened_name` VARCHAR(191) NOT NULL,
    `config_cass_A` INTEGER NOT NULL,
    `config_cass_B` INTEGER NOT NULL,
    `config_cass_C` INTEGER NOT NULL,
    `config_cass_D` INTEGER NOT NULL,
    `balance_cass_A` DOUBLE NOT NULL,
    `balance_cass_B` DOUBLE NOT NULL,
    `balance_cass_C` DOUBLE NOT NULL,
    `balance_cass_D` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_full` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_full` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(3) NOT NULL,
    `batch` INTEGER NOT NULL,
    `id_origin_treasury` INTEGER NOT NULL,
    `id_destiny_treasury` INTEGER NOT NULL,
    `id_operation_type` INTEGER NOT NULL,
    `id_order_type` INTEGER NOT NULL,
    `batch_treasury` INTEGER NOT NULL,
    `value_of_10` DOUBLE NOT NULL DEFAULT 0,
    `value_of_20` DOUBLE NOT NULL DEFAULT 0,
    `value_of_50` DOUBLE NOT NULL DEFAULT 0,
    `value_of_100` DOUBLE NOT NULL DEFAULT 0,
    `observation` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_atm` INTEGER NOT NULL,
    `supply_date` DATETIME(3) NOT NULL,
    `value_of_10` INTEGER NOT NULL DEFAULT 0,
    `value_of_20` INTEGER NOT NULL DEFAULT 0,
    `value_of_50` INTEGER NOT NULL DEFAULT 0,
    `value_of_100` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_id_responsable_user_fkey` FOREIGN KEY (`id_responsable_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atm` ADD CONSTRAINT `Atm_id_treasury_fkey` FOREIGN KEY (`id_treasury`) REFERENCES `Treasury`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_order_type_fkey` FOREIGN KEY (`id_order_type`) REFERENCES `OrderType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_origin_treasury_fkey` FOREIGN KEY (`id_origin_treasury`) REFERENCES `Treasury`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_destiny_treasury_fkey` FOREIGN KEY (`id_destiny_treasury`) REFERENCES `Treasury`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
