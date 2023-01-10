var scorer = require("..")
const { Contract } = require("../dist/contract")
var expect = require("chai").expect

describe("Contract Made", function () {
  it("is exported", function () {
    expect(scorer.contractMade).to.be.a("function")
  })

  it("scores partial", function () {
    let contract = new Contract(2, "H", "")
    expect(scorer.contractMade(contract, true, 2)).to.equal(110)

    contract.risk = "X"
    expect(scorer.contractMade(contract, false, 2)).to.equal(470)

    contract.suit = "C"
    contract.risk = ""
    expect(scorer.contractMade(contract, true, 2)).to.equal(90)
  })

  it("scores passed in", function () {
    let contract = new Contract(0, "H", "")
    expect(scorer.contractMade(contract, true, 0)).to.equal(0)
    expect(scorer.contractMade(contract, false, 0)).to.equal(0)
    expect(scorer.contractMade(contract, true, 3)).to.equal(0)
    expect(scorer.contractMade(contract, false, -3)).to.equal(0)
  })

  it("scores undertricks", function () {
    let contract = new Contract(4, "D", "")
    expect(scorer.contractMade(contract, false, -3)).to.equal(-150)
    expect(scorer.contractMade(contract, true, -3)).to.equal(-300)

    contract.risk = "X"
    expect(scorer.contractMade(contract, false, -3)).to.equal(-500)
    expect(scorer.contractMade(contract, true, -3)).to.equal(-800)

    contract.risk = "XX"
    expect(scorer.contractMade(contract, false, -3)).to.equal(-1000)
  })

  it("scores overtricks", function () {
    let contract = new Contract(3, "NT", "")
    expect(scorer.contractMade(contract, true, 5)).to.equal(660)

    contract.level = 5
    contract.suit = "S"
    expect(scorer.contractMade(contract, false, 6)).to.equal(480)
    expect(scorer.contractMade(contract, true, 6)).to.equal(680)

    contract.risk = "X"
    expect(scorer.contractMade(contract, false, 6)).to.equal(750)
    expect(scorer.contractMade(contract, true, 6)).to.equal(1050)

    contract.risk = "XX"
    expect(scorer.contractMade(contract, false, 6)).to.equal(1200)
    expect(scorer.contractMade(contract, true, 6)).to.equal(1600)

    contract.level = 6
    contract.suit = "NT"
    contract.risk = ""
    expect(scorer.contractMade(contract, false, 7)).to.equal(1020)

    contract.level = 5
    contract.suit = "C"
    expect(scorer.contractMade(contract, false, 6)).to.equal(420)
    expect(scorer.contractMade(contract, true, 6)).to.equal(620)
  })

  it("scores grand slams", function () {
    let contract = new Contract(7, "S", "")
    expect(scorer.contractMade(contract, false, 7)).to.equal(1510)
    expect(scorer.contractMade(contract, true, 7)).to.equal(2210)
  })

  it("scores small slams", function () {
    let contract = new Contract(6, "D", "")
    expect(scorer.contractMade(contract, false, 6)).to.equal(920)
    expect(scorer.contractMade(contract, true, 6)).to.equal(1370)
  })
})

describe("Contract Tricks", function () {
  it("is exported", function () {
    expect(scorer.contractTricks).to.be.a("function")
  })

  it("scores absolute trick count", function () {
    let contract = new Contract(3, "NT", "")
    expect(scorer.contractTricks(contract, true, 8)).to.equal(-100)
    expect(scorer.contractTricks(contract, true, 9)).to.equal(600)
    expect(scorer.contractTricks(contract, true, 10)).to.equal(630)
  })
})

describe("Contract Result", function () {
  it("is exported", function () {
    expect(scorer.contractResult).to.be.a("function")
  })

  it("scores over/under trick count", function () {
    let contract = new Contract(3, "NT", "")
    expect(scorer.contractResult(contract, true, -1)).to.equal(-100)
    expect(scorer.contractResult(contract, true, 0)).to.equal(600)
    expect(scorer.contractResult(contract, true, 1)).to.equal(630)
  })
})
