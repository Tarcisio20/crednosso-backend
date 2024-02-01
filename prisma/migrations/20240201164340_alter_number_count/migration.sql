-- AlterTable
ALTER TABLE `atm` MODIFY `balance_cass_A` INTEGER NOT NULL,
    MODIFY `balance_cass_B` INTEGER NOT NULL,
    MODIFY `balance_cass_C` INTEGER NOT NULL,
    MODIFY `balance_cass_D` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `value_of_10` INTEGER NOT NULL DEFAULT 0,
    MODIFY `value_of_20` INTEGER NOT NULL DEFAULT 0,
    MODIFY `value_of_50` INTEGER NOT NULL DEFAULT 0,
    MODIFY `value_of_100` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `treasury` ADD COLUMN `number_count` INTEGER NOT NULL DEFAULT 0,
    MODIFY `balance_cass_10` INTEGER NOT NULL,
    MODIFY `balance_cass_20` INTEGER NOT NULL,
    MODIFY `balance_cass_50` INTEGER NOT NULL,
    MODIFY `balance_cass_100` INTEGER NOT NULL;
