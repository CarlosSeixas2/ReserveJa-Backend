import { Prisma, Horarios_Solicitados } from "@prisma/client";
import prisma from "../../../database";

export class SolicitationTimeRepository {
  public async listAll(): Promise<Horarios_Solicitados[]> {
    const times = await prisma.horarios_Solicitados.findMany();

    return times;
  }

  public async listById(id: string): Promise<Horarios_Solicitados | null> {
    const time = await prisma.horarios_Solicitados.findUnique({
      where: {
        id,
      },
    });

    return time;
  }

  public async create(
    data: Prisma.Horarios_SolicitadosUncheckedCreateInput
  ): Promise<Horarios_Solicitados> {
    const time = await prisma.horarios_Solicitados.create({
      data,
    });

    return time;
  }

  public async update(
    id: string,
    data: Prisma.Horarios_SolicitadosUncheckedUpdateInput
  ): Promise<Horarios_Solicitados> {
    const time = await prisma.horarios_Solicitados.update({
      where: {
        id,
      },
      data,
    });
    return time;
  }

  public async delete(id: string): Promise<void> {
    await prisma.horarios_Solicitados.delete({
      where: {
        id,
      },
    });
  }
}
