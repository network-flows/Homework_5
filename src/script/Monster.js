import Beings from "./Beings"
import Gate from "./Gate"

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

        let dir=this.getDir(this.direction_x,this.direction_y,this.pre_dir);
        if(dir!=this.pre_dir)
        {
            this.ani.play(0,true,this.Type+"_"+dir);
            this.pre_dir=dir;
        }

        this.wandering();

        // shooting control
        if(this.skill_power < 1000){
            this.skill_power += 1;
        }

        if(this.skill_power >= this.skill_cost){
            this.skill_power = 0;
            this.skill();
        }
        if(!this.reachable(this.mapX,this.mapY))console.log("bad thing happened now")
    }

    force(another){
        let dx = this.mapX - another.mapX;
        let dy = this.mapY - another.mapY;
    
        let fx = 0;
        let fy = 0;

        if(Math.abs(dx) > 1E-2){
            fx = 1 / dx;
        }
        if(Math.abs(dy) > 1E-2){
            fy = 1 / dy;
        }

        return {
            fx: fx, 
            fy: fy
        };
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

        let force_avg = {
            fx: 0,
            fy: 0
        };
        for(let the_monster of Monster_list){
            if(this !== the_monster){
                let f = this.force(the_monster);
                force_avg.fx += f.fx;
                force_avg.fy += f.fy;
            }
        }

        if(Monster_list.length > 1){
            force_avg.fx /= (Monster_list.length - 1);
            force_avg.fy /= (Monster_list.length - 1);
        }

        this.move_by_dx_dy(v.vx + force_avg.fx / this.m, v.vy + force_avg.fx / this.m);
    }
    
    dead(){
        Monster_list.splice(Monster_list.indexOf(this), 1);
        if(Monster_list.length == 0){
            let a_gate = Laya.Pool.getItemByClass("Gate", Gate);
            a_gate.root_reset();
        }
    }

    branch_reset(){
        Monster_list.push(this)
        this.pre_dir="right"
        this.skill_power=this.skill_cost*Math.random();
        this.ani.play(0, true, this.Type+"_right");
        this.leaf_reset()
    }

    get_hero_orientation(){
        return {
            dx: the_Hero.mapX - this.mapX,
            dy: the_Hero.mapY - this.mapY
        }
    }
}