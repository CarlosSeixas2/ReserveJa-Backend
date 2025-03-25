/*
  Warnings:

  - You are about to drop the column `data_hora` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `horario` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "data_hora",
ADD COLUMN     "horario" TEXT NOT NULL;
