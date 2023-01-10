/*eslint-disable*/
"use strict"

var scorer = (module.exports = {})

scorer.contractMade = require("./dist/contractScore").contractMade
scorer.contractTricks = require("./dist/contractScore").contractTricks
scorer.contractResult = require("./dist/contractScore").contractResult
scorer.matchpoints = require("./dist/matchpoints").standard
scorer.matchpointsACBL = require("./dist/matchpoints").ACBL
scorer.crossImps = require("./dist/imps").crossImps
scorer.calculateDatum = require("./dist/imps").calculateDatum
scorer.butler = require("./dist/imps").butler
scorer.rank = require("./dist/rank")
