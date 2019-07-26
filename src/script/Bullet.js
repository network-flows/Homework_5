import Beings from "./Beings.js"

export default class Bullet extends Beings{
    constructor(){
        super();

        this.vx = 1;
        this.vy = 1;
        this.v_max = 10;

        this.m = 0.01;
    }

    action(){
        let will_die = this.hit_wall(this.vx, this.vy);

        this.HP -= 1;
        this.move_by_dx_dy(this.vx, this.vy)

        let attack_list = this.get_attack_list();
        this.explosion(attack_list);
        
        if(will_die){
            this.HP = -1;
        }
    }

    dead(){
        Bullet_list.splice(Bullet_list.indexOf(this), 1);
    }

    // this should return a list that contain the elements to be attack
    get_attack_list(){
        
    }

    explosion(attack_list){
        // explosion !
        if(attack_list.length > 0){
            this.HP = -1;
            for(let element of attack_list){
                this.attack(element);
            }
        }
    }

    attack(){

    }

    branch_reset(){
        Bullet_list.push(this);

        this.branch_Hero_or_Monster_reset()
    }

    hit_wall(dx, dy){
        return !this.reachable(this.mapX + dx, this.mapY + dy);
    }
}
