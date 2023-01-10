"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractResult = exports.contractTricks = exports.contractMade = void 0;
const enums_1 = require("./enums");
const doubledNotVulnerable = [
    0, -100, -300, -500, -800, -1100, -1400, -1700, -2000, -2300, -2600, -2900,
    -3200, -3500,
];
const doubledVulnerable = [
    0, -200, -500, -800, -1100, -1400, -1700, -2000, -2300, -2600, -2900, -3200,
    -3500, -3800,
];
/** Scores a contract, based on what contract it would have made.
 *
 * Returns a score from declarers perspective. */
function contractMade(contract, vulnerable, made) {
    // All pass
    if (contract.level === 0)
        return 0;
    const overTricks = made - contract.level, doubled = contract.risk === "X", redoubled = contract.risk === "XX", strain = contract.suit;
    // Undertricks?
    if (made < 0) {
        if (contract.risk === "")
            return made * (vulnerable ? 100 : 50);
        let penalty = vulnerable
            ? doubledVulnerable[-made]
            : doubledNotVulnerable[-made];
        if (redoubled)
            penalty *= 2;
        return penalty;
    }
    let score = 0;
    // Contract Points
    switch (strain) {
        case "S":
        case "H":
            score = contract.level * 30;
            break;
        case "NT":
            score = contract.level * 30 + 10;
            break;
        case "C":
        case "D":
            score = contract.level * 20;
            break;
    }
    if (doubled)
        score *= 2;
    else if (redoubled)
        score *= 4;
    // Level Bonus
    if (score < 100)
        // Part score?
        score += 50;
    else {
        score += vulnerable ? 500 : 300; // game bonus
        if (contract.level === 7)
            // Grand slam?
            score += vulnerable ? 1500 : 1000;
        else if (contract.level === 6)
            // small slam?
            score += vulnerable ? 750 : 500;
    }
    // Insult bonus
    if (doubled)
        score += 50;
    else if (redoubled)
        score += 100;
    // Overtrick bonus
    if (overTricks > 0) {
        if (doubled)
            score += overTricks * (vulnerable ? 200 : 100);
        else if (redoubled)
            score += overTricks * (vulnerable ? 400 : 200);
        else {
            switch (strain) {
                case enums_1.Suit.S:
                case enums_1.Suit.H:
                case enums_1.Suit.NT:
                    score += overTricks * 30;
                    break;
                case enums_1.Suit.C:
                case enums_1.Suit.D:
                    score += overTricks * 20;
                    break;
            }
        }
    }
    return score;
}
exports.contractMade = contractMade;
/** Scores a contract, based on how many tricks were won.
 *
 * Returns a score from declarers perspective. */
function contractTricks(contract, vulnerable, tricks) {
    const need = contract.level + 6;
    const made = tricks < need ? tricks - need : tricks - 6;
    return contractMade(contract, vulnerable, made);
}
exports.contractTricks = contractTricks;
/** Scores a contract, based on how many undertricks or overtricks were won.
 *
 * Returns a score from declarers perspective. */
function contractResult(contract, vulnerable, relativeTricks) {
    return contractTricks(contract, vulnerable, relativeTricks + contract.level + 6);
}
exports.contractResult = contractResult;
