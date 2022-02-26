import { StateMachine } from "../Core/StateMachine";
import { MainMenuState } from "../States/MainMenuState";
import { GameState } from "../States/GameState";
import { GameBoard } from "../GameBoard";
import { Player } from "../Player";
import { WinLinesManager } from "./WinLinesManager";
import { BaseState } from "../States/BaseState";
import { Canvas } from "../Core/Canvas";
import { WinState } from "../States/WinState";
import { TieState } from "../States/TieState";
import { Vector2D } from "../Core/MyMath";

//Manager to handle references and states of for our game
export class GameManager 
{
    stateMachine!: StateMachine;
    canvas!: Canvas;
    gameBoard!: GameBoard;
    player1!: Player;
    player2!: Player;
    winLines !: WinLinesManager;

    //Game Settings
    gameTitle!: string;
    boardSize!:Vector2D;

    //Singleton Pattern
    private static _instance: GameManager;
    public static get Instance() 
    {
        if (this._instance == null)
            this._instance = new this();

        return this._instance;
    }
    private constructor() 
    {
    }

    start() 
    {
        //Setting up game settings
        this.gameTitle = "Tic Tac Toe";
        this.boardSize= new Vector2D(3,3);
        this.player1= new Player("Player 1", "X", "blue");
        this.player2= new Player("Player 2", "O", "red");

        this.winLines = WinLinesManager.Instance;
        this.winLines.start();
        this.canvas = new Canvas();

        //Create our states
        let gameStates = new Map<string, BaseState>([
            ["MainMenu", new MainMenuState()],
            ["Game", new GameState()],
            ["WinState", new WinState()],
            ["TieState", new TieState()]
        ]);

        //We start in "MainMenuState"
        this.stateMachine = new StateMachine(gameStates);
        this.stateMachine.changeState("MainMenu");
    }

    update() 
    {
        this.stateMachine.update();
    }

    draw() 
    {
        this.stateMachine.draw();
    }

    rematch() 
    {
        this.winLines.reset();
        this.gameBoard = new GameBoard(this.boardSize.x, this.boardSize.y);
        this.stateMachine.changeState("Game");
    }

    newGame() 
    {
        this.winLines.reset();
        this.player1.score= 0;
        this.player2.score= 0;
        this.gameBoard = new GameBoard(this.boardSize.x, this.boardSize.y);
        this.stateMachine.changeState("Game");
    }

    exitGame()
    {
        self.close();
    }

    static getContext(): CanvasRenderingContext2D 
    {
        return GameManager.Instance.canvas.context;
    }

    static getCanvas(): HTMLCanvasElement 
    {
        return GameManager.Instance.canvas.canvasElement;
    }
}