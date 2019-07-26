import Hero_Bullet from "./Hero_Bullet"

export default class Hero_Bullet_huge extends Hero_Bullet {
    constructor(vx, vy) {
        super();
        this.v_max = 20;
        this.Type = "Hero_Bullet_normal";

        this.r = 20;
        this.size(this.r*2,this.r*2)
        this.graphics.drawCircle(this.r, this.r, this.r, "#BA22AA");
        this.filters = [new Laya.GlowFilter("#FBFFAA", 10, 0, 0)];
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 50;
    }

    attack(enemy) {
        enemy.get_harm(20);
    }

    leaf_reset() {
        this.HP = 80;
    }
}
