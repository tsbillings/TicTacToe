import { BaseState } from "../States/BaseState";

export class StateMachine
{
    gameStates!:Map<string, BaseState>;
    currentState!:BaseState;
    constructor(states:Map<string,BaseState>)
    {  
        this.gameStates= states;
    }

    public update()
    {
        this.currentState.update();
    }

    public draw()
    {
        this.currentState.draw();
    }

    public changeState(stateName:string)
    {
        let state= this.gameStates.get(stateName);
        if(state === undefined)
            return;

        if(this.currentState)
            this.currentState.exit();
        this.currentState= state;
        this.currentState.enter();
    }
}