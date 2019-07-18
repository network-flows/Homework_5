import Beings from "./Beings"

export default class Monster extends Beings{
    constructor(){
        super();

        Monster_list.push(this)
    }

    action(){

    }
    
    dead(){
        Monster_list.splice(Monster_list.indexOf(this));
    }
}