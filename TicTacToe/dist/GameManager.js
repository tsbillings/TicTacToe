"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
    constructor() {
        this.stateMachine = null;
        console.log("app created");
    }
    static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        if (this._instance == null)
            this._instance = new this();
        return this._instance;
    }
}
exports.GameManager = GameManager;
//# sourceMappingURL=GameManager.js.map