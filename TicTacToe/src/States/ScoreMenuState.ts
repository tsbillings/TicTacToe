import { GameManager } from "../Managers/GameManager";
import { Vector2D } from "../Core/MyMath";
import { BaseState } from "./BaseState";
import { Button } from "../Core/Button";
import { WinData, WinLinesManager } from "../Managers/WinLinesManager";

export class ScoreMenuState extends BaseState
{
    newGameButton!: Button;
    rematchButton!: Button;
    exitGameButton!: Button;

    constructor()
    {
        super();
        const canvasElement= GameManager.getCanvas();
        
        this.newGameButton= new Button("New Game","./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.exitGameButton= new Button("Exit Game","./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.rematchButton= new Button("Rematch", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.newGameButton.image.width*= 1.5;
        this.newGameButton.image.height*= 1.25
        this.newGameButton.setPositionOnCenter(new Vector2D(canvasElement.width*.5, 200));

        this.rematchButton.image.width*= 1.5;
        this.rematchButton.image.height*= 1.25
        this.rematchButton.position.x= this.newGameButton.position.x;
        this.rematchButton.position.y= this.newGameButton.position.y+100;

        this.exitGameButton.image.width*= 1.5;
        this.exitGameButton.image.height*= 1.25
        this.exitGameButton.position.x= this.rematchButton.position.x;
        this.exitGameButton.position.y= this.rematchButton.position.y+100;
    }

    enter(): void 
    {
        GameManager.getCanvas().onclick= this.onMouseDown.bind(this);
    }

    draw(): void 
    {
        const context= GameManager.getContext();

        GameManager.Instance.gameBoard.draw();
        GameManager.Instance.canvas.drawGameTitle();
        GameManager.Instance.canvas.drawUI();

        //Drawing buttons
        this.newGameButton.draw(context);
        this.rematchButton.draw(context);
        this.exitGameButton.draw(context);
    }

    exit(): void 
    {
        let canvasElement= GameManager.getCanvas();
        canvasElement.onclick= null
    }

    onMouseDown(e:MouseEvent)
    {
        e.preventDefault();
        const mousePos= new Vector2D(e.clientX, e.clientY);
        const rect = GameManager.getCanvas().getBoundingClientRect();

        //Start Button
        if(this.newGameButton.isClicked(mousePos, rect))
        {
            this.newGame();
        }
        //Exit Button- self.close() only working with live server
        else if(this.exitGameButton.isClicked(mousePos, rect))
        {
           this.exitGame();
        }
        else if(this.rematchButton.isClicked(mousePos, rect))
        {
            this.rematch();
        }
    }

    exitGame()
    {
        GameManager.Instance.exitGame();
    }

    newGame()
    {
        GameManager.Instance.newGame();
    }

    rematch()
    {
        GameManager.Instance.rematch();
    }
}