/*
  Warnings:

  - Made the column `end_date` on table `tournament` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `tournament` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "arena_id" TEXT,
    "price" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'created',
    "subscription_start" DATETIME NOT NULL,
    "subscription_end" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tournament_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "arena" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tournament" ("arena_id", "created_at", "description", "end_date", "id", "image", "price", "start_date", "status", "subscription_end", "subscription_start", "title", "updated_at") SELECT "arena_id", "created_at", "description", "end_date", "id", "image", "price", "start_date", "status", "subscription_end", "subscription_start", "title", "updated_at" FROM "tournament";
DROP TABLE "tournament";
ALTER TABLE "new_tournament" RENAME TO "tournament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
