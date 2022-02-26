"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const app_1 = require("./app");
class Input {
    constructor() {
        this.mouseXPos = 0;
        this.mouseYPos = 0;
        let canvasElement = app_1.App.Instance.gameBoard.canvasElement;
        canvasElement.addEventListener("mousedown", this.onMouseDown, false);
        canvasElement.addEventListener("mousedown", this.onMouseDown2, false);
    }
    onMouseDown(e) {
        e.preventDefault();
        this.mouseXPos = e.clientX;
        this.mouseYPos = e.clientY;
    }
    onMouseDown2(e) {
        e.preventDefault();
    }
}
exports.Input = Input;
//# sourceMappingURL=Input.js.map