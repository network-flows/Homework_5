import Bullet from "./Bullet"

export default class Monster_Bullet extends Bullet{
    constructor(){
        super();

    }

    dead(){
        
    }

    get_attack_list(){
        let attack_list = [];
        for(let the_wall of Wall_list){
            if(this.attackable(the_wall)){
                attack_list.push(the_wall);
            }
        }
        if(this.attackable(the_hero)){
            attack_list.push(the_hero);
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
}