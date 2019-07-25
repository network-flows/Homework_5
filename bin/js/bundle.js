var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Beings = require("./script/Beings");

var _Beings2 = _interopRequireDefault(_Beings);

var _Bullet = require("./script/Bullet");

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Hero = require("./script/Hero");

var _Hero2 = _interopRequireDefault(_Hero);

var _Monster = require("./script/Monster");

var _Monster2 = _interopRequireDefault(_Monster);

var _Thing = require("./script/Thing");

var _Thing2 = _interopRequireDefault(_Thing);

var _Hero_Bullet = require("./script/Hero_Bullet");

var _Hero_Bullet2 = _interopRequireDefault(_Hero_Bullet);

var _Monster_Bullet = require("./script/Monster_Bullet");

var _Monster_Bullet2 = _interopRequireDefault(_Monster_Bullet);

var _Gate = require("./script/Gate");

var _Gate2 = _interopRequireDefault(_Gate);

var _Screen = require("./script/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _DragPoint = require("./script/DragPoint");

var _DragPoint2 = _interopRequireDefault(_DragPoint);

var _Wheel = require("./script/Wheel");

var _Wheel2 = _interopRequireDefault(_Wheel);

var _Monster_Bullet_huge = require("./script/Monster_Bullet_huge");

var _Monster_Bullet_huge2 = _interopRequireDefault(_Monster_Bullet_huge);

var _Monster_Bullet_normal = require("./script/Monster_Bullet_normal");

var _Monster_Bullet_normal2 = _interopRequireDefault(_Monster_Bullet_normal);

var _Goblin = require("./script/Goblin");

var _Goblin2 = _interopRequireDefault(_Goblin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 基础的类
var Browser = Laya.Browser,
    WebGL = Laya.WebGL,
    Stage = Laya.Stage,
    Stat = Laya.Stat,
    Handler = Laya.Handler;

//初始化引擎


// 扩充的类
Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

//横屏游戏
Laya.stage.screenMode = "horizontal";

//等比例缩放
Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

//背景颜色
Laya.stage.bgColor = "#232628";

// 角色容器
window.Monster_list = [];
window.Bullet_list = [];
window.Wall_list = [];
window.Thing_list = [];

// set the Screen
var w = Browser.clientWidth;
var h = Browser.clientHeight;

Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;

Stat.show();

window.the_screen = new _Screen2.default(w, h);

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":12,"./script/Hero_Bullet":13,"./script/Monster":15,"./script/Monster_Bullet":16,"./script/Monster_Bullet_huge":17,"./script/Monster_Bullet_normal":18,"./script/Screen":19,"./script/Thing":20,"./script/Wheel":21}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Beings = function (_Laya$Sprite) {
    _inherits(Beings, _Laya$Sprite);

    function Beings() {
        _classCallCheck(this, Beings);

        var _this = _possibleConstructorReturn(this, (Beings.__proto__ || Object.getPrototypeOf(Beings)).call(this));

        _this.HP = 1;
        _this.mapX = 100;
        _this.mapY = 100;

        // collision system
        _this.Type = "Beings";
        _this.width = 50;
        _this.height = 50;

        // movement
        _this.v_max = 5;
        _this.direction_x = 1;
        _this.direction_y = 1;

        _this.m = 0.01;
        return _this;
    }

    _createClass(Beings, [{
        key: "root_reset",
        value: function root_reset() {
            this.visible = false;
            Laya.stage.addChild(this);
            this.pivot(this.width / 2, this.height / 2);
            this.zOrder = 0;
            if (this.ani) {
                Laya.stage.addChild(this.ani);
            }
            this.branch_reset();
        }
    }, {
        key: "up_date",
        value: function up_date() {
            this.x = this.mapX - the_Hero.mapX + Laya.Browser.clientWidth / 2;
            this.y = this.mapY - the_Hero.mapY + Laya.Browser.clientHeight / 2;
            if (this.ani) {
                this.ani.pos(this.x, this.y);
            }

            if (this.HP < 1) {
                this.dead_action();
            } else {
                this.visible = true;
                this.action();
            }
        }
    }, {
        key: "dead_action",
        value: function dead_action() {
            this.visible = false;
            Laya.stage.removeChild(this);
            if (this.ani) {
                this.ani.visible = false;
                Laya.stage.removeChild(this.ani);
            }
            Laya.Pool.recover(this.Type, this);
            this.dead();
        }
    }, {
        key: "get_harm",
        value: function get_harm(value) {
            this.HP -= value;
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "action",
        value: function action() {}
    }, {
        key: "dl",
        value: function dl(dx, dy) {
            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: "Object_dl",
        value: function Object_dl(the_object) {
            return Math.sqrt(the_object.dx * the_object.dx + the_object.dy * the_object.dy);
        }
    }, {
        key: "get_distance",
        value: function get_distance(another) {
            var dx = this.mapX - another.mapX;
            var dy = this.mapY - another.mapY;
            return this.dl(dx, dy);
        }
    }, {
        key: "get_vector_v",
        value: function get_vector_v(v_max, the_vx, the_vy) {
            var the_v = this.dl(the_vx, the_vy);
            if (the_v > 1E-6 && v_max > 1E-6) {
                return {
                    vx: the_vx * v_max / the_v,
                    vy: the_vy * v_max / the_v
                };
            } else {
                return {
                    vx: 0,
                    vy: 0
                };
            }
        }
    }, {
        key: "getURLs",
        value: function getURLs(str, n) {
            var urls = [];
            for (var i = 0; i < n; i += 1) {
                urls.push("res/atlas/" + str + i + ".png");
            }
            return urls;
        }
    }, {
        key: "getDir",
        value: function getDir(dx, dy, last) {
            if (dx > 0) return "right";
            if (-dx > 0) return "left";
            return last;
        }
    }, {
        key: "reachable",
        value: function reachable(new_mapX, new_mapY) {
            var point_set = [];
            point_set.push({ x: new_mapX + this.width / 2, y: new_mapY + this.height / 2 });
            point_set.push({ x: new_mapX, y: new_mapY + this.height / 2 });
            point_set.push({ x: new_mapX - this.width / 2, y: new_mapY + this.height / 2 });
            point_set.push({ x: new_mapX - this.width / 2, y: new_mapY });
            point_set.push({ x: new_mapX - this.width / 2, y: new_mapY - this.height / 2 });
            point_set.push({ x: new_mapX, y: new_mapY - this.height / 2 });
            point_set.push({ x: new_mapX + this.width / 2, y: new_mapY - this.height / 2 });
            point_set.push({ x: new_mapX + this.width / 2, y: new_mapY });

            var ok = true;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = point_set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_point = _step.value;

                    ok &= the_screen.getPass(the_point.x, the_point.y);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return ok;
        }
    }, {
        key: "move_by_dx_dy",
        value: function move_by_dx_dy(dx, dy) {
            if (dx > 30) {
                dx = 30;
            }
            if (dy > 30) {
                dy = 30;
            }

            if (this.reachable(this.mapX + dx, this.mapY)) {
                this.mapX += dx;
            } else if (this.reachable(this.mapX + dx / 2, this.mapY)) {
                this.mapX += dx / 2;
            }

            if (this.reachable(this.mapX, this.mapY + dy)) {
                this.mapY += dy;
            } else if (this.reachable(this.mapX, this.mapY + dy / 2)) {
                this.mapY += dy / 2;
            }

            /*
            while(Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3){
                console.log("...")
                // try: move x
                if(dx > 0.1){
                    if(this.reachable(this.mapX + 0.3, this.mapY)){
                        dx -= 0.3;
                        this.mapX += 0.3;
                    }
                    else{
                        dx = 0;
                    }
                }
                  if(dx < -0.1){
                    if(this.reachable(this.mapX - 0.3, this.mapY)){
                        dx += 0.3;
                        this.mapX -= 0.3;
                    }
                    else{
                        dx = 0;
                    }
                }
                  // try: move y
                if(dy > 0.1){
                    if(this.reachable(this.mapX, this.mapY + 0.3)){
                        dy -= 0.3;
                        this.mapY += 0.3;
                    }
                    else{
                        dy = 0;
                    }
                }
                  if(dy < -0.1){
                    if(this.reachable(this.mapX, this.mapY - 0.3)){
                        dy += 0.3;
                        this.mapY -= 0.3;
                    }
                    else{
                        dy = 0;
                    }
                }
            }
            */
        }
    }]);

    return Beings;
}(Laya.Sprite);

exports.default = Beings;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings.js");

var _Beings3 = _interopRequireDefault(_Beings2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Beings) {
    _inherits(Bullet, _Beings);

    function Bullet() {
        _classCallCheck(this, Bullet);

        var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this));

        _this.vx = 1;
        _this.vy = 1;
        _this.v_max = 10;

        _this.m = 0.01;
        return _this;
    }

    _createClass(Bullet, [{
        key: "action",
        value: function action() {
            var will_die = this.hit_wall(this.vx, this.vy);

            this.HP -= 1;
            this.move_by_dx_dy(this.vx, this.vy);

            var attack_list = this.get_attack_list();
            this.explosion(attack_list);

            if (will_die) {
                this.HP = -1;
            }
        }
    }, {
        key: "dead",
        value: function dead() {
            Bullet_list.splice(Bullet_list.indexOf(this), 1);
        }

        // this should return a list that contain the elements to be attack

    }, {
        key: "get_attack_list",
        value: function get_attack_list() {}
    }, {
        key: "explosion",
        value: function explosion(attack_list) {
            // explosion !
            if (attack_list.length > 0) {
                this.HP = -1;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = attack_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var element = _step.value;

                        this.attack(element);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: "attack",
        value: function attack(element) {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            Bullet_list.push(this);

            this.branch_Hero_or_Monster_reset();
        }
    }, {
        key: "hit_wall",
        value: function hit_wall(dx, dy) {
            return !this.reachable(this.mapX + dx, this.mapY + dy);
        }
    }]);

    return Bullet;
}(_Beings3.default);

exports.default = Bullet;

},{"./Beings.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragPoint = function (_Laya$Sprite) {
	_inherits(DragPoint, _Laya$Sprite);

	function DragPoint(x, y, r) {
		_classCallCheck(this, DragPoint);

		var _this = _possibleConstructorReturn(this, (DragPoint.__proto__ || Object.getPrototypeOf(DragPoint)).call(this));

		var Sprite = Laya.Sprite,
		    Event = Laya.Event;
		Laya.stage.addChild(_this);

		_this.size(2 * r, 2 * r);
		_this.pivot(r, r);
		_this.graphics.drawCircle(r, r, r, "#FFFF00");
		_this.pos(x, y);
		_this.alpha = 0.2;
		_this.r = r;
		_this.mouseThrough = true;
		return _this;
	}

	return DragPoint;
}(Laya.Sprite //no events
);

exports.default = DragPoint;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Thing2 = require("./Thing");

var _Thing3 = _interopRequireDefault(_Thing2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gate = function (_Thing) {
    _inherits(Gate, _Thing);

    function Gate() {
        _classCallCheck(this, Gate);

        var _this = _possibleConstructorReturn(this, (Gate.__proto__ || Object.getPrototypeOf(Gate)).call(this));

        _this.Type = "Gate";

        _this.sentence = "去往下一层";
        _this.difficulty = 1;

        // set picture
        _this.pivot(16, 16);
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);

        /*this.r=15;
        this.pivot(this.r,this.r)
        this.graphics.drawCircle(this.r,this.r,this.r,"#99FFAA");
        this.filters=[new Laya.GlowFilter("FFBB00",20,0,0),new Laya.GlowFilter("00BBFF",5,0,0)];*/
        return _this;
    }

    _createClass(Gate, [{
        key: "use_it",
        value: function use_it() {
            if (this.HP < 1) {
                return;
            }
            this.HP = -1;

            // go to next floor
            if (the_screen.difficulty < this.difficulty) {
                the_screen.difficulty = this.difficulty;
            }

            the_screen.map_change();
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.mapX = 100;
            this.mapY = 100;
            this.ani.play(0, true, "key");
        }
    }]);

    return Gate;
}(_Thing3.default);

exports.default = Gate;

},{"./Thing":20}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster2 = require("./Monster");

var _Monster3 = _interopRequireDefault(_Monster2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goblin = function (_Monster) {
    _inherits(Goblin, _Monster);

    function Goblin() {
        _classCallCheck(this, Goblin);

        var _this = _possibleConstructorReturn(this, (Goblin.__proto__ || Object.getPrototypeOf(Goblin)).call(this));

        _this.Type = "Goblin";

        _this.width = 400;
        _this.height = 400;

        // set picture
        _this.loadImage("./orz.jpg").scale(0.4, 0.4);
        return _this;
    }

    _createClass(Goblin, [{
        key: "skill",
        value: function skill() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {

            this.HP = 20;
        }
    }]);

    return Goblin;
}(_Monster3.default);

exports.default = Goblin;

},{"./Monster":15}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Thing2 = require("./Thing");

var _Thing3 = _interopRequireDefault(_Thing2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var God = function (_Thing) {
    _inherits(God, _Thing);

    function God() {
        _classCallCheck(this, God);

        var _this = _possibleConstructorReturn(this, (God.__proto__ || Object.getPrototypeOf(God)).call(this));

        _this.Type = "God";

        _this.mapX = 200;
        _this.mapY = 200;

        _this.sentence = "冒险家，你需要指引吗？";

        // set picture
        Laya.Animation.createFrames(_this.getURLs("god/down", 3), "god_down");
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        return _this;
    }

    _createClass(God, [{
        key: "use_it",
        value: function use_it() {
            // go to next floor
            this.sentence = "请选择一扇门，左边是天堂，右边是地狱";
            console.log(this.Type);
        }
    }, {
        key: "dead",
        value: function dead() {
            console.log("god die");
            this.ani.visible = false;
            Laya.stage.removeChild(this.ani);
            Thing_list.splice(Thing_list.indexOf(this), 1);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.ani.play(0, true, "god_down");
        }
    }]);

    return God;
}(_Thing3.default);

exports.default = God;

},{"./Thing":20}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings");

var _Beings3 = _interopRequireDefault(_Beings2);

var _Hero_Bullet_normal = require("./Hero_Bullet_normal");

var _Hero_Bullet_normal2 = _interopRequireDefault(_Hero_Bullet_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gun = function (_Beings) {
    _inherits(Gun, _Beings);

    function Gun() {
        _classCallCheck(this, Gun);

        var _this = _possibleConstructorReturn(this, (Gun.__proto__ || Object.getPrototypeOf(Gun)).call(this));

        _this.first_waiting = 10;
        _this.second_waiting = 100;

        _this.bullet = _Hero_Bullet_normal2.default;
        _this.bullet_type = "Hero_Bullet_normal";
        return _this;
    }

    _createClass(Gun, [{
        key: "action",
        value: function action() {}
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "shoot",
        value: function shoot() {
            var new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
            new_bullet.root_reset();

            console.log("shoot!");
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            console.log("branch_reset!");

            this.leaf_reset();
        }
    }]);

    return Gun;
}(_Beings3.default);

exports.default = Gun;

},{"./Beings":2,"./Hero_Bullet_normal":14}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings = require("./Beings");

var _Beings2 = _interopRequireDefault(_Beings);

var _Hero_Bullet_normal = require("./Hero_Bullet_normal");

var _Hero_Bullet_normal2 = _interopRequireDefault(_Hero_Bullet_normal);

var _Gun2 = require("./Gun");

var _Gun3 = _interopRequireDefault(_Gun2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gun_normal = function (_Gun) {
    _inherits(Gun_normal, _Gun);

    function Gun_normal() {
        _classCallCheck(this, Gun_normal);

        var _this = _possibleConstructorReturn(this, (Gun_normal.__proto__ || Object.getPrototypeOf(Gun_normal)).call(this));

        _this.Type = "Gun_normal";

        _this.first_waiting = 2;
        _this.second_waiting = 10;

        _this.loadImage("res/guns/gun0.png");
        Laya.stage.addChild(_this);
        _this.size(64, 32);
        _this.w = 64;
        _this.h = 32;
        _this.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
        _this.bullet = _Hero_Bullet_normal2.default;
        _this.bullet_type = "Hero_Bullet_normal";
        return _this;
    }

    _createClass(Gun_normal, [{
        key: "leaf_reset",
        value: function leaf_reset() {
            this.pivot(8, 16);
            this.visible = true;
        }
    }]);

    return Gun_normal;
}(_Gun3.default);

exports.default = Gun_normal;

},{"./Beings":2,"./Gun":8,"./Hero_Bullet_normal":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster2 = require("./Monster");

var _Monster3 = _interopRequireDefault(_Monster2);

var _Monster_Bullet_normal = require("./Monster_Bullet_normal");

var _Monster_Bullet_normal2 = _interopRequireDefault(_Monster_Bullet_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gunner = function (_Monster) {
    _inherits(Gunner, _Monster);

    function Gunner() {
        _classCallCheck(this, Gunner);

        var _this = _possibleConstructorReturn(this, (Gunner.__proto__ || Object.getPrototypeOf(Gunner)).call(this));

        _this.Type = "Gunner";

        _this.width = 100;
        _this.height = 100;
        _this.range = 10 * 40;
        _this.v_max = 3;

        // set picture
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        return _this;
    }

    _createClass(Gunner, [{
        key: "skill",
        value: function skill() {
            var new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_normal", _Monster_Bullet_normal2.default);
            new_bullet.root_reset();
            new_bullet.init(this);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            console.log("g new");
            this.HP = 100;
        }
    }]);

    return Gunner;
}(_Monster3.default);

exports.default = Gunner;

},{"./Monster":15,"./Monster_Bullet_normal":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HPWindow = function (_Laya$Sprite) {
    _inherits(HPWindow, _Laya$Sprite);

    function HPWindow() {
        _classCallCheck(this, HPWindow);

        var _this = _possibleConstructorReturn(this, (HPWindow.__proto__ || Object.getPrototypeOf(HPWindow)).call(this));

        _this.HP = 0;
        _this.armor = 0;
        _this.update();
        Laya.stage.addChild(_this);
        _this.zOrder = 1000;
        _this.size(200, 120);
        return _this;
    }

    _createClass(HPWindow, [{
        key: "update",
        value: function update() {
            if (this.HP != the_Hero.HP || this.armor != the_Hero.armor) {
                var Text = Laya.Text;
                this.HP = the_Hero.HP;
                this.armor = the_Hero.armor;
                var len_HP = (167 - 78) / the_Hero.HP_max * the_Hero.HP;
                this.graphics.drawRect(78, 30, 167 - 78, 17, "#555555"); //78,32  ---167,47
                this.graphics.drawRect(78, 30, len_HP, 17, "#FFFF00"); //78,32  ---167,47

                var len_armor = (167 - 78) / the_Hero.armor_max * the_Hero.armor;
                this.graphics.drawRect(78, 79, 167 - 78, 17, "#555555"); //78,32  ---167,47
                this.graphics.drawRect(78, 79, len_armor, 17, "#FFFF00"); //78,78  ---167,93
                this.loadImage("res/HPWindow/HPWindow.png");
            }
        }
    }]);

    return HPWindow;
}(Laya.Sprite);

exports.default = HPWindow;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings");

var _Beings3 = _interopRequireDefault(_Beings2);

var _Bullet = require("./Bullet");

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Monster = require("./Monster");

var _Monster2 = _interopRequireDefault(_Monster);

var _Hero_Bullet_normal = require("./Hero_Bullet_normal");

var _Hero_Bullet_normal2 = _interopRequireDefault(_Hero_Bullet_normal);

var _Gun_normal = require("./Gun_normal");

var _Gun_normal2 = _interopRequireDefault(_Gun_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Beings) {
    _inherits(Hero, _Beings);

    function Hero() {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.Type = "Hero";
        // move
        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 20;
        _this.HP = 20;
        _this.armor_max = 20;
        _this.armor = 20;
        _this.armor_count = 0;

        // shoot
        _this.shoot_power = 0;

        // 
        _this.size(32, 48);
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        _this.nearest_thing = null;
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // repair armor
            if (this.armor < this.armor_max) {
                if (this.armor_count >= 60) {
                    this.armor += 1;
                    this.armor_count = 0;
                } else {
                    this.armor_count += 1;
                }
            }

            //--------- movement control part ---------//
            var vx = the_screen.getVelosity().x;
            var vy = the_screen.getVelosity().y;
            var v = this.dl(vx, vy);
            this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);
            //--------- movement control part end ---------//

            //--------- Shooting and using goods ---------//

            // get nearest_thing
            this.checkitem();

            // using goods
            if (the_screen.getShoot()) console.log("getshoot1");
            if (this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50) {
                the_screen.setPicture("pick");
                the_screen.setText(this.nearest_thing.sentence);

                if (the_screen.getShoot()) {
                    console.log("getshoot2");
                    this.nearest_thing.use_it();
                }
                if (this.shoot_power < 0) {
                    this.shoot_power += 1;
                } else {
                    this.shoot_power = 0;
                }
            }
            // shooting
            else {
                    the_screen.setPicture("shoot");
                    the_screen.setText();

                    if (the_screen.getShoot()) // shoot button clicked
                        {
                            this.shoot_power += 1;
                        } else if (this.shoot_power != 0) {
                        this.shoot_power += 1;
                    }
                    if (this.shoot_power >= this.main_gun.first_waiting) {
                        this.shoot_event();
                        this.shoot_power = -this.main_gun.second_waiting;
                    }
                }

            // get orientation
            var nearest_monster_orientation = this.get_nearest_monster_orientation();
            if (this.Object_dl(nearest_monster_orientation) > 1E-6) {
                this.direction_x = nearest_monster_orientation.dx;
                this.direction_y = nearest_monster_orientation.dy;
            } else if (v > 1E-6) {
                this.direction_x = vx;
                this.direction_y = vy;
            }

            var dir = this.getDir(this.direction_x, this.direction_y, this.pre_dir);
            if (dir != this.pre_dir) {
                this.ani.play(0, true, "hero_" + dir);
                this.pre_dir = dir;
            }

            if (this.direction_x >= 0) {
                this.main_gun.scaleX = 1;
                var arg = 90 - Math.atan2(this.direction_x, this.direction_y) / Math.PI * 180;
                this.main_gun.rotation = arg;
            } else {
                this.main_gun.scaleX = -1;
                var _arg = 270 - Math.atan2(this.direction_x, this.direction_y) / Math.PI * 180;
                this.main_gun.rotation = _arg;
            }
            //--------- Shooting and using goods end ---------//
        }
    }, {
        key: "shoot_event",
        value: function shoot_event() {
            this.main_gun.shoot();
            this.shooting_sound();
        }
    }, {
        key: "shooting_sound",
        value: function shooting_sound() {
            Laya.SoundManager.playSound("res/sounds/shooting.mp3", 1, new Laya.Handler(this, this.onComplete));
        }
    }, {
        key: "get_nearest_monster_orientation",
        value: function get_nearest_monster_orientation() {
            var min_distance = 1E6;
            var nearest_monster = null;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Monster_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_monster = _step.value;

                    if (this.get_distance(the_monster) < min_distance) {
                        min_distance = this.get_distance(the_monster);
                        nearest_monster = the_monster;
                    }
                }

                // exist monster
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (nearest_monster !== null) {
                return {
                    dx: nearest_monster.mapX - this.mapX,
                    dy: nearest_monster.mapY - this.mapY
                };
            } else {
                return {
                    dx: 0,
                    dy: 0
                };
            }
        }
    }, {
        key: "checkitem",
        value: function checkitem() {
            var min_distance = 1E6;
            var nearest_thing = null;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Thing_list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var the_thing = _step2.value;

                    if (this.get_distance(the_thing) < min_distance) {
                        min_distance = this.get_distance(the_thing);
                        nearest_thing = the_thing;
                    }
                }

                // exist
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (nearest_thing !== null) {
                this.nearest_thing = nearest_thing;
            } else {
                this.nearest_thing = null;
            }
        }
    }, {
        key: "get_harm",
        value: function get_harm(value) {
            this.armor_count = 0;
            if (this.HP < 1) {
                return;
            }

            if (this.armor >= value) {
                this.armor -= value;
            } else {
                this.armor = 0;
                value -= this.armor;
                this.HP -= value;
            }
        }
    }, {
        key: "dead",
        value: function dead() {
            this.ani.visible = false;
            Laya.stage.removeChild(this.ani);
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
            this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
            this.main_gun.root_reset();
            this.alternate_gun = null;
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":14,"./Monster":15}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bullet2 = require("./Bullet");

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Monster = require("./Monster");

var _Monster2 = _interopRequireDefault(_Monster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero_Bullet = function (_Bullet) {
    _inherits(Hero_Bullet, _Bullet);

    function Hero_Bullet() {
        _classCallCheck(this, Hero_Bullet);

        return _possibleConstructorReturn(this, (Hero_Bullet.__proto__ || Object.getPrototypeOf(Hero_Bullet)).call(this));
    }

    _createClass(Hero_Bullet, [{
        key: "get_attack_list",
        value: function get_attack_list() {
            var attack_list = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Monster_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_monster = _step.value;

                    if (this.attackable(the_monster)) {
                        attack_list.push(the_monster);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return attack_list;
        }
    }, {
        key: "attackable",
        value: function attackable(the_enemy) {}
    }, {
        key: "branch_Hero_or_Monster_reset",
        value: function branch_Hero_or_Monster_reset() {
            var vector_v = this.get_vector_v(this.v_max, the_Hero.direction_x, the_Hero.direction_y);
            this.vx = vector_v.vx;
            this.vy = vector_v.vy;
            this.mapX = the_Hero.mapX;
            this.mapY = the_Hero.mapY;

            this.leaf_reset();
        }
    }]);

    return Hero_Bullet;
}(_Bullet3.default);

exports.default = Hero_Bullet;

},{"./Bullet":3,"./Monster":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hero_Bullet2 = require("./Hero_Bullet");

var _Hero_Bullet3 = _interopRequireDefault(_Hero_Bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero_Bullet_normal = function (_Hero_Bullet) {
    _inherits(Hero_Bullet_normal, _Hero_Bullet);

    function Hero_Bullet_normal(vx, vy) {
        _classCallCheck(this, Hero_Bullet_normal);

        var _this = _possibleConstructorReturn(this, (Hero_Bullet_normal.__proto__ || Object.getPrototypeOf(Hero_Bullet_normal)).call(this));

        _this.v_max = 10;
        _this.Type = "Hero_Bullet_normal";

        _this.r = 20;
        _this.size(_this.r * 2, _this.r * 2);
        _this.graphics.drawCircle(_this.r, _this.r, _this.r, "#FFFF00");
        _this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
        return _this;
    }

    _createClass(Hero_Bullet_normal, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 40;
        }
    }, {
        key: "attack",
        value: function attack(enemy) {
            enemy.get_harm(20);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 50;

            this.rotation = -Math.atan2(the_Hero.direction_x, the_Hero.direction_y) / Math.PI * 180;
            this.filters = [new Laya.GlowFilter("#FFFFFF", 5, 0, 0)];
        }
    }]);

    return Hero_Bullet_normal;
}(_Hero_Bullet3.default);

exports.default = Hero_Bullet_normal;

},{"./Hero_Bullet":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings");

var _Beings3 = _interopRequireDefault(_Beings2);

var _Gate = require("./Gate");

var _Gate2 = _interopRequireDefault(_Gate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster = function (_Beings) {
    _inherits(Monster, _Beings);

    function Monster() {
        _classCallCheck(this, Monster);

        var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this));

        _this.skill_power = 1000;
        _this.skill_cost = 360;

        _this.shooter = true;
        _this.range = 1000;
        return _this;
    }

    _createClass(Monster, [{
        key: "action",
        value: function action() {
            this.direction_x = this.get_hero_orientation().dx;
            this.direction_y = this.get_hero_orientation().dy;

            var dir = this.getDir(this.direction_x, this.direction_y, this.pre_dir);
            if (dir != this.pre_dir) {
                this.ani.play(0, true, this.Type + "_" + dir);
                this.pre_dir = dir;
            }

            this.wandering();

            // shooting control
            if (this.skill_power < 1000) {
                this.skill_power += 1;
            }

            if (this.skill_power >= this.skill_cost) {
                this.skill_power = 0;
                this.skill();
            }
        }
    }, {
        key: "force",
        value: function force(another) {
            var dx = this.mapX - another.mapX;
            var dy = this.mapY - another.mapY;

            var fx = 0;
            var fy = 0;

            if (Math.abs(dx) > 1E-2) {
                fx = 1 / dx;
            }
            if (Math.abs(dy) > 1E-2) {
                fy = 1 / dy;
            }

            return {
                fx: fx,
                fy: fy
            };
        }
    }, {
        key: "wandering",
        value: function wandering() {
            var v = { vx: 0, vy: 0 };
            if (this.shooter) {
                if (this.get_distance(the_Hero) > this.range / 1.5) {
                    v = this.get_vector_v(this.v_max, this.direction_x, this.direction_y);
                } else if (this.get_distance(the_Hero) < this.range / 2) {
                    v = this.get_vector_v(this.v_max, -this.direction_x, -this.direction_y);
                }
            }

            var force_avg = {
                fx: 0,
                fy: 0
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Monster_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_monster = _step.value;

                    if (this !== the_monster) {
                        var f = this.force(the_monster);
                        force_avg.fx += f.fx;
                        force_avg.fy += f.fy;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (Monster_list.length > 1) {
                force_avg.fx /= Monster_list.length - 1;
                force_avg.fy /= Monster_list.length - 1;
            }

            this.move_by_dx_dy(v.vx + force_avg.fx / this.m, v.vy + force_avg.fx / this.m);
        }
    }, {
        key: "dead",
        value: function dead() {
            Monster_list.splice(Monster_list.indexOf(this), 1);
            if (Monster_list.length == 0) {
                var a_gate = Laya.Pool.getItemByClass("Gate", _Gate2.default);
                a_gate.root_reset();
            }
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            Monster_list.push(this);
            this.pre_dir = "right";
            this.ani.play(this.Type + "_right");
            this.leaf_reset();
        }
    }, {
        key: "get_hero_orientation",
        value: function get_hero_orientation() {
            return {
                dx: the_Hero.mapX - this.mapX,
                dy: the_Hero.mapY - this.mapY
            };
        }
    }]);

    return Monster;
}(_Beings3.default);

exports.default = Monster;

},{"./Beings":2,"./Gate":5}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bullet2 = require("./Bullet");

var _Bullet3 = _interopRequireDefault(_Bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster_Bullet = function (_Bullet) {
    _inherits(Monster_Bullet, _Bullet);

    function Monster_Bullet() {
        _classCallCheck(this, Monster_Bullet);

        return _possibleConstructorReturn(this, (Monster_Bullet.__proto__ || Object.getPrototypeOf(Monster_Bullet)).call(this));
    }

    _createClass(Monster_Bullet, [{
        key: "get_attack_list",
        value: function get_attack_list() {
            var attack_list = [];
            if (this.attackable(the_Hero)) {
                attack_list.push(the_Hero);
            }
            return attack_list;
        }
    }, {
        key: "attackable",
        value: function attackable(the_enemy) {}
    }, {
        key: "attack",
        value: function attack(element) {}
    }, {
        key: "branch_Hero_or_Monster_reset",
        value: function branch_Hero_or_Monster_reset() {
            this.leaf_reset();
        }
    }, {
        key: "init",
        value: function init(launcher) {
            var vector_v = this.get_vector_v(this.v_max, launcher.direction_x, launcher.direction_y);
            this.vx = vector_v.vx;
            this.vy = vector_v.vy;
            this.mapX = launcher.mapX;
            this.mapY = launcher.mapY;
        }
    }]);

    return Monster_Bullet;
}(_Bullet3.default);

exports.default = Monster_Bullet;

},{"./Bullet":3}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster_Bullet2 = require("./Monster_Bullet");

var _Monster_Bullet3 = _interopRequireDefault(_Monster_Bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster_Bullet_huge = function (_Monster_Bullet) {
    _inherits(Monster_Bullet_huge, _Monster_Bullet);

    function Monster_Bullet_huge(vx, vy) {
        _classCallCheck(this, Monster_Bullet_huge);

        var _this = _possibleConstructorReturn(this, (Monster_Bullet_huge.__proto__ || Object.getPrototypeOf(Monster_Bullet_huge)).call(this));

        _this.Type = "Monster_Bullet_huge";

        _this.vx = vx;
        _this.vy = vy;
        return _this;
    }

    _createClass(Monster_Bullet_huge, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 40;
        }
    }, {
        key: "attack",
        value: function attack(enemy) {

            enemy.get_harm(20);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 40;
        }
    }]);

    return Monster_Bullet_huge;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_huge;

},{"./Monster_Bullet":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster_Bullet2 = require("./Monster_Bullet");

var _Monster_Bullet3 = _interopRequireDefault(_Monster_Bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster_Bullet_normal = function (_Monster_Bullet) {
    _inherits(Monster_Bullet_normal, _Monster_Bullet);

    function Monster_Bullet_normal(vx, vy) {
        _classCallCheck(this, Monster_Bullet_normal);

        var _this = _possibleConstructorReturn(this, (Monster_Bullet_normal.__proto__ || Object.getPrototypeOf(Monster_Bullet_normal)).call(this));

        _this.Type = "Monster_Bullet_normal";

        _this.vx = vx;
        _this.vy = vy;

        // set picture
        _this.r = 20;
        _this.graphics.drawCircle(0, 0, _this.r, "#FFFF00");
        _this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
        return _this;
    }

    _createClass(Monster_Bullet_normal, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 20;
        }
    }, {
        key: "attack",
        value: function attack(enemy) {
            enemy.get_harm(5);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 40;
        }
    }]);

    return Monster_Bullet_normal;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_normal;

},{"./Monster_Bullet":16}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragPoint = require("./DragPoint");

var _DragPoint2 = _interopRequireDefault(_DragPoint);

var _Wheel = require("./Wheel");

var _Wheel2 = _interopRequireDefault(_Wheel);

var _hero = require("./hero");

var _hero2 = _interopRequireDefault(_hero);

var _Goblin = require("./Goblin");

var _Goblin2 = _interopRequireDefault(_Goblin);

var _Gunner = require("./Gunner");

var _Gunner2 = _interopRequireDefault(_Gunner);

var _Gate = require("./Gate");

var _Gate2 = _interopRequireDefault(_Gate);

var _HPWindow = require("./HPWindow");

var _HPWindow2 = _interopRequireDefault(_HPWindow);

var _God = require("./God");

var _God2 = _interopRequireDefault(_God);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screen = function (_Laya$Sprite) {
	_inherits(Screen, _Laya$Sprite);

	function Screen(w, h) {
		_classCallCheck(this, Screen);

		var _this = _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this));

		var Sprite = Laya.Sprite,
		    Event = Laya.Event;
		_this.width = _this.width;
		_this.height = h;

		Laya.stage.addChild(_this);
		_this.size(w, h);
		_this.pos(0, 0);
		_this.loadMap();

		_this.number = 0;
		_this.difficulty = 1;

		_this.time_count = 0;
		_this.time_interval = 800;

		_this.mapX_max = 1000;
		_this.mapY_max = 1000;
		Laya.Animation.createFrames(_this.getURLs("hero/left", 4), "hero_left");
		Laya.Animation.createFrames(_this.getURLs("hero/right", 4), "hero_right");
		Laya.Animation.createFrames(_this.getURLs("key/base", 4), "key");
		Laya.Animation.createFrames(_this.getURLs("gunner/left", 4), "Gunner_left");
		Laya.Animation.createFrames(_this.getURLs("gunner/right", 4), "Gunner_right");
		return _this;
	}

	_createClass(Screen, [{
		key: "loadMap",
		value: function loadMap() {
			var TiledMap = Laya.TiledMap,
			    Rectangle = Laya.Rectangle,
			    Handler = Laya.Handler,
			    Event = Laya.Event,
			    Browser = Laya.Browser;
			this.tiledMap = new TiledMap();
			this.tiledMap.createMap("res/tiledmaps/start.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
		}
	}, {
		key: "onLoadedMap",
		value: function onLoadedMap() {
			var Event = Laya.Event;
			Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUP);

			this.whl = new _Wheel2.default(this.width / 4, this.height * 3 / 4, this.width / 15, true);
			this.atk = new _Wheel2.default(this.width * 3 / 4, this.height * 3 / 4, this.width / 15);
			this.atk.type = "shoot";
			this.whl.zOrder = 1000;
			this.atk.zOrder = 1001;
			window.the_Hero = Laya.Pool.getItemByClass("Hero", _hero2.default);
			the_Hero.root_reset();

			// init text
			this.dlg = new Laya.Text();
			Laya.stage.addChild(this.dlg);
			this.dlg.pos(0, 0);
			this.dlg.size(200, 100);
			this.dlg.pivot(100, 50);
			this.dlg.fontSize = 20;
			this.dlg.align = "center";
			this.dlg.valign = "middle";
			this.dlg.color = "#000000";
			this.dlg.font = "Impact";
			this.dlg.zOrder = 1000;

			// play music
			laya.media.SoundManager.playMusic("res/sounds/BGM.mp3", 0);

			// run
			this.paused = false;
			Laya.timer.frameLoop(1, this, this.onFrame);

			// start gate
			var gate1 = Laya.Pool.getItemByClass("Gate", _Gate2.default);
			gate1.root_reset();

			var gate2 = Laya.Pool.getItemByClass("Gate", _Gate2.default);
			gate2.root_reset();

			gate2.mapX = 380;
			gate2.mapY = 100;
			gate2.difficulty = 3;

			// the god at home
			var a_god = Laya.Pool.getItemByClass("God", _God2.default);
			a_god.root_reset();

			// 
			this.HPWindow = new _HPWindow2.default();
		}
	}, {
		key: "generate_monster",
		value: function generate_monster(monster_amount) {
			console.log("gene");
			var cur_amount = 0;
			while (cur_amount < monster_amount) {
				var new_monster = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
				new_monster.root_reset();
				cur_amount += 1;
				while (true) {
					var new_x = Math.random() * this.mapX_max;
					var new_y = Math.random() * this.mapY_max;
					if (new_monster.reachable(new_x, new_y)) {
						new_monster.mapX = new_x;
						new_monster.mapY = new_y;
						break;
					}
				}
			}
		}
	}, {
		key: "onFrame",
		value: function onFrame() {
			//console.log("------------------------want start------------------------")
			//console.log(this.paused)
			if (this.paused) {
				console.log("use");
				return;
			}
			//console.log("------------------------real start------------------------")

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

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Monster_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var the_monster = _step.value;

					the_monster.up_date();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Bullet_list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var the_bullet = _step2.value;

					the_bullet.up_date();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = Thing_list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var the_thing = _step3.value;

					the_thing.up_date();
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			the_Hero.up_date();
			the_Hero.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
			this.tiledMap.changeViewPort(the_Hero.mapX - Laya.Browser.clientWidth / 2, the_Hero.mapY - Laya.Browser.clientHeight / 2, Laya.Browser.clientWidth, Laya.Browser.clientHeight);

			this.HPWindow.update();

			//console.log("----------------------------------------------")
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(e) {
			if ((this.whl.x - e.stageX) * (this.whl.x - e.stageX) + (this.whl.y - e.stageY) * (this.whl.y - e.stageY) <= this.whl.r * this.whl.r) {
				this.whl.onStartDrag(e);
			} else if ((this.atk.x - e.stageX) * (this.atk.x - e.stageX) + (this.atk.y - e.stageY) * (this.atk.y - e.stageY) <= this.atk.r * this.atk.r) {
				this.atk.onStartDrag(e);
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp(e) {
			if (this.whl.ID == e.touchId) {
				this.whl.onStopDrag();
			} else if (this.atk.ID == e.touchId) {
				this.atk.onStopDrag();
			}
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(e) {
			if (this.whl.ID == e.touchId) {
				this.whl.moveTo(e.stageX, e.stageY);
			} else if (this.atk.ID == e.touchId) {
				this.atk.moveTo(e.stageX, e.stageY);
			}
		}
	}, {
		key: "getVelosity",
		value: function getVelosity() {
			return {
				x: (this.whl.sp.x - this.whl.x) / this.whl.r,
				y: (this.whl.sp.y - this.whl.y) / this.whl.r
			};
		}
	}, {
		key: "getShoot",
		value: function getShoot() {
			return this.atk.ID !== null;
		}
	}, {
		key: "getPass",
		value: function getPass(mapX, mapY) {
			var a = this.tiledMap.getLayerByIndex(0).getTileData(Math.floor(mapX / 32), Math.floor(mapY / 32));
			if (this.tiledMap._jsonData.tilesets[0].tiles[a - 1] !== undefined) {
				return this.tiledMap._jsonData.tilesets[0].tiles[a - 1].properties[0].value;
			}
			return false;
		}
	}, {
		key: "setPicture",
		value: function setPicture(str) {
			if (str == "shoot" && this.atk.type == "pick") {
				var atk = this.atk;
				atk.type = "shoot";
				atk.graphics.drawCircle(atk.r, atk.r, atk.r, "#FFFF00");
			} else if (str == "pick" && this.atk.type == "shoot") {
				var _atk = this.atk;
				_atk.type = "pick";
				_atk.graphics.drawCircle(_atk.r, _atk.r, _atk.r, "#000000");
			}
		}
	}, {
		key: "setText",
		value: function setText(text, color, x, y, sz) {
			if (text === undefined) text = "";
			if (color === undefined) color = "#FFFFFF";
			if (x == undefined || y === undefined) {
				x = Laya.Browser.clientWidth / 2;
				y = Laya.Browser.clientHeight / 2;
			}
			if (sz === undefined) sz = 20;
			this.dlg.changeText(text);
			this.dlg.color = color;
			this.dlg.pos(x, y);
			this.dlg.fontSize = sz;
			this.dlg.alpha = 1;
			//Laya.Tween.to(this.dlg,{alpha:0,y:this.dlg.y-100,fontSize:this.dlg.fontSize*2},1000)
		}
	}, {
		key: "map_change",
		value: function map_change() {
			console.log("pause set true");
			this.paused = true;
			var number = this.number;
			this.number += 1;

			var bg = Math.floor(number / 15);
			var idx = number % 2;
			var TiledMap = Laya.TiledMap,
			    Rectangle = Laya.Rectangle,
			    Handler = Laya.Handler,
			    Event = Laya.Event,
			    Browser = Laya.Browser;

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = Monster_list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var the_monster = _step4.value;

					the_monster.HP = -1;
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = Bullet_list[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var the_bullet = _step5.value;

					the_bullet.HP = -1;
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = Thing_list[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var the_thing = _step6.value;

					the_thing.HP = -1;
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}

			this.tiledMap.destroy();
			this.tiledMap.createMap("res/tiledmaps/" + bg + idx + ".json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap2));
		}
	}, {
		key: "onLoadedMap2",
		value: function onLoadedMap2() {
			the_Hero.mapX = 100;
			the_Hero.mapY = 100;

			the_Hero.root_reset();
			this.atk.type = "shoot";
			this.tiledMap.changeViewPort(0, 0, Laya.Browser.clientWidth, Laya.Browser.clientHeight);
			this.generate_monster(this.number * this.difficulty);

			this.paused = false;
		}
	}, {
		key: "getURLs",
		value: function getURLs(str, n) {
			var urls = [];
			for (var i = 0; i < n; i += 1) {
				urls.push("res/atlas/" + str + i + ".png");
			}
			return urls;
		}
	}]);

	return Screen;
}(Laya.Sprite //screen
);

exports.default = Screen;

},{"./DragPoint":4,"./Gate":5,"./Goblin":6,"./God":7,"./Gunner":10,"./HPWindow":11,"./Wheel":21,"./hero":22}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings");

var _Beings3 = _interopRequireDefault(_Beings2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thing = function (_Beings) {
    _inherits(Thing, _Beings);

    function Thing() {
        _classCallCheck(this, Thing);

        var _this = _possibleConstructorReturn(this, (Thing.__proto__ || Object.getPrototypeOf(Thing)).call(this));

        _this.sentence = "还没有设置句子！";
        return _this;
    }

    _createClass(Thing, [{
        key: "dead",
        value: function dead() {
            Thing_list.splice(Thing_list.indexOf(this), 1);
            console.log("splice thing");
        }
    }, {
        key: "use_it",
        value: function use_it() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            Thing_list.push(this);
            this.HP = 1;
            this.leaf_reset();
        }
    }]);

    return Thing;
}(_Beings3.default);

exports.default = Thing;

},{"./Beings":2}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragPoint = require("./DragPoint");

var _DragPoint2 = _interopRequireDefault(_DragPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wheel = function (_Laya$Sprite) {
	_inherits(Wheel, _Laya$Sprite);

	function Wheel(x, y, r, hasSp) {
		_classCallCheck(this, Wheel);

		var _this = _possibleConstructorReturn(this, (Wheel.__proto__ || Object.getPrototypeOf(Wheel)).call(this));

		var Sprite = Laya.Sprite,
		    Event = Laya.Event;
		Laya.stage.addChild(_this);

		_this.size(2 * r, 2 * r);
		_this.pivot(r, r);
		_this.graphics.drawCircle(r, r, r, "#FFFFFF");
		_this.pos(x, y);
		_this.r = r;
		_this.ID = null;
		_this.alpha = 0.4;
		_this.mouseThrough = true;
		_this.hasSp = hasSp;
		if (_this.hasSp) _this.sp = new _DragPoint2.default(_this.x, _this.y, _this.r / 5);
		return _this;
	}

	_createClass(Wheel, [{
		key: "onStartDrag",
		value: function onStartDrag(e) {
			this.ID = e.touchId;
			this.moveTo(e.stageX, e.stageY);
		}
	}, {
		key: "onStopDrag",
		value: function onStopDrag() {
			this.ID = null;
			if (this.hasSp) this.sp.pos(this.x, this.y);
		}
	}, {
		key: "moveTo",
		value: function moveTo(x, y) {
			if (this.hasSp) {
				var dx = x - this.x;
				var dy = y - this.y;

				var R = Math.sqrt(dx * dx + dy * dy);
				var dx2 = R > this.r ? dx * this.r / R : dx;
				var dy2 = R > this.r ? dy * this.r / R : dy;
				this.sp.pos(this.x + dx2, this.y + dy2);
			}
		}
	}]);

	return Wheel;
}(Laya.Sprite);

exports.default = Wheel;

},{"./DragPoint":4}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings2 = require("./Beings");

var _Beings3 = _interopRequireDefault(_Beings2);

var _Bullet = require("./Bullet");

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Monster = require("./Monster");

var _Monster2 = _interopRequireDefault(_Monster);

var _Hero_Bullet_normal = require("./Hero_Bullet_normal");

var _Hero_Bullet_normal2 = _interopRequireDefault(_Hero_Bullet_normal);

var _Gun_normal = require("./Gun_normal");

var _Gun_normal2 = _interopRequireDefault(_Gun_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Beings) {
    _inherits(Hero, _Beings);

    function Hero() {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.Type = "Hero";
        // move
        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 20;
        _this.HP = 20;
        _this.armor_max = 20;
        _this.armor = 20;
        _this.armor_count = 0;

        // shoot
        _this.shoot_power = 0;

        // 
        _this.size(32, 48);
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        _this.nearest_thing = null;
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // repair armor
            if (this.armor < this.armor_max) {
                if (this.armor_count >= 60) {
                    this.armor += 1;
                    this.armor_count = 0;
                } else {
                    this.armor_count += 1;
                }
            }

            //--------- movement control part ---------//
            var vx = the_screen.getVelosity().x;
            var vy = the_screen.getVelosity().y;
            var v = this.dl(vx, vy);
            this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);
            //--------- movement control part end ---------//

            //--------- Shooting and using goods ---------//

            // get nearest_thing
            this.checkitem();

            // using goods
            if (the_screen.getShoot()) console.log("getshoot1");
            if (this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50) {
                the_screen.setPicture("pick");
                the_screen.setText(this.nearest_thing.sentence);

                if (the_screen.getShoot()) {
                    console.log("getshoot2");
                    this.nearest_thing.use_it();
                }
                if (this.shoot_power < 0) {
                    this.shoot_power += 1;
                } else {
                    this.shoot_power = 0;
                }
            }
            // shooting
            else {
                    the_screen.setPicture("shoot");
                    the_screen.setText();

                    if (the_screen.getShoot()) // shoot button clicked
                        {
                            this.shoot_power += 1;
                        } else if (this.shoot_power != 0) {
                        this.shoot_power += 1;
                    }
                    if (this.shoot_power >= this.main_gun.first_waiting) {
                        this.shoot_event();
                        this.shoot_power = -this.main_gun.second_waiting;
                    }
                }

            // get orientation
            var nearest_monster_orientation = this.get_nearest_monster_orientation();
            if (this.Object_dl(nearest_monster_orientation) > 1E-6) {
                this.direction_x = nearest_monster_orientation.dx;
                this.direction_y = nearest_monster_orientation.dy;
            } else if (v > 1E-6) {
                this.direction_x = vx;
                this.direction_y = vy;
            }

            var dir = this.getDir(this.direction_x, this.direction_y, this.pre_dir);
            if (dir != this.pre_dir) {
                this.ani.play(0, true, "hero_" + dir);
                this.pre_dir = dir;
            }

            if (this.direction_x >= 0) {
                this.main_gun.scaleX = 1;
                var arg = 90 - Math.atan2(this.direction_x, this.direction_y) / Math.PI * 180;
                this.main_gun.rotation = arg;
            } else {
                this.main_gun.scaleX = -1;
                var _arg = 270 - Math.atan2(this.direction_x, this.direction_y) / Math.PI * 180;
                this.main_gun.rotation = _arg;
            }
            //--------- Shooting and using goods end ---------//
        }
    }, {
        key: "shoot_event",
        value: function shoot_event() {
            this.main_gun.shoot();
            this.shooting_sound();
        }
    }, {
        key: "shooting_sound",
        value: function shooting_sound() {
            Laya.SoundManager.playSound("res/sounds/shooting.mp3", 1, new Laya.Handler(this, this.onComplete));
        }
    }, {
        key: "get_nearest_monster_orientation",
        value: function get_nearest_monster_orientation() {
            var min_distance = 1E6;
            var nearest_monster = null;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Monster_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_monster = _step.value;

                    if (this.get_distance(the_monster) < min_distance) {
                        min_distance = this.get_distance(the_monster);
                        nearest_monster = the_monster;
                    }
                }

                // exist monster
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (nearest_monster !== null) {
                return {
                    dx: nearest_monster.mapX - this.mapX,
                    dy: nearest_monster.mapY - this.mapY
                };
            } else {
                return {
                    dx: 0,
                    dy: 0
                };
            }
        }
    }, {
        key: "checkitem",
        value: function checkitem() {
            var min_distance = 1E6;
            var nearest_thing = null;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Thing_list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var the_thing = _step2.value;

                    if (this.get_distance(the_thing) < min_distance) {
                        min_distance = this.get_distance(the_thing);
                        nearest_thing = the_thing;
                    }
                }

                // exist
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (nearest_thing !== null) {
                this.nearest_thing = nearest_thing;
            } else {
                this.nearest_thing = null;
            }
        }
    }, {
        key: "get_harm",
        value: function get_harm(value) {
            this.armor_count = 0;
            if (this.HP < 1) {
                return;
            }

            if (this.armor >= value) {
                this.armor -= value;
            } else {
                this.armor = 0;
                value -= this.armor;
                this.HP -= value;
            }
        }
    }, {
        key: "dead",
        value: function dead() {
            this.ani.visible = false;
            Laya.stage.removeChild(this.ani);
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
            this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
            this.main_gun.root_reset();
            this.alternate_gun = null;
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":14,"./Monster":15}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9Hb2QuanMiLCJzcmMvc2NyaXB0L0d1bi5qcyIsInNyYy9zY3JpcHQvR3VuX25vcm1hbC5qcyIsInNyYy9zY3JpcHQvR3VubmVyLmpzIiwic3JjL3NjcmlwdC9IUFdpbmRvdy5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9UaGluZy5qcyIsInNyYy9zY3JpcHQvV2hlZWwuanMiLCJzcmMvc2NyaXB0L2hlcm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBaEJDO0FBa0JELElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElB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YixFQUFlO0FBQ1g7QUFDSDs7QUFFRCxnQkFBRyxLQUFLLEtBQUwsSUFBYyxLQUFqQixFQUF1QjtBQUNuQixxQkFBSyxLQUFMLElBQWMsS0FBZDtBQUNILGFBRkQsTUFHSTtBQUNBLHFCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EseUJBQVMsS0FBSyxLQUFkO0FBQ0EscUJBQUssRUFBTCxJQUFXLEtBQVg7QUFDSDtBQUNKOzs7K0JBRUs7QUFDRixpQkFBSyxHQUFMLENBQVMsT0FBVCxHQUFpQixLQUFqQjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQUssR0FBNUI7QUFDSDs7O3VDQUVhO0FBQ1YsaUJBQUssRUFBTCxHQUFVLEtBQUssTUFBZjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxLQUFLLFNBQWxCO0FBQ0EsaUJBQUssUUFBTCxHQUFnQixJQUFJLEtBQUssSUFBTCxDQUFVLGNBQWQsQ0FBNkIsWUFBN0IsRUFBMkMsb0JBQTNDLENBQWhCO0FBQ0EsaUJBQUssUUFBTCxDQUFjLFVBQWQ7QUFDQSxpQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsaUJBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxDQUFkLEVBQWdCLElBQWhCLEVBQXFCLFlBQXJCO0FBQ0EsaUJBQUssT0FBTCxHQUFhLE9BQWI7QUFDSDs7OztFQXpNNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XHJcbmltcG9ydCBCZWluZ3MgZnJvbSBcIi4vc2NyaXB0L0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0J1bGxldFwiXHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJcIlxyXG5pbXBvcnQgVGhpbmcgZnJvbSBcIi4vc2NyaXB0L1RoaW5nXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRcIlxyXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9zY3JpcHQvR2F0ZVwiXHJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXHJcbmltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vc2NyaXB0L0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxyXG5cclxuLy8g5omp5YWF55qE57G7XHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9zY3JpcHQvR29ibGluXCJcclxuXHJcbmNvbnN0XHJcblx0QnJvd3NlciA9IExheWEuQnJvd3NlcixcclxuXHRXZWJHTCA9IExheWEuV2ViR0wsXHJcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxyXG5cdFN0YXQgPSBMYXlhLlN0YXQsXHJcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuXHJcbi8v5Yid5aeL5YyW5byV5pOOXHJcbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuLy/mqKrlsY/muLjmiI9cclxuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG4vL+etieavlOS+i+e8qeaUvlxyXG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XHJcblxyXG4vL+iDjOaZr+minOiJslxyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcclxuXHJcbi8vIOinkuiJsuWuueWZqFxyXG53aW5kb3cuTW9uc3Rlcl9saXN0ID0gW107XHJcbndpbmRvdy5CdWxsZXRfbGlzdCA9IFtdO1xyXG53aW5kb3cuV2FsbF9saXN0ID0gW107XHJcbndpbmRvdy5UaGluZ19saXN0ID0gW107XHJcblxyXG4vLyBzZXQgdGhlIFNjcmVlblxyXG5sZXQgdyA9IEJyb3dzZXIuY2xpZW50V2lkdGg7XHJcbmxldCBoID0gQnJvd3Nlci5jbGllbnRIZWlnaHQ7XHJcblxyXG5MYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcblxyXG5TdGF0LnNob3coKTtcclxuXHJcbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudFxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJvb3RfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8yKVxyXG4gICAgICAgIHRoaXMuek9yZGVyPTA7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJyYW5jaF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwX2RhdGUoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLm1hcFggLSB0aGVfSGVyby5tYXBYICsgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzI7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5tYXBZIC0gdGhlX0hlcm8ubWFwWSArIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMjtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhZF9hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZF9hY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuYW5pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSlcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5UeXBlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmRlYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkbChkeCwgZHkpe1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICpkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0X2RsKHRoZV9vYmplY3Qpe1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhlX29iamVjdC5keCAqIHRoZV9vYmplY3QuZHggKyB0aGVfb2JqZWN0LmR5ICogdGhlX29iamVjdC5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2Rpc3RhbmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGwoZHgsIGR5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfdmVjdG9yX3Yodl9tYXgsIHRoZV92eCwgdGhlX3Z5KXtcclxuICAgICAgICBsZXQgdGhlX3YgPSB0aGlzLmRsKHRoZV92eCwgdGhlX3Z5KTtcclxuICAgICAgICBpZih0aGVfdiA+IDFFLTYgJiYgdl9tYXggPiAxRS02KXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdng6IHRoZV92eCAqIHZfbWF4L3RoZV92LFxyXG4gICAgICAgICAgICAgICAgdnk6IHRoZV92eSAqIHZfbWF4L3RoZV92XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgdng6IDAsXHJcbiAgICAgICAgICAgICAgICB2eTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVSTHMoc3RyLG4pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHVybHM9W107XHJcbiAgICAgICAgZm9yKHZhciBpID0wO2k8bjtpKz0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXJscy5wdXNoKFwicmVzL2F0bGFzL1wiK3N0citpK1wiLnBuZ1wiKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJscztcclxuICAgIH1cclxuICAgIGdldERpcihkeCxkeSxsYXN0KXtcclxuICAgICAgICBpZihkeD4wKXJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgaWYoLWR4PjApcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWNoYWJsZShuZXdfbWFwWCwgbmV3X21hcFkpe1xyXG4gICAgICAgIGxldCBwb2ludF9zZXQgPSBbXTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFgsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWX0pO1xyXG5cclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IHRoZV9wb2ludCBvZiBwb2ludF9zZXQpe1xyXG4gICAgICAgICAgICBvayAmPSB0aGVfc2NyZWVuLmdldFBhc3ModGhlX3BvaW50LngsIHRoZV9wb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVfYnlfZHhfZHkoZHgsIGR5KXtcclxuICAgICAgICBpZihkeCA+IDMwKXtcclxuICAgICAgICAgICAgZHggPSAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZHkgPiAzMCl7XHJcbiAgICAgICAgICAgIGR5ID0gMzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCwgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWCArPSBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCAvIDIsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHggLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSAvIDIpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgd2hpbGUoTWF0aC5hYnMoZHgpID4gMC4zIHx8IE1hdGguYWJzKGR5KSA+IDAuMyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uXCIpXHJcbiAgICAgICAgICAgIC8vIHRyeTogbW92ZSB4XHJcbiAgICAgICAgICAgIGlmKGR4ID4gMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIDAuMywgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWCArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZHggPCAtMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCAtIDAuMywgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWCAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdHJ5OiBtb3ZlIHlcclxuICAgICAgICAgICAgaWYoZHkgPiAwLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyAwLjMpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeSAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBZICs9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkeSA8IC0wLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgLSAwLjMpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeSArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBZIC09IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gMTtcclxuICAgICAgICB0aGlzLnZ5ID0gMTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHdpbGxfZGllID0gdGhpcy5oaXRfd2FsbCh0aGlzLnZ4LCB0aGlzLnZ5KTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh0aGlzLnZ4LCB0aGlzLnZ5KVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih3aWxsX2RpZSl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgZWxlbWVudHMgdG8gYmUgYXR0YWNrXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xyXG4gICAgICAgIC8vIGV4cGxvc2lvbiAhXHJcbiAgICAgICAgaWYoYXR0YWNrX2xpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGF0dGFja19saXN0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbGVtZW50KXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBoaXRfd2FsbChkeCwgZHkpe1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSArIGR5KTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnUG9pbnQgZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9ubyBldmVudHNcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcclxuICAgICAgICB0aGlzLmFscGhhPTAuMjtcclxuXHRcdHRoaXMucj1yO1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgVGhpbmcgZnJvbSBcIi4vVGhpbmdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZSBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR2F0ZVwiXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5Y675b6A5LiL5LiA5bGCXCI7XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gMTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMucGl2b3QoMTYsMTYpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuXHJcblxyXG4gICAgICAgIC8qdGhpcy5yPTE1O1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy5yLHRoaXMucilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLHRoaXMucix0aGlzLnIsXCIjOTlGRkFBXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycz1bbmV3IExheWEuR2xvd0ZpbHRlcihcIkZGQkIwMFwiLDIwLDAsMCksbmV3IExheWEuR2xvd0ZpbHRlcihcIjAwQkJGRlwiLDUsMCwwKV07Ki9cclxuICAgIH1cclxuXHJcbiAgICB1c2VfaXQoKXtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5IUD0tMVxyXG5cclxuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXHJcbiAgICAgICAgaWYodGhlX3NjcmVlbi5kaWZmaWN1bHR5IDwgdGhpcy5kaWZmaWN1bHR5KXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5kaWZmaWN1bHR5ID0gdGhpcy5kaWZmaWN1bHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGVfc2NyZWVuLm1hcF9jaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5tYXBYPTEwMDtcclxuICAgICAgICB0aGlzLm1hcFk9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwia2V5XCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDAwO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvZCBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29kXCJcclxuXHJcbiAgICAgICAgdGhpcy5tYXBYID0gMjAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDIwMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5YaS6Zmp5a6277yM5L2g6ZyA6KaB5oyH5byV5ZCX77yfXCI7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImdvZC9kb3duXCIsMyksXCJnb2RfZG93blwiKTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuivt+mAieaLqeS4gOaJh+mXqO+8jOW3pui+ueaYr+WkqeWggu+8jOWPs+i+ueaYr+WcsOeLsVwiXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5UeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvZCBkaWVcIilcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKFRoaW5nX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiZ29kX2Rvd25cIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW4gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMTA7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3QoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0aGlzLmJ1bGxldF90eXBlLCB0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnJhbmNoX3Jlc2V0IVwiKVxyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5fbm9ybWFsIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VuX25vcm1hbFwiXHJcblxyXG5cclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAyO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAxMDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcInJlcy9ndW5zL2d1bjAucG5nXCIpXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNpemUoNjQsMzIpO1xyXG4gICAgICAgIHRoaXMudz02NDtcclxuICAgICAgICB0aGlzLmg9MzI7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5waXZvdCg4LDE2KTtcclxuICAgICAgICB0aGlzLnZpc2libGU9dHJ1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VubmVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bm5lclwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gMTAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTAwO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMCAqIDQwO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIiwgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZyBuZXdcIilcclxuICAgICAgICB0aGlzLkhQID0gMTAwO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhQV2luZG93IGV4dGVuZHMgTGF5YS5TcHJpdGUgXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5IUD0wO1xyXG4gICAgICAgIHRoaXMuYXJtb3I9MDtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnpPcmRlcj0xMDAwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSgyMDAsMTIwKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5IUCE9dGhlX0hlcm8uSFB8fHRoaXMuYXJtb3IhPXRoZV9IZXJvLmFybW9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgVGV4dD1MYXlhLlRleHRcclxuICAgICAgICAgICAgdGhpcy5IUD10aGVfSGVyby5IUDtcclxuICAgICAgICAgICAgdGhpcy5hcm1vcj10aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgbGV0IGxlbl9IUD0oMTY3LTc4KS90aGVfSGVyby5IUF9tYXgqdGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsMzAsMTY3LTc4LDE3LFwiIzU1NTU1NVwiKSAgIC8vNzgsMzIgIC0tLTE2Nyw0N1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLGxlbl9IUCwxNyxcIiNGRkZGMDBcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuXHJcbiAgICAgICAgICAgIGxldCBsZW5fYXJtb3I9KDE2Ny03OCkvdGhlX0hlcm8uYXJtb3JfbWF4KnRoZV9IZXJvLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDc5LDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSxsZW5fYXJtb3IsMTcsXCIjRkZGRjAwXCIpICAgLy83OCw3OCAgLS0tMTY3LDkzXHJcbiAgICAgICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL0hQV2luZG93L0hQV2luZG93LnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb1wiO1xyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSAyMDtcclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAyMDtcclxuICAgICAgICB0aGlzLmFybW9yID0gMjA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpY29uc29sZS5sb2coXCJnZXRzaG9vdDFcIilcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRzaG9vdDJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5zaXplKHRoaXMucioyLHRoaXMucioyKVxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSh0aGlzLnIsIHRoaXMuciwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDQwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA1MDtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbj0tTWF0aC5hdGFuMih0aGVfSGVyby5kaXJlY3Rpb25feCx0aGVfSGVyby5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDUsIDAsIDApXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvb3RlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR5O1xyXG5cclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsdGhpcy5UeXBlK1wiX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndhbmRlcmluZygpO1xyXG5cclxuICAgICAgICAvLyBzaG9vdGluZyBjb250cm9sXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyID49IHRoaXMuc2tpbGxfY29zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZnggPSAwO1xyXG4gICAgICAgIGxldCBmeSA9IDA7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeCA9IDEgLyBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZHkpID4gMUUtMil7XHJcbiAgICAgICAgICAgIGZ5ID0gMSAvIGR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZng6IGZ4LCBcclxuICAgICAgICAgICAgZnk6IGZ5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB3YW5kZXJpbmcoKXtcclxuICAgICAgICBsZXQgdiA9IHt2eDogMCwgdnk6IDB9O1xyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA+IHRoaXMucmFuZ2UgLyAxLjUpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoaXMuZGlyZWN0aW9uX3gsIHRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA8IHRoaXMucmFuZ2UgLyAyKXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCAtdGhpcy5kaXJlY3Rpb25feCwgLXRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9yY2VfYXZnID0ge1xyXG4gICAgICAgICAgICBmeDogMCxcclxuICAgICAgICAgICAgZnk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcyAhPT0gdGhlX21vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGYgPSB0aGlzLmZvcmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meCArPSBmLmZ4O1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ5ICs9IGYuZnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ4IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meSAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHYudnggKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0sIHYudnkgKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgICAgaWYoTW9uc3Rlcl9saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGFfZ2F0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcbiAgICAgICAgICAgIGFfZ2F0ZS5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5wdXNoKHRoaXMpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkodGhpcy5UeXBlK1wiX3JpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hlcm9fb3JpZW50YXRpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkeDogdGhlX0hlcm8ubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgZHk6IHRoZV9IZXJvLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcclxuICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX0hlcm8pKXtcclxuICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfSGVybyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGF0dGFjayhlbGVtZW50KXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChsYXVuY2hlcil7XHJcbiAgICAgICAgbGV0IHZlY3Rvcl92ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgbGF1bmNoZXIuZGlyZWN0aW9uX3gsIGxhdW5jaGVyLmRpcmVjdGlvbl95KTtcclxuICAgICAgICB0aGlzLnZ4ID0gdmVjdG9yX3Yudng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IGxhdW5jaGVyLm1hcFg7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gbGF1bmNoZXIubWFwWTtcclxuICAgIH1cclxufSIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9odWdlIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9odWdlXCI7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KXtcclxuICAgICAgICBcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiI0ZGRkYwMFwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oNSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9XaGVlbFwiXHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL2hlcm9cIlxyXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL0dvYmxpblwiXHJcbmltcG9ydCBHdW5uZXIgZnJvbSBcIi4vR3VubmVyXCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vR2F0ZVwiXHJcbmltcG9ydCBIUFdpbmRvdyBmcm9tIFwiLi9IUFdpbmRvd1wiXHJcbmltcG9ydCBHb2QgZnJvbSBcIi4vR29kXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxyXG57XHJcblx0Y29uc3RydWN0b3IodywgaCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHR0aGlzLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaDtcclxuXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0dGhpcy5zaXplKHcsIGgpO1xyXG5cdFx0dGhpcy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmxvYWRNYXAoKTtcclxuXHJcblx0XHR0aGlzLm51bWJlciA9IDA7XHJcblx0XHR0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG5cclxuXHRcdHRoaXMudGltZV9jb3VudCA9IDA7XHJcblx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgPSA4MDA7XHJcblxyXG5cdFx0dGhpcy5tYXBYX21heCA9IDEwMDA7XHJcblx0XHR0aGlzLm1hcFlfbWF4ID0gMTAwMDtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL2xlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL3JpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImtleS9iYXNlXCIsNCksXCJrZXlcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiZ3VubmVyL2xlZnRcIiw0KSxcIkd1bm5lcl9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9yaWdodFwiLDQpLFwiR3VubmVyX3JpZ2h0XCIpO1xyXG5cdH1cclxuXHJcblx0bG9hZE1hcCgpIHtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFRpbGVkTWFwID0gTGF5YS5UaWxlZE1hcCxcclxuXHRcdFx0UmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGUsXHJcblx0XHRcdEhhbmRsZXIgPSBMYXlhLkhhbmRsZXIsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudCxcclxuXHRcdFx0QnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuXHRcdHRoaXMudGlsZWRNYXAgPSBuZXcgVGlsZWRNYXAoKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzL3RpbGVkbWFwcy9zdGFydC5qc29uXCIsIG5ldyBSZWN0YW5nbGUoMCwgMCwgQnJvd3Nlci53aWR0aCwgQnJvd3Nlci5oZWlnaHQpLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZGVkTWFwKSk7XHJcblx0fVxyXG5cclxuXHRvbkxvYWRlZE1hcCgpIHtcclxuXHRcdGNvbnN0IEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSwgdGhpcywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMub25Nb3VzZURvd24pO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9PVVQsIHRoaXMsIHRoaXMub25Nb3VzZVVQKTtcclxuXHJcblx0XHR0aGlzLndobCA9IG5ldyBXaGVlbCh0aGlzLndpZHRoIC8gNCwgdGhpcy5oZWlnaHQgKiAzIC8gNCwgdGhpcy53aWR0aCAvIDE1LCB0cnVlKTtcclxuXHRcdHRoaXMuYXRrID0gbmV3IFdoZWVsKHRoaXMud2lkdGggKiAzIC8gNCwgdGhpcy5oZWlnaHQgKiAzIC8gNCwgdGhpcy53aWR0aCAvIDE1KTtcclxuXHRcdHRoaXMuYXRrLnR5cGUgPSBcInNob290XCI7XHJcblx0XHR0aGlzLndobC56T3JkZXIgPSAxMDAwO1xyXG5cdFx0dGhpcy5hdGsuek9yZGVyID0gMTAwMTtcclxuXHRcdHdpbmRvdy50aGVfSGVybyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkhlcm9cIiwgSGVybyk7XHJcblx0XHR0aGVfSGVyby5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0Ly8gaW5pdCB0ZXh0XHJcblx0XHR0aGlzLmRsZyA9IG5ldyBMYXlhLlRleHQoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kbGcpO1xyXG5cdFx0dGhpcy5kbGcucG9zKDAsIDApO1xyXG5cdFx0dGhpcy5kbGcuc2l6ZSgyMDAsIDEwMCk7XHJcblx0XHR0aGlzLmRsZy5waXZvdCgxMDAsIDUwKTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gMjA7XHJcblx0XHR0aGlzLmRsZy5hbGlnbiA9IFwiY2VudGVyXCJcclxuXHRcdHRoaXMuZGxnLnZhbGlnbiA9IFwibWlkZGxlXCJcclxuXHRcdHRoaXMuZGxnLmNvbG9yID0gXCIjMDAwMDAwXCJcclxuXHRcdHRoaXMuZGxnLmZvbnQgPSBcIkltcGFjdFwiO1xyXG5cdFx0dGhpcy5kbGcuek9yZGVyID0gMTAwMDtcclxuXHJcblx0XHQvLyBwbGF5IG11c2ljXHJcblx0XHRsYXlhLm1lZGlhLlNvdW5kTWFuYWdlci5wbGF5TXVzaWMoXCJyZXMvc291bmRzL0JHTS5tcDNcIiwgMCk7XHJcblxyXG5cdFx0Ly8gcnVuXHJcblx0XHR0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkZyYW1lKTtcclxuXHJcblx0XHQvLyBzdGFydCBnYXRlXHJcblx0XHRsZXQgZ2F0ZTEgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG5cdFx0Z2F0ZTEucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdGxldCBnYXRlMiA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcblx0XHRnYXRlMi5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0Z2F0ZTIubWFwWCA9IDM4MDtcclxuXHRcdGdhdGUyLm1hcFkgPSAxMDA7XHJcblx0XHRnYXRlMi5kaWZmaWN1bHR5ID0gMztcclxuXHJcblx0XHQvLyB0aGUgZ29kIGF0IGhvbWVcclxuXHRcdGxldCBhX2dvZCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdvZFwiLCBHb2QpO1xyXG5cdFx0YV9nb2Qucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdC8vIFxyXG5cdFx0dGhpcy5IUFdpbmRvdyA9IG5ldyBIUFdpbmRvdygpXHJcblx0fVx0XHJcblxyXG5cdGdlbmVyYXRlX21vbnN0ZXIobW9uc3Rlcl9hbW91bnQpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiZ2VuZVwiKVxyXG5cdFx0bGV0IGN1cl9hbW91bnQgPSAwO1xyXG5cdFx0d2hpbGUoY3VyX2Ftb3VudCA8IG1vbnN0ZXJfYW1vdW50KXtcclxuXHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR3VubmVyXCIsIEd1bm5lcik7XHJcblx0XHRcdG5ld19tb25zdGVyLnJvb3RfcmVzZXQoKTtcclxuXHRcdFx0Y3VyX2Ftb3VudCArPSAxO1xyXG5cdFx0XHR3aGlsZSh0cnVlKXtcclxuXHRcdFx0XHRsZXQgbmV3X3ggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXBYX21heDtcclxuXHRcdFx0XHRsZXQgbmV3X3kgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXBZX21heDtcclxuXHRcdFx0XHRpZihuZXdfbW9uc3Rlci5yZWFjaGFibGUobmV3X3gsIG5ld195KSl7XHJcblx0XHRcdFx0XHRuZXdfbW9uc3Rlci5tYXBYID0gbmV3X3g7XHJcblx0XHRcdFx0XHRuZXdfbW9uc3Rlci5tYXBZID0gbmV3X3k7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRnJhbWUoKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0td2FudCBzdGFydC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnBhdXNlZClcclxuXHRcdGlmKHRoaXMucGF1c2VkKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJ1c2VcIilcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXJlYWwgc3RhcnQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcclxuXHJcblx0XHQvLyDml6DlsL3mqKHlvI9cclxuXHRcdC8qXHJcblx0XHRpZiAodGhpcy50aW1lX2NvdW50ICUgdGhpcy50aW1lX2ludGVydmFsID09IDApIHtcclxuXHRcdFx0dGhpcy5nZW5lcmF0ZV9tb25zdGVyKCk7XHJcblx0XHRcdGlmICh0aGlzLnRpbWVfaW50ZXJ2YWwgPiAyMCkge1xyXG5cdFx0XHRcdHRoaXMudGltZV9pbnRlcnZhbCAtPSAyMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy50aW1lX2NvdW50ICs9IDE7XHJcblx0XHQqL1xyXG5cclxuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xyXG5cdFx0XHR0aGVfbW9uc3Rlci51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XHJcblx0XHRcdHRoZV9idWxsZXQudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcclxuXHRcdFx0dGhlX3RoaW5nLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XHJcblx0XHR0aGVfSGVyby5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDIpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYIC0gTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgdGhlX0hlcm8ubWFwWSAtIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblxyXG5cdFx0dGhpcy5IUFdpbmRvdy51cGRhdGUoKVxyXG5cclxuXHRcdC8vY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpXHJcblx0fVxyXG5cclxuXHRvbk1vdXNlRG93bihlKSB7XHJcblx0XHRpZiAoKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKiAodGhpcy53aGwueCAtIGUuc3RhZ2VYKSArICh0aGlzLndobC55IC0gZS5zdGFnZVkpICogKHRoaXMud2hsLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy53aGwuciAqIHRoaXMud2hsLnIpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmF0ay54IC0gZS5zdGFnZVgpICsgKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5hdGsueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmF0ay5yICogdGhpcy5hdGsucikge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VVcChlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbk1vdXNlTW92ZShlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm1vdmVUbyhlLnN0YWdlWCwgZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5hdGsuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuYXRrLm1vdmVUbyhlLnN0YWdlWCwgZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0VmVsb3NpdHkoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiAodGhpcy53aGwuc3AueCAtIHRoaXMud2hsLngpIC8gdGhpcy53aGwucixcclxuXHRcdFx0eTogKHRoaXMud2hsLnNwLnkgLSB0aGlzLndobC55KSAvIHRoaXMud2hsLnJcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRnZXRTaG9vdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0ay5JRCAhPT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldFBhc3MobWFwWCwgbWFwWSkge1xyXG5cdFx0Y29uc3QgYSA9IHRoaXMudGlsZWRNYXAuZ2V0TGF5ZXJCeUluZGV4KDApLmdldFRpbGVEYXRhKE1hdGguZmxvb3IobWFwWCAvIDMyKSwgTWF0aC5mbG9vcihtYXBZIC8gMzIpKTtcclxuXHRcdGlmICh0aGlzLnRpbGVkTWFwLl9qc29uRGF0YS50aWxlc2V0c1swXS50aWxlc1thIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdLnByb3BlcnRpZXNbMF0udmFsdWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHNldFBpY3R1cmUoc3RyKSB7XHJcblx0XHRpZiAoc3RyID09IFwic2hvb3RcIiAmJiB0aGlzLmF0ay50eXBlID09IFwicGlja1wiKSB7XHJcblx0XHRcdGNvbnN0IGF0ayA9IHRoaXMuYXRrO1xyXG5cdFx0XHRhdGsudHlwZSA9IFwic2hvb3RcIlxyXG5cdFx0XHRhdGsuZ3JhcGhpY3MuZHJhd0NpcmNsZShhdGsuciwgYXRrLnIsIGF0ay5yLCBcIiNGRkZGMDBcIik7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzdHIgPT0gXCJwaWNrXCIgJiYgdGhpcy5hdGsudHlwZSA9PSBcInNob290XCIpIHtcclxuXHRcdFx0Y29uc3QgYXRrID0gdGhpcy5hdGs7XHJcblx0XHRcdGF0ay50eXBlID0gXCJwaWNrXCJcclxuXHRcdFx0YXRrLmdyYXBoaWNzLmRyYXdDaXJjbGUoYXRrLnIsIGF0ay5yLCBhdGsuciwgXCIjMDAwMDAwXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGV4dCh0ZXh0LCBjb2xvciwgeCwgeSwgc3opIHtcclxuXHRcdGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHRleHQgPSBcIlwiO1xyXG5cdFx0aWYgKGNvbG9yID09PSB1bmRlZmluZWQpIGNvbG9yID0gXCIjRkZGRkZGXCI7XHJcblx0XHRpZiAoeCA9PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHggPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyXHJcblx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMlxyXG5cdFx0fVxyXG5cdFx0aWYgKHN6ID09PSB1bmRlZmluZWQpIHN6ID0gMjA7XHJcblx0XHR0aGlzLmRsZy5jaGFuZ2VUZXh0KHRleHQpO1xyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBjb2xvcjtcclxuXHRcdHRoaXMuZGxnLnBvcyh4LCB5KTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gc3o7XHJcblx0XHR0aGlzLmRsZy5hbHBoYSA9IDE7XHJcblx0XHQvL0xheWEuVHdlZW4udG8odGhpcy5kbGcse2FscGhhOjAseTp0aGlzLmRsZy55LTEwMCxmb250U2l6ZTp0aGlzLmRsZy5mb250U2l6ZSoyfSwxMDAwKVxyXG5cdH1cclxuXHJcblx0bWFwX2NoYW5nZSgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwicGF1c2Ugc2V0IHRydWVcIilcclxuXHRcdHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHRcdGNvbnN0IG51bWJlciA9IHRoaXMubnVtYmVyO1xyXG5cdFx0dGhpcy5udW1iZXIgKz0gMTtcclxuXHRcdFxyXG5cdFx0bGV0IGJnID0gTWF0aC5mbG9vcihudW1iZXIvMTUpO1xyXG5cdFx0bGV0IGlkeCA9IG51bWJlciUyO1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cclxuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xyXG5cdFx0XHR0aGVfbW9uc3Rlci5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LkhQID0gLTE7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCkge1xyXG5cdFx0XHR0aGVfdGhpbmcuSFAgPSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRpbGVkTWFwLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzL3RpbGVkbWFwcy9cIitiZytpZHgrXCIuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcDIpKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwMigpIHtcclxuXHRcdHRoZV9IZXJvLm1hcFggPSAxMDA7XHJcblx0XHR0aGVfSGVyby5tYXBZID0gMTAwO1xyXG5cclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHRcdHRoaXMuYXRrLnR5cGUgPSBcInNob290XCI7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KDAsIDAsIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodClcclxuXHRcdHRoaXMuZ2VuZXJhdGVfbW9uc3Rlcih0aGlzLm51bWJlciAqIHRoaXMuZGlmZmljdWx0eSlcclxuXHJcblx0XHR0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0VVJMcyhzdHIsbilcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJscz1bXTtcclxuICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goXCJyZXMvYXRsYXMvXCIrc3RyK2krXCIucG5nXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmxzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShUaGluZ19saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3BsaWNlIHRoaW5nXCIpXHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxyXG4gICAgICAgIHRoaXMuSFA9MTtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZWVsIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyLGhhc1NwKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC40O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb1wiO1xyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSAyMDtcclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAyMDtcclxuICAgICAgICB0aGlzLmFybW9yID0gMjA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpY29uc29sZS5sb2coXCJnZXRzaG9vdDFcIilcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRzaG9vdDJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iXX0=
