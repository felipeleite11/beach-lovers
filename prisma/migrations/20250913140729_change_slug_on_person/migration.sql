/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "person_slug_key" ON "person"("slug");
