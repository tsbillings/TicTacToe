/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Core/Button.ts":
/*!****************************!*\
  !*** ./src/Core/Button.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const MyMath_1 = __webpack_require__(/*! ./MyMath */ "./src/Core/MyMath.ts");
const Sound_1 = __webpack_require__(/*! ./Sound */ "./src/Core/Sound.ts");
const Sprite_1 = __webpack_require__(/*! ./Sprite */ "./src/Core/Sprite.ts");
//Handles drawing a sprite and detecting mouse click
class Button extends Sprite_1.Sprite {
    constructor(text, spritePath, clickSoundPath) {
        super(spritePath);
        this.text = text;
        this.clickSound = new Sound_1.Sound(clickSoundPath);
    }
    draw(context) {
        super.draw(context);
        //Calcualte text size based on size of button
        let textSize = Math.floor(this.image.width / this.text.length);
        const textOffset = 5;
        context.font = (textOffset + textSize) + "px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        let pos = new MyMath_1.Vector2D(this.position.x + this.image.width * .5, this.position.y + this.image.height * .5);
        context.fillText(this.text, pos.x, pos.y);
    }
    isClicked(mousePos, canvasRect) {
        //The pos and size couble be affected by canvas positioning
        let truePosition = new MyMath_1.Vector2D(this.position.x - canvasRect.left, this.position.y - canvasRect.top);
        let trueSize = new MyMath_1.Vector2D(this.image.width - canvasRect.left + truePosition.x, this.image.height - canvasRect.top + truePosition.y);
        //Check if mouse click was within button bounds
        if (mousePos.x >= truePosition.x && mousePos.x <= trueSize.x && mousePos.y >= truePosition.y && mousePos.y <= trueSize.y) {
            this.clickSound.play();
            return true;
        }
        return false;
    }
}
exports.Button = Button;


/***/ }),

/***/ "./src/Core/Canvas.ts":
/*!****************************!*\
  !*** ./src/Core/Canvas.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Canvas = void 0;
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const MyMath_1 = __webpack_require__(/*! ./MyMath */ "./src/Core/MyMath.ts");
const TextData_1 = __webpack_require__(/*! ./TextData */ "./src/Core/TextData.ts");
//Handles main rendering of game
class Canvas {
    constructor() {
        this.canvasElement = document.getElementById("canvas");
        this.canvasElement.style.backgroundColor = "black";
        this.context = this.canvasElement.getContext("2d");
        this.gameTitleText = new TextData_1.TextData(GameManager_1.GameManager.Instance.gameTitle);
        this.gameTitleText.font = "60px Comic Sans MS";
        this.gameTitleText.fillStyle = "white";
        this.gameTitleText.textAlign = "center";
    }
    drawGameTitle() {
        // //Draw game title
        let titlePos = new MyMath_1.Vector2D(this.canvasElement.width * .5, 50);
        this.gameTitleText.draw(this.context, titlePos);
    }
    // drawText(text:string, pos:Vector2D, font?:string, fillStyle?:string, textAlign?:CanvasTextAlign, textBaseline?:CanvasTextBaseline)
    // {
    //     if(font !== undefined)
    //         this.context.font= font;
    //     if(fillStyle !== undefined)
    //         this.context.fillStyle= fillStyle;
    //     if(textAlign !== undefined)
    //         this.context.textAlign= textAlign;
    //     if(textBaseline !== undefined)
    //         this.context.textBaseline= textBaseline;
    //     this.context.fillText(text, pos.x,pos.y);
    // }
    //Helps draw the common UI elements
    drawUI() {
        let testPoint = 70;
        const context = GameManager_1.GameManager.getContext();
        let textPos = new MyMath_1.Vector2D(GameManager_1.GameManager.getCanvas().width * .5, testPoint);
        GameManager_1.GameManager.Instance.canvas.drawGameTitle();
        //Player 1 Name
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        textPos.x = 0;
        textPos.y = testPoint;
        context.textAlign = "left";
        context.fillText("Player 1", textPos.x, textPos.y);
        //Player 1 score
        textPos.y += 50;
        textPos.x += 50;
        context.textAlign = "center";
        context.fillText(GameManager_1.GameManager.Instance.player1.score.toString(), textPos.x, textPos.y);
        //Player 2 Name
        textPos.x = GameManager_1.GameManager.getCanvas().width;
        textPos.y = testPoint;
        context.textAlign = "right";
        context.fillText("Player 2", textPos.x, textPos.y);
        //Player 2 score
        textPos.y += 50;
        textPos.x -= 50;
        context.textAlign = "center";
        context.fillText(GameManager_1.GameManager.Instance.player2.score.toString(), textPos.x, textPos.y);
    }
    //Will clean the whole canvas.
    clear() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}
exports.Canvas = Canvas;


/***/ }),

/***/ "./src/Core/MyMath.ts":
/*!****************************!*\
  !*** ./src/Core/MyMath.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


//Add any common functionaly here.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector2D = void 0;
//Container holding 2 numbers 
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Vector2D = Vector2D;


/***/ }),

/***/ "./src/Core/Sound.ts":
/*!***************************!*\
  !*** ./src/Core/Sound.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sound = void 0;
class Sound {
    constructor(path) {
        this.audio = new Audio(path);
    }
    play() {
        this.audio.play();
    }
}
exports.Sound = Sound;


/***/ }),

/***/ "./src/Core/Sprite.ts":
/*!****************************!*\
  !*** ./src/Core/Sprite.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprite = void 0;
const MyMath_1 = __webpack_require__(/*! ./MyMath */ "./src/Core/MyMath.ts");
class Sprite {
    constructor(path) {
        this.image = new Image();
        this.load(path);
        this.position = new MyMath_1.Vector2D(0, 0);
        this.image.width = 100;
        this.image.height = 50;
    }
    //Sets the center of sprite to the "newPos".
    setPositionOnCenter(newPos) {
        const center = this.getCenter();
        this.position.x = newPos.x - center.x;
        this.position.y = newPos.y - center.y;
    }
    //Retrieves the center of sprite
    getCenter() {
        return new MyMath_1.Vector2D(this.image.width * .5, this.image.height * .5);
    }
    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
    load(path) {
        this.image.src = path;
    }
}
exports.Sprite = Sprite;


/***/ }),

/***/ "./src/Core/StateMachine.ts":
/*!**********************************!*\
  !*** ./src/Core/StateMachine.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateMachine = void 0;
class StateMachine {
    constructor(states) {
        this.gameStates = states;
    }
    update() {
        this.currentState.update();
    }
    draw() {
        this.currentState.draw();
    }
    changeState(stateName) {
        let state = this.gameStates.get(stateName);
        if (state === undefined)
            return;
        if (this.currentState)
            this.currentState.exit();
        this.currentState = state;
        this.currentState.enter();
    }
}
exports.StateMachine = StateMachine;


/***/ }),

/***/ "./src/Core/TextData.ts":
/*!******************************!*\
  !*** ./src/Core/TextData.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextData = void 0;
class TextData {
    constructor(text) {
        this.text = text;
    }
    draw(context, textPos) {
        if (this.font !== undefined)
            context.font = this.font;
        if (this.fillStyle !== undefined)
            context.fillStyle = this.fillStyle;
        if (this.textAlign !== undefined)
            context.textAlign = this.textAlign;
        if (this.textBaseline !== undefined)
            context.textBaseline = this.textBaseline;
        context.fillText(this.text, textPos.x, textPos.y);
    }
}
exports.TextData = TextData;


/***/ }),

/***/ "./src/GameBoard.ts":
/*!**************************!*\
  !*** ./src/GameBoard.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameBoard = void 0;
const GameManager_1 = __webpack_require__(/*! ./Managers/GameManager */ "./src/Managers/GameManager.ts");
const MyMath_1 = __webpack_require__(/*! ./Core/MyMath */ "./src/Core/MyMath.ts");
const WinLinesManager_1 = __webpack_require__(/*! ./Managers/WinLinesManager */ "./src/Managers/WinLinesManager.ts");
//Represents data for each square in grid.
class Square {
    constructor(symbol, color) {
        this.symbol = symbol;
        this.color = color;
    }
}
//Handles the tic tac toe board
class GameBoard {
    constructor(rowCount, colCount) {
        this.winLineWidth = 10;
        this.gridLineColor = "white";
        //Creating the grid
        this.grid = [];
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            this.grid[rowIndex] = [];
            for (let colIndex = 0; colIndex < colCount; colIndex++) {
                this.grid[rowIndex][colIndex] = new Square("", "white");
            }
        }
        //Calculate board size based on canvas size.
        const boardScale = new MyMath_1.Vector2D(.5, .5);
        const boardSize = GameManager_1.GameManager.getCanvas().width * boardScale.x;
        this.cellSize = new MyMath_1.Vector2D(boardSize / rowCount, boardSize / colCount);
        //Calculate where the board starts drawing
        this.startPos = new MyMath_1.Vector2D((GameManager_1.GameManager.getCanvas().width * .5 - boardSize * .5), (GameManager_1.GameManager.getCanvas().height * .6 - boardSize * .5));
    }
    draw() {
        const context = GameManager_1.GameManager.getContext();
        context.strokeStyle = this.gridLineColor;
        //Iterate throught the whole grid and render board and symbols in them
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) {
                const pos = new MyMath_1.Vector2D(rowIndex * this.cellSize.x + this.startPos.x, colIndex * this.cellSize.y + this.startPos.y);
                //Draw the square
                context.strokeRect(pos.x, pos.y, this.cellSize.x, this.cellSize.y);
                //Draw text
                let textSize = Math.floor(this.cellSize.x);
                const textOffset = textSize % 11; //Middle baseline should center it but for some reason we need to apply an offset
                const textPos = new MyMath_1.Vector2D(pos.x + this.cellSize.x * .5, pos.y + this.cellSize.y * .5 + textOffset);
                //Text settings- x/o size is based on cell size
                context.font = textSize + "px Arial";
                context.fillStyle = this.getSquare(rowIndex, colIndex).color;
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(this.getSquare(rowIndex, colIndex).symbol, textPos.x, textPos.y);
            }
        }
        this.drawWinLine();
    }
    //Drawing the line through the board when player wins
    drawWinLine() {
        const winData = WinLinesManager_1.WinLinesManager.Instance.winData;
        if (winData.anyWin === false)
            return;
        //Grab the direction of the line
        const lineDirection = winData.winLine.lineDirection();
        //Right Diagonal
        let startPoint = new MyMath_1.Vector2D(winData.winLine.squares[0].x * this.cellSize.x + this.startPos.x, winData.winLine.squares[0].y * this.cellSize.y + this.startPos.y);
        let endPoint = new MyMath_1.Vector2D((winData.winLine.squares[2].x + 1) * this.cellSize.x + this.startPos.x, (winData.winLine.squares[2].y + 1) * this.cellSize.y + this.startPos.y);
        //Left diagonal
        if (lineDirection == WinLinesManager_1.DIRECTION.LEFT_DIAGONAL) {
            startPoint.x += this.cellSize.x;
            endPoint.x -= this.cellSize.x;
        }
        //Horizontal
        else if (lineDirection == WinLinesManager_1.DIRECTION.HORIZONTAL) {
            startPoint.y += this.cellSize.y * .5;
            endPoint.y -= this.cellSize.y * .5;
        }
        //Vertical
        else if (lineDirection == WinLinesManager_1.DIRECTION.VERTICAL) {
            startPoint.x += this.cellSize.x * .5;
            endPoint.x -= this.cellSize.x * .5;
        }
        //Draw Line
        const context = GameManager_1.GameManager.getContext();
        context.save();
        context.strokeStyle = winData.player.color;
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = this.winLineWidth;
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
        context.restore();
    }
    //Board entering player pick
    playerClick(player, mousePos) {
        let currentSquare;
        //Iterate through our board until we find one the player picked.
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) {
                const cellStartPos = new MyMath_1.Vector2D(rowIndex * this.cellSize.x + this.startPos.x, colIndex * this.cellSize.y + this.startPos.y);
                //Is our mouse position inside this square?
                if (mousePos.x >= cellStartPos.x && mousePos.x <= cellStartPos.x + this.cellSize.x && mousePos.y >= cellStartPos.y && mousePos.y <= cellStartPos.y + this.cellSize.y) {
                    //Grab the current square
                    currentSquare = this.getSquare(rowIndex, colIndex);
                    //Check if we can enter player pick or not
                    if (currentSquare.symbol !== "") {
                        return false;
                    }
                    else {
                        //Square data based on player
                        currentSquare.color = player.color;
                        currentSquare.symbol = player.symbol;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    //Quick check if our board is full or not
    isFull() {
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            for (let colIndex = 0; colIndex < this.grid[rowIndex].length; colIndex++) {
                if (this.getSquare(rowIndex, colIndex).symbol === "")
                    return false;
            }
        }
        return true;
    }
    reset() {
        //Reset the board
    }
    getSquare(x, y) {
        return this.grid[x][y];
    }
}
exports.GameBoard = GameBoard;


/***/ }),

/***/ "./src/Managers/GameManager.ts":
/*!*************************************!*\
  !*** ./src/Managers/GameManager.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameManager = void 0;
const StateMachine_1 = __webpack_require__(/*! ../Core/StateMachine */ "./src/Core/StateMachine.ts");
const MainMenuState_1 = __webpack_require__(/*! ../States/MainMenuState */ "./src/States/MainMenuState.ts");
const GameState_1 = __webpack_require__(/*! ../States/GameState */ "./src/States/GameState.ts");
const GameBoard_1 = __webpack_require__(/*! ../GameBoard */ "./src/GameBoard.ts");
const Player_1 = __webpack_require__(/*! ../Player */ "./src/Player.ts");
const WinLinesManager_1 = __webpack_require__(/*! ./WinLinesManager */ "./src/Managers/WinLinesManager.ts");
const Canvas_1 = __webpack_require__(/*! ../Core/Canvas */ "./src/Core/Canvas.ts");
const WinState_1 = __webpack_require__(/*! ../States/WinState */ "./src/States/WinState.ts");
const TieState_1 = __webpack_require__(/*! ../States/TieState */ "./src/States/TieState.ts");
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
//Manager to handle references and states of for our game
class GameManager {
    constructor() {
    }
    static get Instance() {
        if (this._instance == null)
            this._instance = new this();
        return this._instance;
    }
    start() {
        //Setting up game settings
        this.gameTitle = "Tic Tac Toe";
        this.boardSize = new MyMath_1.Vector2D(3, 3);
        this.player1 = new Player_1.Player("Player 1", "X", "blue");
        this.player2 = new Player_1.Player("Player 2", "O", "red");
        this.winLines = WinLinesManager_1.WinLinesManager.Instance;
        this.winLines.start();
        this.canvas = new Canvas_1.Canvas();
        //Create our states
        let gameStates = new Map([
            ["MainMenu", new MainMenuState_1.MainMenuState()],
            ["Game", new GameState_1.GameState()],
            ["WinState", new WinState_1.WinState()],
            ["TieState", new TieState_1.TieState()]
        ]);
        //We start in "MainMenuState"
        this.stateMachine = new StateMachine_1.StateMachine(gameStates);
        this.stateMachine.changeState("MainMenu");
    }
    update() {
        this.stateMachine.update();
    }
    draw() {
        this.stateMachine.draw();
    }
    rematch() {
        this.winLines.reset();
        this.gameBoard = new GameBoard_1.GameBoard(this.boardSize.x, this.boardSize.y);
        this.stateMachine.changeState("Game");
    }
    newGame() {
        this.winLines.reset();
        this.player1.score = 0;
        this.player2.score = 0;
        this.gameBoard = new GameBoard_1.GameBoard(this.boardSize.x, this.boardSize.y);
        this.stateMachine.changeState("Game");
    }
    exitGame() {
        self.close();
    }
    static getContext() {
        return GameManager.Instance.canvas.context;
    }
    static getCanvas() {
        return GameManager.Instance.canvas.canvasElement;
    }
}
exports.GameManager = GameManager;


/***/ }),

/***/ "./src/Managers/WinLinesManager.ts":
/*!*****************************************!*\
  !*** ./src/Managers/WinLinesManager.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WinLinesManager = exports.WinData = exports.DIRECTION = void 0;
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["NONE"] = 0] = "NONE";
    DIRECTION[DIRECTION["RIGHT_DIAGONAL"] = 1] = "RIGHT_DIAGONAL";
    DIRECTION[DIRECTION["LEFT_DIAGONAL"] = 2] = "LEFT_DIAGONAL";
    DIRECTION[DIRECTION["VERTICAL"] = 3] = "VERTICAL";
    DIRECTION[DIRECTION["HORIZONTAL"] = 4] = "HORIZONTAL";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
class WinData {
    constructor() {
        this.anyWin = false;
    }
}
exports.WinData = WinData;
class WinLine {
    constructor(square1, square2, square3) {
        this.squares = [square1, square2, square3];
    }
    //Determines direction our win line
    lineDirection() {
        //Right Diagonal
        if (this.squares[1].x == this.squares[0].x + 1 && this.squares[1].y == this.squares[0].y + 1) {
            return DIRECTION.RIGHT_DIAGONAL;
        }
        //Left Diagonal
        if (this.squares[1].x == this.squares[0].x - 1 && this.squares[1].y == this.squares[0].y + 1) {
            return DIRECTION.LEFT_DIAGONAL;
        }
        //Horizontal
        if (this.squares[1].x == this.squares[0].x + 1 && this.squares[1].y == this.squares[0].y) {
            return DIRECTION.HORIZONTAL;
        }
        //Vertical
        if (this.squares[1].x == this.squares[0].x && this.squares[1].y == this.squares[0].y + 1) {
            return DIRECTION.VERTICAL;
        }
        return DIRECTION.NONE;
    }
}
class WinLinesManager {
    constructor() {
        this.winData = new WinData();
        this.winLines2 = [
            new WinLine(new MyMath_1.Vector2D(0, 0), new MyMath_1.Vector2D(1, 0), new MyMath_1.Vector2D(2, 0)),
            new WinLine(new MyMath_1.Vector2D(0, 1), new MyMath_1.Vector2D(1, 1), new MyMath_1.Vector2D(2, 1)),
            new WinLine(new MyMath_1.Vector2D(0, 2), new MyMath_1.Vector2D(1, 2), new MyMath_1.Vector2D(2, 2)),
            new WinLine(new MyMath_1.Vector2D(0, 0), new MyMath_1.Vector2D(0, 1), new MyMath_1.Vector2D(0, 2)),
            new WinLine(new MyMath_1.Vector2D(1, 0), new MyMath_1.Vector2D(1, 1), new MyMath_1.Vector2D(1, 2)),
            new WinLine(new MyMath_1.Vector2D(2, 0), new MyMath_1.Vector2D(2, 1), new MyMath_1.Vector2D(2, 2)),
            new WinLine(new MyMath_1.Vector2D(0, 0), new MyMath_1.Vector2D(1, 1), new MyMath_1.Vector2D(2, 2)),
            new WinLine(new MyMath_1.Vector2D(2, 0), new MyMath_1.Vector2D(1, 1), new MyMath_1.Vector2D(0, 2)),
        ];
        //this.winLines = [
        //     //Rows
        //     [new WinLinePoint(0, 0), new WinLinePoint(1, 0), new WinLinePoint(2, 0)],
        //     [new WinLinePoint(0, 1), new WinLinePoint(1, 1), new WinLinePoint(2, 1)],
        //     [new WinLinePoint(0, 2), new WinLinePoint(1, 2), new WinLinePoint(2, 2)],
        //     //Columns
        //     [new WinLinePoint(0, 0), new WinLinePoint(0, 1), new WinLinePoint(0, 2)],
        //     [new WinLinePoint(1, 0), new WinLinePoint(1, 1), new WinLinePoint(1, 2)],
        //     [new WinLinePoint(2, 0), new WinLinePoint(2, 1), new WinLinePoint(2, 2)],
        //     //Diagonals
        //     [new WinLinePoint(0, 0), new WinLinePoint(1, 1), new WinLinePoint(2, 2)],
        //     [new WinLinePoint(2, 0), new WinLinePoint(1, 1), new WinLinePoint(0, 2)]
        // ];
    }
    static get Instance() {
        if (this._instance == null)
            this._instance = new this();
        return this._instance;
    }
    start() {
    }
    checkPlayerWin(player, board) {
        //Iterate through all of our lines
        let anyWin = true;
        for (let x = 0; x < this.winLines2.length; ++x) {
            anyWin = true;
            const line = this.winLines2[x];
            for (let y = 0; y < line.squares.length; ++y) {
                const square = line.squares[y];
                if (board.getSquare(square.x, square.y).symbol !== player.symbol) {
                    anyWin = false;
                    break;
                }
            }
            if (anyWin) {
                this.winData = new WinData();
                this.winData.anyWin = true;
                this.winData.player = player;
                this.winData.winLine = this.winLines2[x];
                return true;
            }
        }
        return false;
    }
    reset() {
        this.winData = new WinData();
    }
}
exports.WinLinesManager = WinLinesManager;


/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Sound_1 = __webpack_require__(/*! ./Core/Sound */ "./src/Core/Sound.ts");
class Player {
    constructor(name, symbol, color) {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
        this.pickSound = new Sound_1.Sound("./Assets/Sounds/Click.wav");
        this.color = color;
    }
}
exports.Player = Player;


/***/ }),

/***/ "./src/States/BaseState.ts":
/*!*********************************!*\
  !*** ./src/States/BaseState.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseState = void 0;
class BaseState {
    update() {
    }
    draw() {
    }
    enter() {
    }
    exit() {
    }
}
exports.BaseState = BaseState;


/***/ }),

/***/ "./src/States/GameState.ts":
/*!*********************************!*\
  !*** ./src/States/GameState.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameState = void 0;
const BaseState_1 = __webpack_require__(/*! ./BaseState */ "./src/States/BaseState.ts");
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const WinLinesManager_1 = __webpack_require__(/*! ../Managers/WinLinesManager */ "./src/Managers/WinLinesManager.ts");
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
//Handles the main gameplay state
class GameState extends BaseState_1.BaseState {
    constructor() {
        super();
        this.gameManager = GameManager_1.GameManager.Instance;
    }
    enter() {
        GameManager_1.GameManager.getCanvas().onclick = this.onMouseClick.bind(this);
        this.currentPlayer = this.gameManager.player1;
    }
    onMouseClick(e) {
        e.preventDefault();
        this.playerPick(new MyMath_1.Vector2D(e.clientX, e.clientY));
    }
    update() {
    }
    draw() {
        const context = GameManager_1.GameManager.getContext();
        let textPos = new MyMath_1.Vector2D(GameManager_1.GameManager.getCanvas().width * .5, 0);
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        textPos.y = this.gameManager.gameBoard.startPos.y;
        context.textBaseline = "bottom";
        context.fillText(this.playerTurnText(), textPos.x, textPos.y);
        this.gameManager.gameBoard.draw();
        GameManager_1.GameManager.Instance.canvas.drawGameTitle();
        GameManager_1.GameManager.Instance.canvas.drawUI();
    }
    exit() {
        GameManager_1.GameManager.getCanvas().onclick = null;
    }
    playerPick(mousePos) {
        //Check if pick was valid
        if (this.gameManager.gameBoard.playerClick(this.currentPlayer, mousePos) == false)
            return;
        this.currentPlayer.pickSound.play();
        let winner = WinLinesManager_1.WinLinesManager.Instance.checkPlayerWin(this.currentPlayer, this.gameManager.gameBoard);
        //If player won or board is full we end game
        if (winner) {
            this.gameManager.stateMachine.changeState("WinState");
        }
        //Tie Game
        else if (this.gameManager.gameBoard.isFull()) {
            this.gameManager.stateMachine.changeState("TieState");
        }
        //Next player
        else {
            this.nextPlayerTurn();
        }
    }
    playerTurnText() {
        return this.currentPlayer.name + "'s Turn";
    }
    nextPlayerTurn() {
        if (this.currentPlayer === this.gameManager.player1)
            this.currentPlayer = this.gameManager.player2;
        else
            this.currentPlayer = this.gameManager.player1;
    }
}
exports.GameState = GameState;


/***/ }),

/***/ "./src/States/MainMenuState.ts":
/*!*************************************!*\
  !*** ./src/States/MainMenuState.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainMenuState = void 0;
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
const BaseState_1 = __webpack_require__(/*! ./BaseState */ "./src/States/BaseState.ts");
const Button_1 = __webpack_require__(/*! ../Core/Button */ "./src/Core/Button.ts");
class MainMenuState extends BaseState_1.BaseState {
    constructor() {
        super();
        let canvasElement = GameManager_1.GameManager.getCanvas();
        this.startGameButton = new Button_1.Button("Start Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.exitGameButton = new Button_1.Button("Exit Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.startGameButton.image.width = 200;
        this.startGameButton.image.height = 100;
        this.startGameButton.setPositionOnCenter(new MyMath_1.Vector2D(canvasElement.width * .5, 150));
        this.exitGameButton.image.width = 200;
        this.exitGameButton.image.height = 100;
        this.exitGameButton.position.x = this.startGameButton.position.x;
        this.exitGameButton.position.y = this.startGameButton.position.y + 150;
    }
    enter() {
        GameManager_1.GameManager.getCanvas().onclick = this.onMouseDown.bind(this);
    }
    onMouseDown(e) {
        e.preventDefault();
        const mousePos = new MyMath_1.Vector2D(e.clientX, e.clientY);
        const rect = GameManager_1.GameManager.getCanvas().getBoundingClientRect();
        //Start Button
        if (this.startGameButton.isClicked(mousePos, rect)) {
            this.startGame();
        }
        //Exit Button- self.close() only working with live server
        if (this.exitGameButton.isClicked(mousePos, rect)) {
            this.exitGame();
        }
    }
    update() {
    }
    draw() {
        GameManager_1.GameManager.Instance.canvas.drawGameTitle();
        const context = GameManager_1.GameManager.getContext();
        this.startGameButton.draw(context);
        this.exitGameButton.draw(context);
    }
    exit() {
        GameManager_1.GameManager.getCanvas().onclick = null;
    }
    startGame() {
        GameManager_1.GameManager.Instance.newGame();
    }
    exitGame() {
        GameManager_1.GameManager.Instance.exitGame();
    }
}
exports.MainMenuState = MainMenuState;


/***/ }),

/***/ "./src/States/ScoreMenuState.ts":
/*!**************************************!*\
  !*** ./src/States/ScoreMenuState.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoreMenuState = void 0;
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
const BaseState_1 = __webpack_require__(/*! ./BaseState */ "./src/States/BaseState.ts");
const Button_1 = __webpack_require__(/*! ../Core/Button */ "./src/Core/Button.ts");
class ScoreMenuState extends BaseState_1.BaseState {
    constructor() {
        super();
        const canvasElement = GameManager_1.GameManager.getCanvas();
        this.newGameButton = new Button_1.Button("New Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.exitGameButton = new Button_1.Button("Exit Game", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.rematchButton = new Button_1.Button("Rematch", "./Assets/Images/buttons_PNG46.png", "./Assets/Sounds/ButtonClick1.wav");
        this.newGameButton.image.width *= 1.5;
        this.newGameButton.image.height *= 1.25;
        this.newGameButton.setPositionOnCenter(new MyMath_1.Vector2D(canvasElement.width * .5, 200));
        this.rematchButton.image.width *= 1.5;
        this.rematchButton.image.height *= 1.25;
        this.rematchButton.position.x = this.newGameButton.position.x;
        this.rematchButton.position.y = this.newGameButton.position.y + 100;
        this.exitGameButton.image.width *= 1.5;
        this.exitGameButton.image.height *= 1.25;
        this.exitGameButton.position.x = this.rematchButton.position.x;
        this.exitGameButton.position.y = this.rematchButton.position.y + 100;
    }
    enter() {
        GameManager_1.GameManager.getCanvas().onclick = this.onMouseDown.bind(this);
    }
    draw() {
        const context = GameManager_1.GameManager.getContext();
        GameManager_1.GameManager.Instance.gameBoard.draw();
        GameManager_1.GameManager.Instance.canvas.drawGameTitle();
        GameManager_1.GameManager.Instance.canvas.drawUI();
        //Drawing buttons
        this.newGameButton.draw(context);
        this.rematchButton.draw(context);
        this.exitGameButton.draw(context);
    }
    exit() {
        let canvasElement = GameManager_1.GameManager.getCanvas();
        canvasElement.onclick = null;
    }
    onMouseDown(e) {
        e.preventDefault();
        const mousePos = new MyMath_1.Vector2D(e.clientX, e.clientY);
        const rect = GameManager_1.GameManager.getCanvas().getBoundingClientRect();
        //Start Button
        if (this.newGameButton.isClicked(mousePos, rect)) {
            this.newGame();
        }
        //Exit Button- self.close() only working with live server
        else if (this.exitGameButton.isClicked(mousePos, rect)) {
            this.exitGame();
        }
        else if (this.rematchButton.isClicked(mousePos, rect)) {
            this.rematch();
        }
    }
    exitGame() {
        GameManager_1.GameManager.Instance.exitGame();
    }
    newGame() {
        GameManager_1.GameManager.Instance.newGame();
    }
    rematch() {
        GameManager_1.GameManager.Instance.rematch();
    }
}
exports.ScoreMenuState = ScoreMenuState;


/***/ }),

/***/ "./src/States/TieState.ts":
/*!********************************!*\
  !*** ./src/States/TieState.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TieState = void 0;
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const ScoreMenuState_1 = __webpack_require__(/*! ./ScoreMenuState */ "./src/States/ScoreMenuState.ts");
class TieState extends ScoreMenuState_1.ScoreMenuState {
    constructor() {
        super();
    }
    draw() {
        super.draw();
        //Drawing the "Tie" label
        let context = GameManager_1.GameManager.getContext();
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "bottom";
        let textPos = new MyMath_1.Vector2D(GameManager_1.GameManager.getCanvas().width * .5, 0);
        textPos.y = GameManager_1.GameManager.Instance.gameBoard.startPos.y;
        context.fillText("Tie", textPos.x, textPos.y);
    }
}
exports.TieState = TieState;


/***/ }),

/***/ "./src/States/WinState.ts":
/*!********************************!*\
  !*** ./src/States/WinState.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WinState = void 0;
const MyMath_1 = __webpack_require__(/*! ../Core/MyMath */ "./src/Core/MyMath.ts");
const Sound_1 = __webpack_require__(/*! ../Core/Sound */ "./src/Core/Sound.ts");
const GameManager_1 = __webpack_require__(/*! ../Managers/GameManager */ "./src/Managers/GameManager.ts");
const WinLinesManager_1 = __webpack_require__(/*! ../Managers/WinLinesManager */ "./src/Managers/WinLinesManager.ts");
const ScoreMenuState_1 = __webpack_require__(/*! ./ScoreMenuState */ "./src/States/ScoreMenuState.ts");
class WinState extends ScoreMenuState_1.ScoreMenuState {
    constructor() {
        super();
        this.winSound = new Sound_1.Sound("./Assets/Sounds/Win.wav");
    }
    enter() {
        super.enter();
        this.winData = WinLinesManager_1.WinLinesManager.Instance.winData;
        this.winSound.play();
        this.winData.player.score++;
        GameManager_1.GameManager.Instance.gameBoard.drawWinLine();
    }
    draw() {
        super.draw();
        //Drawing the win label
        let context = GameManager_1.GameManager.getContext();
        context.font = "30px Comic Sans MS";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "bottom";
        let textPos = new MyMath_1.Vector2D(GameManager_1.GameManager.getCanvas().width * .5, 0);
        textPos.y = GameManager_1.GameManager.Instance.gameBoard.startPos.y;
        context.fillText(this.winData.player.name + " is the Winner", textPos.x, textPos.y);
    }
}
exports.WinState = WinState;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
const GameManager_1 = __webpack_require__(/*! ./Managers/GameManager */ "./src/Managers/GameManager.ts");
//Entry point of the game
class Main {
    constructor() {
        this.gameManager = GameManager_1.GameManager.Instance;
    }
    start() {
        this.gameManager.start();
        this.gameLoop();
    }
    gameLoop() {
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.gameManager.canvas.clear();
        this.gameManager.update();
        this.gameManager.draw();
    }
}
exports.Main = Main;
window.addEventListener("load", function () {
    const game = new Main();
    game.start();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUFyQkQsb0JBcUJDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUU1QixNQUFNLElBQUksR0FBRSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9Db3JlL0J1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29yZS9DYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvcmUvTXlNYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9Db3JlL1NvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9Db3JlL1Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29yZS9TdGF0ZU1hY2hpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvcmUvVGV4dERhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFuYWdlcnMvR2FtZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmFnZXJzL1dpbkxpbmVzTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZXMvQmFzZVN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZXMvR2FtZVN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZXMvTWFpbk1lbnVTdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU3RhdGVzL1Njb3JlTWVudVN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZXMvVGllU3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0YXRlcy9XaW5TdGF0ZS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi9NeU1hdGhcIjtcclxuaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi9Tb3VuZFwiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9TcHJpdGVcIjtcclxuXHJcbi8vSGFuZGxlcyBkcmF3aW5nIGEgc3ByaXRlIGFuZCBkZXRlY3RpbmcgbW91c2UgY2xpY2tcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFNwcml0ZSBcclxue1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgY2xpY2tTb3VuZDogU291bmQ7XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIHNwcml0ZVBhdGg6IHN0cmluZywgY2xpY2tTb3VuZFBhdGg6IHN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoc3ByaXRlUGF0aCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmNsaWNrU291bmQgPSBuZXcgU291bmQoY2xpY2tTb3VuZFBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kcmF3KGNvbnRleHQpO1xyXG5cclxuICAgICAgICAvL0NhbGN1YWx0ZSB0ZXh0IHNpemUgYmFzZWQgb24gc2l6ZSBvZiBidXR0b25cclxuICAgICAgICBsZXQgdGV4dFNpemUgPSBNYXRoLmZsb29yKHRoaXMuaW1hZ2Uud2lkdGggLyB0aGlzLnRleHQubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCB0ZXh0T2Zmc2V0ID0gNTtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSAodGV4dE9mZnNldCArIHRleHRTaXplKSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIGxldCBwb3MgPSBuZXcgVmVjdG9yMkQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5pbWFnZS53aWR0aCAqIC41LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmltYWdlLmhlaWdodCAqIC41KTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgcG9zLngsIHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0NsaWNrZWQobW91c2VQb3M6IFZlY3RvcjJELCBjYW52YXNSZWN0OiBET01SZWN0KTogYm9vbGVhbiBcclxuICAgIHtcclxuICAgICAgICAvL1RoZSBwb3MgYW5kIHNpemUgY291YmxlIGJlIGFmZmVjdGVkIGJ5IGNhbnZhcyBwb3NpdGlvbmluZ1xyXG4gICAgICAgIGxldCB0cnVlUG9zaXRpb24gPSBuZXcgVmVjdG9yMkQodGhpcy5wb3NpdGlvbi54IC0gY2FudmFzUmVjdC5sZWZ0LCB0aGlzLnBvc2l0aW9uLnkgLSBjYW52YXNSZWN0LnRvcCk7XHJcbiAgICAgICAgbGV0IHRydWVTaXplID0gbmV3IFZlY3RvcjJEKHRoaXMuaW1hZ2Uud2lkdGggLSBjYW52YXNSZWN0LmxlZnQgKyB0cnVlUG9zaXRpb24ueCwgdGhpcy5pbWFnZS5oZWlnaHQgLSBjYW52YXNSZWN0LnRvcCArIHRydWVQb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgLy9DaGVjayBpZiBtb3VzZSBjbGljayB3YXMgd2l0aGluIGJ1dHRvbiBib3VuZHNcclxuICAgICAgICBpZiAobW91c2VQb3MueCA+PSB0cnVlUG9zaXRpb24ueCAmJiBtb3VzZVBvcy54IDw9IHRydWVTaXplLnggJiYgbW91c2VQb3MueSA+PSB0cnVlUG9zaXRpb24ueSAmJiBtb3VzZVBvcy55IDw9IHRydWVTaXplLnkpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja1NvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLi9NYW5hZ2Vycy9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuL015TWF0aFwiO1xyXG5pbXBvcnQgeyBUZXh0RGF0YSB9IGZyb20gXCIuL1RleHREYXRhXCI7XHJcblxyXG4vL0hhbmRsZXMgbWFpbiByZW5kZXJpbmcgb2YgZ2FtZVxyXG5leHBvcnQgY2xhc3MgQ2FudmFzXHJcbntcclxuICAgIGNhbnZhc0VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBnYW1lVGl0bGVUZXh0ITpUZXh0RGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNFbGVtZW50PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgICAgICB0aGlzLmNhbnZhc0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0PSB0aGlzLmNhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lVGl0bGVUZXh0PSBuZXcgVGV4dERhdGEoR2FtZU1hbmFnZXIuSW5zdGFuY2UuZ2FtZVRpdGxlKTtcclxuICAgICAgICB0aGlzLmdhbWVUaXRsZVRleHQuZm9udD0gXCI2MHB4IENvbWljIFNhbnMgTVNcIjtcclxuICAgICAgICB0aGlzLmdhbWVUaXRsZVRleHQuZmlsbFN0eWxlPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lVGl0bGVUZXh0LnRleHRBbGlnbj0gXCJjZW50ZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3R2FtZVRpdGxlKClcclxuICAgIHtcclxuICAgICAgICAvLyAvL0RyYXcgZ2FtZSB0aXRsZVxyXG4gICAgICAgIGxldCB0aXRsZVBvcz0gbmV3IFZlY3RvcjJEKHRoaXMuY2FudmFzRWxlbWVudC53aWR0aCAqLjUsIDUwKTtcclxuICAgICAgICB0aGlzLmdhbWVUaXRsZVRleHQuZHJhdyh0aGlzLmNvbnRleHQsIHRpdGxlUG9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkcmF3VGV4dCh0ZXh0OnN0cmluZywgcG9zOlZlY3RvcjJELCBmb250PzpzdHJpbmcsIGZpbGxTdHlsZT86c3RyaW5nLCB0ZXh0QWxpZ24/OkNhbnZhc1RleHRBbGlnbiwgdGV4dEJhc2VsaW5lPzpDYW52YXNUZXh0QmFzZWxpbmUpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYoZm9udCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgLy8gICAgICAgICB0aGlzLmNvbnRleHQuZm9udD0gZm9udDtcclxuICAgIC8vICAgICBpZihmaWxsU3R5bGUgIT09IHVuZGVmaW5lZClcclxuICAgIC8vICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZT0gZmlsbFN0eWxlO1xyXG4gICAgLy8gICAgIGlmKHRleHRBbGlnbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgLy8gICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduPSB0ZXh0QWxpZ247XHJcbiAgICAvLyAgICAgaWYodGV4dEJhc2VsaW5lICE9PSB1bmRlZmluZWQpXHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmU9IHRleHRCYXNlbGluZTtcclxuICAgICAgICBcclxuICAgIC8vICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgcG9zLngscG9zLnkpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vSGVscHMgZHJhdyB0aGUgY29tbW9uIFVJIGVsZW1lbnRzXHJcbiAgICBkcmF3VUkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0ZXN0UG9pbnQ9IDcwO1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQ9IEdhbWVNYW5hZ2VyLmdldENvbnRleHQoKTtcclxuICAgICAgICBsZXQgdGV4dFBvcz0gbmV3IFZlY3RvcjJEKEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLndpZHRoICouNSwgdGVzdFBvaW50KTtcclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UuY2FudmFzLmRyYXdHYW1lVGl0bGUoKTtcclxuXHJcbiAgICAgICAgLy9QbGF5ZXIgMSBOYW1lXHJcbiAgICAgICAgY29udGV4dC5mb250PSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ249IFwiY2VudGVyXCI7XHJcblxyXG4gICAgICAgIHRleHRQb3MueD0gMDtcclxuICAgICAgICB0ZXh0UG9zLnk9IHRlc3RQb2ludDtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbj0gXCJsZWZ0XCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcIlBsYXllciAxXCIsIHRleHRQb3MueCx0ZXh0UG9zLnkpO1xyXG5cclxuICAgICAgICAvL1BsYXllciAxIHNjb3JlXHJcbiAgICAgICAgdGV4dFBvcy55Kz0gNTA7XHJcbiAgICAgICAgdGV4dFBvcy54Kz0gNTA7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ249IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChHYW1lTWFuYWdlci5JbnN0YW5jZS5wbGF5ZXIxLnNjb3JlLnRvU3RyaW5nKCksIHRleHRQb3MueCx0ZXh0UG9zLnkpO1xyXG5cclxuICAgICAgICAvL1BsYXllciAyIE5hbWVcclxuICAgICAgICB0ZXh0UG9zLng9IEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLndpZHRoO1xyXG4gICAgICAgIHRleHRQb3MueT0gdGVzdFBvaW50O1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcIlBsYXllciAyXCIsIHRleHRQb3MueCx0ZXh0UG9zLnkpO1xyXG5cclxuICAgICAgICAvL1BsYXllciAyIHNjb3JlXHJcbiAgICAgICAgdGV4dFBvcy55Kz0gNTA7XHJcbiAgICAgICAgdGV4dFBvcy54LT0gNTA7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ249IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChHYW1lTWFuYWdlci5JbnN0YW5jZS5wbGF5ZXIyLnNjb3JlLnRvU3RyaW5nKCksIHRleHRQb3MueCx0ZXh0UG9zLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vV2lsbCBjbGVhbiB0aGUgd2hvbGUgY2FudmFzLlxyXG4gICAgY2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNFbGVtZW50LndpZHRoLCB0aGlzLmNhbnZhc0VsZW1lbnQuaGVpZ2h0KTtcclxuICAgIH1cclxufSIsIi8vQWRkIGFueSBjb21tb24gZnVuY3Rpb25hbHkgaGVyZS5cclxuXHJcbi8vQ29udGFpbmVyIGhvbGRpbmcgMiBudW1iZXJzIFxyXG5leHBvcnQgY2xhc3MgVmVjdG9yMkRcclxue1xyXG4gICAgeDpudW1iZXI7XHJcbiAgICB5Om51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLng9IHg7XHJcbiAgICAgICAgdGhpcy55PSB5O1xyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBjbGFzcyBTb3VuZFxyXG57XHJcbiAgICBhdWRpbzpIVE1MQXVkaW9FbGVtZW50O1xyXG4gICAgY29uc3RydWN0b3IocGF0aDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hdWRpbz0gbmV3IEF1ZGlvKHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi9NeU1hdGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVcclxue1xyXG4gICAgcG9zaXRpb246VmVjdG9yMkQ7XHJcbiAgICBpbWFnZTpIVE1MSW1hZ2VFbGVtZW50XHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmltYWdlPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmxvYWQocGF0aCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbj0gbmV3IFZlY3RvcjJEKDAsMCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS53aWR0aD0gMTAwO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0PSA1MDtcclxuICAgIH1cclxuXHJcbiAgICAvL1NldHMgdGhlIGNlbnRlciBvZiBzcHJpdGUgdG8gdGhlIFwibmV3UG9zXCIuXHJcbiAgICBzZXRQb3NpdGlvbk9uQ2VudGVyKG5ld1BvczpWZWN0b3IyRClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjZW50ZXI9IHRoaXMuZ2V0Q2VudGVyKCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54PSBuZXdQb3MueC0gY2VudGVyLng7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55PSBuZXdQb3MueSAtIGNlbnRlci55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vUmV0cmlldmVzIHRoZSBjZW50ZXIgb2Ygc3ByaXRlXHJcbiAgICBnZXRDZW50ZXIoKTpWZWN0b3IyRFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy5pbWFnZS53aWR0aCouNSwgdGhpcy5pbWFnZS5oZWlnaHQqLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMuaW1hZ2Uud2lkdGgsIHRoaXMuaW1hZ2UuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKHBhdGg6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjPSBwYXRoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQmFzZVN0YXRlIH0gZnJvbSBcIi4uL1N0YXRlcy9CYXNlU3RhdGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZU1hY2hpbmVcclxue1xyXG4gICAgZ2FtZVN0YXRlcyE6TWFwPHN0cmluZywgQmFzZVN0YXRlPjtcclxuICAgIGN1cnJlbnRTdGF0ZSE6QmFzZVN0YXRlO1xyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVzOk1hcDxzdHJpbmcsQmFzZVN0YXRlPilcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlcz0gc3RhdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVN0YXRlKHN0YXRlTmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0YXRlPSB0aGlzLmdhbWVTdGF0ZXMuZ2V0KHN0YXRlTmFtZSk7XHJcbiAgICAgICAgaWYoc3RhdGUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSlcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuZXhpdCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi9NeU1hdGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0RGF0YVxyXG57XHJcbiAgICB0ZXh0OnN0cmluZztcclxuICAgIGZvbnQhOnN0cmluZ1xyXG4gICAgZmlsbFN0eWxlITpzdHJpbmc7XHJcbiAgICB0ZXh0QWxpZ24hOkNhbnZhc1RleHRBbGlnbjtcclxuICAgIHRleHRCYXNlbGluZSE6Q2FudmFzVGV4dEJhc2VsaW5lO1xyXG4gICAgY29uc3RydWN0b3IodGV4dDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50ZXh0PSB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRleHRQb3M6VmVjdG9yMkQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5mb250ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNvbnRleHQuZm9udD0gdGhpcy5mb250O1xyXG4gICAgICAgIGlmKHRoaXMuZmlsbFN0eWxlICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlPSB0aGlzLmZpbGxTdHlsZTtcclxuICAgICAgICBpZih0aGlzLnRleHRBbGlnbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBjb250ZXh0LnRleHRBbGlnbj0gdGhpcy50ZXh0QWxpZ247XHJcbiAgICAgICAgaWYodGhpcy50ZXh0QmFzZWxpbmUgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmU9IHRoaXMudGV4dEJhc2VsaW5lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0ZXh0UG9zLngsdGV4dFBvcy55KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vTWFuYWdlcnMvR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi9Db3JlL015TWF0aFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcclxuaW1wb3J0IHsgRElSRUNUSU9OLCBXaW5MaW5lc01hbmFnZXIgfSBmcm9tIFwiLi9NYW5hZ2Vycy9XaW5MaW5lc01hbmFnZXJcIjtcclxuXHJcbi8vUmVwcmVzZW50cyBkYXRhIGZvciBlYWNoIHNxdWFyZSBpbiBncmlkLlxyXG5jbGFzcyBTcXVhcmUgXHJcbntcclxuICAgIHB1YmxpYyBzeW1ib2w6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihzeW1ib2w6IHN0cmluZywgY29sb3I6IHN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0hhbmRsZXMgdGhlIHRpYyB0YWMgdG9lIGJvYXJkXHJcbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmQgXHJcbntcclxuICAgIGdyaWQ6IFNxdWFyZVtdW107XHJcbiAgICBjZWxsU2l6ZTogVmVjdG9yMkQ7XHJcbiAgICBzdGFydFBvczogVmVjdG9yMkQ7XHJcbiAgICB3aW5MaW5lV2lkdGg6IG51bWJlcj0gMTA7XHJcbiAgICBncmlkTGluZUNvbG9yOnN0cmluZz0gXCJ3aGl0ZVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJvd0NvdW50OiBudW1iZXIsIGNvbENvdW50OiBudW1iZXIpIFxyXG4gICAge1xyXG4gICAgICAgIC8vQ3JlYXRpbmcgdGhlIGdyaWRcclxuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93Q291bnQ7IHJvd0luZGV4KyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkW3Jvd0luZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgY29sQ291bnQ7IGNvbEluZGV4KyspIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbcm93SW5kZXhdW2NvbEluZGV4XSA9IG5ldyBTcXVhcmUoXCJcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGUgYm9hcmQgc2l6ZSBiYXNlZCBvbiBjYW52YXMgc2l6ZS5cclxuICAgICAgICBjb25zdCBib2FyZFNjYWxlID0gbmV3IFZlY3RvcjJEKC41LCAuNSk7XHJcbiAgICAgICAgY29uc3QgYm9hcmRTaXplID0gR2FtZU1hbmFnZXIuZ2V0Q2FudmFzKCkud2lkdGggKiBib2FyZFNjYWxlLng7XHJcbiAgICAgICAgdGhpcy5jZWxsU2l6ZSA9IG5ldyBWZWN0b3IyRChib2FyZFNpemUgLyByb3dDb3VudCwgYm9hcmRTaXplIC8gY29sQ291bnQpO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0ZSB3aGVyZSB0aGUgYm9hcmQgc3RhcnRzIGRyYXdpbmdcclxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gbmV3IFZlY3RvcjJEKChHYW1lTWFuYWdlci5nZXRDYW52YXMoKS53aWR0aCAqIC41IC0gYm9hcmRTaXplICogLjUpLCAoR2FtZU1hbmFnZXIuZ2V0Q2FudmFzKCkuaGVpZ2h0ICogLjYgLSBib2FyZFNpemUgKiAuNSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSBcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmdyaWRMaW5lQ29sb3I7XHJcblxyXG4gICAgICAgIC8vSXRlcmF0ZSB0aHJvdWdodCB0aGUgd2hvbGUgZ3JpZCBhbmQgcmVuZGVyIGJvYXJkIGFuZCBzeW1ib2xzIGluIHRoZW1cclxuICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgdGhpcy5ncmlkLmxlbmd0aDsgcm93SW5kZXgrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgdGhpcy5ncmlkW3Jvd0luZGV4XS5sZW5ndGg7IGNvbEluZGV4KyspIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBuZXcgVmVjdG9yMkQocm93SW5kZXggKiB0aGlzLmNlbGxTaXplLnggKyB0aGlzLnN0YXJ0UG9zLngsIGNvbEluZGV4ICogdGhpcy5jZWxsU2l6ZS55ICsgdGhpcy5zdGFydFBvcy55KVxyXG4gICAgICAgICAgICAgICAgLy9EcmF3IHRoZSBzcXVhcmVcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdChwb3MueCwgcG9zLnksIHRoaXMuY2VsbFNpemUueCwgdGhpcy5jZWxsU2l6ZS55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0RyYXcgdGV4dFxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTaXplID0gTWF0aC5mbG9vcih0aGlzLmNlbGxTaXplLngpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dE9mZnNldCA9IHRleHRTaXplICUgMTE7IC8vTWlkZGxlIGJhc2VsaW5lIHNob3VsZCBjZW50ZXIgaXQgYnV0IGZvciBzb21lIHJlYXNvbiB3ZSBuZWVkIHRvIGFwcGx5IGFuIG9mZnNldFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dFBvcyA9IG5ldyBWZWN0b3IyRChwb3MueCArIHRoaXMuY2VsbFNpemUueCAqIC41LCBwb3MueSArIHRoaXMuY2VsbFNpemUueSAqIC41ICsgdGV4dE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UZXh0IHNldHRpbmdzLSB4L28gc2l6ZSBpcyBiYXNlZCBvbiBjZWxsIHNpemVcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZm9udCA9IHRleHRTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmdldFNxdWFyZShyb3dJbmRleCwgY29sSW5kZXgpLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0aGlzLmdldFNxdWFyZShyb3dJbmRleCwgY29sSW5kZXgpLnN5bWJvbCwgdGV4dFBvcy54LCB0ZXh0UG9zLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYXdXaW5MaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9EcmF3aW5nIHRoZSBsaW5lIHRocm91Z2ggdGhlIGJvYXJkIHdoZW4gcGxheWVyIHdpbnNcclxuICAgIGRyYXdXaW5MaW5lKCkgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2luRGF0YSA9IFdpbkxpbmVzTWFuYWdlci5JbnN0YW5jZS53aW5EYXRhO1xyXG4gICAgICAgIGlmICh3aW5EYXRhLmFueVdpbiA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy9HcmFiIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpbmVcclxuICAgICAgICBjb25zdCBsaW5lRGlyZWN0aW9uID0gd2luRGF0YS53aW5MaW5lLmxpbmVEaXJlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy9SaWdodCBEaWFnb25hbFxyXG4gICAgICAgIGxldCBzdGFydFBvaW50ID0gbmV3IFZlY3RvcjJEKHdpbkRhdGEud2luTGluZS5zcXVhcmVzWzBdLnggKiB0aGlzLmNlbGxTaXplLnggKyB0aGlzLnN0YXJ0UG9zLngsIHdpbkRhdGEud2luTGluZS5zcXVhcmVzWzBdLnkgKiB0aGlzLmNlbGxTaXplLnkgKyB0aGlzLnN0YXJ0UG9zLnkpO1xyXG4gICAgICAgIGxldCBlbmRQb2ludCA9IG5ldyBWZWN0b3IyRCgod2luRGF0YS53aW5MaW5lLnNxdWFyZXNbMl0ueCArIDEpICogdGhpcy5jZWxsU2l6ZS54ICsgdGhpcy5zdGFydFBvcy54LCAod2luRGF0YS53aW5MaW5lLnNxdWFyZXNbMl0ueSArIDEpICogdGhpcy5jZWxsU2l6ZS55ICsgdGhpcy5zdGFydFBvcy55KTtcclxuXHJcbiAgICAgICAgLy9MZWZ0IGRpYWdvbmFsXHJcbiAgICAgICAgaWYgKGxpbmVEaXJlY3Rpb24gPT0gRElSRUNUSU9OLkxFRlRfRElBR09OQUwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludC54ICs9IHRoaXMuY2VsbFNpemUueDtcclxuICAgICAgICAgICAgZW5kUG9pbnQueCAtPSB0aGlzLmNlbGxTaXplLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSG9yaXpvbnRhbFxyXG4gICAgICAgIGVsc2UgaWYgKGxpbmVEaXJlY3Rpb24gPT0gRElSRUNUSU9OLkhPUklaT05UQUwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludC55ICs9IHRoaXMuY2VsbFNpemUueSAqIC41O1xyXG4gICAgICAgICAgICBlbmRQb2ludC55IC09IHRoaXMuY2VsbFNpemUueSAqIC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1ZlcnRpY2FsXHJcbiAgICAgICAgZWxzZSBpZiAobGluZURpcmVjdGlvbiA9PSBESVJFQ1RJT04uVkVSVElDQUwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludC54ICs9IHRoaXMuY2VsbFNpemUueCAqIC41O1xyXG4gICAgICAgICAgICBlbmRQb2ludC54IC09IHRoaXMuY2VsbFNpemUueCAqIC41O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9EcmF3IExpbmVcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGU9IHdpbkRhdGEucGxheWVyLmNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdGhpcy53aW5MaW5lV2lkdGg7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oc3RhcnRQb2ludC54LCBzdGFydFBvaW50LnkpO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKGVuZFBvaW50LngsIGVuZFBvaW50LnkpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Cb2FyZCBlbnRlcmluZyBwbGF5ZXIgcGlja1xyXG4gICAgcGxheWVyQ2xpY2socGxheWVyOiBQbGF5ZXIsIG1vdXNlUG9zOiBWZWN0b3IyRCk6IGJvb2xlYW4gXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmU7XHJcblxyXG4gICAgICAgIC8vSXRlcmF0ZSB0aHJvdWdoIG91ciBib2FyZCB1bnRpbCB3ZSBmaW5kIG9uZSB0aGUgcGxheWVyIHBpY2tlZC5cclxuICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgdGhpcy5ncmlkLmxlbmd0aDsgcm93SW5kZXgrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgdGhpcy5ncmlkW3Jvd0luZGV4XS5sZW5ndGg7IGNvbEluZGV4KyspIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsU3RhcnRQb3MgPSBuZXcgVmVjdG9yMkQocm93SW5kZXggKiB0aGlzLmNlbGxTaXplLnggKyB0aGlzLnN0YXJ0UG9zLngsIGNvbEluZGV4ICogdGhpcy5jZWxsU2l6ZS55ICsgdGhpcy5zdGFydFBvcy55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0lzIG91ciBtb3VzZSBwb3NpdGlvbiBpbnNpZGUgdGhpcyBzcXVhcmU/XHJcbiAgICAgICAgICAgICAgICBpZiAobW91c2VQb3MueCA+PSBjZWxsU3RhcnRQb3MueCAmJiBtb3VzZVBvcy54IDw9IGNlbGxTdGFydFBvcy54ICsgdGhpcy5jZWxsU2l6ZS54ICYmIG1vdXNlUG9zLnkgPj0gY2VsbFN0YXJ0UG9zLnkgJiYgbW91c2VQb3MueSA8PSBjZWxsU3RhcnRQb3MueSArIHRoaXMuY2VsbFNpemUueSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9HcmFiIHRoZSBjdXJyZW50IHNxdWFyZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZShyb3dJbmRleCwgY29sSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGlmIHdlIGNhbiBlbnRlciBwbGF5ZXIgcGljayBvciBub3RcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNxdWFyZS5zeW1ib2wgIT09IFwiXCIpIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TcXVhcmUgZGF0YSBiYXNlZCBvbiBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNxdWFyZS5jb2xvcj0gcGxheWVyLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3F1YXJlLnN5bWJvbD0gcGxheWVyLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9RdWljayBjaGVjayBpZiBvdXIgYm9hcmQgaXMgZnVsbCBvciBub3RcclxuICAgIGlzRnVsbCgpOiBib29sZWFuIFxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdyaWQubGVuZ3RoOyByb3dJbmRleCsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCB0aGlzLmdyaWRbcm93SW5kZXhdLmxlbmd0aDsgY29sSW5kZXgrKykgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNxdWFyZShyb3dJbmRleCwgY29sSW5kZXgpLnN5bWJvbCA9PT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSBcclxuICAgIHtcclxuICAgICAgICAvL1Jlc2V0IHRoZSBib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGdldFNxdWFyZSh4OiBudW1iZXIsIHk6IG51bWJlcikgXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFN0YXRlTWFjaGluZSB9IGZyb20gXCIuLi9Db3JlL1N0YXRlTWFjaGluZVwiO1xyXG5pbXBvcnQgeyBNYWluTWVudVN0YXRlIH0gZnJvbSBcIi4uL1N0YXRlcy9NYWluTWVudVN0YXRlXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9TdGF0ZXMvR2FtZVN0YXRlXCI7XHJcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuLi9HYW1lQm9hcmRcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4uL1BsYXllclwiO1xyXG5pbXBvcnQgeyBXaW5MaW5lc01hbmFnZXIgfSBmcm9tIFwiLi9XaW5MaW5lc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQmFzZVN0YXRlIH0gZnJvbSBcIi4uL1N0YXRlcy9CYXNlU3RhdGVcIjtcclxuaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSBcIi4uL0NvcmUvQ2FudmFzXCI7XHJcbmltcG9ydCB7IFdpblN0YXRlIH0gZnJvbSBcIi4uL1N0YXRlcy9XaW5TdGF0ZVwiO1xyXG5pbXBvcnQgeyBUaWVTdGF0ZSB9IGZyb20gXCIuLi9TdGF0ZXMvVGllU3RhdGVcIjtcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi4vQ29yZS9NeU1hdGhcIjtcclxuXHJcbi8vTWFuYWdlciB0byBoYW5kbGUgcmVmZXJlbmNlcyBhbmQgc3RhdGVzIG9mIGZvciBvdXIgZ2FtZVxyXG5leHBvcnQgY2xhc3MgR2FtZU1hbmFnZXIgXHJcbntcclxuICAgIHN0YXRlTWFjaGluZSE6IFN0YXRlTWFjaGluZTtcclxuICAgIGNhbnZhcyE6IENhbnZhcztcclxuICAgIGdhbWVCb2FyZCE6IEdhbWVCb2FyZDtcclxuICAgIHBsYXllcjEhOiBQbGF5ZXI7XHJcbiAgICBwbGF5ZXIyITogUGxheWVyO1xyXG4gICAgd2luTGluZXMgITogV2luTGluZXNNYW5hZ2VyO1xyXG5cclxuICAgIC8vR2FtZSBTZXR0aW5nc1xyXG4gICAgZ2FtZVRpdGxlITogc3RyaW5nO1xyXG4gICAgYm9hcmRTaXplITpWZWN0b3IyRDtcclxuXHJcbiAgICAvL1NpbmdsZXRvbiBQYXR0ZXJuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSBcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSBcclxuICAgIHtcclxuICAgICAgICAvL1NldHRpbmcgdXAgZ2FtZSBzZXR0aW5nc1xyXG4gICAgICAgIHRoaXMuZ2FtZVRpdGxlID0gXCJUaWMgVGFjIFRvZVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaXplPSBuZXcgVmVjdG9yMkQoMywzKTtcclxuICAgICAgICB0aGlzLnBsYXllcjE9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBcIlhcIiwgXCJibHVlXCIpO1xyXG4gICAgICAgIHRoaXMucGxheWVyMj0gbmV3IFBsYXllcihcIlBsYXllciAyXCIsIFwiT1wiLCBcInJlZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy53aW5MaW5lcyA9IFdpbkxpbmVzTWFuYWdlci5JbnN0YW5jZTtcclxuICAgICAgICB0aGlzLndpbkxpbmVzLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBuZXcgQ2FudmFzKCk7XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIG91ciBzdGF0ZXNcclxuICAgICAgICBsZXQgZ2FtZVN0YXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlU3RhdGU+KFtcclxuICAgICAgICAgICAgW1wiTWFpbk1lbnVcIiwgbmV3IE1haW5NZW51U3RhdGUoKV0sXHJcbiAgICAgICAgICAgIFtcIkdhbWVcIiwgbmV3IEdhbWVTdGF0ZSgpXSxcclxuICAgICAgICAgICAgW1wiV2luU3RhdGVcIiwgbmV3IFdpblN0YXRlKCldLFxyXG4gICAgICAgICAgICBbXCJUaWVTdGF0ZVwiLCBuZXcgVGllU3RhdGUoKV1cclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgLy9XZSBzdGFydCBpbiBcIk1haW5NZW51U3RhdGVcIlxyXG4gICAgICAgIHRoaXMuc3RhdGVNYWNoaW5lID0gbmV3IFN0YXRlTWFjaGluZShnYW1lU3RhdGVzKTtcclxuICAgICAgICB0aGlzLnN0YXRlTWFjaGluZS5jaGFuZ2VTdGF0ZShcIk1haW5NZW51XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYWNoaW5lLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFjaGluZS5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtYXRjaCgpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2luTGluZXMucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQodGhpcy5ib2FyZFNpemUueCwgdGhpcy5ib2FyZFNpemUueSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hY2hpbmUuY2hhbmdlU3RhdGUoXCJHYW1lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld0dhbWUoKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpbkxpbmVzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxLnNjb3JlPSAwO1xyXG4gICAgICAgIHRoaXMucGxheWVyMi5zY29yZT0gMDtcclxuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQodGhpcy5ib2FyZFNpemUueCwgdGhpcy5ib2FyZFNpemUueSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hY2hpbmUuY2hhbmdlU3RhdGUoXCJHYW1lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4aXRHYW1lKClcclxuICAgIHtcclxuICAgICAgICBzZWxmLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHYW1lTWFuYWdlci5JbnN0YW5jZS5jYW52YXMuY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Q2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHYW1lTWFuYWdlci5JbnN0YW5jZS5jYW52YXMuY2FudmFzRWxlbWVudDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL0NvcmUvTXlNYXRoXCI7XHJcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuLi9HYW1lQm9hcmRcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4uL1BsYXllclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRElSRUNUSU9OIFxyXG57XHJcbiAgICBOT05FPSAwLFxyXG4gICAgUklHSFRfRElBR09OQUwsXHJcbiAgICBMRUZUX0RJQUdPTkFMLFxyXG4gICAgVkVSVElDQUwsXHJcbiAgICBIT1JJWk9OVEFMLFxyXG4gIH1cclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5EYXRhIFxyXG57XHJcbiAgICBwbGF5ZXIhOiBQbGF5ZXI7XHJcbiAgICBhbnlXaW46IGJvb2xlYW47XHJcbiAgICB3aW5MaW5lITogV2luTGluZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYW55V2luID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdpbkxpbmUgXHJcbntcclxuICAgIHNxdWFyZXM6IFZlY3RvcjJEW107XHJcbiAgICBjb25zdHJ1Y3RvcihzcXVhcmUxOlZlY3RvcjJELCBzcXVhcmUyOlZlY3RvcjJELCBzcXVhcmUzOlZlY3RvcjJEKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNxdWFyZXMgPSBbc3F1YXJlMSwgc3F1YXJlMiwgc3F1YXJlM107XHJcbiAgICB9XHJcblxyXG4gICAgLy9EZXRlcm1pbmVzIGRpcmVjdGlvbiBvdXIgd2luIGxpbmVcclxuICAgIGxpbmVEaXJlY3Rpb24oKTogRElSRUNUSU9OIFxyXG4gICAge1xyXG4gICAgICAgIC8vUmlnaHQgRGlhZ29uYWxcclxuICAgICAgICBpZiAodGhpcy5zcXVhcmVzWzFdLnggPT0gdGhpcy5zcXVhcmVzWzBdLnggKyAxICYmIHRoaXMuc3F1YXJlc1sxXS55ID09IHRoaXMuc3F1YXJlc1swXS55ICsgMSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRElSRUNUSU9OLlJJR0hUX0RJQUdPTkFMO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9MZWZ0IERpYWdvbmFsXHJcbiAgICAgICAgaWYgKHRoaXMuc3F1YXJlc1sxXS54ID09IHRoaXMuc3F1YXJlc1swXS54IC0gMSAmJiB0aGlzLnNxdWFyZXNbMV0ueSA9PSB0aGlzLnNxdWFyZXNbMF0ueSArIDEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERJUkVDVElPTi5MRUZUX0RJQUdPTkFMO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0hvcml6b250YWxcclxuICAgICAgICBpZiAodGhpcy5zcXVhcmVzWzFdLnggPT0gdGhpcy5zcXVhcmVzWzBdLnggKyAxICYmIHRoaXMuc3F1YXJlc1sxXS55ID09IHRoaXMuc3F1YXJlc1swXS55KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBESVJFQ1RJT04uSE9SSVpPTlRBTDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9WZXJ0aWNhbFxyXG4gICAgICAgIGlmICh0aGlzLnNxdWFyZXNbMV0ueCA9PSB0aGlzLnNxdWFyZXNbMF0ueCAmJiB0aGlzLnNxdWFyZXNbMV0ueSA9PSB0aGlzLnNxdWFyZXNbMF0ueSArIDEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERJUkVDVElPTi5WRVJUSUNBTDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBESVJFQ1RJT04uTk9ORTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgV2luTGluZXNNYW5hZ2VyIFxyXG57XHJcbiAgICAvL3dpbkxpbmVzOiBXaW5MaW5lUG9pbnRbXVtdO1xyXG4gICAgd2luRGF0YSE6IFdpbkRhdGE7XHJcbiAgICB3aW5MaW5lczI6IFdpbkxpbmVbXTtcclxuXHJcbiAgICAvL1NpbmdsZXRvbiBQYXR0ZXJuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFdpbkxpbmVzTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2luRGF0YSA9IG5ldyBXaW5EYXRhKCk7XHJcbiAgICAgICAgdGhpcy53aW5MaW5lczI9IFtcclxuICAgICAgICAgICAgbmV3IFdpbkxpbmUobmV3IFZlY3RvcjJEKDAsIDApLCBuZXcgVmVjdG9yMkQoMSwgMCksIG5ldyBWZWN0b3IyRCgyLCAwKSksXHJcbiAgICAgICAgICAgIG5ldyBXaW5MaW5lKG5ldyBWZWN0b3IyRCgwLCAxKSwgbmV3IFZlY3RvcjJEKDEsIDEpLCBuZXcgVmVjdG9yMkQoMiwgMSkpLFxyXG4gICAgICAgICAgICBuZXcgV2luTGluZShuZXcgVmVjdG9yMkQoMCwgMiksIG5ldyBWZWN0b3IyRCgxLCAyKSwgbmV3IFZlY3RvcjJEKDIsIDIpKSxcclxuICAgICAgICAgICAgbmV3IFdpbkxpbmUobmV3IFZlY3RvcjJEKDAsIDApLCBuZXcgVmVjdG9yMkQoMCwgMSksIG5ldyBWZWN0b3IyRCgwLCAyKSksXHJcbiAgICAgICAgICAgIG5ldyBXaW5MaW5lKG5ldyBWZWN0b3IyRCgxLCAwKSwgbmV3IFZlY3RvcjJEKDEsIDEpLCBuZXcgVmVjdG9yMkQoMSwgMikpLFxyXG4gICAgICAgICAgICBuZXcgV2luTGluZShuZXcgVmVjdG9yMkQoMiwgMCksIG5ldyBWZWN0b3IyRCgyLCAxKSwgbmV3IFZlY3RvcjJEKDIsIDIpKSxcclxuICAgICAgICAgICAgbmV3IFdpbkxpbmUobmV3IFZlY3RvcjJEKDAsIDApLCBuZXcgVmVjdG9yMkQoMSwgMSksIG5ldyBWZWN0b3IyRCgyLCAyKSksXHJcbiAgICAgICAgICAgIG5ldyBXaW5MaW5lKG5ldyBWZWN0b3IyRCgyLCAwKSwgbmV3IFZlY3RvcjJEKDEsIDEpLCBuZXcgVmVjdG9yMkQoMCwgMikpLFxyXG5cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvL3RoaXMud2luTGluZXMgPSBbXHJcbiAgICAgICAgLy8gICAgIC8vUm93c1xyXG4gICAgICAgIC8vICAgICBbbmV3IFdpbkxpbmVQb2ludCgwLCAwKSwgbmV3IFdpbkxpbmVQb2ludCgxLCAwKSwgbmV3IFdpbkxpbmVQb2ludCgyLCAwKV0sXHJcbiAgICAgICAgLy8gICAgIFtuZXcgV2luTGluZVBvaW50KDAsIDEpLCBuZXcgV2luTGluZVBvaW50KDEsIDEpLCBuZXcgV2luTGluZVBvaW50KDIsIDEpXSxcclxuICAgICAgICAvLyAgICAgW25ldyBXaW5MaW5lUG9pbnQoMCwgMiksIG5ldyBXaW5MaW5lUG9pbnQoMSwgMiksIG5ldyBXaW5MaW5lUG9pbnQoMiwgMildLFxyXG5cclxuICAgICAgICAvLyAgICAgLy9Db2x1bW5zXHJcbiAgICAgICAgLy8gICAgIFtuZXcgV2luTGluZVBvaW50KDAsIDApLCBuZXcgV2luTGluZVBvaW50KDAsIDEpLCBuZXcgV2luTGluZVBvaW50KDAsIDIpXSxcclxuICAgICAgICAvLyAgICAgW25ldyBXaW5MaW5lUG9pbnQoMSwgMCksIG5ldyBXaW5MaW5lUG9pbnQoMSwgMSksIG5ldyBXaW5MaW5lUG9pbnQoMSwgMildLFxyXG4gICAgICAgIC8vICAgICBbbmV3IFdpbkxpbmVQb2ludCgyLCAwKSwgbmV3IFdpbkxpbmVQb2ludCgyLCAxKSwgbmV3IFdpbkxpbmVQb2ludCgyLCAyKV0sXHJcblxyXG4gICAgICAgIC8vICAgICAvL0RpYWdvbmFsc1xyXG4gICAgICAgIC8vICAgICBbbmV3IFdpbkxpbmVQb2ludCgwLCAwKSwgbmV3IFdpbkxpbmVQb2ludCgxLCAxKSwgbmV3IFdpbkxpbmVQb2ludCgyLCAyKV0sXHJcbiAgICAgICAgLy8gICAgIFtuZXcgV2luTGluZVBvaW50KDIsIDApLCBuZXcgV2luTGluZVBvaW50KDEsIDEpLCBuZXcgV2luTGluZVBvaW50KDAsIDIpXVxyXG4gICAgICAgIC8vIF07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSBcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1BsYXllcldpbihwbGF5ZXI6IFBsYXllciwgYm9hcmQ6IEdhbWVCb2FyZCk6IGJvb2xlYW4gXHJcbiAgICB7XHJcbiAgICAgICAgLy9JdGVyYXRlIHRocm91Z2ggYWxsIG9mIG91ciBsaW5lc1xyXG4gICAgICAgIGxldCBhbnlXaW4gPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aW5MaW5lczIubGVuZ3RoOyArK3gpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYW55V2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IHRoaXMud2luTGluZXMyW3hdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGxpbmUuc3F1YXJlcy5sZW5ndGg7ICsreSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGxpbmUuc3F1YXJlc1t5XTtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZC5nZXRTcXVhcmUoc3F1YXJlLngsIHNxdWFyZS55KS5zeW1ib2wgIT09IHBsYXllci5zeW1ib2wpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFueVdpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW55V2luKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW5EYXRhID0gbmV3IFdpbkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luRGF0YS5hbnlXaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW5EYXRhLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luRGF0YS53aW5MaW5lID0gdGhpcy53aW5MaW5lczJbeF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSBcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpbkRhdGEgPSBuZXcgV2luRGF0YSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi9Db3JlL1NvdW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIFxyXG57XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzeW1ib2w6IHN0cmluZztcclxuICAgIHNjb3JlOiBudW1iZXI7XHJcbiAgICBwaWNrU291bmQ6IFNvdW5kO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpIFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5waWNrU291bmQgPSBuZXcgU291bmQoXCIuL0Fzc2V0cy9Tb3VuZHMvQ2xpY2sud2F2XCIpO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBCYXNlU3RhdGVcclxue1xyXG4gICAgdXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXIoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleGl0KClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VTdGF0ZSB9IGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLi9NYW5hZ2Vycy9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXaW5MaW5lc01hbmFnZXIgfSBmcm9tIFwiLi4vTWFuYWdlcnMvV2luTGluZXNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuLi9QbGF5ZXJcIjtcclxuaW1wb3J0IHsgU291bmQgfSBmcm9tIFwiLi4vQ29yZS9Tb3VuZFwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9Db3JlL015TWF0aFwiO1xyXG5cclxuLy9IYW5kbGVzIHRoZSBtYWluIGdhbWVwbGF5IHN0YXRlXHJcbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUgZXh0ZW5kcyBCYXNlU3RhdGUgXHJcbntcclxuICAgIGdhbWVNYW5hZ2VyOiBHYW1lTWFuYWdlcjtcclxuICAgIGN1cnJlbnRQbGF5ZXIhOiBQbGF5ZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFuYWdlciA9IEdhbWVNYW5hZ2VyLkluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0Q2FudmFzKCkub25jbGljayA9IHRoaXMub25Nb3VzZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5nYW1lTWFuYWdlci5wbGF5ZXIxO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VDbGljayhlOiBNb3VzZUV2ZW50KSBcclxuICAgIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJQaWNrKG5ldyBWZWN0b3IyRChlLmNsaWVudFgsIGUuY2xpZW50WSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG4gICAgICAgIGxldCB0ZXh0UG9zID0gbmV3IFZlY3RvcjJEKEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLndpZHRoICogLjUsIDApO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgICAgdGV4dFBvcy55ID0gdGhpcy5nYW1lTWFuYWdlci5nYW1lQm9hcmQuc3RhcnRQb3MueTtcclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwiYm90dG9tXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0aGlzLnBsYXllclR1cm5UZXh0KCksIHRleHRQb3MueCwgdGV4dFBvcy55KTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lTWFuYWdlci5nYW1lQm9hcmQuZHJhdygpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlLmNhbnZhcy5kcmF3R2FtZVRpdGxlKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UuY2FudmFzLmRyYXdVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4aXQoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRDYW52YXMoKS5vbmNsaWNrID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJQaWNrKG1vdXNlUG9zOiBWZWN0b3IyRCkgXHJcbiAgICB7XHJcbiAgICAgICAgLy9DaGVjayBpZiBwaWNrIHdhcyB2YWxpZFxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZU1hbmFnZXIuZ2FtZUJvYXJkLnBsYXllckNsaWNrKHRoaXMuY3VycmVudFBsYXllciwgbW91c2VQb3MpPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyLnBpY2tTb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgbGV0IHdpbm5lciA9IFdpbkxpbmVzTWFuYWdlci5JbnN0YW5jZS5jaGVja1BsYXllcldpbih0aGlzLmN1cnJlbnRQbGF5ZXIsIHRoaXMuZ2FtZU1hbmFnZXIuZ2FtZUJvYXJkKTtcclxuXHJcbiAgICAgICAgLy9JZiBwbGF5ZXIgd29uIG9yIGJvYXJkIGlzIGZ1bGwgd2UgZW5kIGdhbWVcclxuICAgICAgICBpZiAod2lubmVyKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1hbmFnZXIuc3RhdGVNYWNoaW5lLmNoYW5nZVN0YXRlKFwiV2luU3RhdGVcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9UaWUgR2FtZVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZU1hbmFnZXIuZ2FtZUJvYXJkLmlzRnVsbCgpKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1hbmFnZXIuc3RhdGVNYWNoaW5lLmNoYW5nZVN0YXRlKFwiVGllU3RhdGVcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9OZXh0IHBsYXllclxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5leHRQbGF5ZXJUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXllclR1cm5UZXh0KCk6IHN0cmluZyBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyLm5hbWUgKyBcIidzIFR1cm5cIlxyXG4gICAgfVxyXG5cclxuICAgIG5leHRQbGF5ZXJUdXJuKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLmdhbWVNYW5hZ2VyLnBsYXllcjEpXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMuZ2FtZU1hbmFnZXIucGxheWVyMjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMuZ2FtZU1hbmFnZXIucGxheWVyMTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hbmFnZXJzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL0NvcmUvTXlNYXRoXCI7XHJcbmltcG9ydCB7IEJhc2VTdGF0ZSB9IGZyb20gXCIuL0Jhc2VTdGF0ZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vQ29yZS9CdXR0b25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluTWVudVN0YXRlIGV4dGVuZHMgQmFzZVN0YXRlXHJcbntcclxuICAgIHN0YXJ0R2FtZUJ1dHRvbiE6IEJ1dHRvbjtcclxuICAgIGV4aXRHYW1lQnV0dG9uITogQnV0dG9uO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgbGV0IGNhbnZhc0VsZW1lbnQ9IEdhbWVNYW5hZ2VyLmdldENhbnZhcygpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uPSBuZXcgQnV0dG9uKFwiU3RhcnQgR2FtZVwiLCBcIi4vQXNzZXRzL0ltYWdlcy9idXR0b25zX1BORzQ2LnBuZ1wiLCBcIi4vQXNzZXRzL1NvdW5kcy9CdXR0b25DbGljazEud2F2XCIpO1xyXG4gICAgICAgIHRoaXMuZXhpdEdhbWVCdXR0b249IG5ldyBCdXR0b24oXCJFeGl0IEdhbWVcIiwgXCIuL0Fzc2V0cy9JbWFnZXMvYnV0dG9uc19QTkc0Ni5wbmdcIiwgXCIuL0Fzc2V0cy9Tb3VuZHMvQnV0dG9uQ2xpY2sxLndhdlwiKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZUJ1dHRvbi5pbWFnZS53aWR0aD0gMjAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uLmltYWdlLmhlaWdodD0gMTAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uLnNldFBvc2l0aW9uT25DZW50ZXIobmV3IFZlY3RvcjJEKGNhbnZhc0VsZW1lbnQud2lkdGgqLjUsIDE1MCkpO1xyXG4gICAgICAgIHRoaXMuZXhpdEdhbWVCdXR0b24uaW1hZ2Uud2lkdGg9IDIwMDtcclxuICAgICAgICB0aGlzLmV4aXRHYW1lQnV0dG9uLmltYWdlLmhlaWdodD0gMTAwO1xyXG4gICAgICAgIHRoaXMuZXhpdEdhbWVCdXR0b24ucG9zaXRpb24ueD0gdGhpcy5zdGFydEdhbWVCdXR0b24ucG9zaXRpb24ueDtcclxuICAgICAgICB0aGlzLmV4aXRHYW1lQnV0dG9uLnBvc2l0aW9uLnk9IHRoaXMuc3RhcnRHYW1lQnV0dG9uLnBvc2l0aW9uLnkrMTUwO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0Q2FudmFzKCkub25jbGljaz0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IG1vdXNlUG9zPSBuZXcgVmVjdG9yMkQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSBHYW1lTWFuYWdlci5nZXRDYW52YXMoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLy9TdGFydCBCdXR0b25cclxuICAgICAgICBpZih0aGlzLnN0YXJ0R2FtZUJ1dHRvbi5pc0NsaWNrZWQobW91c2VQb3MsIHJlY3QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vRXhpdCBCdXR0b24tIHNlbGYuY2xvc2UoKSBvbmx5IHdvcmtpbmcgd2l0aCBsaXZlIHNlcnZlclxyXG4gICAgICAgIGlmKHRoaXMuZXhpdEdhbWVCdXR0b24uaXNDbGlja2VkKG1vdXNlUG9zLCByZWN0KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5leGl0R2FtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlLmNhbnZhcy5kcmF3R2FtZVRpdGxlKCk7XHJcbiAgICAgICAgY29uc3QgY29udGV4dD0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uLmRyYXcoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5leGl0R2FtZUJ1dHRvbi5kcmF3KGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4aXQoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRDYW52YXMoKS5vbmNsaWNrPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R2FtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UubmV3R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4aXRHYW1lKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZS5leGl0R2FtZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vTWFuYWdlcnMvR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tIFwiLi4vQ29yZS9NeU1hdGhcIjtcclxuaW1wb3J0IHsgQmFzZVN0YXRlIH0gZnJvbSBcIi4vQmFzZVN0YXRlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi9Db3JlL0J1dHRvblwiO1xyXG5pbXBvcnQgeyBXaW5EYXRhLCBXaW5MaW5lc01hbmFnZXIgfSBmcm9tIFwiLi4vTWFuYWdlcnMvV2luTGluZXNNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NvcmVNZW51U3RhdGUgZXh0ZW5kcyBCYXNlU3RhdGVcclxue1xyXG4gICAgbmV3R2FtZUJ1dHRvbiE6IEJ1dHRvbjtcclxuICAgIHJlbWF0Y2hCdXR0b24hOiBCdXR0b247XHJcbiAgICBleGl0R2FtZUJ1dHRvbiE6IEJ1dHRvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBjb25zdCBjYW52YXNFbGVtZW50PSBHYW1lTWFuYWdlci5nZXRDYW52YXMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5ld0dhbWVCdXR0b249IG5ldyBCdXR0b24oXCJOZXcgR2FtZVwiLFwiLi9Bc3NldHMvSW1hZ2VzL2J1dHRvbnNfUE5HNDYucG5nXCIsIFwiLi9Bc3NldHMvU291bmRzL0J1dHRvbkNsaWNrMS53YXZcIik7XHJcbiAgICAgICAgdGhpcy5leGl0R2FtZUJ1dHRvbj0gbmV3IEJ1dHRvbihcIkV4aXQgR2FtZVwiLFwiLi9Bc3NldHMvSW1hZ2VzL2J1dHRvbnNfUE5HNDYucG5nXCIsIFwiLi9Bc3NldHMvU291bmRzL0J1dHRvbkNsaWNrMS53YXZcIik7XHJcbiAgICAgICAgdGhpcy5yZW1hdGNoQnV0dG9uPSBuZXcgQnV0dG9uKFwiUmVtYXRjaFwiLCBcIi4vQXNzZXRzL0ltYWdlcy9idXR0b25zX1BORzQ2LnBuZ1wiLCBcIi4vQXNzZXRzL1NvdW5kcy9CdXR0b25DbGljazEud2F2XCIpO1xyXG4gICAgICAgIHRoaXMubmV3R2FtZUJ1dHRvbi5pbWFnZS53aWR0aCo9IDEuNTtcclxuICAgICAgICB0aGlzLm5ld0dhbWVCdXR0b24uaW1hZ2UuaGVpZ2h0Kj0gMS4yNVxyXG4gICAgICAgIHRoaXMubmV3R2FtZUJ1dHRvbi5zZXRQb3NpdGlvbk9uQ2VudGVyKG5ldyBWZWN0b3IyRChjYW52YXNFbGVtZW50LndpZHRoKi41LCAyMDApKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1hdGNoQnV0dG9uLmltYWdlLndpZHRoKj0gMS41O1xyXG4gICAgICAgIHRoaXMucmVtYXRjaEJ1dHRvbi5pbWFnZS5oZWlnaHQqPSAxLjI1XHJcbiAgICAgICAgdGhpcy5yZW1hdGNoQnV0dG9uLnBvc2l0aW9uLng9IHRoaXMubmV3R2FtZUJ1dHRvbi5wb3NpdGlvbi54O1xyXG4gICAgICAgIHRoaXMucmVtYXRjaEJ1dHRvbi5wb3NpdGlvbi55PSB0aGlzLm5ld0dhbWVCdXR0b24ucG9zaXRpb24ueSsxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuZXhpdEdhbWVCdXR0b24uaW1hZ2Uud2lkdGgqPSAxLjU7XHJcbiAgICAgICAgdGhpcy5leGl0R2FtZUJ1dHRvbi5pbWFnZS5oZWlnaHQqPSAxLjI1XHJcbiAgICAgICAgdGhpcy5leGl0R2FtZUJ1dHRvbi5wb3NpdGlvbi54PSB0aGlzLnJlbWF0Y2hCdXR0b24ucG9zaXRpb24ueDtcclxuICAgICAgICB0aGlzLmV4aXRHYW1lQnV0dG9uLnBvc2l0aW9uLnk9IHRoaXMucmVtYXRjaEJ1dHRvbi5wb3NpdGlvbi55KzEwMDtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlcigpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLm9uY2xpY2s9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dD0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG5cclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZS5nYW1lQm9hcmQuZHJhdygpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlLmNhbnZhcy5kcmF3R2FtZVRpdGxlKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UuY2FudmFzLmRyYXdVSSgpO1xyXG5cclxuICAgICAgICAvL0RyYXdpbmcgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubmV3R2FtZUJ1dHRvbi5kcmF3KGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMucmVtYXRjaEJ1dHRvbi5kcmF3KGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuZXhpdEdhbWVCdXR0b24uZHJhdyhjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBleGl0KCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNhbnZhc0VsZW1lbnQ9IEdhbWVNYW5hZ2VyLmdldENhbnZhcygpO1xyXG4gICAgICAgIGNhbnZhc0VsZW1lbnQub25jbGljaz0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGU6TW91c2VFdmVudClcclxuICAgIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbW91c2VQb3M9IG5ldyBWZWN0b3IyRChlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvL1N0YXJ0IEJ1dHRvblxyXG4gICAgICAgIGlmKHRoaXMubmV3R2FtZUJ1dHRvbi5pc0NsaWNrZWQobW91c2VQb3MsIHJlY3QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vRXhpdCBCdXR0b24tIHNlbGYuY2xvc2UoKSBvbmx5IHdvcmtpbmcgd2l0aCBsaXZlIHNlcnZlclxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5leGl0R2FtZUJ1dHRvbi5pc0NsaWNrZWQobW91c2VQb3MsIHJlY3QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmV4aXRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZW1hdGNoQnV0dG9uLmlzQ2xpY2tlZChtb3VzZVBvcywgcmVjdCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbWF0Y2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhpdEdhbWUoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlLmV4aXRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3R2FtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UubmV3R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbWF0Y2goKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlLnJlbWF0Y2goKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlY3RvcjJEIH0gZnJvbSBcIi4uL0NvcmUvTXlNYXRoXCI7XHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hbmFnZXJzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNjb3JlTWVudVN0YXRlIH0gZnJvbSBcIi4vU2NvcmVNZW51U3RhdGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWVTdGF0ZSBleHRlbmRzIFNjb3JlTWVudVN0YXRlXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kcmF3KCk7XHJcblxyXG4gICAgICAgIC8vRHJhd2luZyB0aGUgXCJUaWVcIiBsYWJlbFxyXG4gICAgICAgIGxldCBjb250ZXh0PSBHYW1lTWFuYWdlci5nZXRDb250ZXh0KCk7XHJcbiAgICAgICAgY29udGV4dC5mb250PSBcIjMwcHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ249IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmU9IFwiYm90dG9tXCI7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0UG9zPSBuZXcgVmVjdG9yMkQoR2FtZU1hbmFnZXIuZ2V0Q2FudmFzKCkud2lkdGggKi41LCAwKTtcclxuICAgICAgICB0ZXh0UG9zLnk9IEdhbWVNYW5hZ2VyLkluc3RhbmNlLmdhbWVCb2FyZC5zdGFydFBvcy55O1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCJUaWVcIiwgdGV4dFBvcy54LHRleHRQb3MueSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gXCIuLi9Db3JlL015TWF0aFwiO1xyXG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCIuLi9Db3JlL1NvdW5kXCI7XHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hbmFnZXJzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdpbkRhdGEsIFdpbkxpbmVzTWFuYWdlciB9IGZyb20gXCIuLi9NYW5hZ2Vycy9XaW5MaW5lc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2NvcmVNZW51U3RhdGUgfSBmcm9tIFwiLi9TY29yZU1lbnVTdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpblN0YXRlIGV4dGVuZHMgU2NvcmVNZW51U3RhdGVcclxue1xyXG4gICAgd2luRGF0YSE6V2luRGF0YTtcclxuICAgIHdpblNvdW5kOiBTb3VuZDtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMud2luU291bmQgPSBuZXcgU291bmQoXCIuL0Fzc2V0cy9Tb3VuZHMvV2luLndhdlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlcigpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgdGhpcy53aW5EYXRhPSBXaW5MaW5lc01hbmFnZXIuSW5zdGFuY2Uud2luRGF0YTtcclxuICAgICAgICB0aGlzLndpblNvdW5kLnBsYXkoKTtcclxuICAgICAgICB0aGlzLndpbkRhdGEucGxheWVyLnNjb3JlKys7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UuZ2FtZUJvYXJkLmRyYXdXaW5MaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmRyYXcoKTtcclxuXHJcbiAgICAgICAgLy9EcmF3aW5nIHRoZSB3aW4gbGFiZWxcclxuICAgICAgICBsZXQgY29udGV4dD0gR2FtZU1hbmFnZXIuZ2V0Q29udGV4dCgpO1xyXG4gICAgICAgIGNvbnRleHQuZm9udD0gXCIzMHB4IENvbWljIFNhbnMgTVNcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZT0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lPSBcImJvdHRvbVwiO1xyXG5cclxuICAgICAgICBsZXQgdGV4dFBvcz0gbmV3IFZlY3RvcjJEKEdhbWVNYW5hZ2VyLmdldENhbnZhcygpLndpZHRoICouNSwgMCk7XHJcbiAgICAgICAgdGV4dFBvcy55PSBHYW1lTWFuYWdlci5JbnN0YW5jZS5nYW1lQm9hcmQuc3RhcnRQb3MueTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMud2luRGF0YS5wbGF5ZXIubmFtZSArIFwiIGlzIHRoZSBXaW5uZXJcIiwgdGV4dFBvcy54LHRleHRQb3MueSk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9NYW5hZ2Vycy9HYW1lTWFuYWdlclwiO1xyXG5cclxuLy9FbnRyeSBwb2ludCBvZiB0aGUgZ2FtZVxyXG5leHBvcnQgY2xhc3MgTWFpbiBcclxue1xyXG4gICAgZ2FtZU1hbmFnZXIgOiBHYW1lTWFuYWdlclxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hbmFnZXI9IEdhbWVNYW5hZ2VyLkluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVNYW5hZ2VyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lTG9vcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVMb29wKClcclxuICAgIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFuYWdlci5jYW52YXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdhbWVNYW5hZ2VyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hbmFnZXIuZHJhdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkgXHJcbntcclxuICAgIGNvbnN0IGdhbWU9IG5ldyBNYWluKCk7XHJcbiAgICBnYW1lLnN0YXJ0KCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=