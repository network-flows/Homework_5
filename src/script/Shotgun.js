import Hero_Bullet_huge from "./Hero_Bullet_huge"
import Gun from "./Gun"

export default class Shotgun extends Gun{
    constructor(){
        super();
        this.Type = "Shotgun"

        this.first_waiting = 2;
        this.second_waiting = 65;
        
        this.loadImage("res/guns/gun1.png")
        Laya.stage.addChild(this);
        this.size(32,32);
        this.pos(Laya.Browser.clientWidth/2, Laya.Browser.clientHeight/2+14);
        this.bullet = Hero_Bullet_huge;
        this.bullet_type = "Hero_Bullet_huge"
    }

    shoot(){
        let old_x = the_Hero.direction_x;
        let old_y = the_Hero.direction_y;

        let d_a = 0.25;
        let half_N = 3;

        for(let i = -half_N; i <= half_N; i++){
            let new_direction = this.rotate_v(old_x, old_y, i * d_a);
            the_Hero.direction_x = new_direction.x;
            the_Hero.direction_y = new_direction.y;

            let new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
            new_bullet.root_reset();
        }

        the_Hero.direction_x = old_x;
        the_Hero.direction_y = old_y;
    }

    leaf_reset(){
        this.pivot(7,16);
        this.visible=true;
        this.sentence="霰弹枪"
    }
}
