import { BaseState } from "./BaseState";
import { GameManager } from "../Managers/GameManager";
import { WinLinesManager } from "../Managers/WinLinesManager";
import { Player } from "../Player";
import { Sound } from "../Core/Sound";
import { Vector2D } from "../Core/MyMath";

//Handles the main gameplay state
export class GameState extends BaseState 
{
    gameManager: GameManager;
    currentPlayer!: Player;
    constructor() 
    {
        super();
        this.gameManager = GameManager.Instance;
    }

    enter(): void 
    {
        GameManager.getCanvas().onclick = this.onMouseClick.bind(this);
        this.currentPlayer = this.gameManager.player1;
    }

    onMouseClick(e: MouseEvent) 
    {
        e.preventDefault();
        this.playerPick(new Vector2D(e.clientX, e.clientY));
    }

    update(): void 
    {
    }

    draw(): void 
    {
        const context = GameManager.getContext();
        let textPos = new Vector2D(GameManager.getCanvas().width * .5, 0);

        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";

        textPos.y = this.gameManager.gameBoard.startPos.y;
        context.textBaseline = "bottom";
        context.fillText(this.playerTurnText(), textPos.x, textPos.y);

        this.gameManager.gameBoard.draw();
        GameManager.Instance.canvas.drawGameTitle();
        GameManager.Instance.canvas.drawUI();
    }

    exit(): void 
    {
        GameManager.getCanvas().onclick = null;
    }

    playerPick(mousePos: Vector2D) 
    {
        //Check if pick was valid
        if(this.gameManager.gameBoard.playerClick(this.currentPlayer, mousePos)== false)
            return;

        this.currentPlayer.pickSound.play();
        let winner = WinLinesManager.Instance.checkPlayerWin(this.currentPlayer, this.gameManager.gameBoard);

        //If player won or board is full we end game
        if (winner) 
        {
            this.gameManager.stateMachine.changeState("WinState")
        }
        //Tie Game
        else if (this.gameManager.gameBoard.isFull()) 
        {
            this.gameManager.stateMachine.changeState("TieState")
        }
        //Next player
        else 
        {
            this.nextPlayerTurn();
        }
    }

    playerTurnText(): string 
    {
        return this.currentPlayer.name + "'s Turn"
    }

    nextPlayerTurn()
    {
        if (this.currentPlayer === this.gameManager.player1)
            this.currentPlayer = this.gameManager.player2;
        else
            this.currentPlayer = this.gameManager.player1;
    }
}