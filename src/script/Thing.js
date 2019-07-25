import Beings from "./Beings"

export default class Thing extends Beings{
    constructor(){
        super();
        this.sentence = "还没有设置句子！";
    }

    dead(){
        Thing_list.splice(Bullet_list.indexOf(this), 1);

    }

    use_it(){

    }

    branch_reset(){
        console.log("branch_reset!")
        Thing_list.push(this)

        this.leaf_reset()
    }
}
