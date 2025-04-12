/*
  Warnings:

  - You are about to drop the column `horarioFim` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFim` on the `Solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Solicitacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "horarioFim",
DROP COLUMN "horarioInicio",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Sala" ADD COLUMN     "imagem" TEXT;

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "horarioFim",
DROP COLUMN "horarioInicio",
DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL,
    "horarioInicio" TEXT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario_Sala" (
    "id" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "horarioId" TEXT NOT NULL,

    CONSTRAINT "Horario_Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horarios_Solicitados" (
    "id" TEXT NOT NULL,
    "solicitacaoId" TEXT NOT NULL,
    "horarioSalaId" TEXT NOT NULL,

    CONSTRAINT "Horarios_Solicitados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horarios_Reservados" (
    "id" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "horarioSalaId" TEXT NOT NULL,

    CONSTRAINT "Horarios_Reservados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_aprovadorId_fkey" FOREIGN KEY ("aprovadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario_Sala" ADD CONSTRAINT "Horario_Sala_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario_Sala" ADD CONSTRAINT "Horario_Sala_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Solicitados" ADD CONSTRAINT "Horarios_Solicitados_horarioSalaId_fkey" FOREIGN KEY ("horarioSalaId") REFERENCES "Horario_Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Solicitados" ADD CONSTRAINT "Horarios_Solicitados_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "Solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Reservados" ADD CONSTRAINT "Horarios_Reservados_horarioSalaId_fkey" FOREIGN KEY ("horarioSalaId") REFERENCES "Horario_Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horarios_Reservados" ADD CONSTRAINT "Horarios_Reservados_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
