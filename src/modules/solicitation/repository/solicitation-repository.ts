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
}
