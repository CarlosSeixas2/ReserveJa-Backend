import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { FindByIdReserveTimeService } from "../services/find-by-id-reserves-time_class_room";

export function makeFindByIdReservesTimeService() {
  const reservesTimeRepository = new ReservesTimeRepository();

  return new FindByIdReserveTimeService(reservesTimeRepository);
}
