"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
class StateMachine {
    constructor(states) {
        this.currentStateIndex = 0;
        this.gameStates = states;
        this.changeState(this.gameStates[this.currentStateIndex]);
    }
    update() {
        this.currentState.update();
    }
    draw() {
        this.currentState.draw();
    }
    changeState(newState) {
        this.currentState = newState;
        this.currentState.enter();
    }
    nextState() {
        this.currentStateIndex++;
        this.changeState(this.gameStates[this.currentStateIndex]);
    }
}
exports.StateMachine = StateMachine;
//# sourceMappingURL=StateMachine.js.map