import Hero_Bullet from "./Hero_Bullet"

export default class Hero_Bullet_normal extends Hero_Bullet{
    constructor(vx, vy){
        super();
        this.v_max = 10;
        

        this.HP = 40;
        console.log("this.HP = ", this.HP);

        // set picture
        this.loadImage("./orz.jpg").scale(0.1,0.1);
    }

    attackable(the_enemy){
        return this.get_distance(the_enemy) < 40;
    }

    attack(element){
        console.log("Hero_Bullet_normal attack");
        
        element.HP -= 20;
    }

    dead(){
        // Laya.Pool.recover("Hero_Bullet_normal", this.owner);
    }
}