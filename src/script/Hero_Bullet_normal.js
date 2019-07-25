import Hero_Bullet from "./Hero_Bullet"

export default class Hero_Bullet_normal extends Hero_Bullet {
    constructor(vx, vy) {
        super();
        this.v_max = 10;
        this.Type = "Hero_Bullet_normal";

        this.r = 20;
        this.size(this.r*2,this.r*2)
        this.graphics.drawCircle(this.r, this.r, this.r, "#FFFF00");
        this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 40;
    }

    attack(enemy) {
        enemy.get_harm(20);
    }

    leaf_reset() {
        this.HP = 50;

        this.rotation=-Math.atan2(the_Hero.direction_x,the_Hero.direction_y)/Math.PI*180;
        this.filters = [new Laya.GlowFilter("#FFFFFF", 5, 0, 0)];
    }
}
