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

    shoot(){
        let new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
        new_bullet.root_reset();

        console.log("shoot!")
    }
    
    branch_reset(){
        console.log("branch_reset!")

        this.leaf_reset()
    }
}
