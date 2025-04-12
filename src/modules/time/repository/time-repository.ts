import { Prisma, Horario } from "@prisma/client";
import prisma from "../../../database";

export class TimeRepository {
  public async listAll(): Promise<Horario[]> {
    const times = await prisma.horario.findMany();

    return times;
  }

  public async listById(id: string): Promise<Horario | null> {
    const time = await prisma.horario.findUnique({
      where: {
        id,
      },
    });

    return time;
  }

  public async create(data: Prisma.HorarioCreateInput): Promise<Horario> {
    const time = await prisma.horario.create({
      data,
    });

    return time;
  }

  public async update(
    id: string,
    data: Prisma.HorarioUpdateInput
  ): Promise<Horario> {
    const time = await prisma.horario.update({
      where: {
        id,
      },
      data,
    });
    return time;
  }

  public async delete(id: string): Promise<void> {
    await prisma.horario.delete({
      where: {
        id,
      },
    });
  }

  public async findByTime(
    inicialTime: string,
    finalTime: string
  ): Promise<Horario | null> {
    const time = await prisma.horario.findFirst({
      where: {
        horarioInicio: inicialTime,
        horarioFim: finalTime,
      },
    });

    return time;
  }
}
