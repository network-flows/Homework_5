import Beings from "./Beings"

export default class Wall extends Beings{
    constructor(x1, x2, y1, y2){
        super();

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    action(){

    }

    dead(){
        
    }
}