import { Contract } from "./contract";
export declare class BoardResult {
    contract: Contract;
    vulnerable: boolean;
    tricks: number;
    score: number;
    constructor(contract: Contract, vulnerable: boolean, tricks: number);
    get scoreNS(): number;
    get scoreEW(): number;
}
