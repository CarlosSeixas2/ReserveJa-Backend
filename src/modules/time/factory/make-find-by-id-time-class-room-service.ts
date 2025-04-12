import { TimeRepository } from "../repository/time-repository";
import { FindByIdTimeService } from "../services/find-by-id-time";

export function makeFindByIdTime() {
  const timeRepository = new TimeRepository();

  return new FindByIdTimeService(timeRepository);
}
