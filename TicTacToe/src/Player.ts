import { Sound } from "./Core/Sound";

export class Player 
{
    name: string;
    symbol: string;
    score: number;
    pickSound: Sound;
    color: string;
    constructor(name: string, symbol: string, color: string) 
    {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
        this.pickSound = new Sound("./Assets/Sounds/Click.wav");
        this.color = color;
    }
}