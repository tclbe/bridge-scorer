import { Contract } from "./contract";
import { contractTricks } from "./contractScore";

export class BoardResult {
  tricks: number;
  score: number;

  constructor(
    public contract: Contract,
    public vulnerable: boolean,
    tricks: number
  ) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(tricks)) {
      throw Error("ValueError: tricks should be an integer between 0 and 13");
    }

    this.tricks = tricks;
    this.score = contractTricks(contract, vulnerable, tricks);
  }

  get scoreNS(): number {
    if (["N", "S"].includes(this.contract.by.toString())) {
      return this.score;
    } else {
      return -this.score;
    }
  }

  get scoreEW(): number {
    return -this.scoreNS;
  }
}
