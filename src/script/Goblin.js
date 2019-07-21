import Monster from "./Monster"

export default class Goblin extends Monster{
    constructor(){
        super();
        this.Type = "Goblin";

        this.w = 400;
        this.h = 400;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    skill(){

    }

    leaf_reset(){

        this.HP = 20;
    }
}