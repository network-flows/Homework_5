export default class Beings extends Laya.Sprite {
    constructor(){
        super();
        Laya.stage.addChild(this);

        this.HP = 1;
        this.mapX = -1;
        this.mapY = -1;
    }

    up_date(){
        if(this.HP < 1){
            this.dead_action();
        }
        else{
            this.action();
        }
    }

    dead_action(){
        this.visible = false;
        this.dead();

        //Laya.Pool.recover(String("the class name", this.owner));
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
        let dx = this.x - another.x;
        let dy = this.y - another.y;
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
}
