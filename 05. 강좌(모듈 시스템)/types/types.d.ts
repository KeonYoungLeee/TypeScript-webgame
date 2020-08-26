export interface Card {
    att: number;
    hp: number;
    mine: boolean;
    cost?: number;
    field?: boolean;
}
export interface Player {
    hero: HTMLDivElement;
    deck: HTMLDivElement;
    field: HTMLDivElement;
    cost: HTMLDivElement;
    deckData: Card[];
    heroData?: Card | null;
    fieldData: Card[];
    chosenCardData?: Card | null;
    chosenCard?: Card[] | null;
}
export declare class Hero implements Card {
    att: number;
    hp: number;
    mine: boolean;
    field: boolean;
    constructor(mine: boolean);
}
export declare class Sub implements Card {
    att: number;
    hp: number;
    field: boolean;
    cost: number;
    mine: boolean;
    constructor(mine: boolean);
}
