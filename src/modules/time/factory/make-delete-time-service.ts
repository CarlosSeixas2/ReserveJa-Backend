import { TimeRepository } from "../repository/time-repository";
import { DeleteTimeService } from "../services/delete-time";

export function makeDeleteTime() {
  const timeRepository = new TimeRepository();

  return new DeleteTimeService(timeRepository);
}
