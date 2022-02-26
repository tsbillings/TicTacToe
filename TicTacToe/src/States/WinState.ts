import { Vector2D } from "../Core/MyMath";
import { Sound } from "../Core/Sound";
import { GameManager } from "../Managers/GameManager";
import { WinData, WinLinesManager } from "../Managers/WinLinesManager";
import { ScoreMenuState } from "./ScoreMenuState";

export class WinState extends ScoreMenuState
{
    winData!:WinData;
    winSound: Sound;
    constructor()
    {
        super();
        this.winSound = new Sound("./Assets/Sounds/Win.wav");
    }

    enter(): void 
    {
        super.enter();
        this.winData= WinLinesManager.Instance.winData;
        this.winSound.play();
        this.winData.player.score++;
        GameManager.Instance.gameBoard.drawWinLine();
    }

    draw(): void 
    {
        super.draw();

        //Drawing the win label
        let context= GameManager.getContext();
        context.font= "30px Comic Sans MS";
        context.fillStyle= "white";
        context.textAlign= "center";
        context.textBaseline= "bottom";

        let textPos= new Vector2D(GameManager.getCanvas().width *.5, 0);
        textPos.y= GameManager.Instance.gameBoard.startPos.y;
        context.fillText(this.winData.player.name + " is the Winner", textPos.x,textPos.y);
    }
}