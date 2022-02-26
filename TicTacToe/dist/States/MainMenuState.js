"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuState = void 0;
const app_1 = require("../app");
const BaseState_1 = require("./BaseState");
function scaleToFit(img) {
    // get the scale
    var scale = Math.min(app_1.App.Instance.gameBoard.canvasElement.width / img.width, app_1.App.Instance.gameBoard.canvasElement.height / img.height);
    // get the top left position of the image
    var x = (app_1.App.Instance.gameBoard.canvasElement.width / 2) - (img.width / 2) * scale;
    var y = (app_1.App.Instance.gameBoard.canvasElement.height / 2) - (img.height / 2) * scale;
    //App.Instance.gameBoard.context.drawImage(img, x, y, img.width * scale, img.height * scale);
    app_1.App.Instance.gameBoard.context.drawImage(img, 0, 0, 100, 50);
}
class MainMenuState extends BaseState_1.BaseState {
    constructor() {
        super();
        let canvasElement = app_1.App.Instance.gameBoard.canvasElement;
        canvasElement.onclick = this.onMouseDown.bind(this);
    }
    enter() {
        this.img1 = new Image();
        this.img1.src = "./Images/buttons_PNG46.png";
        this.img1.onclick = this.startGameOnClick;
        //this.img1.onload= this.drawImage.bind(this);
        this.img1.onload = (ev) => {
            app_1.App.Instance.gameBoard.context.drawImage(this.img1, 0, 0, 100, 50);
        };
    }
    drawImage(ev) {
        console.log(ev);
        app_1.App.Instance.gameBoard.context.drawImage(this.img1, 0, 0, 100, 50);
    }
    onMouseDown(e) {
        e.preventDefault();
        let mouseXPos = e.clientX;
        let mouseYPos = e.clientY;
        const rect = app_1.App.Instance.gameBoard.canvasElement.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        var scale = Math.min(app_1.App.Instance.gameBoard.canvasElement.width / this.img1.width, app_1.App.Instance.gameBoard.canvasElement.height / this.img1.height);
        var x = 0; //(App.Instance.gameBoard.canvasElement.width / 2) - (this.img1.width / 2) * scale;
        var y = 0; //(App.Instance.gameBoard.canvasElement.height / 2) - (this.img1.height / 2) * scale;
        let width = 100; //this.img1.width* scale;
        let height = 50; //this.img1.height* scale;
        x -= rect.left;
        y -= rect.top;
        width -= rect.left;
        height -= rect.top;
        console.log(mouseXPos + "," + mouseYPos);
        if (mouseXPos >= x && mouseXPos <= width && mouseYPos >= y && mouseYPos <= height) {
            console.log("button pressed");
        }
    }
    update() {
        //get Input
    }
    draw() {
    }
    startGameOnClick() {
        app_1.App.Instance.stateMachine.nextState();
    }
}
exports.MainMenuState = MainMenuState;
//# sourceMappingURL=MainMenuState.js.map