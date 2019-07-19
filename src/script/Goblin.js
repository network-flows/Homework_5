import Monster from "./Monster"

export default class Goblin extends Monster{
    constructor(){
        super();
        this.Type = "Goblin";

        this.HP = 1;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    action(){

    }
}