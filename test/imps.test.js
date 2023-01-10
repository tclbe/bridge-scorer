var scorer = require("..")
var imps = require("../dist/imps")
var expect = require("chai").expect
const { Contract } = require("../dist/contract")
const { BoardResult } = require("../dist/result")

function boardWithScore(score, by) {
  let contract = new Contract(1, "C", "", by)
  let result = new BoardResult(contract, true, 7)
  result.score = score
  return result
}

describe("IMPs", function () {
  it("is caclulated based on the score difference", function () {
    expect(imps.toImps(0)).to.equal(0)
    expect(imps.toImps(10)).to.equal(0)
    expect(imps.toImps(20)).to.equal(1)
    expect(imps.toImps(2240)).to.equal(19)
    expect(imps.toImps(3600)).to.equal(23)
    expect(imps.toImps(4000)).to.equal(24)
    expect(imps.toImps(50000)).to.equal(24)
  })

  it("is negative when difference is negative", function () {
    expect(imps.toImps(0)).to.equal(0)
    expect(imps.toImps(-10)).to.equal(0)
    expect(imps.toImps(-20)).to.equal(-1)
    expect(imps.toImps(-2240)).to.equal(-19)
    expect(imps.toImps(-3600)).to.equal(-23)
    expect(imps.toImps(-4000)).to.equal(-24)
    expect(imps.toImps(-50000)).to.equal(-24)
  })

  it("scores cross imps", function () {
    // http://bridge-tips.co.il/wp-content/uploads/2012/05/scoring.pdf
    var games = [
      boardWithScore(620, "S"),
      boardWithScore(170, "S"),
      boardWithScore(140, "S"),
      boardWithScore(140, "S"),
      boardWithScore(-100, "S"),
    ]
    let result = imps.crossImps(games)
    expect(result[0].impsNS.toFixed(2)).to.equal("10.50")
    expect(result[1].impsNS.toFixed(2)).to.equal("-0.25")
    expect(result[2].impsNS.toFixed(2)).to.equal("-1.25")
    expect(result[3].impsNS.toFixed(2)).to.equal("-1.25")
    expect(result[4].impsNS.toFixed(2)).to.equal("-7.75")
  })

  describe("Butler pairs", function () {
    it("calcs datum for 3 or less games", function () {
      var games = [
        boardWithScore(650, "N"),
        boardWithScore(170, "N"),
        boardWithScore(200, "S"),
      ]
      var datumNS = scorer.calculateDatum(games)
      expect(datumNS).to.equal(340)
    })

    it("calcs datum for 10 or less games", function () {
      // http://www.bridgewebs.com/woburnsands/Butler%20Pairs%20Scoring.pdf
      var games = [
        boardWithScore(650, "W"),
        boardWithScore(170, "W"),
        boardWithScore(1440, "W"),
        boardWithScore(-100, "E"),
        boardWithScore(170, "E"),
        boardWithScore(200, "E"),
      ]
      var datumNS = scorer.calculateDatum(games)
      expect(datumNS).to.equal(-300)
    })

    it("assigns imps based on the datum", function () {
      // http://www.bridgewebs.com/woburnsands/Butler%20Pairs%20Scoring.pdf
      var games = [
        boardWithScore(650, "W"),
        boardWithScore(170, "W"),
        boardWithScore(1440, "W"),
        boardWithScore(-100, "E"),
        boardWithScore(170, "E"),
        boardWithScore(200, "E"),
      ]
      let result = scorer.butler(games)
      expect(result[0].impsNS).to.equal(-8)
      expect(result[1].impsNS).to.equal(4)
      expect(result[2].impsNS).to.equal(-15)
      expect(result[3].impsNS).to.equal(9)
      expect(result[4].impsNS).to.equal(4)
      expect(result[5].impsNS).to.equal(3)
    })
  })
})
