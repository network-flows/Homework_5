import Beings from "./Beings.js"

export default class Bullet extends Beings{
    constructor(){
        super();

        this.vx = 1;
        this.vy = 1;
        this.v_max = 10;

        Bullet_list.push(this);
    }

    action(){
        //console.log("Bullet action");

        this.HP -= 1;
        //console.log(this.HP);
        this.x += this.vx;
        this.y += this.vy;

        let attack_list = this.get_attack_list();
        this.explosion(attack_list);
    }

    dead(){

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
}
