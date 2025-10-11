/*
  Warnings:

  - Made the column `code` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tournament" ADD COLUMN "video" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_category" ("code", "id", "name") SELECT "code", "id", "name" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_code_key" ON "category"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
