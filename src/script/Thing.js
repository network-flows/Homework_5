import Beings from "./Beings"

export default class Thing extends Beings{
    constructor(){
        super();
        this.sentence = "还没有设置句子！";
    }

    dead(){
        Thing_list.splice(Thing_list.indexOf(this), 1);
        console.log("splice thing")
    }

    use_it(){

    }

    branch_reset(){
        Thing_list.push(this)
        this.HP=1;
        this.leaf_reset()
    }
}
