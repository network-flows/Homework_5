import Hero_Bullet from "./Hero_Bullet"

export default class Hero_Bullet_normal extends Hero_Bullet {
    constructor(vx, vy) {
        super();
        this.v_max = 5;
        this.Type = "Hero_Bullet_normal";
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 40;
    }

    attack(element) {
        console.log("Hero_Bullet_normal attack");

        element.HP -= 20;
    }

    leaf_reset() {
        this.HP = 50;
        
        // set picture
        this.r = 20;
        this.graphics.drawCircle(0, 0, this.r, "#FFFF00");
        //this.pivot(this.r, this.r);
        this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
    }
}
