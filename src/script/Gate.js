import Thing from "./Thing"

export default class Gate extends Thing{
    constructor(){
        super();

        this.sentence = "是否去往下一层？";

        // set picture
        this.loadImage("orz.jpg");
    }

    use_it(){
        // go to next floor
        the_screen.map_change();
        console.log("use gate")
    }

    leaf_reset(){

    }
}
