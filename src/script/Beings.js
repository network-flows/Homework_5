export default class Beings extends Laya.Sprite {
    constructor(){
        super();

        this.HP = 1;
        this.mapX = 100;
        this.mapY = 100;

        // collision system
        this.Type = "Beings";
        this.width = 50;
        this.height = 50;

        // movement
        this.v_max = 5;
        this.direction_x = 1;
        this.direction_y = 1;

        this.m = 0.01;
    }

    root_reset(){
        this.visible = false;
        Laya.stage.addChild(this);
        this.pivot(this.width / 2, this.height /2)
        this.zOrder=0;
        if(this.ani)
        {
            this.ani.visible = false;
            Laya.stage.addChild(this.ani)
        }
        this.branch_reset();
    }

    up_date(){
        this.x = this.mapX - the_Hero.mapX + Laya.Browser.clientWidth/2;
        this.y = this.mapY - the_Hero.mapY + Laya.Browser.clientHeight/2;
        if(this.ani)
        {
            this.ani.pos(this.x,this.y)
        }
        
        if(this.HP < 1){
            this.dead_action();
        }
        else{
            if(this.ani){
                this.ani.visible = true;
            }
            this.visible = true;
            this.action();
        }
    }

    dead_action(){
        this.visible = false;
        Laya.stage.removeChild(this);
        if(this.ani)
        {
            this.ani.visible=false;
            Laya.stage.removeChild(this.ani)
        }
        Laya.Pool.recover(this.Type, this);
        this.dead();
    }

    get_harm(value){
        this.HP -= value;
    }

    dead(){

    }

    action(){

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

    getDir(dx,dy,last){
        if(dx>0)return "right";
        if(-dx>0)return "left";
        return last;
    }

    reachable(new_mapX, new_mapY){
        let point_set = [];
        point_set.push({x: new_mapX + this.width/2, y: new_mapY + this.height/2});
        point_set.push({x: new_mapX               , y: new_mapY + this.height/2});
        point_set.push({x: new_mapX - this.width/2, y: new_mapY + this.height/2});
        point_set.push({x: new_mapX - this.width/2, y: new_mapY                });
        point_set.push({x: new_mapX - this.width/2, y: new_mapY - this.height/2});
        point_set.push({x: new_mapX               , y: new_mapY - this.height/2});
        point_set.push({x: new_mapX + this.width/2, y: new_mapY - this.height/2});
        point_set.push({x: new_mapX + this.width/2, y: new_mapY                });

        let ok = true;

        for(let the_point of point_set){
            ok &= the_screen.getPass(the_point.x, the_point.y);
        }
        return ok;
    }

    move_by_dx_dy(dx, dy){
        if(dx > 30){
            dx = 30;
        }
        if(dy > 30){
            dy = 30;
        }

        if(this.reachable(this.mapX + dx, this.mapY)){
            this.mapX += dx;
        }
        else if(this.reachable(this.mapX + dx / 2, this.mapY)){
            this.mapX += dx / 2;
        }

        if(this.reachable(this.mapX, this.mapY + dy)){
            this.mapY += dy;
        }
        else if(this.reachable(this.mapX, this.mapY + dy / 2)){
            this.mapY += dy / 2;
        }
    }
    rotate_v(old_x, old_y, a){
        let new_x = old_x * Math.cos(a) - old_y * Math.sin(a);
        let new_y = old_x * Math.sin(a) + old_y * Math.cos(a);
        
        return {
            x: new_x,
            y: new_y
        };
    }

    placeRandomly()
    {
        while(true){
            let new_x = Math.random() * the_screen.mapX_max;
            let new_y = Math.random() * the_screen.mapY_max;
            if(this.reachable(new_x, new_y)){
                this.mapX = new_x;
                this.mapY = new_y;
                break;
            }
        }
        
    }
}
