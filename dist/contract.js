"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
class Contract {
    constructor(level, suit, risk, by, lead) {
        this.suit = suit;
        this.by = by;
        this.lead = lead;
        if (![0, 1, 2, 3, 4, 5, 6, 7].includes(level)) {
            throw Error("ValueError: level should be integer between 0 and 7 (0 is passed)");
        }
        if (!["", "X", "XX"].includes(risk.toUpperCase())) {
            throw Error("ValueError: risk should be one of 'X', 'XX'");
        }
        this.level = level;
        this.risk = risk.toUpperCase();
    }
}
exports.Contract = Contract;
