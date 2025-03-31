import { Status } from "@prisma/client";

export interface IReserve {
  id: string;
  salaId: string;
  usuarioId: string;
  horarioInicio: string;
  horarioFim: string;
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

  public async listRoomReserves(
    roomId: string,
    inicial_time: string,
    final_time: string,
    date: Date
  ): Promise<IReserve[]> {
    const reservationDate = new Date(date);
    reservationDate.setHours(0, 0, 0, 0);

    const [inicialHour, inicialMinute] = inicial_time.split(":").map(Number);
    const [finalHour, finalMinute] = final_time.split(":").map(Number);
    const startMinutes = inicialHour * 60 + inicialMinute;
    const endMinutes = finalHour * 60 + finalMinute;

    return this.reserves.filter((reserve) => {
      if (reserve.salaId !== roomId || reserve.status !== "Aprovada") {
        return false;
      }

      const reserveDate = new Date(reserve.data);
      reserveDate.setHours(0, 0, 0, 0);
      if (reserveDate.getTime() !== reservationDate.getTime()) {
        return false;
      }

      const [reserveStartHour, reserveStartMinute] = reserve.horarioInicio
        .split(":")
        .map(Number);
      const [reserveEndHour, reserveEndMinute] = reserve.horarioFim
        .split(":")
        .map(Number);
      const reserveStartMinutes = reserveStartHour * 60 + reserveStartMinute;
      const reserveEndMinutes = reserveEndHour * 60 + reserveEndMinute;

      return (
        (startMinutes >= reserveStartMinutes &&
          startMinutes < reserveEndMinutes) || // Novo horário começa durante uma reserva existente
        (endMinutes > reserveStartMinutes && endMinutes <= reserveEndMinutes) || // Novo horário termina durante uma reserva existente
        (startMinutes <= reserveStartMinutes && endMinutes >= reserveEndMinutes) // Novo horário engloba uma reserva existente
      );
    });
  }
}
