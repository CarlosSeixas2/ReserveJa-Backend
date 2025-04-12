/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Horarios_Reservados` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Horarios_Solicitados` table. All the data in the column will be lost.
  - Added the required column `horarioFim` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "horarioFim" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Horarios_Reservados" DROP COLUMN "dateTime";

-- AlterTable
ALTER TABLE "Horarios_Solicitados" DROP COLUMN "dateTime";
