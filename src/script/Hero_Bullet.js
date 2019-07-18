import Bullet from "./Bullet"
import Monster from "./Monster";

export default class Hero_Bullet extends Bullet{
    constructor(){
        super();

        let vector_v = this.get_vector_v(this.v_max, the_Hero.direction_x, the_Hero.direction_y);
        this.vx = vector_v.vx;
        this.vy = vector_v.vy;
        this.mapX = the_Hero.mapX;
        this.mapY = the_Hero.mapY;
    }

    dead(){
        
    }

    get_attack_list(){
        let attack_list = [];
        for(let the_monster of Monster_list){
            if(this.attackable(the_monster)){
                attack_list.push(the_monster);
            }
        }
        for(let the_wall of Wall_list){
            if(this.attackable(the_wall)){
                attack_list.push(the_wall);
            }
        }
        return attack_list;
    }

    attackable(the_enemy){
        
    }
}
