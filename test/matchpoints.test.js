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

describe("Matchpoints", function () {
  it("is exported", function () {
    expect(scorer.matchpoints).to.be.a("function")
  })

  it("scores a simple game (no ties)", function () {
    var games = [
      boardWithScore(400, "S"),
      boardWithScore(430, "S"),
      boardWithScore(150, "S"),
      boardWithScore(-50, "S"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.mps).to.equal(4)
    expect(result[1].mpsNS.mps).to.equal(6)
    expect(result[2].mpsNS.mps).to.equal(2)
    expect(result[3].mpsNS.mps).to.equal(0)

    expect(result[0].mpsEW.mps).to.equal(2)
    expect(result[1].mpsEW.mps).to.equal(0)
    expect(result[2].mpsEW.mps).to.equal(4)
    expect(result[3].mpsEW.mps).to.equal(6)
  })

  it("scores a 2-way tie", function () {
    var games = [
      boardWithScore(110, "W"),
      boardWithScore(140, "W"),
      boardWithScore(140, "W"),
      boardWithScore(120, "W"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.mps).to.equal(6)
    expect(result[1].mpsNS.mps).to.equal(1)
    expect(result[2].mpsNS.mps).to.equal(1)
    expect(result[3].mpsNS.mps).to.equal(4)

    expect(result[0].mpsEW.mps).to.equal(0)
    expect(result[1].mpsEW.mps).to.equal(5)
    expect(result[2].mpsEW.mps).to.equal(5)
    expect(result[3].mpsEW.mps).to.equal(2)
  })

  it("scores a 3-way tie", function () {
    var games = [
      boardWithScore(-50, "W"),
      boardWithScore(90, "W"),
      boardWithScore(90, "W"),
      boardWithScore(90, "W"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.mps).to.equal(6)
    expect(result[1].mpsNS.mps).to.equal(2)
    expect(result[2].mpsNS.mps).to.equal(2)
    expect(result[3].mpsNS.mps).to.equal(2)

    expect(result[0].mpsEW.mps).to.equal(0)
    expect(result[1].mpsEW.mps).to.equal(4)
    expect(result[2].mpsEW.mps).to.equal(4)
    expect(result[3].mpsEW.mps).to.equal(4)
  })

  it("scores a passed in game", function () {
    var games = [
      boardWithScore(90, "N"),
      boardWithScore(0, "N"),
      boardWithScore(-50, "N"),
      boardWithScore(-50, "N"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.mps).to.equal(6)
    expect(result[1].mpsNS.mps).to.equal(4)
    expect(result[2].mpsNS.mps).to.equal(1)
    expect(result[3].mpsNS.mps).to.equal(1)

    expect(result[0].mpsEW.mps).to.equal(0)
    expect(result[1].mpsEW.mps).to.equal(2)
    expect(result[2].mpsEW.mps).to.equal(5)
    expect(result[3].mpsEW.mps).to.equal(5)
  })

  it("actual session board", function () {
    var games = [
      boardWithScore(-50, "N"),
      boardWithScore(150, "N"),
      boardWithScore(120, "N"),
      boardWithScore(120, "N"),
      boardWithScore(110, "S"),
      boardWithScore(-100, "N"),
      boardWithScore(-50, "N"),
      boardWithScore(120, "N"),
    ]
    const result = scorer.matchpoints(games)
    expect(result[0].mpsNS.mps).to.equal(3)
    expect(result[1].mpsNS.mps).to.equal(14)
    expect(result[2].mpsNS.mps).to.equal(10)
    expect(result[3].mpsNS.mps).to.equal(10)
    expect(result[4].mpsNS.mps).to.equal(6)
    expect(result[5].mpsNS.mps).to.equal(0)
    expect(result[6].mpsNS.mps).to.equal(3)
    expect(result[7].mpsNS.mps).to.equal(10)
  })

  it("ranks", function () {
    var games = [
      boardWithScore(-50, "W"),
      boardWithScore(90, "W"),
      boardWithScore(90, "W"),
      boardWithScore(90, "W"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.rank).to.equal("1")
    expect(result[1].mpsNS.rank).to.equal("2=")
    expect(result[2].mpsNS.rank).to.equal("2=")
    expect(result[3].mpsNS.rank).to.equal("2=")

    expect(result[0].mpsEW.rank).to.equal("4")
    expect(result[1].mpsEW.rank).to.equal("1=")
    expect(result[2].mpsEW.rank).to.equal("1=")
    expect(result[3].mpsEW.rank).to.equal("1=")
  })

  it("determines percentage", function () {
    var games = [
      boardWithScore(90, "N"),
      boardWithScore(0, "N"),
      boardWithScore(-50, "N"),
      boardWithScore(-50, "N"),
    ]

    const result = scorer.matchpoints(games)
    expect(games).to.have.lengthOf(games.length)
    expect(result[0].mpsNS.percentage.toFixed(2)).to.equal("100.00")
    expect(result[1].mpsNS.percentage.toFixed(2)).to.equal("66.67")
    expect(result[2].mpsNS.percentage.toFixed(2)).to.equal("16.67")
    expect(result[3].mpsNS.percentage.toFixed(2)).to.equal("16.67")

    expect(result[0].mpsEW.percentage.toFixed(2)).to.equal("0.00")
    expect(result[1].mpsEW.percentage.toFixed(2)).to.equal("33.33")
    expect(result[2].mpsEW.percentage.toFixed(2)).to.equal("83.33")
    expect(result[3].mpsEW.percentage.toFixed(2)).to.equal("83.33")
  })
})
