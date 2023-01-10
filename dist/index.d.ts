import { contractMade, contractResult, contractTricks } from "./lib/contractScore";
import { ACBL, standard } from "./lib/matchpoints";
import { crossImps, calculateDatum, butler } from "./lib/imps";
export declare const scorer: {
    contractMade: typeof contractMade;
    contractResult: typeof contractResult;
    contractTricks: typeof contractTricks;
    ACBL: typeof ACBL;
    standard: typeof standard;
    crossImps: typeof crossImps;
    calculateDatum: typeof calculateDatum;
    butler: typeof butler;
};
