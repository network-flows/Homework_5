import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_normal extends Monster_Bullet{
    constructor(vx, vy){
        super();
        this.Type = "Monster_Bullet_normal";

        this.vx = vx;
        this.vy = vy;
    }

    attackable(the_enemy){
        return this.get_distance(the_enemy) < 20;
    }

    attack(element){
        console.log("Monster_Bullet_normal attack");
        
        element.HP -= 10;
    }
    
    leaf_reset(){
        this.HP = 40;
        console.log("this.HP = ", this.HP);
    }
}

