import Monster from "./Monster"
import Monster_Bullet_curse from "./Monster_Bullet_curse"

export default class wizard extends Monster{
    constructor(){
        super();
        this.Type = "wizard";

        this.size(48,48)
        this.range = 100000;
        this.v_max = 3;
        this.skill_cost = 30;

        // set picture
        this.ani = new Laya.Animation();
        this.ani.interval = 100;
        this.ani.pivot(this.width/2,this.height/2);
    }

    skill(){
        let new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_curse", Monster_Bullet_curse);
        new_bullet.root_reset();
        new_bullet.init(this);
    }

    leaf_reset(){
        this.HP = 40;
    }
}
