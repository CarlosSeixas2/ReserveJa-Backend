import { Prisma } from "@prisma/client";
import prisma from "../../../database";

export class TimeClassRoomRepository {
  public async listById(id: string) {
    return await prisma.horarioSala.findUnique({
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
    return await prisma.horarioSala.findMany();
  }
  public async listAllGroupedBySala() {
    const resultados = await prisma.horarioSala.findMany({
      include: {
        horario: true,
      },
    });

    const agrupadoPorSala = Object.values(
      resultados.reduce((acc, item) => {
        const salaId = item.salaId;

        if (!acc[salaId]) {
          acc[salaId] = {
            salaId,
            horarios: [],
          };
        }

        acc[salaId].horarios.push(item.horario);

        return acc;
      }, {} as Record<string, { salaId: string; horarios: (typeof resultados)[0]["horario"][] }>)
    );

    return agrupadoPorSala;
  }

  public async listTimeByRoomId() {
    return await prisma.horarioSala.findMany({});
  }

  public async create(data: Prisma.HorarioSalaUncheckedCreateInput) {
    return await prisma.horarioSala.create({
      data,
    });
  }

  public async update(
    id: string,
    data: Prisma.HorarioSalaUncheckedUpdateInput
  ) {
    return await prisma.horarioSala.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string) {
    console.log("delete", id);

    return await prisma.horarioSala.delete({
      where: { id },
    });
  }

  public async timeClassRoomExists(
    horarioId: string,
    salaId: string
  ): Promise<boolean> {
    const timeClassRoom = await prisma.horarioSala.findFirst({
      where: {
        horarioId,
        salaId,
      },
    });

    return !!timeClassRoom;
  }
}
