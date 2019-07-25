import Beings from "./Beings"
import Bullet from "./Bullet";
import Monster from "./Monster";
import Hero_Bullet_normal from "./Hero_Bullet_normal";
import Gun_normal from "./Gun_normal"

export default class Hero extends Beings{
    constructor(){
        super();
        
        // move
        this.v_max = 5;

        // HP and armor
        this.HP_max = 100;
        this.HP = 100;
        this.armor_max = 10;
        this.armot = 10;

        // shoot
        this.shoot_power = 0;
        this.shoot_waiting = false;

        this.size(32,48);
        Laya.Animation.createFrames(this.getURLs("hero/left",4),"hero_left");
        Laya.Animation.createFrames(this.getURLs("hero/right",4),"hero_right");
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);

        this.nearest_thing = null;
    }

    action(){
        //--------- movement control part ---------//
        let vx = the_screen.getVelosity().x;
        let vy = the_screen.getVelosity().y;
        let v=this.dl(vx,vy);
        this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);

        // Shooting and using goods

        // get nearest_thing
        this.checkitem();

        // using goods
        if(this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50){
            the_screen.setPicture(2);
            the_screen.setText(this.nearest_thing.sentence);

            if(the_screen.getShoot()){
                this.nearest_thing.use_it();
            }
            if(this.shoot_power < 0){
                this.shoot_power += 1;
            }
            else{
                this.shoot_power = 0;
            }
        }
        // shooting
        else{
            the_screen.setPicture(1);
            the_screen.setText();

            if(the_screen.getShoot())   // shoot button clicked
            {
                this.shoot_power += 1;
            }
            else if(this.shoot_power != 0)
            {
                this.shoot_power += 1;
            }
            if(this.shoot_power >= this.main_gun.first_waiting)
            {
                this.shoot_event();
                this.shoot_power = -this.main_gun.second_waiting;
            }
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
        
        let dir=this.getDir(this.direction_x,this.direction_y,this.pre_dir);
        this.ani.pos(this.x,this.y)
        if(dir!=this.pre_dir)
        {
            this.ani.play(0,true,"hero_"+dir);
            this.pre_dir=dir;
        }

        if(this.direction_x>=0)
        {
            this.main_gun.scaleX=1;
            let arg=90-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
            this.main_gun.rotation=arg;
        }
        else 
        {
            this.main_gun.scaleX=-1;
            let arg=270-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
            this.main_gun.rotation=arg;
        }
        //--------- shoot control part end ---------//
    }

    shoot_event(){
        this.main_gun.shoot();
        this.shooting_sound();
    }

    shooting_sound(){
        console.log("播放音效");
		Laya.SoundManager.playSound("res/sounds/shooting.mp3", 1, new Laya.Handler(this, this.onComplete));
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

    checkitem(){
        console.log(1);
        let min_distance = 1E6;
        let nearest_thing = null;
        for(let the_thing of Thing_list){
            if(this.get_distance(the_thing) < min_distance){
                min_distance = this.get_distance(the_thing);
                nearest_thing = the_thing;
            }
        }
        
        // exist
        if(nearest_thing !== null){
            this.nearest_thing = nearest_thing;
        }
        else{
            this.nearest_thing = null;
        }
        console.log(2);

    }

    get_harm(value){
        if(this.armor >= value){
            this.armor -= value;
        }
        else{
            this.armor = 0;
            value -= this.armor;
            this.HP -= value;
        }
    }

    dead(){
        this.ani.visible=false;
        Laya.stage.removeChild(this.ani);
    }

    branch_reset(){
        this.HP = this.HP_max;
        this.armor = this.armor_max;
        Laya.stage.addChild(this.ani);

        this.ani.pos(this.x,this.y)
        
        this.ani.index=1;
        this.ani.play(0,true,"hero_right");

        this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', Gun_normal);
        this.main_gun.root_reset();
        this.alternate_gun = null;
        this.pre_dir="right"
    }
}