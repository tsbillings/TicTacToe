import { Vector2D } from "./MyMath";

export class TextData
{
    text:string;
    font!:string
    fillStyle!:string;
    textAlign!:CanvasTextAlign;
    textBaseline!:CanvasTextBaseline;
    constructor(text:string)
    {
        this.text= text;
    }

    draw(context:CanvasRenderingContext2D, textPos:Vector2D)
    {
        if(this.font !== undefined)
            context.font= this.font;
        if(this.fillStyle !== undefined)
            context.fillStyle= this.fillStyle;
        if(this.textAlign !== undefined)
            context.textAlign= this.textAlign;
        if(this.textBaseline !== undefined)
            context.textBaseline= this.textBaseline;
        
        context.fillText(this.text, textPos.x,textPos.y);
    }
}