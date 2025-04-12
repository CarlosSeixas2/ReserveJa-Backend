import { TimeRepository } from "../repository/time-repository";
import { UpdateTimeService } from "../services/update-time";

export function makeUpdateTime() {
  const timeRepository = new TimeRepository();

  return new UpdateTimeService(timeRepository);
}
