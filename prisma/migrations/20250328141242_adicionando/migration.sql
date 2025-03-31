/*
  Warnings:

  - You are about to drop the column `horario` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Solicitacao` table. All the data in the column will be lost.
  - Added the required column `horarioFim` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioFim` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "horario",
ADD COLUMN     "horarioFim" TEXT NOT NULL,
ADD COLUMN     "horarioInicio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "horario",
ADD COLUMN     "horarioFim" TEXT NOT NULL,
ADD COLUMN     "horarioInicio" TEXT NOT NULL;
