import Beings from "./Beings"

export default class Monster extends Beings{
    constructor(){
        super();

    }

    action(){

    }
    
    dead(){
        Monster_list.splice(Monster_list.indexOf(this), 1);
    }

    branch_reset(){
        console.log("branch_reset!")
        Monster_list.push(this)

        this.leaf_reset()
    }
}