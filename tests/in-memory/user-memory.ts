export interface IUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: "Professor" | "Aluno";
}

export class UserMemory {
  private users: IUser[] = [];

  public async save(user: IUser): Promise<void> {
    this.users.push(user);
  }

  public async create(user: Omit<IUser, "id">): Promise<IUser> {
    const newUser = { ...user, id: Math.random().toString() };
    this.users.push(newUser);
    return newUser;
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public async update(id: string, data: Partial<Omit<IUser, "id">>) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...data } : user
    );
  }

  public async findById(id: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findAll(): Promise<IUser[]> {
    return this.users;
  }
}
