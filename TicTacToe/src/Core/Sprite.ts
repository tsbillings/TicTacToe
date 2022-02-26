import { Vector2D } from "./MyMath";

export class Sprite
{
    position:Vector2D;
    image:HTMLImageElement
    constructor(path:string)
    {
        this.image= new Image();
        this.load(path);
        this.position= new Vector2D(0,0);
        this.image.width= 100;
        this.image.height= 50;
    }

    //Sets the center of sprite to the "newPos".
    setPositionOnCenter(newPos:Vector2D)
    {
        const center= this.getCenter();
        this.position.x= newPos.x- center.x;
        this.position.y= newPos.y - center.y;
    }

    //Retrieves the center of sprite
    getCenter():Vector2D
    {
        return new Vector2D(this.image.width*.5, this.image.height*.5);
    }

    draw(context:CanvasRenderingContext2D)
    {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }

    load(path:string)
    {
        this.image.src= path;
    }
}