import { Prisma, Reserva } from "@prisma/client";
import prisma from "../../../database";

export class ReserveRepository {
  public async listAll(): Promise<Reserva[]> {
    const reserves = await prisma.reserva.findMany();

    return reserves;
  }

  public async listById(id: string) {
    const reserve = await prisma.reserva.findUnique({
      where: {
        id,
      },
      include: {
        sala: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            email: true,
          },
        },
      },
      omit: {
        salaId: true,
        usuarioId: true,
      },
    });

    return reserve;
  }

  // public async listRoomReserves(
  //   roomId: string,
  //   inicial_time: string,
  //   final_time: string,
  //   date: Date
  // ): Promise<Reserva[]> {
  //   const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  //   const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  //   const [inicialHour, inicialMinute] = inicial_time.split(":").map(Number);
  //   const [finalHour, finalMinute] = final_time.split(":").map(Number);

  //   const inicialDateTime = new Date(date);
  //   inicialDateTime.setHours(inicialHour, inicialMinute);

  //   const finalDateTime = new Date(date);
  //   finalDateTime.setHours(finalHour, finalMinute);

  //   const reserves = await prisma.reserva.findMany({
  //     where: {
  //       salaId: roomId,
  //       data: {
  //         gte: startOfDay,
  //         lte: endOfDay,
  //       },
  //     },
  //   });

  //   return reserves.filter(({ data, horarioInicio, horarioFim }) => {
  //     const [startHour, startMinute] = horarioInicio.split(":").map(Number);
  //     const [endHour, endMinute] = horarioFim.split(":").map(Number);

  //     const startsAt = new Date(data);
  //     startsAt.setHours(startHour, startMinute);

  //     const endsAt = new Date(data);
  //     endsAt.setHours(endHour, endMinute);

  //     return inicialDateTime < endsAt && finalDateTime > startsAt;
  //   });
  // }

  public async create(
    data: Prisma.ReservaUncheckedCreateInput
  ): Promise<Reserva> {
    return await prisma.reserva.create({
      data,
    });
  }

  public async update(
    id: string,
    data: Prisma.ReservaUncheckedUpdateInput
  ): Promise<void> {
    await prisma.reserva.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.reserva.delete({
      where: {
        id,
      },
    });
  }

  // public async searchReserveFromDate(id: string, date: Date) {
  //   const startOfDay = new Date(date);
  //   startOfDay.setHours(0, 0, 0, 0);

  //   const endOfDay = new Date(date);
  //   endOfDay.setHours(23, 59, 59, 999);

  //   const reserves = await prisma.reserva.findMany({
  //     where: {
  //       salaId: id,
  //       status: "Aprovada",
  //       data: {
  //         gte: startOfDay,
  //         lte: endOfDay,
  //       },
  //     },
  //   });

  //   const uniqueTimes = new Set<string>();
  //   const horario: any = [];

  //   reserves.map((item) => {
  //     const key = `${item.horarioInicio}-${item.horarioFim}`;
  //     if (!uniqueTimes.has(key)) {
  //       uniqueTimes.add(key);
  //       horario.push(item.horarioInicio);
  //       horario.push(item.horarioFim);
  //     }
  //   });

  //   return horario;
  // }
}
