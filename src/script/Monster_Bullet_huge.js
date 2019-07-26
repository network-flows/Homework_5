import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_huge extends Monster_Bullet {
    constructor(vx, vy) {
        super();
        this.Type = "Monster_Bullet_huge";
        this.vx = vx;
        this.vy = vy;
        this.v_max = 20;

        // set picture
        this.r = 20;
        this.graphics.drawCircle(0, 0, this.r, "#F1F200");
        this.filters = [new Laya.GlowFilter("#F1F2FF", 10, 0, 0)];
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 40;
    }

    attack(enemy) {
        enemy.get_harm(10);
    }

    leaf_reset() {
        this.HP = 80;
    }
}
