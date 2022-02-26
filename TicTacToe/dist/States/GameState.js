"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const BaseState_1 = require("./BaseState");
const Player1State_1 = require("./Player1State");
const Player2State_1 = require("./Player2State");
const app_1 = require("../app");
const StateMachine_1 = require("../StateMachine");
class GameState extends BaseState_1.BaseState {
    constructor() {
        super();
        this.gameManager = app_1.App.Instance;
        this.playerStateMachine = new StateMachine_1.StateMachine([new Player1State_1.Player1State(), new Player2State_1.Player2State()]);
    }
    update() {
        this.playerStateMachine.update();
    }
    draw() {
        //Drawing board
        this.gameManager.gameBoard.draw();
        //Drawing any player specefics
        this.playerStateMachine.draw();
    }
}
exports.GameState = GameState;
//# sourceMappingURL=GameState.js.map