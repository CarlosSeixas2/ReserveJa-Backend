import { Tipo } from "@prisma/client";

export interface IUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: Tipo;
}

export class UserMemory {
  private users: IUser[] = [];

  public async listAll(): Promise<Omit<IUser, "senha">[]> {
    return this.users.map(({ senha, ...user }) => user);
  }

  public async listById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  public async create(data: Omit<IUser, "id">): Promise<IUser> {
    const newUser: IUser = { ...data, id: Math.random().toString() };
    this.users.push(newUser);
    return newUser;
  }

  public async update(
    id: string,
    data: Partial<Omit<IUser, "id">>
  ): Promise<IUser> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }

    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  public async delete(id: string): Promise<IUser> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }

    return this.users.splice(index, 1)[0];
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
