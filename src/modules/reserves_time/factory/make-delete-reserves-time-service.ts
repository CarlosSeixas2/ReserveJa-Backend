import { ReservesTimeRepository } from "../repository/reserves-time-repository";
import { DeleteReserveTimeService } from "../services/delete-reserves-time_class_room";

export function makeDeleteReservesTimeService() {
  const reservesTimeRepository = new ReservesTimeRepository();

  return new DeleteReserveTimeService(reservesTimeRepository);
}
