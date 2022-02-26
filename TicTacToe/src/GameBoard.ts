import { GameManager } from "./Managers/GameManager";
import { Vector2D } from "./Core/MyMath";
import { Player } from "./Player";
import { DIRECTION, WinLinesManager } from "./Managers/WinLinesManager";

//Represents data for each square in grid.
class Square 
{
    public symbol: string;
    color: string;
    constructor(symbol: string, color: string) 
    {
        this.symbol = symbol;
        this.color = color;
    }
}

//Handles the tic tac toe board
export class GameBoard 
{
    grid: Square[][];
    cellSize: Vector2D;
    startPos: Vector2D;
    winLineWidth: number= 10;
    gridLineColor:string= "white";

    constructor(rowCount: number, colCount: number) 
    {
        //Creating the grid
        this.grid = [];
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) 
        {
            this.grid[rowIndex] = [];
            for (let colIndex = 0; colIndex < colCount; colIndex++) 
            {
                this.grid[rowIndex][colIndex] = new Square("", "white");
            }
        }

        //Calculate board size based on canvas size.
        const boardScale = new Vector2D(.5, .5);
        const boardSize = GameManager.getCanvas().width * boardScale.x;
        this.cellSize = new Vector2D(boardSize / rowCount, boardSize / colCount);

        //Calculate where the board starts drawing
        this.startPos = new Vector2D((GameManager.getCanvas().width * .5 - boardSize * .5), (GameManager.getCanvas().height * .6 - boardSize * .5));
    }

    draw() 
    {
        const context = GameManager.getContext();
        context.strokeStyle = this.gridLineColor;

        //Iterate throught the whole grid and render board and symbols in them
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) 
        {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) 
            {
                const pos = new Vector2D(rowIndex * this.cellSize.x + this.startPos.x, colIndex * this.cellSize.y + this.startPos.y)
                //Draw the square
                context.strokeRect(pos.x, pos.y, this.cellSize.x, this.cellSize.y);

                //Draw text
                let textSize = Math.floor(this.cellSize.x);
                const textOffset = textSize % 11; //Middle baseline should center it but for some reason we need to apply an offset
                const textPos = new Vector2D(pos.x + this.cellSize.x * .5, pos.y + this.cellSize.y * .5 + textOffset);

                //Text settings- x/o size is based on cell size
                context.font = textSize + "px Arial";
                context.fillStyle = this.getSquare(rowIndex, colIndex).color;
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(this.getSquare(rowIndex, colIndex).symbol, textPos.x, textPos.y);
            }
        }

        this.drawWinLine();
    }

    //Drawing the line through the board when player wins
    drawWinLine() 
    {
        const winData = WinLinesManager.Instance.winData;
        if (winData.anyWin === false)
            return;

        //Grab the direction of the line
        const lineDirection = winData.winLine.lineDirection();

        //Right Diagonal
        let startPoint = new Vector2D(winData.winLine.squares[0].x * this.cellSize.x + this.startPos.x, winData.winLine.squares[0].y * this.cellSize.y + this.startPos.y);
        let endPoint = new Vector2D((winData.winLine.squares[2].x + 1) * this.cellSize.x + this.startPos.x, (winData.winLine.squares[2].y + 1) * this.cellSize.y + this.startPos.y);

        //Left diagonal
        if (lineDirection == DIRECTION.LEFT_DIAGONAL) 
        {
            startPoint.x += this.cellSize.x;
            endPoint.x -= this.cellSize.x;
        }
        //Horizontal
        else if (lineDirection == DIRECTION.HORIZONTAL) 
        {
            startPoint.y += this.cellSize.y * .5;
            endPoint.y -= this.cellSize.y * .5;
        }
        //Vertical
        else if (lineDirection == DIRECTION.VERTICAL) 
        {
            startPoint.x += this.cellSize.x * .5;
            endPoint.x -= this.cellSize.x * .5;
        }

        //Draw Line
        const context = GameManager.getContext();
        context.save();
        context.strokeStyle= winData.player.color;
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = this.winLineWidth;
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
        context.restore();
    }

    //Board entering player pick
    playerClick(player: Player, mousePos: Vector2D): boolean 
    {
        let currentSquare;

        //Iterate through our board until we find one the player picked.
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) 
        {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) 
            {
                const cellStartPos = new Vector2D(rowIndex * this.cellSize.x + this.startPos.x, colIndex * this.cellSize.y + this.startPos.y);

                //Is our mouse position inside this square?
                if (mousePos.x >= cellStartPos.x && mousePos.x <= cellStartPos.x + this.cellSize.x && mousePos.y >= cellStartPos.y && mousePos.y <= cellStartPos.y + this.cellSize.y) 
                {
                    //Grab the current square
                    currentSquare = this.getSquare(rowIndex, colIndex);

                    //Check if we can enter player pick or not
                    if (currentSquare.symbol !== "") 
                    {
                        return false;
                    }
                    else 
                    {
                        //Square data based on player
                        currentSquare.color= player.color;
                        currentSquare.symbol= player.symbol;
                        return true;
                    }
                }
            }
        }

        return false;
    }

    //Quick check if our board is full or not
    isFull(): boolean 
    {
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) 
        {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) 
            {
                if (this.getSquare(rowIndex, colIndex).symbol === "")
                    return false;
            }
        }
        return true;
    }

    reset() 
    {
        //Reset the board
    }

    getSquare(x: number, y: number) 
    {
        return this.grid[x][y];
    }
}