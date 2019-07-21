import Bullet from "./Bullet"

export default class Monster_Bullet extends Bullet{
    constructor(){
        super();

    }
    
    get_attack_list(){
        let attack_list = [];
        for(let the_wall of Wall_list){
            if(this.attackable(the_wall)){
                attack_list.push(the_wall);
            }
        }
        if(this.attackable(the_Hero)){
            attack_list.push(the_Hero);
        }
        return attack_list;
    }

    attackable(the_enemy){
        
    }
    
    attack(element){
        console.log("Monster_Bullet attack");
        
    }

    branch_Hero_or_Monster_reset(){
        this.leaf_reset()

    }

    init(launcher){
        let vector_v = this.get_vector_v(this.v_max, launcher.direction_x, launcher.direction_y);
        this.vx = vector_v.vx;
        this.vy = vector_v.vy;
        this.mapX = launcher.mapX;
        this.mapY = launcher.mapY;
    }
}