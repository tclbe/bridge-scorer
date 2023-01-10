"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardResult = void 0;
const contractScore_1 = require("./contractScore");
class BoardResult {
    constructor(contract, vulnerable, tricks) {
        this.contract = contract;
        this.vulnerable = vulnerable;
        if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(tricks)) {
            throw Error("ValueError: tricks should be an integer between 0 and 13");
        }
        this.tricks = tricks;
        this.score = (0, contractScore_1.contractTricks)(contract, vulnerable, tricks);
    }
    get scoreNS() {
        if (["N", "S"].includes(this.contract.by.toString())) {
            return this.score;
        }
        else {
            return -this.score;
        }
    }
    get scoreEW() {
        return -this.scoreNS;
    }
}
exports.BoardResult = BoardResult;
