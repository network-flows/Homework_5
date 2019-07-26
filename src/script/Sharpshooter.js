import Monster from "./Monster"
import Monster_Bullet_huge from "./Monster_Bullet_huge"

export default class Sharpshooter extends Monster{
    constructor(){
        super();
        this.Type = "Sharpshooter";

        this.size(48,48)
        this.range = 20 * 40;
        this.v_max = 3;

        // set picture
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);
    }

    shoot(){
        let new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
        new_bullet.root_reset();
    }

    skill(){
        let new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_huge", Monster_Bullet_huge);
        new_bullet.root_reset();
        new_bullet.init(this);
    }

    leaf_reset(){
        this.HP = 20;
    }
}
