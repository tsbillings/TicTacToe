import { GameManager } from "./Managers/GameManager";

//Entry point of the game
export class Main 
{
    gameManager : GameManager
    constructor()
    {
        this.gameManager= GameManager.Instance;
    }

    start()
    {
        this.gameManager.start();
        this.gameLoop();
    }

    gameLoop()
    {
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.gameManager.canvas.clear();
        this.gameManager.update();
        this.gameManager.draw();
    }
}

window.addEventListener("load", function () 
{
    const game= new Main();
    game.start();
});
