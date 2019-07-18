import Beings from "./Beings"
import Bullet from "./Bullet";
import Monster from "./Monster";
import Hero_Bullet_normal from "./Hero_Bullet_normal";

export default class Hero extends Beings{
    constructor(){
        super();
        
        // move
        this.v_max = 5;

        // HP and armor
        this.HP_max = 10;
        this.armor_max = 10;
        this.armot = 10;

        // shoot
        this.direction_x = 1;
        this.direction_y = 1;

        this.shoot_power = 1000;
        this.shoot_cost = 100;
        
        this.pivot(50,50)
        this.graphics.drawRect(0,0,100,100,"#FFFF00")
    }

    action(){
        //--------- movement control part ---------//
        let vx = this.getV().x;
        let vy = this.getV().y;

        vx /= 10;
        vy /= 10;

        // movement command detected
        let v = Math.sqrt(vx * vx + vy * vy);
        if (v > 1E-6){
            // make sure that v <= v_max
            let v_scale =this.v_max / v;
            if(v_scale > 1){
                v_scale = 1;
            }

            this.mapX += vx * v_scale;
            this.mapY += vy * v_scale;
        }
        //--------- movement control part end ---------//

        //--------- shoot control part ---------//
        
        // Shooting delay
        if(this.shoot_power < 10000){
            this.shoot_power += 1;
        }
        if(this.shoot_cost <= this.shoot_power && this.shoot()){
            this.shoot_power = 0;
            this.shoot_event();
        }

        // get orientation
        let nearest_monster_orientation = this.get_nearest_monster_orientation();
        console.log(nearest_monster_orientation)
        if(this.Object_dl(nearest_monster_orientation) > 1E-6 ){
            this.direction_x = nearest_monster_orientation.dx;
            this.direction_y = nearest_monster_orientation.dy;
        }
        else if(v > 1E-6){
            this.direction_x = vx;
            this.direction_y = vy;
        }

        //--------- shoot control part end ---------//
    }

    getV(){
        return the_screen.getVelosity();
    }

    shoot(){
        return the_screen.getShoot();
    }

    get_nearest_monster_orientation(){
        let min_distance = 1E6;
        let nearest_monster = null;
        for(let the_monster of Monster_list){
            if(this.get_distance(the_monster) < min_distance){
                min_distance = this.get_distance(the_monster);
                nearest_monster = the_monster;
            }
        }
        
        // exist monster
        if(nearest_monster !== null){
            return{
                dx: nearest_monster.x - this.x,
                dy: nearest_monster.y - this.y
            };
        }
        else{
            return {
                dx: 0,
                dy: 0
            }
        }
    }

    shoot_event(){
        let new_bullet = new Hero_Bullet_normal();
        console.log("shoot!")
    }

    dead(){

    }
}