import { Vector2D } from "./MyMath";
import { Sound } from "./Sound";
import { Sprite } from "./Sprite";

//Handles drawing a sprite and detecting mouse click
export class Button extends Sprite 
{
    text: string;
    clickSound: Sound;
    constructor(text: string, spritePath: string, clickSoundPath: string) 
    {
        super(spritePath);
        this.text = text;
        this.clickSound = new Sound(clickSoundPath);
    }

    draw(context: CanvasRenderingContext2D): void 
    {
        super.draw(context);

        //Calcualte text size based on size of button
        let textSize = Math.floor(this.image.width / this.text.length);
        const textOffset = 5;
        context.font = (textOffset + textSize) + "px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        let pos = new Vector2D(this.position.x + this.image.width * .5, this.position.y + this.image.height * .5);
        context.fillText(this.text, pos.x, pos.y);
    }

    isClicked(mousePos: Vector2D, canvasRect: DOMRect): boolean 
    {
        //The pos and size couble be affected by canvas positioning
        let truePosition = new Vector2D(this.position.x - canvasRect.left, this.position.y - canvasRect.top);
        let trueSize = new Vector2D(this.image.width - canvasRect.left + truePosition.x, this.image.height - canvasRect.top + truePosition.y);

        //Check if mouse click was within button bounds
        if (mousePos.x >= truePosition.x && mousePos.x <= trueSize.x && mousePos.y >= truePosition.y && mousePos.y <= trueSize.y) 
        {
            this.clickSound.play();
            return true;
        }

        return false;
    }
}