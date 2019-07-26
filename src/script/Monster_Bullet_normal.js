import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_normal extends Monster_Bullet {
    constructor(vx, vy) {
        super();
        this.Type = "Monster_Bullet_normal";

        this.vx = vx;
        this.vy = vy;

        // set picture
        this.r = 10;
        this.graphics.drawCircle(0, 0, this.r, "#FFFF00");
        this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 20;
    }

    attack(enemy) {
        enemy.get_harm(5);
    }

    leaf_reset() {
        this.HP = 40;
    }
}