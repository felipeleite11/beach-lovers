-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "defeats" INTEGER NOT NULL DEFAULT 0,
    "wos" INTEGER NOT NULL DEFAULT 0,
    "start_playing_date" DATETIME,
    "userId" TEXT NOT NULL,
    "birthdate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" TEXT,
    CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_person" ("birthdate", "category", "createdAt", "gender", "id", "image", "name", "slug", "start_playing_date", "updatedAt", "userId") SELECT "birthdate", "category", "createdAt", "gender", "id", "image", "name", "slug", "start_playing_date", "updatedAt", "userId" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE UNIQUE INDEX "person_userId_key" ON "person"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
