import Thing from "./Thing"

export default class God extends Thing{
    constructor(){
        super();
        this.Type = "God"

        this.mapX = 200;
        this.mapY = 200;

        this.sentence = "冒险家，你需要指引吗？";

        // set picture
        Laya.Animation.createFrames(this.getURLs("god/down",3),"god_down");
        this.ani = new Laya.Animation();
        this.ani.interval=100;
        this.ani.pivot(this.width/2,this.height/2);
    }

    use_it(){
        // go to next floor
        this.sentence = "请选择一扇门，左边是天堂，右边是地狱"
    }

    dead(){
        this.ani.visible=false;
        Laya.stage.removeChild(this.ani);
        Thing_list.splice(Thing_list.indexOf(this), 1);
    }

    leaf_reset(){
        this.ani.play(0,true,"god_down");
    }
}