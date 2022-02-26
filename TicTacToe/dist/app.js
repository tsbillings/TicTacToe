"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const StateMachine_1 = require("./StateMachine");
const MainMenuState_1 = require("./States/MainMenuState");
const GameState_1 = require("./States/GameState");
const GameEndState_1 = require("./States/GameEndState");
const GameBoard_1 = require("./GameBoard");
const Player_1 = require("./Player");
const Input_1 = require("./Input");
const container = document.getElementById("app");
class App {
    constructor() {
        console.log("app created");
    }
    static get Instance() {
        if (this._instance == null)
            this._instance = new this();
        return this._instance;
    }
    start() {
        this.player1 = new Player_1.Player();
        this.player2 = new Player_1.Player();
        this.gameBoard = new GameBoard_1.GameBoard();
        this.input = new Input_1.Input();
        this.stateMachine = new StateMachine_1.StateMachine([new MainMenuState_1.MainMenuState(), new GameState_1.GameState(), new GameEndState_1.GameEndState()]);
        this.gameLoop();
    }
    gameLoop() {
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.stateMachine.update();
        this.stateMachine.draw();
    }
}
exports.App = App;
App.Instance.start();
//# sourceMappingURL=app.js.map