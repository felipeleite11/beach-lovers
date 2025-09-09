/*
  Warnings:

  - You are about to drop the column `paid_amount` on the `subscription` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournament_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "subscription_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subscription_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subscription_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subscription" ("category_id", "created_at", "id", "person_id", "tournament_id") SELECT "category_id", "created_at", "id", "person_id", "tournament_id" FROM "subscription";
DROP TABLE "subscription";
ALTER TABLE "new_subscription" RENAME TO "subscription";
CREATE UNIQUE INDEX "subscription_tournament_id_person_id_category_id_key" ON "subscription"("tournament_id", "person_id", "category_id");
CREATE TABLE "new_tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "arena_id" TEXT,
    "price" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'created',
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
