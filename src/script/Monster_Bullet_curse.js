import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_curse extends Monster_Bullet {
    constructor(vx, vy) {
        super();
        this.Type = "Monster_Bullet_curse";

        this.vx = vx;
        this.vy = vy;

        // set picture
        this.r = 40;
        this.graphics.drawCircle(0, 0, this.r, "#222222");
        this.filters = [new Laya.GlowFilter("#222222", 10, 0, 0)];

        this.v_max = 0.1;
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 60;
    }

    attack(enemy) {
        enemy.get_harm(5);
    }

    leaf_reset() {
        this.HP = 40;
    }
}
