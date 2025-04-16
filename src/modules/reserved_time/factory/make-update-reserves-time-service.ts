import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { UpdateReserveTimeService } from "../services/update-reserves-time_class_room";

export function makeUpdateReservesTimeService() {
  const reservesTimeRepository = new ReservesTimeRepository();

  return new UpdateReserveTimeService(reservesTimeRepository);
}
