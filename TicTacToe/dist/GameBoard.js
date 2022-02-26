"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameBoard = void 0;
class Square {
    constructor() {
        this.symbol = "X";
    }
}
class GameBoard {
    constructor() {
        this.canvasElement = document.getElementById("canvas");
        this.canvasElement.style.backgroundColor = "black";
        this.context = this.canvasElement.getContext("2d");
        this.grid = [];
        for (let x = 0; x < 3; x++) {
            this.grid[x] = [];
            for (let y = 0; y < 3; y++) {
                this.grid[x][y] = new Square();
            }
        }
        this.cellWidth = this.canvasElement.width / 3;
        this.cellHeight = this.canvasElement.height / 3;
    }
    draw() {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const xPos = x * this.cellWidth;
                const yPos = y * this.cellHeight;
                this.context.strokeStyle = "#975";
                this.context.strokeRect(xPos, yPos, this.cellWidth, this.cellHeight);
            }
        }
    }
}
exports.GameBoard = GameBoard;
//# sourceMappingURL=GameBoard.js.map