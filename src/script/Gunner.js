import Monster from "./Monster"
import Monster_Bullet_normal from "./Monster_Bullet_normal"

export default class Gunner extends Monster{
    constructor(){
        super();
        this.Type = "Gunner";

        this.width = 100;
        this.height = 100;
        this.range = 10 * 40;
        this.v_max = 3;
        
        // set picture
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);
    }

    skill(){
        let new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_normal", Monster_Bullet_normal);
        new_bullet.root_reset();
        new_bullet.init(this);
    }

    leaf_reset(){
        this.HP = 100;
    }
}




