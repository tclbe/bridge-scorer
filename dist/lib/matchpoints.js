"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACBL = exports.standard = exports.matchpoints = void 0;
function matchpoints(results, scoring) {
    // Get the played games
    const mpsScore = [];
    for (const result of results) {
        mpsScore.push({
            result,
            mpsNS: { mps: 0, percentage: 0, rank: "" },
            mpsEW: { mps: 0, percentage: 0, rank: "" },
        });
    }
    const sorted = mpsScore.slice();
    const totalMatchpoints = mpsScore.length * scoring.win - scoring.win;
    // Order the played games by descending NS score (highest score first)
    sorted.sort((a, b) => b.result.scoreNS - a.result.scoreNS);
    // Assign the matchpoints to played hands.
    let i = 0;
    const n = mpsScore.length - 1;
    while (i <= n) {
        const p = sorted[i];
        let matchpoints = 0;
        const score = p.result.scoreNS;
        let ties = 0;
        for (let j = i + 1; j <= n && score === sorted[j].result.scoreNS; ++j) {
            ++ties;
            matchpoints += scoring.tie;
        }
        matchpoints += scoring.win * (n - i - ties);
        const mpsNS = {
            mps: matchpoints,
            percentage: (matchpoints / totalMatchpoints) * 100,
            rank: (i + 1).toString(),
        };
        const mpsEW = {
            mps: totalMatchpoints - matchpoints,
            percentage: ((totalMatchpoints - matchpoints) / totalMatchpoints) * 100,
            rank: "0",
        };
        if (ties > 0) {
            mpsNS.rank += "=";
        }
        for (let j = 0; j <= ties; ++j) {
            sorted[i].mpsNS = mpsNS;
            sorted[i].mpsEW = mpsEW;
            ++i;
        }
    }
    // rank EW
    sorted.reverse();
    i = 0;
    while (i <= n) {
        const p = sorted[i];
        let ties = 0;
        for (let j = i + 1; j <= n && p.mpsEW.mps === sorted[j].mpsEW.mps; ++j) {
            ++ties;
        }
        p.mpsEW.rank = (i + 1).toString();
        if (ties > 0) {
            p.mpsEW.rank += "=";
        }
        for (let j = 0; j <= ties; ++j) {
            sorted[i].mpsEW.rank = p.mpsEW.rank;
            ++i;
        }
    }
    return mpsScore;
}
exports.matchpoints = matchpoints;
function standard(games) {
    return matchpoints(games, { win: 2, tie: 1 });
}
exports.standard = standard;
function ACBL(games) {
    return matchpoints(games, { win: 1.0, tie: 0.5 });
}
exports.ACBL = ACBL;
