import { Prisma, Sala } from "@prisma/client";
import prisma from "../../../database";

export class RoomClassRepository {
  public async listAll(): Promise<Sala[] | null> {
    const rooms = await prisma.sala.findMany();

    return rooms;
  }

  public async listById(id: string): Promise<Sala | null> {
    const room = await prisma.sala.findUnique({
      where: {
        id,
      },
    });

    return room;
  }

  public async create(data: Prisma.SalaCreateInput) {
    return await prisma.sala.create({
      data,
    });
  }

  public async update(id: string, data: Prisma.SalaUpdateInput) {
    return await prisma.sala.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: string) {
    return await prisma.sala.delete({
      where: {
        id,
      },
    });
  }
}
