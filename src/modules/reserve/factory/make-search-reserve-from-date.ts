import { ReserveRepository } from "../repository/reserve-repository";
import { SearchReserveFromDateService } from "../services/search-reserve-from-date";

export function makeSearchReserveFromDate() {
  const roomRepository = new ReserveRepository();
  return new SearchReserveFromDateService(roomRepository);
}
