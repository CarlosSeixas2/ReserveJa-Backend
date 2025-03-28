import { Status } from "@prisma/client";

export interface IReserve {
  id: string;
  salaId: string;
  usuarioId: string;
  horario: string;
  status: Status;
  data: Date;
}

export class ReserveMemory {
  private reserves: IReserve[] = [];

  public async listAll(): Promise<IReserve[]> {
    return this.reserves ?? [];
  }

  public async listById(id: string): Promise<IReserve | null> {
    return this.reserves.find((reserve) => reserve.id === id) ?? null;
  }

  public async listRoomReserves(
    roomId: string,
    time: string,
    date: Date
  ): Promise<IReserve[]> {
    return this.reserves.filter(
      (reserve) =>
        reserve.salaId === roomId &&
        reserve.horario === time &&
        reserve.status === "Aprovada"
    );
  }

  public async create(data: Omit<IReserve, "id">): Promise<IReserve> {
    const newReserve: IReserve = { ...data, id: Math.random().toString() };
    this.reserves.push(newReserve);
    return newReserve;
  }

  public async update(id: string, data: IReserve): Promise<void> {
    const reserveIndex = this.reserves.findIndex(
      (reserve) => reserve.id === id
    );

    this.reserves[reserveIndex] = {
      ...this.reserves[reserveIndex],
      ...data,
    };
  }

  public async delete(id: string): Promise<void> {
    this.reserves = this.reserves.filter((reserve) => reserve.id !== id);
  }
}
