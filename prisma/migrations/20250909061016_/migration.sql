/*
  Warnings:

  - Added the required column `slug` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,
    CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    CONSTRAINT "post_image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "person_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "like_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "person_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    CONSTRAINT "comment_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "subscription_start" DATETIME NOT NULL,
    "subscription_end" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arena_id" TEXT,
    CONSTRAINT "tournament_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "arena" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tournament_info_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "tournament_id" TEXT NOT NULL,
    CONSTRAINT "tournament_info_item_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_amount" INTEGER,
    "tournament_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "subscription_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subscription_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subscription_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tournament_slot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournament_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tournament_slot_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tournament_slot_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "region" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "arena" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image_url" TEXT,
    "map_link" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "region_id" TEXT,
    CONSTRAINT "arena_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "arena_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "arena_id" TEXT NOT NULL,
    CONSTRAINT "arena_image_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "arena" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    CONSTRAINT "equipment_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "announcement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "person_id" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "announcement_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "announcement_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "announcement_id" TEXT NOT NULL,
    CONSTRAINT "announcement_image_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "phone" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "teacher_rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "person_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    CONSTRAINT "teacher_rating_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teacher_rating_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL,
    "tournament_id" TEXT NOT NULL,
    "arena_id" TEXT NOT NULL,
    "winner_team_member_id" TEXT,
    CONSTRAINT "match_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "arena" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_winner_team_member_id_fkey" FOREIGN KEY ("winner_team_member_id") REFERENCES "team_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match_team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "match_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "score" INTEGER,
    CONSTRAINT "match_team_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "team_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    CONSTRAINT "team_member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_member_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "person_rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rater_id" TEXT NOT NULL,
    "rated_id" TEXT NOT NULL,
    CONSTRAINT "person_rating_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "person_rating_rated_id_fkey" FOREIGN KEY ("rated_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TournamentManagement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TournamentManagement_A_fkey" FOREIGN KEY ("A") REFERENCES "person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TournamentManagement_B_fkey" FOREIGN KEY ("B") REFERENCES "tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TournamentCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TournamentCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TournamentCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TeacherArenas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TeacherArenas_A_fkey" FOREIGN KEY ("A") REFERENCES "arena" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TeacherArenas_B_fkey" FOREIGN KEY ("B") REFERENCES "teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "gender" TEXT,
    "start_playing_date" DATETIME,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_person" ("createdAt", "id", "name", "start_playing_date", "updatedAt", "userId") SELECT "createdAt", "id", "name", "start_playing_date", "updatedAt", "userId" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE UNIQUE INDEX "person_userId_key" ON "person"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "like_person_id_post_id_key" ON "like"("person_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_tournament_id_person_id_category_id_key" ON "subscription"("tournament_id", "person_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "region_name_key" ON "region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_person_id_key" ON "equipment"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_rating_person_id_teacher_id_key" ON "teacher_rating"("person_id", "teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "match_team_match_id_team_id_key" ON "match_team"("match_id", "team_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_member_team_id_person_id_key" ON "team_member"("team_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_rating_rater_id_rated_id_key" ON "person_rating"("rater_id", "rated_id");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentManagement_AB_unique" ON "_TournamentManagement"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentManagement_B_index" ON "_TournamentManagement"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentCategories_AB_unique" ON "_TournamentCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentCategories_B_index" ON "_TournamentCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherArenas_AB_unique" ON "_TeacherArenas"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherArenas_B_index" ON "_TeacherArenas"("B");
