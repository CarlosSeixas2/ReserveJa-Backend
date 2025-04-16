import { Prisma, Horario } from "@prisma/client";
import prisma from "../../../database";

export class TimeRepository {
  public async listAll(): Promise<Horario[]> {
    return prisma.horario.findMany();
  }

  public async listById(id: string): Promise<Horario | null> {
    return prisma.horario.findUnique({
      where: { id },
    });
  }

  public async create(data: Prisma.HorarioCreateInput): Promise<Horario> {
    return prisma.horario.create({ data });
  }

  public async update(
    id: string,
    data: Prisma.HorarioUpdateInput
  ): Promise<Horario> {
    return prisma.horario.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.horario.delete({
      where: { id },
    });
  }

  public async hasTimeOverlap(
    horarioInicio: string,
    horarioFim: string,
    excludeId?: string
  ): Promise<boolean> {
    const overlapping = await prisma.horario.findFirst({
      where: {
        NOT: {
          id: excludeId, // Ignora o horário sendo editado
        },
        AND: [
          {
            inicio: {
              lt: horarioFim, // início existente < fim novo
            },
          },
          {
            fim: {
              gt: horarioInicio, // fim existente > início novo
            },
          },
        ],
      },
    });

    return !!overlapping;
  }
}
