import Beings from "./Beings"

export default class Monster extends Beings{
    constructor(){
        super();

        this.skill_power = 1000;
        this.skill_cost = 360;
    }

    action(){
        this.direction_x = this.get_hero_orientation().dx;
        this.direction_y = this.get_hero_orientation().dy;

        this.wandering();

        if(this.skill_power < 1000){
            this.skill_power += 1;
        }

        if(this.skill_power >= this.skill_cost){
            this.skill_power = 0;
            this.skill();
        }
    }

    wandering(){
        this.vx = 1;
        this.vy = 1;

        this.mapX += this.vx;
        this.mapY += this.vy;
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
