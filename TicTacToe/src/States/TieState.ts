import { Vector2D } from "../Core/MyMath";
import { GameManager } from "../Managers/GameManager";
import { ScoreMenuState } from "./ScoreMenuState";

export class TieState extends ScoreMenuState
{
    constructor()
    {
        super();
    }

    draw(): void 
    {
        super.draw();

        //Drawing the "Tie" label
        let context= GameManager.getContext();
        context.font= "30px Comic Sans MS";
        context.fillStyle= "white";
        context.textAlign= "center";
        context.textBaseline= "bottom";

        let textPos= new Vector2D(GameManager.getCanvas().width *.5, 0);
        textPos.y= GameManager.Instance.gameBoard.startPos.y;
        context.fillText("Tie", textPos.x,textPos.y);
    }
}