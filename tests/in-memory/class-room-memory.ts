interface IClassRoom {
  id: string;
  nome: string;
  capacidade: number;
  disponivel: boolean;
}

export class ClassRoomMemory {
  private classRooms: IClassRoom[] = [];

  public async listAll(): Promise<IClassRoom[]> {
    return this.classRooms;
  }

  public async listById(id: string): Promise<IClassRoom | null> {
    return this.classRooms.find((classRoom) => classRoom.id === id) ?? null;
  }

  public async create(data: Omit<IClassRoom, "id">): Promise<IClassRoom> {
    const newClassRoom: IClassRoom = { ...data, id: Math.random().toString() };
    this.classRooms.push(newClassRoom);
    return newClassRoom;
  }

  public async update(
    id: string,
    data: Partial<Omit<IClassRoom, "id">>
  ): Promise<IClassRoom | null> {
    const index = this.classRooms.findIndex((classRoom) => classRoom.id === id);
    if (index === -1) {
      return null;
    }

    this.classRooms[index] = { ...this.classRooms[index], ...data };
    return this.classRooms[index];
  }

  public async delete(id: string): Promise<IClassRoom | null> {
    const index = this.classRooms.findIndex((classRoom) => classRoom.id === id);
    if (index === -1) {
      return null;
    }

    return this.classRooms.splice(index, 1)[0];
  }
}
