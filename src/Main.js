// 基础的类
import Beings from "./script/Beings"
import Bullet from "./script/Bullet"
import Hero from "./script/Hero"
import Monster from "./script/Monster"
import Thing from "./script/Thing"
import Hero_Bullet from "./script/Hero_Bullet"
import Monster_Bullet from "./script/Monster_Bullet"
import Gate from "./script/Gate"
import Wall from "./script/Wall"
import Screen from "./script/Screen"
import DragPoint from "./script/DragPoint"
import Wheel from "./script/Wheel"

// 扩充的类
import Monster_Bullet_huge from "./script/Monster_Bullet_huge"
import Monster_Bullet_normal from "./script/Monster_Bullet_normal"
import Goblin from "./script/Goblin"

const
	Browser = Laya.Browser,
	WebGL = Laya.WebGL,
	Stage = Laya.Stage,
	Stat = Laya.Stat,
	Handler = Laya.Handler;

//初始化引擎
Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

//横屏游戏
Laya.stage.screenMode = "horizontal";

//等比例缩放
Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

//背景颜色
Laya.stage.bgColor = "#232628";

// set the Screen
let w = Browser.clientWidth;
let h = Browser.clientHeight;

Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;

Stat.show();

window.the_screen = new Screen(w, h);

// 角色容器
window.Monster_list = [];
window.Bullet_list = [];
window.Wall_list = [];
window.Thing_list = [];