import { Prisma } from "@prisma/client";
import prisma from "../../../database";

export class TimeClassRoomRepository {
  public async listById(id: string) {
    return await prisma.horario_Sala.findUnique({
      where: { id },
      include: {
        sala: true,
        horario: true,
      },
      omit: {
        horarioId: true,
        salaId: true,
      },
    });
  }

  public async listAll() {
    return await prisma.horario_Sala.findMany({
      include: {
        sala: true,
        horario: true,
      },
      omit: {
        horarioId: true,
        salaId: true,
      },
    });
  }

  public async create(data: Prisma.Horario_SalaUncheckedCreateInput) {
    return await prisma.horario_Sala.create({
      data,
    });
  }

  public async update(
    id: string,
    data: Prisma.Horario_SalaUncheckedUpdateInput
  ) {
    return await prisma.horario_Sala.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string) {
    return await prisma.horario_Sala.delete({
      where: { id },
    });
  }

  public async timeClassRoomExists(
    horarioId: string,
    salaId: string
  ): Promise<boolean> {
    const timeClassRoom = await prisma.horario_Sala.findFirst({
      where: {
        horarioId,
        salaId,
      },
    });

    return !!timeClassRoom;
  }
}
