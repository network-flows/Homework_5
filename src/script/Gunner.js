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
        this.loadImage("./orz.jpg");
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
