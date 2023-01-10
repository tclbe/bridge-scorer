import { Contract } from "./contract";
/** Scores a contract, based on what contract it would have made.
 *
 * Returns a score from declarers perspective. */
export declare function contractMade(contract: Contract, vulnerable: boolean, made: number): number;
/** Scores a contract, based on how many tricks were won.
 *
 * Returns a score from declarers perspective. */
export declare function contractTricks(contract: Contract, vulnerable: boolean, tricks: number): number;
/** Scores a contract, based on how many undertricks or overtricks were won.
 *
 * Returns a score from declarers perspective. */
export declare function contractResult(contract: Contract, vulnerable: boolean, relativeTricks: number): number;
