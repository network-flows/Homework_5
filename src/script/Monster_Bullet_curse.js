import Monster_Bullet from "./Monster_Bullet"

export default class Monster_Bullet_curse extends Monster_Bullet {
    constructor(vx, vy) {
        super();
        this.Type = "Monster_Bullet_curse";

        this.vx = vx;
        this.vy = vy;

        // set picture
        this.r = 30;
        this.graphics.drawCircle(0, 0, this.r, "#222222");
        this.filters = [new Laya.GlowFilter("#222222", 10, 0, 0)];

        this.v_max = 20;
    }

    action(){
        this.HP -= 1;
        this.mapX += this.vx;
        this.mapY += this.vy;

        let attack_list = this.get_attack_list();
        this.explosion(attack_list);
    }

    attackable(the_enemy) {
        return this.get_distance(the_enemy) < 40;
    }

    attack(enemy) {
        enemy.get_harm(1);
    }

    leaf_reset() {
        this.HP = 400;
    }
}
