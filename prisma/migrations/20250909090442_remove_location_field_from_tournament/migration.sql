/*
  Warnings:

  - You are about to drop the column `location` on the `tournament` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "arena_id" TEXT,
    "subscription_start" DATETIME NOT NULL,
    "subscription_end" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tournament_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "arena" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tournament" ("arena_id", "created_at", "date", "description", "id", "subscription_end", "subscription_start", "title", "updated_at") SELECT "arena_id", "created_at", "date", "description", "id", "subscription_end", "subscription_start", "title", "updated_at" FROM "tournament";
DROP TABLE "tournament";
ALTER TABLE "new_tournament" RENAME TO "tournament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
