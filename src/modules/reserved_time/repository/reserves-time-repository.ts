import { HorarioReservado, Prisma } from "@prisma/client";
import prisma from "../../../database";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export class ReservesTimeRepository {
  public async listAll() {
    const times = await prisma.horarioReservado.findMany({
      orderBy: {
        criadoEm: "desc",
      },
    });

    return times;
  }

  public async listById(id: string) {
    const time = await prisma.horarioReservado.findUnique({
      where: {
        id,
      },
      include: {
        horarioSala: {
          include: {
            sala: true,
            horario: true,
          },
          omit: {
            salaId: true,
            horarioId: true,
          },
        },
      },
      omit: {
        horarioSalaId: true,
      },
    });

    return time;
  }

  public async create(data: Prisma.HorarioReservadoUncheckedCreateInput) {
    const time = await prisma.horarioReservado.create({
      data,
    });

    return time;
  }

  public async update(
    id: string,
    data: Prisma.HorarioReservadoUncheckedUpdateInput
  ): Promise<HorarioReservado> {
    const time = await prisma.horarioReservado.update({
      where: {
        id,
      },
      data,
    });
    return time;
  }

  public async delete(id: string): Promise<void> {
    await prisma.horarioReservado.delete({
      where: {
        id,
      },
    });
  }

  public async findConflictingTimes(
    date: Date,
    roomId: string,
    timeIds: string[]
  ) {
    dayjs.extend(utc);

    const startOfDay = dayjs(date).utc().startOf("day").toDate();
    const endOfDay = dayjs(date).utc().endOf("day").toDate();

    return await prisma.horarioReservado.findMany({
      where: {
        horarioSalaId: {
          in: timeIds,
        },
        horarioSala: {
          salaId: roomId,
        },
        criadoEm: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }
}
