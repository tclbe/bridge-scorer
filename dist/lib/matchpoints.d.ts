import { BoardResult } from "./result";
export declare function matchpoints(results: BoardResult[], scoring: {
    win: number;
    tie: number;
}): {
    result: BoardResult;
    mpsNS: {
        mps: number;
        percentage: number;
        rank: string;
    };
    mpsEW: {
        mps: number;
        percentage: number;
        rank: string;
    };
}[];
export declare function standard(games: BoardResult[]): {
    result: BoardResult;
    mpsNS: {
        mps: number;
        percentage: number;
        rank: string;
    };
    mpsEW: {
        mps: number;
        percentage: number;
        rank: string;
    };
}[];
export declare function ACBL(games: BoardResult[]): {
    result: BoardResult;
    mpsNS: {
        mps: number;
        percentage: number;
        rank: string;
    };
    mpsEW: {
        mps: number;
        percentage: number;
        rank: string;
    };
}[];
