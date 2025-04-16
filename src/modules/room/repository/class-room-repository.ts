import { Prisma, Sala } from "@prisma/client";
import prisma from "../../../database";

export class RoomClassRepository {
  public async listAll(): Promise<Sala[]> {
    return prisma.sala.findMany();
  }

  public async listById(id: string): Promise<Sala | null> {
    return prisma.sala.findUnique({
      where: { id },
    });
  }

  public async create(data: Prisma.SalaCreateInput): Promise<Sala> {
    return prisma.sala.create({ data });
  }

  public async update(id: string, data: Prisma.SalaUpdateInput): Promise<Sala> {
    return prisma.sala.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string): Promise<Sala> {
    return prisma.sala.delete({
      where: { id },
    });
  }
}
