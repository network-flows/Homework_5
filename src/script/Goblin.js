import Monster from "./Monster"

export default class Goblin extends Monster{
    constructor(){
        super();
        this.Type = "Goblin";

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    action(){

    }

    leaf_reset(){

        this.HP = 20;
    }
}