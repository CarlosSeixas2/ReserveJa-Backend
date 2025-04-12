import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { FindAllReserveTimeService } from "../services/find-all-reserves-time_class_room";

export function makeFindAllReservesTimeService() {
  const reservesTimeRepository = new ReservesTimeRepository();

  return new FindAllReserveTimeService(reservesTimeRepository);
}
