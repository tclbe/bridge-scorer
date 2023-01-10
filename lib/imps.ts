import { BoardResult } from "./result";

const imps = [
  { diff: 0, imps: 0 },
  { diff: 20, imps: 1 },
  { diff: 50, imps: 2 },
  { diff: 90, imps: 3 },
  { diff: 130, imps: 4 },
  { diff: 170, imps: 5 },
  { diff: 220, imps: 6 },
  { diff: 270, imps: 7 },
  { diff: 320, imps: 8 },
  { diff: 370, imps: 9 },
  { diff: 430, imps: 10 },
  { diff: 500, imps: 11 },
  { diff: 600, imps: 12 },
  { diff: 750, imps: 13 },
  { diff: 900, imps: 14 },
  { diff: 1100, imps: 15 },
  { diff: 1300, imps: 16 },
  { diff: 1500, imps: 17 },
  { diff: 1750, imps: 18 },
  { diff: 2000, imps: 19 },
  { diff: 2250, imps: 20 },
  { diff: 2500, imps: 21 },
  { diff: 3000, imps: 22 },
  { diff: 3500, imps: 23 },
  { diff: 4000, imps: 24 },
];

export function toImps(diff: number): number {
  const n = imps.length - 1;
  let sign = 1;
  if (diff < 0) {
    sign = -1;
    diff = 0 - diff;
  }
  for (let i = 0; i < n; ++i) {
    if (imps[i].diff <= diff && diff < imps[i + 1].diff) {
      return imps[i].imps * sign;
    }
  }
  return 24 * sign;
}

export function crossImps(results: BoardResult[]) {
  const crossImpsScore: {
    result: BoardResult;
    impsNS: number;
    impsEW: number;
  }[] = [];

  // Assign imps
  for (let i = 0; i < results.length; ++i) {
    let imps = 0;
    for (let j = 0; j < results.length; ++j) {
      if (i !== j) {
        imps += toImps(results[i].scoreNS - results[j].scoreNS);
      }
    }
    crossImpsScore.push({
      result: results[i],
      impsNS: imps / (results.length - 1),
      impsEW: -imps / (results.length - 1),
    });
  }
  return crossImpsScore;
}

export function calculateDatum(games: BoardResult[]) {
  if (games.length > 3) {
    games.sort(function (a, b) {
      return b.scoreNS - a.scoreNS;
    });
    const drops = Math.ceil((games.length - 10) / 15) + 1;
    games = games.slice(drops, -drops);
  }
  const sum = games.reduce(function (a, e) {
    return a + e.scoreNS;
  }, 0);
  return Math.round(sum / games.length / 10) * 10;
}

export function butler(results: BoardResult[]) {
  const butlerImpsScore: {
    result: BoardResult;
    impsNS: number;
    impsEW: number;
  }[] = [];
  // Determine the datum
  const datum = calculateDatum(results.slice());

  // Assign imps
  for (const result of results) {
    const score = result.scoreNS;
    const impsNS = toImps(score - datum);
    butlerImpsScore.push({
      result,
      impsNS,
      impsEW: -impsNS,
    });
  }

  return butlerImpsScore;
}
