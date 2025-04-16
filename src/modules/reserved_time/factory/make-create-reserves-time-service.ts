import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { CreateReserveTimeService } from "../services/create-reserves-time_class_room";

export function makeCreateReservesTimeService() {
  const reservesTimeRepository = new ReservesTimeRepository();

  return new CreateReserveTimeService(reservesTimeRepository);
}
