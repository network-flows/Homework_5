import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_huge extends Monster_Bullet{
    constructor(vx, vy){
        super();
        this.Type = "Monster_Bullet_huge";

        this.vx = vx;
        this.vy = vy;
    }

    attackable(the_enemy){
        return this.get_distance(the_enemy) < 40;
    }

    attack(enemy){
        console.log("Monster_Bullet_huge attack");
        
        enemy.get_harm(20);
    }

    leaf_reset(){
        this.HP = 40;
        console.log("this.HP = ", this.HP);
    }
}
