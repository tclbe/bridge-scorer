var scorer = require("..")
var expect = require("chai").expect
const { Contract } = require("../dist/contract")
const { BoardResult } = require("../dist/result")

function boardWithScore(score, by) {
  let contract = new Contract(1, "C", "", by)
  let result = new BoardResult(contract, true, 7)
  result.score = score
  return result
}

describe("Matchpoints ACBL", function () {
  it("is exported", function () {
    expect(scorer.matchpointsACBL).to.be.a("function")
  })

  it("scores", function () {
    // see http://www.acbl.org/learn_page/how-to-play-bridge/how-to-keep-score/
    var games = [
      boardWithScore(420, "N"),
      boardWithScore(430, "S"),
      boardWithScore(-500, "E"),
      boardWithScore(420, "N"),
      boardWithScore(450, "N"),
      boardWithScore(-50, "N"),
      boardWithScore(170, "N"),
    ]

    const result = scorer.matchpointsACBL(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.mps).to.equal(2.5)
    expect(result[1].mpsNS.mps).to.equal(4)
    expect(result[2].mpsNS.mps).to.equal(6)
    expect(result[3].mpsNS.mps).to.equal(2.5)
    expect(result[4].mpsNS.mps).to.equal(5)
    expect(result[5].mpsNS.mps).to.equal(0)
    expect(result[6].mpsNS.mps).to.equal(1)

    expect(result[0].mpsEW.mps).to.equal(3.5)
    expect(result[1].mpsEW.mps).to.equal(2)
    expect(result[2].mpsEW.mps).to.equal(0)
    expect(result[3].mpsEW.mps).to.equal(3.5)
    expect(result[4].mpsEW.mps).to.equal(1)
    expect(result[5].mpsEW.mps).to.equal(6)
    expect(result[6].mpsEW.mps).to.equal(5)
  })

  it("ranks", function () {
    var games = [
      boardWithScore(420, "N"),
      boardWithScore(430, "S"),
      boardWithScore(-500, "E"),
      boardWithScore(420, "N"),
      boardWithScore(450, "N"),
      boardWithScore(-50, "N"),
      boardWithScore(170, "N"),
    ]

    const result = scorer.matchpointsACBL(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.rank).to.equal("4=")
    expect(result[1].mpsNS.rank).to.equal("3")
    expect(result[2].mpsNS.rank).to.equal("1")
    expect(result[3].mpsNS.rank).to.equal("4=")
    expect(result[4].mpsNS.rank).to.equal("2")
    expect(result[5].mpsNS.rank).to.equal("7")
    expect(result[6].mpsNS.rank).to.equal("6")

    expect(result[0].mpsEW.rank).to.equal("3=")
    expect(result[1].mpsEW.rank).to.equal("5")
    expect(result[2].mpsEW.rank).to.equal("7")
    expect(result[3].mpsEW.rank).to.equal("3=")
    expect(result[4].mpsEW.rank).to.equal("6")
    expect(result[5].mpsEW.rank).to.equal("1")
    expect(result[6].mpsEW.rank).to.equal("2")
  })

  it("scores Fun Bridge", function () {
    // see https://www.funbridge.com/en/help_faq/touch/scores
    var games = [
      boardWithScore(650, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(170, "N"),
      boardWithScore(170, "N"),
      boardWithScore(140, "N"),
      boardWithScore(110, "N"),
    ]
    const result = scorer.matchpointsACBL(games)
    expect(result[0].mpsNS.mps).to.equal(8)
    expect(result[1].mpsNS.mps).to.equal(5.5)
    expect(result[2].mpsNS.mps).to.equal(5.5)
    expect(result[3].mpsNS.mps).to.equal(5.5)
    expect(result[4].mpsNS.mps).to.equal(5.5)
    expect(result[5].mpsNS.mps).to.equal(2.5)
    expect(result[6].mpsNS.mps).to.equal(2.5)
    expect(result[7].mpsNS.mps).to.equal(1)
    expect(result[8].mpsNS.mps).to.equal(0)
  })

  it("determines percentage", function () {
    // see https://www.funbridge.com/en/help_faq/touch/scores
    var games = [
      boardWithScore(650, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(620, "N"),
      boardWithScore(170, "N"),
      boardWithScore(170, "N"),
      boardWithScore(140, "N"),
      boardWithScore(110, "N"),
    ]
    const result = scorer.matchpointsACBL(games)
    expect(result[0].mpsNS.percentage.toFixed(2)).to.equal("100.00")
    expect(result[1].mpsNS.percentage.toFixed(2)).to.equal("68.75")
    expect(result[2].mpsNS.percentage.toFixed(2)).to.equal("68.75")
    expect(result[3].mpsNS.percentage.toFixed(2)).to.equal("68.75")
    expect(result[4].mpsNS.percentage.toFixed(2)).to.equal("68.75")
    expect(result[5].mpsNS.percentage.toFixed(2)).to.equal("31.25")
    expect(result[6].mpsNS.percentage.toFixed(2)).to.equal("31.25")
    expect(result[7].mpsNS.percentage.toFixed(2)).to.equal("12.50")
    expect(result[8].mpsNS.percentage.toFixed(2)).to.equal("0.00")
  })
})
