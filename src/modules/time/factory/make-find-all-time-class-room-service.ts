import { TimeRepository } from "../repository/time-repository";
import { FindAllTimeService } from "../services/find-all-time";

export function makeFindAllTime() {
  const timeRepository = new TimeRepository();

  return new FindAllTimeService(timeRepository);
}
