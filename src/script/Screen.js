import DragPoint from "./DragPoint"
import Wheel from "./Wheel"
import Hero from "./hero"
import Goblin from "./Goblin"
export default class Screen extends Laya.Sprite  //screen
{
	constructor(w,h)
	{
		super();
		const 
			Sprite = Laya.Sprite,
			Event = Laya.Event;
		this.w=w;
		this.h=h;

		Laya.stage.addChild(this);
		this.size(w,h);
		this.pos(0,0);
		this.loadMap();
	}

	loadMap()
	{
		const 
			TiledMap=Laya.TiledMap,
			Rectangle=Laya.Rectangle,
			Handler=Laya.Handler,
			Event=Laya.Event,
			Browser=Laya.Browser;
		this.tiledMap=new TiledMap();
		this.tiledMap.createMap("res\\tiledmaps\\test.json", new Rectangle(0, 0, Browser.width, Browser.height),Handler.create(this,this.onLoadedMap));
	}

	onLoadedMap()
	{
		console.log("ok")
		const Event=Laya.Event;
		Laya.stage.on(Event.MOUSE_UP,this,this.onMouseUp);
		Laya.stage.on(Event.MOUSE_MOVE,this,this.onMouseMove);
		Laya.stage.on(Event.MOUSE_DOWN,this,this.onMouseDown);
		Laya.stage.on(Event.MOUSE_OUT,this,this.onMouseUP);

		this.whl=new Wheel(this.w/4,this.h*3/4,this.w/15);
        this.atk=new Wheel(this.w*3/4,this.h*3/4,this.w/15);
		this.atk.alpha=0.8;

		window.the_Hero = new Hero(the_screen);

		// test
		//let monster_test1 = new Goblin();
		Laya.timer.frameLoop(1, this, this.onFrame);

	}

	onFrame() {
		for (let the_monster of Monster_list) {
			the_monster.up_date();
		}
		for (let the_bullet of Bullet_list) {
			the_bullet.up_date();
		}
		for (let the_wall of Wall_list) {
			the_wall.up_date();
		}
		for (let the_thing of Thing_list) {
			the_thing.up_date();
		}
		
		const hero = window.the_Hero;
		window.the_Hero.up_date();
		hero.pos(Laya.Browser.clientWidth/2,Laya.Browser.clientHeight/2);
		this.tiledMap.changeViewPort(hero.mapX-Laya.Browser.clientWidth/2,hero.mapY-Laya.Browser.clientHeight/2,Laya.Browser.clientWidth,Laya.Browser.clientHeight)
	}

	onMouseDown(e){
		if((this.whl.x-e.stageX)*(this.whl.x-e.stageX)+(this.whl.y-e.stageY)*(this.whl.y-e.stageY)<=this.whl.r*this.whl.r)
		{
			this.whl.onStartDrag(e);
		}
		else if((this.atk.x-e.stageX)*(this.atk.x-e.stageX)+(this.atk.y-e.stageY)*(this.atk.y-e.stageY)<=this.atk.r*this.atk.r)
		{
			this.atk.onStartDrag(e);
		}
	}
	onMouseUp(e)
	{
		if(this.whl.ID==e.touchId)
		{
			this.whl.onStopDrag();
		}
		else if(this.atk.ID==e.touchId)
		{
			this.atk.onStopDrag();
		}
	}
	onMouseMove(e)
	{
		if(this.whl.ID==e.touchId)
		{
			this.whl.moveTo(e.stageX,e.stageY);
		}
		else if(this.atk.ID==e.touchId)
		{
			this.atk.moveTo(e.stageX,e.stageY);
		}
	}

	getVelosity()
	{
        return {
            x : this.whl.sp.x - this.whl.x,
            y : this.whl.sp.y - this.whl.y
        };
	}

	getShoot()
	{
        return this.atk.ID !== null;
	}
}
