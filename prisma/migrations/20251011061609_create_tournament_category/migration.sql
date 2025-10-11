/*
  Warnings:

  - You are about to drop the `_TournamentCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TournamentCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tournament_category" (
    "slots" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "tournament_id" TEXT NOT NULL,

    PRIMARY KEY ("tournament_id", "category_id"),
    CONSTRAINT "tournament_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_category_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
