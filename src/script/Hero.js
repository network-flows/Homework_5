import Beings from "./Beings"
import Gun_normal from "./Gun_normal"
import Shotgun from "./Shotgun"

export default class Hero extends Beings{
    constructor(){
        super();
        this.Type = "Hero";
        // move
        this.v_max = 5;
        this.mapX = 150;
        this.mapY = 150;

        // HP and armor
        this.HP_max = 40;
        this.HP = 40;
        this.armor_max = 40;
        this.armor = 40;
        this.armor_count = 0;

        // shoot
        this.shoot_power = 0;

        // show
        this.size(48,48);
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);
        this.nearest_thing = null;

        // gun
        this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', Gun_normal);
        this.main_gun.root_reset();
        this.alternate_gun = new Laya.Pool.getItemByClass('Shotgun', Shotgun);
        this.alternate_gun.root_reset();
    }

    action(){
        // change gun
        let changing=the_screen.getChange();
        if(changing&&!this.preChanging){
            let tmp = this.main_gun;
            this.main_gun = this.alternate_gun;
            this.main_gun.zOrder=this.zOrder+1;
            this.main_gun.visible=true;
            this.alternate_gun = tmp;
            this.alternate_gun.visible=false;
            this.shoot_power = 0;
            the_screen.setText(this.main_gun.sentence);
        }
        this.preChanging=changing

        // repair armor
        if(this.armor < this.armor_max){
            if(this.armor_count >= 60){
                this.armor += 2;
                this.armor_count = 0;
            }
            else{
                this.armor_count += 1;
            }
        }

        //--------- movement control part ---------//
        let vx = the_screen.getVelosity().x;
        let vy = the_screen.getVelosity().y;
        let v=this.dl(vx,vy);
        this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);
        //--------- movement control part end ---------//

        //--------- Shooting and using goods ---------//

        // get nearest_thing
        this.checkitem();

        // using goods
        if(this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50){
            the_screen.setPicture("pick");
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
            the_screen.setPicture("shoot");
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
        //--------- Shooting and using goods end ---------//
    }

    shoot_event(){
        this.main_gun.shoot();
        this.shooting_sound();
    }

    shooting_sound(){
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
    }

    get_harm(value){
        this.armor_count = 0;
        if(this.HP < 1){
            return;
        }

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
        the_screen.shadowPauser.visible=true;
        the_screen.paused=true;
        the_screen.setText("游戏结束！\n\n 分数："+the_screen.score,undefined,undefined,undefined,50)
        return;
    }

    branch_reset(){
        this.HP = this.HP_max;
        this.armor = this.armor_max;
        this.preChanging=false;
        this.shoot_power=0;
        this.main_gun.zOrder=this.zOrder+1;
        this.main_gun.visible=true;
        this.alternate_gun.visible=false;
        this.ani.play(0,true,"hero_right")
        this.pre_dir="right"
    }
}