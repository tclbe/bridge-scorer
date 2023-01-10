import { BoardResult } from "./result";
export declare function toImps(diff: number): number;
export declare function crossImps(results: BoardResult[]): {
    result: BoardResult;
    impsNS: number;
    impsEW: number;
}[];
export declare function calculateDatum(games: BoardResult[]): number;
export declare function butler(results: BoardResult[]): {
    result: BoardResult;
    impsNS: number;
    impsEW: number;
}[];
