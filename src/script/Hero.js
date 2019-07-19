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

        this.pivot(16,24)
        
        this.ani = new Laya.Animation();
        this.ani.loadAtlas("res//atlas//hero.atlas",Laya.Handler.create(this,this.onLoaded)); 
    }

    onLoaded()
    {
        console.log("load!!!")
        Laya.stage.addChild(this.ani);
        this.ani.interval=100;
        this.ani.pos(this.x,this.y)
        this.ani.index=1;
        function getURLs(str,n)
        {
            let urls=[];
            for(var i =0;i<n;i+=1)
            {
                urls.push("res\\atlas\\"+str+i+".png")
            }
            return urls;
        }
        
        Laya.Animation.createFrames(getURLs("hero\\up",4),"hero_up");
        Laya.Animation.createFrames(getURLs("hero\\down",4),"hero_down");
        Laya.Animation.createFrames(getURLs("hero\\left",4),"hero_left");
        Laya.Animation.createFrames(getURLs("hero\\right",4),"hero_right");
        this.ani.play(0,true,"hero_right");
        this.pre_dir="right"
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
        if(this.Object_dl(nearest_monster_orientation) > 1E-6 ){
            this.direction_x = nearest_monster_orientation.dx;
            this.direction_y = nearest_monster_orientation.dy;
        }
        else if(v > 1E-6){
            this.direction_x = vx;
            this.direction_y = vy;
        }

        function getDir(dx,dy,last){
            if(dx>dy&&dx>-dy)return "right";
            if(-dx>dy&&-dx>-dy)return "left";
            if(dy>dx&&dy>-dx)return "down";
            if(-dy>dx&&-dy>-dx)return "up";
            return last;
        }

        let dir=getDir(this.direction_x,this.direction_y,this.pre_dir);
        if(dir!=this.pre_dir)
        {
            this.ani.play(0,true,"hero_"+dir);
            this.pre_dir=dir;
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
                dx: nearest_monster.mapX - this.mapX,
                dy: nearest_monster.mapY - this.mapY
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
        let new_bullet = Laya.Pool.getItemByClass("Hero_Bullet_normal", Hero_Bullet_normal);
        console.log("shoot!")
    }

    dead(){

    }
}