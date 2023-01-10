import { Suit, Direction } from "./enums";

export class Contract {
  level: number;
  risk: string;

  constructor(
    level: number,
    public suit: Suit,
    risk: string,
    public by: Direction,
    public lead: string
  ) {
    if (![0, 1, 2, 3, 4, 5, 6, 7].includes(level)) {
      throw Error(
        "ValueError: level should be integer between 0 and 7 (0 is passed)"
      );
    }
    if (!["", "X", "XX"].includes(risk.toUpperCase())) {
      throw Error("ValueError: risk should be one of 'X', 'XX'");
    }

    this.level = level;
    this.risk = risk.toUpperCase();
  }
}
