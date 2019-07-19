export default class Beings extends Laya.Sprite {
    constructor(){
        super();

        this.HP = 1;
        this.mapX = 0;
        this.mapY = 0;

        // collision system
        this.Type = "Beings";
        this.w = 50;
        this.h = 50;
    }

    root_reset(){
        Laya.stage.addChild(this);
        console.log("root_reset!")

        this.branch_reset();
    }

    up_date(){
        this.x = this.mapX - the_Hero.mapX + Laya.Browser.clientWidth/2;
        this.y = this.mapY - the_Hero.mapY + Laya.Browser.clientHeight/2;

        if(this.HP < 1){
            this.dead_action();
        }
        else{
            this.visible = true;
            this.action();
        }
    }

    dead_action(){
        this.visible = false;
        Laya.stage.removeChild(this);
        Laya.Pool.recover(this.Type, this);

        this.dead();
    }

    dead(){

    }

    action(){
        console.log("Beings action")
    }

    dl(dx, dy){
        return Math.sqrt(dx * dx + dy *dy);
    }

    Object_dl(the_object){
        return Math.sqrt(the_object.dx * the_object.dx + the_object.dy * the_object.dy);
    }

    get_distance(another){
        let dx = this.mapX - another.mapX;
        let dy = this.mapY - another.mapY;
        return this.dl(dx, dy);
    }

    get_vector_v(v_max, the_vx, the_vy){
        let the_v = this.dl(the_vx, the_vy);
        if(the_v > 1E-6 && v_max > 1E-6){
            return{
                vx: the_vx * v_max/the_v,
                vy: the_vy * v_max/the_v
            }
        }
        else{
            return{
                vx: 0,
                vy: 0
            }
        }
    }

    getURLs(str,n)
    {
        let urls=[];
        for(var i =0;i<n;i+=1)
        {
            urls.push("res\\atlas\\"+str+i+".png")
        }
        return urls;
    }

    getDir(dx,dy,last){
        if(dx>dy&&dx>-dy)return "right";
        if(-dx>dy&&-dx>-dy)return "left";
        if(dy>dx&&dy>-dx)return "down";
        if(-dy>dx&&-dy>-dx)return "up";
        return last;
    }
}
