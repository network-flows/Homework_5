import Monster from "./Monster"

export default class Goblin extends Monster{
    constructor(){
        super();
        this.Type = "Goblin";

        this.width = 400;
        this.height = 400;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    skill(){

    }

    leaf_reset(){

        this.HP = 20;
    }
}