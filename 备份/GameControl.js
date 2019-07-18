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

// 扩充的类
import Monster_Bullet_basic1 from "./script/Monster_Bullet_basic1"

/**
 * 游戏控制脚本。定义了游戏核心变量，能够在IDE显示及设置该变量
*/

export default class GameControl extends Laya.Script {
    /** @prop {name:dropBox,tips:"掉落容器预制体对象",type:Prefab}*/
    /** @prop {name:bullet,tips:"子弹预制体对象",type:Prefab}*/
    /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/

    constructor() { super(); }
    onEnable() {
        //间隔多少毫秒创建一个下跌的容器
        this.createBoxInterval = 1000;
        //开始时间
        this._time = Date.now();
        //是否已经开始游戏
        this._started = false;
        //子弹和盒子所在的容器对象
        this._gameBox = this.owner.getChildByName("gameBox");
    }

    onUpdate() {
        //每间隔一段时间创建一个盒子
        let now = Date.now();
        if (now - this._time > this.createBoxInterval&&this._started) {
            this._time = now;
            this.createBox();
        }
    }

    createBox() {
        //使用对象池创建盒子
        // xxx
    }

    onStageClick(e) {
        //停止事件冒泡，提高性能，当然也可以不要
        e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        let flyer = Laya.Pool.getItemByCreateFun("Monster_Bullet_basic1", this.bullet.create, this.Monster_Bullet_basic1);
        flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(flyer);
    }

    /**开始游戏，通过激活本脚本方式开始游戏*/
    startGame() {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
        }
    }

    /**结束游戏，通过非激活本脚本停止游戏 */
    stopGame() {
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    }
}