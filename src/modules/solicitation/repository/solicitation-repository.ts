import { Prisma, Solicitacao } from "@prisma/client";
import prisma from "../../../database";

export class SolicitationRepository {
  public async listAll(): Promise<Solicitacao[] | null> {
    const solicitations = await prisma.solicitacao.findMany();

    return solicitations;
  }

  public async findById(id: string): Promise<Solicitacao | null> {
    const solicitation = await prisma.solicitacao.findUnique({
      where: {
        id,
      },
    });

    return solicitation;
  }

  public async create(
    data: Prisma.SolicitacaoUncheckedCreateInput
  ): Promise<Solicitacao> {
    const solicitation = await prisma.solicitacao.create({
      data,
    });

    return solicitation;
  }

  public async update(
    id: string,
    data: Prisma.SolicitacaoUncheckedUpdateInput
  ): Promise<Solicitacao> {
    const solicitation = await prisma.solicitacao.update({
      where: {
        id,
      },
      data,
    });

    return solicitation;
  }

  public async delete(id: string): Promise<Solicitacao> {
    const solicitation = await prisma.solicitacao.delete({
      where: {
        id,
      },
    });

    return solicitation;
  }

  // public async listSolicitationsReserves(
  //   roomId: string,
  //   time: string,
  //   date: Date
  // ) {
  //   const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  //   const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  //   const solicitation = await prisma.solicitacao.findMany({
  //     where: {
  //       salaId: roomId,
  //       horario: time,
  //       data: {
  //         gte: startOfDay, // Maior ou igual ao início do dia
  //         lte: endOfDay, // Menor ou igual ao final do dia
  //       },
  //     },
  //   });

  //   return solicitation;
  // }

  public async listSolicitationsReserves(
    roomId: string,
    inicial_time: string,
    final_time: string,
    date: Date
  ) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const [inicialHour, inicialMinute] = inicial_time.split(":").map(Number);
    const [finalHour, finalMinute] = final_time.split(":").map(Number);

    const inicialDateTime = new Date(date);
    inicialDateTime.setHours(inicialHour, inicialMinute);

    const finalDateTime = new Date(date);
    finalDateTime.setHours(finalHour, finalMinute);

    const reserves = await prisma.solicitacao.findMany({
      where: {
        salaId: roomId,
        status: "Aprovada",
        data: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return reserves.filter(({ data, horarioInicio, horarioFim }) => {
      const [startHour, startMinute] = horarioInicio.split(":").map(Number);
      const [endHour, endMinute] = horarioFim.split(":").map(Number);

      const startsAt = new Date(data);
      startsAt.setHours(startHour, startMinute);

      const endsAt = new Date(data);
      endsAt.setHours(endHour, endMinute);

      return inicialDateTime < endsAt && finalDateTime > startsAt;
    });
  }
}
