import Beings from "./Beings"
import Hero_Bullet_normal from "./Hero_Bullet_normal"
import Gun from "./Gun"

export default class Gun_normal extends Gun{
    constructor(){
        super();
        this.first_waiting = 50;
        this.second_waiting = 100;

        this.bullet = Hero_Bullet_normal;
        this.bullet_type = "Hero_Bullet_normal"
    }
    
    leaf_reset(){
        
    }
}
