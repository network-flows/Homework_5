import Beings from "./Beings"
import Hero_Bullet_normal from "./Hero_Bullet_normal"
import Gun from "./Gun"

export default class Gun_normal extends Gun{
    constructor(){
        super();
        this.Type = "Gun_normal"


        this.first_waiting = 1;
        this.second_waiting = 3;
        
        this.loadImage("res/guns/gun0.png")
        Laya.stage.addChild(this);
        this.size(64,32);
        this.pos(Laya.Browser.clientWidth/2,Laya.Browser.clientHeight/2+14);
        this.bullet = Hero_Bullet_normal;
        this.bullet_type = "Hero_Bullet_normal"
    }
    
    shoot(){
        let new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
        new_bullet.root_reset();
    }

    leaf_reset(){
        this.pivot(2,16);
        this.visible=true;
        this.sentence="杀虫剂"
    }
}
