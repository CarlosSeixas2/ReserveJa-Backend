/*
  Warnings:

  - You are about to drop the column `data_hora` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `disponivel` on the `Sala` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PROFESSOR', 'ALUNO');

-- CreateEnum
CREATE TYPE "StatusSolicitacao" AS ENUM ('PENDENTE', 'APROVADA', 'RECUSADA');

-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "data_hora",
DROP COLUMN "status",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Sala" DROP COLUMN "disponivel",
ADD COLUMN     "imagem" TEXT;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoUsuario" NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Tipo";

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,
    "aprovadorId" TEXT,
    "status" "StatusSolicitacao" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL,
    "inicio" TEXT NOT NULL,
    "fim" TEXT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioSala" (
    "id" TEXT NOT NULL,
    "salaId" TEXT NOT NULL,
    "horarioId" TEXT NOT NULL,

    CONSTRAINT "HorarioSala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioSolicitado" (
    "id" TEXT NOT NULL,
    "solicitacaoId" TEXT NOT NULL,
    "horarioSalaId" TEXT NOT NULL,

    CONSTRAINT "HorarioSolicitado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioReservado" (
    "id" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "horarioSalaId" TEXT NOT NULL,

    CONSTRAINT "HorarioReservado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_aprovadorId_fkey" FOREIGN KEY ("aprovadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioSala" ADD CONSTRAINT "HorarioSala_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioSala" ADD CONSTRAINT "HorarioSala_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioSolicitado" ADD CONSTRAINT "HorarioSolicitado_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "Solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioSolicitado" ADD CONSTRAINT "HorarioSolicitado_horarioSalaId_fkey" FOREIGN KEY ("horarioSalaId") REFERENCES "HorarioSala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioReservado" ADD CONSTRAINT "HorarioReservado_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioReservado" ADD CONSTRAINT "HorarioReservado_horarioSalaId_fkey" FOREIGN KEY ("horarioSalaId") REFERENCES "HorarioSala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
