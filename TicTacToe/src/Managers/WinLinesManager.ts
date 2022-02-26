import { Vector2D } from "../Core/MyMath";
import { GameBoard } from "../GameBoard";
import { Player } from "../Player";

export enum DIRECTION 
{
    NONE= 0,
    RIGHT_DIAGONAL,
    LEFT_DIAGONAL,
    VERTICAL,
    HORIZONTAL,
  }

export class WinData 
{
    player!: Player;
    anyWin: boolean;
    winLine!: WinLine;
    constructor() {
        this.anyWin = false;
    }
}

class WinLine 
{
    squares: Vector2D[];
    constructor(square1:Vector2D, square2:Vector2D, square3:Vector2D) 
    {
        this.squares = [square1, square2, square3];
    }

    //Determines direction our win line
    lineDirection(): DIRECTION 
    {
        //Right Diagonal
        if (this.squares[1].x == this.squares[0].x + 1 && this.squares[1].y == this.squares[0].y + 1) 
        {
            return DIRECTION.RIGHT_DIAGONAL;
        }

        //Left Diagonal
        if (this.squares[1].x == this.squares[0].x - 1 && this.squares[1].y == this.squares[0].y + 1) 
        {
            return DIRECTION.LEFT_DIAGONAL;
        }
        //Horizontal
        if (this.squares[1].x == this.squares[0].x + 1 && this.squares[1].y == this.squares[0].y) 
        {
            return DIRECTION.HORIZONTAL;
        }
        //Vertical
        if (this.squares[1].x == this.squares[0].x && this.squares[1].y == this.squares[0].y + 1) 
        {
            return DIRECTION.VERTICAL;
        }

        return DIRECTION.NONE;
    }
}
export class WinLinesManager 
{
    //winLines: WinLinePoint[][];
    winData!: WinData;
    winLines2: WinLine[];

    //Singleton Pattern
    private static _instance: WinLinesManager;
    public static get Instance() 
    {
        if (this._instance == null)
            this._instance = new this();

        return this._instance;
    }
    private constructor() 
    {
        this.winData = new WinData();
        this.winLines2= [
            new WinLine(new Vector2D(0, 0), new Vector2D(1, 0), new Vector2D(2, 0)),
            new WinLine(new Vector2D(0, 1), new Vector2D(1, 1), new Vector2D(2, 1)),
            new WinLine(new Vector2D(0, 2), new Vector2D(1, 2), new Vector2D(2, 2)),
            new WinLine(new Vector2D(0, 0), new Vector2D(0, 1), new Vector2D(0, 2)),
            new WinLine(new Vector2D(1, 0), new Vector2D(1, 1), new Vector2D(1, 2)),
            new WinLine(new Vector2D(2, 0), new Vector2D(2, 1), new Vector2D(2, 2)),
            new WinLine(new Vector2D(0, 0), new Vector2D(1, 1), new Vector2D(2, 2)),
            new WinLine(new Vector2D(2, 0), new Vector2D(1, 1), new Vector2D(0, 2)),

        ];

        //this.winLines = [
        //     //Rows
        //     [new WinLinePoint(0, 0), new WinLinePoint(1, 0), new WinLinePoint(2, 0)],
        //     [new WinLinePoint(0, 1), new WinLinePoint(1, 1), new WinLinePoint(2, 1)],
        //     [new WinLinePoint(0, 2), new WinLinePoint(1, 2), new WinLinePoint(2, 2)],

        //     //Columns
        //     [new WinLinePoint(0, 0), new WinLinePoint(0, 1), new WinLinePoint(0, 2)],
        //     [new WinLinePoint(1, 0), new WinLinePoint(1, 1), new WinLinePoint(1, 2)],
        //     [new WinLinePoint(2, 0), new WinLinePoint(2, 1), new WinLinePoint(2, 2)],

        //     //Diagonals
        //     [new WinLinePoint(0, 0), new WinLinePoint(1, 1), new WinLinePoint(2, 2)],
        //     [new WinLinePoint(2, 0), new WinLinePoint(1, 1), new WinLinePoint(0, 2)]
        // ];
    }

    start() 
    {
    }

    checkPlayerWin(player: Player, board: GameBoard): boolean 
    {
        //Iterate through all of our lines
        let anyWin = true;
        for (let x = 0; x < this.winLines2.length; ++x) 
        {
            anyWin = true;
            const line = this.winLines2[x];
            for (let y = 0; y < line.squares.length; ++y) 
            {
                const square = line.squares[y];
                if (board.getSquare(square.x, square.y).symbol !== player.symbol) 
                {
                    anyWin = false;
                    break;
                }
            }

            if (anyWin) 
            {
                this.winData = new WinData();
                this.winData.anyWin = true;
                this.winData.player = player;
                this.winData.winLine = this.winLines2[x];
                return true;
            }
        }
        return false;
    }

    reset() 
    {
        this.winData = new WinData();
    }
}