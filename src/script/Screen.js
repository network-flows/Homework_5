import DragPoint from "./DragPoint"
import Wheel from "./Wheel"
import Hero from "./hero"
import Goblin from "./Goblin"
import Gunner from "./Gunner"
import Gate from "./Gate"
import HPWindow from "./HPWindow"
import God from "./God"
import Sharpshooter from "./Sharpshooter"
import wizard from "./wizard"
import Charizard from "./Charizard"

export default class Screen extends Laya.Sprite  //screen
{
	constructor(w, h) {
		super();
		const
			Sprite = Laya.Sprite,
			Event = Laya.Event;
		this.width = this.width;
		this.height = h;

		Laya.stage.addChild(this);
		this.size(w, h);
		this.pos(0, 0);
		this.loadMap();

		this.number = 0;
		this.difficulty = 1;

		this.time_count = 0;
		this.time_interval = 800;

		this.mapX_max = 1000;
		this.mapY_max = 1000;
		Laya.Animation.createFrames(this.getURLs("hero/left",4),"hero_left");
		Laya.Animation.createFrames(this.getURLs("hero/right",4),"hero_right");
		Laya.Animation.createFrames(this.getURLs("key/base",4),"key");
		Laya.Animation.createFrames(this.getURLs("gunner/left",4),"Gunner_left");
		Laya.Animation.createFrames(this.getURLs("gunner/right",4),"Gunner_right");
		Laya.Animation.createFrames(this.getURLs("Sharpshooter/left",4),"Sharpshooter_left");
		Laya.Animation.createFrames(this.getURLs("Sharpshooter/right",4),"Sharpshooter_right");
		Laya.Animation.createFrames(this.getURLs("wizard/left",4),"wizard_left");
		Laya.Animation.createFrames(this.getURLs("wizard/right",4),"wizard_right");
		Laya.Animation.createFrames(this.getURLs("Charizard/left",4),"Charizard_left");
		Laya.Animation.createFrames(this.getURLs("Charizard/right",4),"Charizard_right");

		this.score = 0;
	}

	loadMap() {
		const
			TiledMap = Laya.TiledMap,
			Rectangle = Laya.Rectangle,
			Handler = Laya.Handler,
			Event = Laya.Event,
			Browser = Laya.Browser;
		this.tiledMap = new TiledMap();
		this.tiledMap.createMap("res/tiledmaps/start.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
	}

	onLoadedMap() {
		const Event = Laya.Event;
		Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
		Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
		Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
		Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUP);

		this.whl = new Wheel(this.width / 4, this.height * 3 / 4, this.width / 15, true);
		this.atk = new Wheel(this.width * 3 / 4, this.height * 3 / 4, this.width / 15);
		this.chg = new Wheel(this.width * 0.83, this.height *0.55, this.width / 30);
		this.setPicture("pick");
		this.setPicture("shoot");
		this.whl.loadImage("res/atlas/wheels/whl.png")
		this.chg.loadImage("res/atlas/wheels/chg.png")
		this.whl.zOrder = 1000;
		this.atk.zOrder = 1001;
		this.chg.zOrder = 1002;
		this.whl.sp.zOrder=1003;

		window.the_Hero = Laya.Pool.getItemByClass("Hero", Hero);
		the_Hero.root_reset();

		// init text
		this.dlg = new Laya.Text();
		Laya.stage.addChild(this.dlg);
		this.dlg.pos(0, 0);
		this.dlg.size(200, 100);
		this.dlg.pivot(100, 50);
		this.dlg.fontSize = 20;
		this.dlg.align = "center"
		this.dlg.valign = "middle"
		this.dlg.color = "#000000"
		this.dlg.font = "Impact";
		this.dlg.zOrder = 1000;

		this.score_Window=new Laya.Text();
		Laya.stage.addChild(this.score_Window);
		this.score_Window.pos(Laya.Browser.clientWidth/2,40);
		this.score_Window.size(200, 100);
		this.score_Window.pivot(100, 50);
		this.score_Window.fontSize = 20;
		this.score_Window.align = "center"
		this.score_Window.valign = "middle"
		this.score_Window.color = "#FF0000"
		this.score_Window.font = "Impact";
		this.score_Window.zOrder = 1000;

		// play music
		laya.media.SoundManager.playMusic("res/sounds/BGM.aac", 0);

		// run
		this.paused = false;
		Laya.timer.frameLoop(1, this, this.onFrame);

		// start gate
		let gate1 = Laya.Pool.getItemByClass("Gate", Gate);
		gate1.root_reset();

		let gate2 = Laya.Pool.getItemByClass("Gate", Gate);
		gate2.root_reset();

		gate2.mapX = 380;
		gate2.mapY = 100;
		gate2.difficulty = 3;

		// the god at home
		let a_god = Laya.Pool.getItemByClass("God", God);
		a_god.root_reset();

		// HP
		this.HPWindow = new HPWindow()
	}	

	generate_monster(monster_amount) {
		let cur_amount = 0;
		while(cur_amount < monster_amount){
			let new_monster = Laya.Pool.getItemByClass("Gunner", Gunner);
			new_monster.root_reset();
			cur_amount += 1;
			new_monster.placeRandomly();
		}

		cur_amount = 0;
		let strong_monster_amount1 = Math.floor(monster_amount / 3);
		while(cur_amount < strong_monster_amount1){
			let new_monster = Laya.Pool.getItemByClass("Sharpshooter", Sharpshooter);
			new_monster.root_reset();
			cur_amount += 1;
			new_monster.placeRandomly();
		}

		cur_amount = 0;
		let strong_monster_amount3 = Math.floor(monster_amount / 5);
		while(cur_amount < strong_monster_amount3){
			let new_monster = Laya.Pool.getItemByClass("Charizard", Charizard);
			new_monster.root_reset();
			cur_amount += 1;
			new_monster.placeRandomly();
		}

		cur_amount = 0;
		let strong_monster_amount2 = Math.floor(monster_amount / 7);
		while(cur_amount < strong_monster_amount2){
			let new_monster = Laya.Pool.getItemByClass("wizard", wizard);
			new_monster.root_reset();
			cur_amount += 1;
			new_monster.placeRandomly();
		}
	}

	onFrame() {
		if(this.paused){
			return;
		}

		// 无尽模式
		/*
		if (this.time_count % this.time_interval == 0) {
			this.generate_monster();
			if (this.time_interval > 20) {
				this.time_interval -= 20;
			}
		}
		this.time_count += 1;
		*/

		for (let the_monster of Monster_list) {
			the_monster.up_date();
		}
		for (let the_bullet of Bullet_list) {
			the_bullet.up_date();
		}
		for (let the_thing of Thing_list) {
			the_thing.up_date();
		}

		the_Hero.up_date();
		the_Hero.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
		this.tiledMap.changeViewPort(the_Hero.mapX - Laya.Browser.clientWidth / 2, the_Hero.mapY - Laya.Browser.clientHeight / 2, Laya.Browser.clientWidth, Laya.Browser.clientHeight)
		this.HPWindow.update()
		this.score_Window.changeText("Score: "+this.score);
	}

	onMouseDown(e) {
		if ((this.whl.x - e.stageX) * (this.whl.x - e.stageX) + (this.whl.y - e.stageY) * (this.whl.y - e.stageY) <= this.whl.r * this.whl.r) {
			this.whl.onStartDrag(e);
		}
		else if ((this.atk.x - e.stageX) * (this.atk.x - e.stageX) + (this.atk.y - e.stageY) * (this.atk.y - e.stageY) <= this.atk.r * this.atk.r) {
			this.atk.onStartDrag(e);
		}
		else if ((this.chg.x - e.stageX) * (this.chg.x - e.stageX) + (this.chg.y - e.stageY) * (this.chg.y - e.stageY) <= this.chg.r * this.chg.r) {
			this.chg.onStartDrag(e);
		}
	}

	onMouseUp(e) {
		if (this.whl.ID == e.touchId) {
			this.whl.onStopDrag();
		}
		else if (this.atk.ID == e.touchId) {
			this.atk.onStopDrag();
		}
		else if (this.chg.ID == e.touchId) {
			this.chg.onStopDrag();
		}
	}

	onMouseMove(e) {
		if (this.whl.ID == e.touchId) {
			this.whl.moveTo(e.stageX, e.stageY);
		}
		else if (this.atk.ID == e.touchId) {
			this.atk.moveTo(e.stageX, e.stageY);
		}
		else if (this.chg.ID == e.touchId) {
			this.chg.moveTo(e.stageX, e.stageY);
		}
	}

	getVelosity() {
		return {
			x: (this.whl.sp.x - this.whl.x) / this.whl.r,
			y: (this.whl.sp.y - this.whl.y) / this.whl.r
		};
	}

	getShoot() {
		return this.atk.ID !== null;
	}

	getChange() {
		return this.chg.ID !== null;
	}

	getPass(mapX, mapY) {
		const a = this.tiledMap.getLayerByIndex(0).getTileData(Math.floor(mapX / 32), Math.floor(mapY / 32));
		if (this.tiledMap._jsonData.tilesets[0].tiles[a - 1] !== undefined) {
			return this.tiledMap._jsonData.tilesets[0].tiles[a - 1].properties[0].value;
		}
		return false
	}

	setPicture(str) {
		if (str == "shoot" && this.atk.type != "shoot") {
			const atk = this.atk;
			atk.type = "shoot"
			atk.loadImage("res/atlas/wheels/atk1.png")
		}
		else if (str == "pick" && this.atk.type != "pick") {
			const atk = this.atk;
			atk.type = "pick"
			atk.loadImage("res/atlas/wheels/atk2.png")
		}
	}

	setText(text, color, x, y, sz) {
		if (text === undefined) text = "";
		if (color === undefined) color = "#FFFFFF";
		if (x == undefined || y === undefined) {
			x = Laya.Browser.clientWidth / 2
			y = Laya.Browser.clientHeight*0.45
		}
		if (sz === undefined) sz = 20;
		
		this.dlg.changeText(text);
		this.dlg.color = color;
		this.dlg.pos(x, y);
		this.dlg.fontSize = sz;
		this.dlg.alpha = 1;
		//Laya.Tween.to(this.dlg,{alpha:0,y:this.dlg.y-100,fontSize:this.dlg.fontSize*2},1000)
	}

	map_change() {
		this.paused = true;
		const number = this.number;
		this.number += 1;
		
		let bg = Math.floor(number/15);
		let idx = number%3;
		const
			TiledMap = Laya.TiledMap,
			Rectangle = Laya.Rectangle,
			Handler = Laya.Handler,
			Event = Laya.Event,
			Browser = Laya.Browser;

		for (let the_monster of Monster_list) {
			the_monster.HP = -1;
		}
		for (let the_bullet of Bullet_list) {
			the_bullet.HP = -1;
		}
		for (let the_thing of Thing_list) {
			the_thing.HP = -1;
		}

		this.tiledMap.destroy();
		this.tiledMap.createMap("res/tiledmaps/"+bg+idx+".json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap2));
	}

	onLoadedMap2() {
		the_Hero.placeRandomly()

		the_Hero.root_reset();
		this.atk.type = undefined;
		this.setPicture();
		this.tiledMap.changeViewPort(0, 0, Laya.Browser.clientWidth, Laya.Browser.clientHeight)
		this.generate_monster(this.number * this.difficulty)

		this.paused = false;
	}

	getURLs(str,n)
    {
        let urls=[];
        for(var i =0;i<n;i+=1)
        {
            urls.push("res/atlas/"+str+i+".png")
        }
        return urls;
    }
}
