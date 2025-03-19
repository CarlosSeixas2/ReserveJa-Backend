import { Prisma, Usuario } from "@prisma/client";
import prisma from "../../../database";

export class UserRepository {
  public async listAll(): Promise<Omit<Usuario, "senha">[] | null> {
    const users = await prisma.usuario.findMany({
      omit: {
        senha: true,
      },
    });
    return users;
  }

  public async listById(id: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  public async create(data: Prisma.UsuarioCreateInput) {
    const user = await prisma.usuario.create({
      data,
    });
    return user;
  }

  public async update(id: string, data: Prisma.UsuarioUpdateInput) {
    const user = await prisma.usuario.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }

  public async delete(id: string) {
    const user = await prisma.usuario.delete({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
