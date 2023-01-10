import { Contract } from "./contract";
import { Suit } from "./enums";

const doubledNotVulnerable: number[] = [
  0, -100, -300, -500, -800, -1100, -1400, -1700, -2000, -2300, -2600, -2900,
  -3200, -3500,
];

const doubledVulnerable: number[] = [
  0, -200, -500, -800, -1100, -1400, -1700, -2000, -2300, -2600, -2900, -3200,
  -3500, -3800,
];

/** Scores a contract, based on what contract it would have made.
 *
 * Returns a score from declarers perspective. */
export function contractMade(
  contract: Contract,
  vulnerable: boolean,
  made: number
): number {
  // All pass
  if (contract.level === 0) return 0;

  const overTricks = made - contract.level,
    doubled = contract.risk === "X",
    redoubled = contract.risk === "XX",
    strain = contract.suit;

  // Undertricks?
  if (made < 0) {
    if (contract.risk === "") return made * (vulnerable ? 100 : 50);
    let penalty = vulnerable
      ? doubledVulnerable[-made]
      : doubledNotVulnerable[-made];
    if (redoubled) penalty *= 2;
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
  if (doubled) score *= 2;
  else if (redoubled) score *= 4;

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
  if (doubled) score += 50;
  else if (redoubled) score += 100;

  // Overtrick bonus
  if (overTricks > 0) {
    if (doubled) score += overTricks * (vulnerable ? 200 : 100);
    else if (redoubled) score += overTricks * (vulnerable ? 400 : 200);
    else {
      switch (strain) {
        case Suit.S:
        case Suit.H:
        case Suit.NT:
          score += overTricks * 30;
          break;
        case Suit.C:
        case Suit.D:
          score += overTricks * 20;
          break;
      }
    }
  }

  return score;
}

/** Scores a contract, based on how many tricks were won.
 *
 * Returns a score from declarers perspective. */
export function contractTricks(
  contract: Contract,
  vulnerable: boolean,
  tricks: number
): number {
  const need = contract.level + 6;
  const made = tricks < need ? tricks - need : tricks - 6;
  return contractMade(contract, vulnerable, made);
}

/** Scores a contract, based on how many undertricks or overtricks were won.
 *
 * Returns a score from declarers perspective. */
export function contractResult(
  contract: Contract,
  vulnerable: boolean,
  relativeTricks: number
): number {
  return contractTricks(
    contract,
    vulnerable,
    relativeTricks + contract.level + 6
  );
}
