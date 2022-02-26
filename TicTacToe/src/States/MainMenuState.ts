import { GameManager } from "../Managers/GameManager";
import { Vector2D } from "../Core/MyMath";
import { BaseState } from "./BaseState";
import { Button } from "../Core/Button";

export class MainMenuState extends BaseState
{
    startGameButton!: Button;
    exitGameButton!: Button;
    constructor()
    {
        super();
        let canvasElement= GameManager.getCanvas();
        this.startGameButton= new Button("Start Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.exitGameButton= new Button("Exit Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.startGameButton.image.width= 200;
        this.startGameButton.image.height= 100;
        this.startGameButton.setPositionOnCenter(new Vector2D(canvasElement.width*.5, 150));
        this.exitGameButton.image.width= 200;
        this.exitGameButton.image.height= 100;
        this.exitGameButton.position.x= this.startGameButton.position.x;
        this.exitGameButton.position.y= this.startGameButton.position.y+150;
    }

    enter(): void 
    {
        GameManager.getCanvas().onclick= this.onMouseDown.bind(this);
    }

    onMouseDown(e: MouseEvent)
    {
        e.preventDefault();
        const mousePos= new Vector2D(e.clientX, e.clientY);
        const rect = GameManager.getCanvas().getBoundingClientRect();

        //Start Button
        if(this.startGameButton.isClicked(mousePos, rect))
        {
            this.startGame();
        }

        //Exit Button- self.close() only working with live server
        if(this.exitGameButton.isClicked(mousePos, rect))
        {
           this.exitGame();
        }

    }

    update(): void 
    {
    }

    draw(): void 
    {
        GameManager.Instance.canvas.drawGameTitle();
        const context= GameManager.getContext();
        this.startGameButton.draw(context);
        this.exitGameButton.draw(context);
    }

    exit(): void 
    {
        GameManager.getCanvas().onclick= null;
    }

    startGame()
    {
        GameManager.Instance.newGame();
    }

    exitGame()
    {
        GameManager.Instance.exitGame();
    }
}