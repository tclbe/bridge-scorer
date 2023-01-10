import { Suit, Direction } from "./enums";
export declare class Contract {
    suit: Suit;
    by: Direction;
    lead: string;
    level: number;
    risk: string;
    constructor(level: number, suit: Suit, risk: string, by: Direction, lead: string);
}
