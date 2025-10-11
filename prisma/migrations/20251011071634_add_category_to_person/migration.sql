/*
  Warnings:

  - You are about to drop the column `category` on the `person` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "categoryId" TEXT,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "defeats" INTEGER NOT NULL DEFAULT 0,
    "wos" INTEGER NOT NULL DEFAULT 0,
    "start_playing_date" DATETIME,
    "userId" TEXT NOT NULL,
    "birthdate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" TEXT,
    CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "person_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_person" ("birthdate", "createdAt", "defeats", "gender", "id", "image", "name", "slug", "start_playing_date", "updatedAt", "userId", "wins", "wos") SELECT "birthdate", "createdAt", "defeats", "gender", "id", "image", "name", "slug", "start_playing_date", "updatedAt", "userId", "wins", "wos" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE UNIQUE INDEX "person_slug_key" ON "person"("slug");
CREATE UNIQUE INDEX "person_userId_key" ON "person"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
