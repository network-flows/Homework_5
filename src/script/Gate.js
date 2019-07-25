import Thing from "./Thing"

export default class Gate extends Thing{
    constructor(){
        super();
        this.Type = "Gate"
        
        this.sentence = "去往下一层";
        this.difficulty = 1;
        
        // set picture
        this.pivot(16,16);
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);


        /*this.r=15;
        this.pivot(this.r,this.r)
        this.graphics.drawCircle(this.r,this.r,this.r,"#99FFAA");
        this.filters=[new Laya.GlowFilter("FFBB00",20,0,0),new Laya.GlowFilter("00BBFF",5,0,0)];*/
    }

    use_it(){
        if(this.HP < 1){
            return;
        }
        this.HP=-1

        // go to next floor
        if(the_screen.difficulty < this.difficulty){
            the_screen.difficulty = this.difficulty;
        }
        
        the_screen.map_change();
    }

    leaf_reset(){
        this.mapX=100;
        this.mapY=100;
        this.ani.play(0,true,"key");
    }
}
