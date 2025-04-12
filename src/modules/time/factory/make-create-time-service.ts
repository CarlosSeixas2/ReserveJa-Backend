import { TimeRepository } from "../repository/time-repository";
import { CreateTimeService } from "../services/create-time";

export function makeCreateTime() {
  const timeRepository = new TimeRepository();

  return new CreateTimeService(timeRepository);
}
