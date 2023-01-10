import {
  contractMade,
  contractResult,
  contractTricks,
} from "./lib/contractScore";
import { ACBL, standard } from "./lib/matchpoints";
import { crossImps, calculateDatum, butler } from "./lib/imps";

export const scorer = {
  contractMade,
  contractResult,
  contractTricks,
  ACBL,
  standard,
  crossImps,
  calculateDatum,
  butler,
};
