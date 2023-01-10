"use strict";

function rank(results) {
  // Order the results by descending score (highest score first)
  results = results.slice().sort(function (a, b) {
    return b.score - a.score;
  });

  // Assign the rank
  let i = 0,
    j;
  const n = results.length - 1;
  let maxRank = 0;
  let r;
  while (i <= n) {
    r = results[i];
    const score = r.score;
    let ties = 0;
    for (j = i + 1; j <= n && score === results[j].score; ++j) {
      ++ties;
    }
    maxRank = i + 1;
    r.rank = maxRank.toString();
    if (ties > 0) {
      r.rank += "=";
    }
    for (j = 0; j < ties; ++j) {
      results[++i].rank = r.rank;
    }
    ++i;
  }

  for (i = 0; i <= n; ++i) {
    r = results[i];
    const rank = parseInt(r.rank, 10);
    if (rank === 1) {
      r.scale = 1;
    } else {
      r.scale = (maxRank - rank) / maxRank;
    }
  }

  return results;
}

module.exports = rank;
