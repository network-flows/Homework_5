import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_huge extends Monster_Bullet{
    constructor(vx, vy){
        super();
        this.vx = vx;
        this.vy = vy;

        this.HP = 40;
        console.log("this.HP = ", this.HP);
    }

    attackable(the_enemy){
        return this.get_distance(the_enemy) < 40;
    }

    attack(element){
        console.log("Monster_Bullet_huge attack");
        
        element.HP -= 20;
    }

    dead(){
        // Laya.Pool.recover("Monster_Bullet_huge", this.owner);
    }
}
