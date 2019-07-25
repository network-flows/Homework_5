import DragPoint from "./DragPoint"
import Wheel from "./Wheel"
import Hero from "./hero"
import Goblin from "./Goblin"
import Gunner from "./Gunner"
import Gate from "./Gate"
import HPWindow from "./HPWindow"

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

		this.time_count = 0;
		this.time_interval = 800;

		this.mapX_max = 1000;
		this.mapY_max = 1000;
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
		console.log("ok")
		const Event = Laya.Event;
		Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
		Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
		Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
		Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUP);

		this.whl = new Wheel(this.width / 4, this.height * 3 / 4, this.width / 15, true);
		this.atk = new Wheel(this.width * 3 / 4, this.height * 3 / 4, this.width / 15);
		this.atk.type = "shoot";
		this.whl.zOrder = 1000;
		this.atk.zOrder = 1001;
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

		// play music
		laya.media.SoundManager.playMusic("res/sounds/BGM.mp3", 0);

		// run
		this.paused = false;
		Laya.timer.frameLoop(1, this, this.onFrame);

		// start gate
		let a_gate = Laya.Pool.getItemByClass("Gate", Gate);
		a_gate.root_reset();

		// 
		this.HPWindow = new HPWindow()
	}	

	generate_monster(monster_amount) {
		let cur_amount = 0;
		while(cur_amount < monster_amount){
			let new_monster = Laya.Pool.getItemByClass("Gunner", Gunner);
			new_monster.root_reset();
			cur_amount += 1;
			while(true){
				let new_x = Math.random() * this.mapX_max;
				let new_y = Math.random() * this.mapY_max;
				if(new_monster.reachable(new_x, new_y)){
					new_monster.mapX = new_x;
					new_monster.mapY = new_y;
					console.log("monster at "+new_monster.mapX+","+new_monster.mapY)
					break;
				}
			}
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
	}

	onMouseDown(e) {
		if ((this.whl.x - e.stageX) * (this.whl.x - e.stageX) + (this.whl.y - e.stageY) * (this.whl.y - e.stageY) <= this.whl.r * this.whl.r) {
			this.whl.onStartDrag(e);
		}
		else if ((this.atk.x - e.stageX) * (this.atk.x - e.stageX) + (this.atk.y - e.stageY) * (this.atk.y - e.stageY) <= this.atk.r * this.atk.r) {
			this.atk.onStartDrag(e);
		}
	}

	onMouseUp(e) {
		if (this.whl.ID == e.touchId) {
			this.whl.onStopDrag();
		}
		else if (this.atk.ID == e.touchId) {
			this.atk.onStopDrag();
		}
	}

	onMouseMove(e) {
		if (this.whl.ID == e.touchId) {
			this.whl.moveTo(e.stageX, e.stageY);
		}
		else if (this.atk.ID == e.touchId) {
			this.atk.moveTo(e.stageX, e.stageY);
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

	getPass(mapX, mapY) {
		const a = this.tiledMap.getLayerByIndex(0).getTileData(Math.floor(mapX / 32), Math.floor(mapY / 32));
		if (this.tiledMap._jsonData.tilesets[0].tiles[a - 1] !== undefined) {
			return this.tiledMap._jsonData.tilesets[0].tiles[a - 1].properties[0].value;
		}

		return false
	}

	setPicture(str) {
		if (str == "shoot" && this.atk.type == "pick") {
			const atk = this.atk;
			atk.type = "shoot"
			atk.graphics.drawCircle(atk.r, atk.r, atk.r, "#FFFF00");
		}
		else if (str == "pick" && this.atk.type == "shoot") {
			const atk = this.atk;
			atk.type = "pick"
			atk.graphics.drawCircle(atk.r, atk.r, atk.r, "#000000");
		}
	}

	setText(text, color, x, y, sz) {
		if (text === undefined) text = "";
		if (color === undefined) color = "#FFFFFF";
		if (x == undefined || y === undefined) {
			x = Laya.Browser.clientWidth / 2
			y = Laya.Browser.clientHeight / 2
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
		const number = this.number;
		this.number += 1;
		
		let bg = Math.floor(number/15);
		let idx = number%2;
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
		this.paused = true;
	}

	onLoadedMap2() {
		this.atk.type = "shoot";
		the_Hero.root_reset();
		console.log("loadMap!")
		this.tiledMap.changeViewPort(0, 0, Laya.Browser.clientWidth, Laya.Browser.clientHeight)
		this.paused = false;
		this.generate_monster(this.number * 1)
	}
}
