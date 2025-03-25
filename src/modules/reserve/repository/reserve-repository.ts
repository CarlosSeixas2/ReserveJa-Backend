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
    time: string
  ): Promise<Reserva[]> {
    const reserves = await prisma.reserva.findMany({
      where: {
        salaId: roomId,
        status: "Aprovada",
        horario: time,
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
