import { GameManager } from "../Managers/GameManager";
import { Vector2D } from "./MyMath";
import { TextData } from "./TextData";

//Handles main rendering of game
export class Canvas
{
    canvasElement:HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    gameTitleText!:TextData;

    constructor()
    {
        this.canvasElement= document.getElementById("canvas") as HTMLCanvasElement;
        this.canvasElement.style.backgroundColor= "black";
        this.context= this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

        this.gameTitleText= new TextData(GameManager.Instance.gameTitle);
        this.gameTitleText.font= "60px Comic Sans MS";
        this.gameTitleText.fillStyle= "white";
        this.gameTitleText.textAlign= "center";
    }

    drawGameTitle()
    {
        // //Draw game title
        let titlePos= new Vector2D(this.canvasElement.width *.5, 50);
        this.gameTitleText.draw(this.context, titlePos);
    }

    // drawText(text:string, pos:Vector2D, font?:string, fillStyle?:string, textAlign?:CanvasTextAlign, textBaseline?:CanvasTextBaseline)
    // {
    //     if(font !== undefined)
    //         this.context.font= font;
    //     if(fillStyle !== undefined)
    //         this.context.fillStyle= fillStyle;
    //     if(textAlign !== undefined)
    //         this.context.textAlign= textAlign;
    //     if(textBaseline !== undefined)
    //         this.context.textBaseline= textBaseline;
        
    //     this.context.fillText(text, pos.x,pos.y);
    // }

    //Helps draw the common UI elements
    drawUI()
    {
        let testPoint= 70;
        const context= GameManager.getContext();
        let textPos= new Vector2D(GameManager.getCanvas().width *.5, testPoint);

        GameManager.Instance.canvas.drawGameTitle();

        //Player 1 Name
        context.font= "30px Comic Sans MS";
        context.fillStyle= "white";
        context.textAlign= "center";

        textPos.x= 0;
        textPos.y= testPoint;
        context.textAlign= "left";
        context.fillText("Player 1", textPos.x,textPos.y);

        //Player 1 score
        textPos.y+= 50;
        textPos.x+= 50;
        context.textAlign= "center";
        context.fillText(GameManager.Instance.player1.score.toString(), textPos.x,textPos.y);

        //Player 2 Name
        textPos.x= GameManager.getCanvas().width;
        textPos.y= testPoint;
        context.textAlign= "right";
        context.fillText("Player 2", textPos.x,textPos.y);

        //Player 2 score
        textPos.y+= 50;
        textPos.x-= 50;
        context.textAlign= "center";
        context.fillText(GameManager.Instance.player2.score.toString(), textPos.x,textPos.y);
    }

    //Will clean the whole canvas.
    clear()
    {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}