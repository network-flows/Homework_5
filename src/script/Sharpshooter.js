import Monster from "./Monster"
import Monster_Bullet_huge from "./Monster_Bullet_huge"

export default class Sharpshooter extends Monster{
    constructor(){
        super();
        this.Type = "Sharpshooter";

        this.w = 400;
        this.h = 400;

        // set picture
        this.loadImage("./orz.jpg").scale(0.4,0.4);
    }

    skill(){
        let new_bullet = Laya.Pool.getItemByClass("Sharpshooter", Sharpshooter);
        new_bullet.root_reset();
        new_bullet.init(this);

        console.log("shoot!")
    }

    leaf_reset(){

        this.HP = 20;
    }
}