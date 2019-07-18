import Monster from "./Monster"

export default class Goblin extends Monster{
    constructor(){
        super();

        this.HP = 100;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    action(){

    }
    
    dead(){
        
    }
}