import { Prisma, Reserva } from "@prisma/client";
import prisma from "../../../database";

export class ReserveRepository {
  public async listAll(): Promise<Reserva[]> {
    const reserves = await prisma.reserva.findMany();

    return reserves;
  }

  public async listById(id: string): Promise<Reserva | null> {
    const reserve = await prisma.reserva.findUnique({
      where: {
        id,
      },
    });

    return reserve;
  }

  public async listRoomReserves(
    roomId: string,
    time: string,
    date: Date
  ): Promise<Reserva[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const reserves = await prisma.reserva.findMany({
      where: {
        salaId: roomId,
        status: "Aprovada",
        horario: time,
        data: {
          gte: startOfDay, // Maior ou igual ao início do dia
          lte: endOfDay, // Menor ou igual ao final do dia
        },
      },
    });

    return reserves;
  }

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
}
