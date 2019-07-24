import Beings from "./Beings"

export default class Monster extends Beings{
    constructor(){
        super();

        this.skill_power = 1000;
        this.skill_cost = 360;

        this.shooter = true;
        this.range = 1000;
    }

    action(){
        this.direction_x = this.get_hero_orientation().dx;
        this.direction_y = this.get_hero_orientation().dy;

        this.wandering();

        // shooting control
        if(this.skill_power < 1000){
            this.skill_power += 1;
        }

        if(this.skill_power >= this.skill_cost){
            this.skill_power = 0;
            this.skill();
        }
    }

    wandering(){
        let v = {vx: 0, vy: 0};
        if(this.shooter){
            if(this.get_distance(the_Hero) > this.range / 1.5){
                v = this.get_vector_v(this.v_max, this.direction_x, this.direction_y);
            }
            else if (this.get_distance(the_Hero) < this.range / 2){
                v = this.get_vector_v(this.v_max, -this.direction_x, -this.direction_y);
            }
        }

        this.move_by_dx_dy(v.vx, v.vy)
    }
    
    dead(){
        Monster_list.splice(Monster_list.indexOf(this), 1);

    }

    branch_reset(){
        console.log("branch_reset!")
        Monster_list.push(this)

        this.leaf_reset()
    }

    get_hero_orientation(){
        return {
            dx: the_Hero.mapX - this.mapX,
            dy: the_Hero.mapY - this.mapY
        }
    }
}
