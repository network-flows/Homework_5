import Beings from "./Beings"
import Hero_Bullet_normal from "./Hero_Bullet_normal"


export default class Gun extends Beings{
    constructor(){
        super();
        this.first_waiting = 10;
        this.second_waiting = 100;

        this.bullet = Hero_Bullet_normal;
        this.bullet_type = "Hero_Bullet_normal"
    }

    action(){

    }
    
    dead(){

    }
    
    branch_reset(){
        this.leaf_reset()
    }
}
