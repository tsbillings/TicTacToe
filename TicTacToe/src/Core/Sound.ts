
export class Sound
{
    audio:HTMLAudioElement;
    constructor(path:string)
    {
        this.audio= new Audio(path);
    }

    play()
    {
        this.audio.play();
    }
}