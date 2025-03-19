import { Prisma, Reserva } from "@prisma/client";
import prisma from "../../../database";

export class ReserveRepository {
  public async listAll(): Promise<Reserva[] | null> {
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

  public async create(data: Prisma.ReservaUncheckedCreateInput) {
    return await prisma.reserva.create({
      data,
    });
  }

  public async update(id: string, data: Prisma.ReservaUncheckedUpdateInput) {
    return await prisma.reserva.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: string) {
    return await prisma.reserva.delete({
      where: {
        id,
      },
    });
  }
}
