import Thing from "./Thing"

export default class Gate extends Thing{
    constructor(){
        super();

        this.sentence = "是否去往下一层？";
    }

    use_it(){
        // go to next floor

    }
}
