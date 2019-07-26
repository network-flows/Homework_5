import Monster from "./Monster"
import Monster_Bullet_fire_ball from "./Monster_Bullet_fire_ball"

export default class Charizard extends Monster{
    constructor(){
        super();
        this.Type = "Charizard";

        this.size(48,48)
        this.range = 10 * 40;
        this.v_max = 3;

        // set picture
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);
    }

    skill(){
        let old_x = this.direction_x;
        let old_y = this.direction_y;

        let d_a = 0.25;
        let half_N = 3;

        for(let i = -half_N; i <= half_N; i++){
            let new_direction = this.rotate_v(old_x, old_y, i * d_a);
            this.direction_x = new_direction.x;
            this.direction_y = new_direction.y;

            let new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_fire_ball", Monster_Bullet_fire_ball);
            new_bullet.root_reset();
            new_bullet.init(this);    
        }

        this.direction_x = old_x;
        this.direction_y = old_y;
    }

    leaf_reset(){
        this.HP = 100;
    }
}
