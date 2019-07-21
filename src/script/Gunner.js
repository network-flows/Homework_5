import Monster from "./Monster"
import Monster_Bullet_normal from "./Monster_Bullet_normal"

export default class Gunner extends Monster{
    constructor(){
        super();
        this.Type = "Gunner";

        this.w = 400;
        this.h = 400;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    skill(){
        let new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_normal", Monster_Bullet_normal);
        new_bullet.root_reset();
        new_bullet.init(this);

        console.log("shoot!")
    }

    leaf_reset(){

        this.HP = 300;
    }
}