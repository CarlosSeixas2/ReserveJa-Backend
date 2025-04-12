import { Prisma, Horarios_Reservados } from "@prisma/client";
import prisma from "../../../database";

export class ReservesTimeRepository {
  public async listAll(): Promise<Horarios_Reservados[]> {
    const times = await prisma.horarios_Reservados.findMany();

    return times;
  }

  public async listById(id: string): Promise<Horarios_Reservados | null> {
    const time = await prisma.horarios_Reservados.findUnique({
      where: {
        id,
      },
    });

    return time;
  }

  public async create(reserve_id: string, class_room_time_id: string) {
    const time = await prisma.horarios_Reservados.create({
      data: {
        horarioSalaId: class_room_time_id,
        reservaId: reserve_id,
      },
    });

    return time;
  }

  public async update(
    id: string,
    data: Prisma.Horarios_ReservadosUncheckedUpdateInput
  ): Promise<Horarios_Reservados> {
    const time = await prisma.horarios_Reservados.update({
      where: {
        id,
      },
      data,
    });
    return time;
  }

  public async delete(id: string): Promise<void> {
    await prisma.horarios_Reservados.delete({
      where: {
        id,
      },
    });
  }

  public async findReserveByDate(
    id: string,
    date: string
  ): Promise<Horarios_Reservados | null> {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return prisma.horarios_Reservados.findFirst({
      where: {
        horarioSalaId: id,
        reserva: {
          data: {
            gte: start,
            lte: end,
          },
        },
      },
    });
  }
}
