import { HorarioSolicitado, Prisma } from "@prisma/client";
import prisma from "../../../database";

export class SolicitationTimeRepository {
  public async listAll(): Promise<HorarioSolicitado[]> {
    const times = await prisma.horarioSolicitado.findMany();

    return times;
  }

  public async listById(id: string): Promise<HorarioSolicitado | null> {
    const time = await prisma.horarioSolicitado.findUnique({
      where: {
        id,
      },
    });

    return time;
  }

  public async create(
    data: Prisma.HorarioSolicitadoUncheckedCreateInput
  ): Promise<HorarioSolicitado> {
    const time = await prisma.horarioSolicitado.create({
      data,
    });

    return time;
  }

  public async update(
    id: string,
    data: Prisma.HorarioSolicitadoUncheckedUpdateInput
  ): Promise<HorarioSolicitado> {
    const time = await prisma.horarioSolicitado.update({
      where: {
        id,
      },
      data,
    });
    return time;
  }

  public async delete(id: string): Promise<void> {
    await prisma.horarioSolicitado.delete({
      where: {
        id,
      },
    });
  }

  public async deleteBySolicitationId(solicitationId: string): Promise<void> {
    await prisma.horarioSolicitado.deleteMany({
      where: {
        solicitacaoId: solicitationId,
      },
    });
  }
}
