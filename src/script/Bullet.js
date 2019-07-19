import Beings from "./Beings.js"

export default class Bullet extends Beings{
    constructor(){
        super();

        this.vx = 1;
        this.vy = 1;
        this.v_max = 10;
    }

    action(){
        this.HP -= 1;

        this.mapX += this.vx;
        this.mapY += this.vy;

        let attack_list = this.get_attack_list();
        this.explosion(attack_list);
    }

    dead(){
        Bullet_list.splice(Bullet_list.indexOf(this));
        
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

    attack(element){
        console.log("Bullet attack");

    }

    branch_reset(){
        console.log("branch_reset!")
        Bullet_list.push(this);

        this.branch_Hero_or_Monster_reset()
    }
}
