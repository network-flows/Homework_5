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

var _Wall = require("./script/Wall");

var _Wall2 = _interopRequireDefault(_Wall);

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

var Browser = Laya.Browser,
    WebGL = Laya.WebGL,
    Stage = Laya.Stage,
    Stat = Laya.Stat,
    Handler = Laya.Handler;

//初始化引擎


// 扩充的类
// 基础的类
Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

//横屏游戏
Laya.stage.screenMode = "horizontal";

//等比例缩放
Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

//背景颜色
Laya.stage.bgColor = "#232628";

// set the Screen
var w = Browser.clientWidth;
var h = Browser.clientHeight;

Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;

Stat.show();

window.the_screen = new _Screen2.default(w, h);

// 角色容器
window.Monster_list = [];
window.Bullet_list = [];
window.Wall_list = [];
window.Thing_list = [];

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":7,"./script/Hero_Bullet":8,"./script/Monster":10,"./script/Monster_Bullet":11,"./script/Monster_Bullet_huge":12,"./script/Monster_Bullet_normal":13,"./script/Screen":14,"./script/Thing":15,"./script/Wall":16,"./script/Wheel":17}],2:[function(require,module,exports){
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
        _this.mapX = 0;
        _this.mapY = 0;

        // collision system
        _this.Type = "Beings";
        _this.w = 50;
        _this.h = 50;

        _this.root_reset();
        return _this;
    }

    _createClass(Beings, [{
        key: "root_reset",
        value: function root_reset() {
            Laya.stage.addChild(this);
            console.log("root_reset!");

            this.branch_reset();
        }
    }, {
        key: "up_date",
        value: function up_date() {
            this.x = this.mapX - the_Hero.mapX + Laya.Browser.clientWidth / 2;
            this.y = this.mapY - the_Hero.mapY + Laya.Browser.clientHeight / 2;

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
            Laya.Pool.recover(this.Type, this);

            this.dead();
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "action",
        value: function action() {
            console.log("Beings action");
        }
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
        return _this;
    }

    _createClass(Bullet, [{
        key: "action",
        value: function action() {
            this.HP -= 1;

            this.mapX += this.vx;
            this.mapY += this.vy;

            var attack_list = this.get_attack_list();
            this.explosion(attack_list);
        }
    }, {
        key: "dead",
        value: function dead() {
            Bullet_list.splice(Bullet_list.indexOf(this));
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
        value: function attack(element) {
            console.log("Bullet attack");
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            console.log("branch_reset!");
            Bullet_list.push(this);

            this.branch_Hero_or_Monster_reset();
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

        _this.sentence = "是否去往下一层？";
        return _this;
    }

    _createClass(Gate, [{
        key: "use_it",
        value: function use_it() {
            // go to next floor

        }
    }]);

    return Gate;
}(_Thing3.default);

exports.default = Gate;

},{"./Thing":15}],6:[function(require,module,exports){
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

        // set picture
        _this.loadImage("./orz.jpg").scale(0.4, 0.4);
        return _this;
    }

    _createClass(Goblin, [{
        key: "action",
        value: function action() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {

            this.HP = 20;
        }
    }]);

    return Goblin;
}(_Monster3.default);

exports.default = Goblin;

},{"./Monster":10}],7:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Beings) {
    _inherits(Hero, _Beings);

    function Hero() {
        _classCallCheck(this, Hero);

        // move
        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 10;
        _this.armor_max = 10;
        _this.armot = 10;

        // shoot
        _this.direction_x = 1;
        _this.direction_y = 1;

        _this.shoot_power = 1000;
        _this.shoot_cost = 100;

        _this.pivot(16, 24);

        _this.ani = new Laya.Animation();
        _this.ani.loadAtlas("res//atlas//hero.atlas", Laya.Handler.create(_this, _this.onLoaded));
        return _this;
    }

    _createClass(Hero, [{
        key: "onLoaded",
        value: function onLoaded() {
            console.log("load!!!");
            Laya.stage.addChild(this.ani);
            this.ani.interval = 100;
            this.ani.pos(this.x, this.y);
            this.ani.index = 1;
            function getURLs(str, n) {
                var urls = [];
                for (var i = 0; i < n; i += 1) {
                    urls.push("res\\atlas\\" + str + i + ".png");
                }
                return urls;
            }

            Laya.Animation.createFrames(getURLs("hero\\up", 4), "hero_up");
            Laya.Animation.createFrames(getURLs("hero\\down", 4), "hero_down");
            Laya.Animation.createFrames(getURLs("hero\\left", 4), "hero_left");
            Laya.Animation.createFrames(getURLs("hero\\right", 4), "hero_right");
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }, {
        key: "action",
        value: function action() {
            //--------- movement control part ---------//
            var vx = this.getV().x;
            var vy = this.getV().y;

            vx /= 10;
            vy /= 10;

            // movement command detected
            var v = Math.sqrt(vx * vx + vy * vy);
            if (v > 1E-6) {
                // make sure that v <= v_max
                var v_scale = this.v_max / v;
                if (v_scale > 1) {
                    v_scale = 1;
                }

                this.mapX += vx * v_scale;
                this.mapY += vy * v_scale;
            }
            //--------- movement control part end ---------//

            //--------- shoot control part ---------//

            // Shooting delay
            if (this.shoot_power < 10000) {
                this.shoot_power += 1;
            }
            if (this.shoot_cost <= this.shoot_power && this.shoot()) {
                this.shoot_power = 0;
                this.shoot_event();
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

            function getDir(dx, dy, last) {
                if (dx > dy && dx > -dy) return "right";
                if (-dx > dy && -dx > -dy) return "left";
                if (dy > dx && dy > -dx) return "down";
                if (-dy > dx && -dy > -dx) return "up";
                return last;
            }

            var dir = getDir(this.direction_x, this.direction_y, this.pre_dir);
            if (dir != this.pre_dir) {
                this.ani.play(0, true, "hero_" + dir);
                this.pre_dir = dir;
            }
            //--------- shoot control part end ---------//
        }
    }, {
        key: "getV",
        value: function getV() {
            return the_screen.getVelosity();
        }
    }, {
        key: "shoot",
        value: function shoot() {
            return the_screen.getShoot();
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
        key: "shoot_event",
        value: function shoot_event() {
            var new_bullet = Laya.Pool.getItemByClass("Hero_Bullet_normal", _Hero_Bullet_normal2.default);
            new_bullet.root_reset();
            console.log("shoot!");
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Hero_Bullet_normal":9,"./Monster":10}],8:[function(require,module,exports){
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
        key: "dead",
        value: function dead() {}
    }, {
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Wall_list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var the_wall = _step2.value;

                    if (this.attackable(the_wall)) {
                        attack_list.push(the_wall);
                    }
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

},{"./Bullet":3,"./Monster":10}],9:[function(require,module,exports){
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

        _this.v_max = 1;
        _this.Type = "Hero_Bullet_normal";

        // set picture
        _this.loadImage("./orz.jpg").scale(0.1, 0.1);
        return _this;
    }

    _createClass(Hero_Bullet_normal, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 40;
        }
    }, {
        key: "attack",
        value: function attack(element) {
            console.log("Hero_Bullet_normal attack");

            element.HP -= 20;
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 150;
            console.log("this.HP = ", this.HP);
        }
    }]);

    return Hero_Bullet_normal;
}(_Hero_Bullet3.default);

exports.default = Hero_Bullet_normal;

},{"./Hero_Bullet":8}],10:[function(require,module,exports){
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

var Monster = function (_Beings) {
    _inherits(Monster, _Beings);

    function Monster() {
        _classCallCheck(this, Monster);

        return _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this));
    }

    _createClass(Monster, [{
        key: "action",
        value: function action() {}
    }, {
        key: "dead",
        value: function dead() {
            Monster_list.splice(Monster_list.indexOf(this));
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            console.log("branch_reset!");
            Monster_list.push(this);

            this.leaf_reset();
        }
    }]);

    return Monster;
}(_Beings3.default);

exports.default = Monster;

},{"./Beings":2}],11:[function(require,module,exports){
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
        key: "dead",
        value: function dead() {}
    }, {
        key: "get_attack_list",
        value: function get_attack_list() {
            var attack_list = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Wall_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var the_wall = _step.value;

                    if (this.attackable(the_wall)) {
                        attack_list.push(the_wall);
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

            if (this.attackable(the_hero)) {
                attack_list.push(the_hero);
            }
            return attack_list;
        }
    }, {
        key: "attackable",
        value: function attackable(the_enemy) {}
    }, {
        key: "attack",
        value: function attack(element) {
            console.log("Monster_Bullet attack");
        }
    }, {
        key: "branch_Hero_or_Monster_reset",
        value: function branch_Hero_or_Monster_reset() {
            this.leaf_reset();
        }
    }]);

    return Monster_Bullet;
}(_Bullet3.default);

exports.default = Monster_Bullet;

},{"./Bullet":3}],12:[function(require,module,exports){
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
        value: function attack(element) {
            console.log("Monster_Bullet_huge attack");

            element.HP -= 20;
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 40;
            console.log("this.HP = ", this.HP);
        }
    }]);

    return Monster_Bullet_huge;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_huge;

},{"./Monster_Bullet":11}],13:[function(require,module,exports){
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
        return _this;
    }

    _createClass(Monster_Bullet_normal, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 20;
        }
    }, {
        key: "attack",
        value: function attack(element) {
            console.log("Monster_Bullet_normal attack");

            element.HP -= 10;
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 40;
            console.log("this.HP = ", this.HP);
        }
    }]);

    return Monster_Bullet_normal;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_normal;

},{"./Monster_Bullet":11}],14:[function(require,module,exports){
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
		_this.w = w;
		_this.h = h;

		Laya.stage.addChild(_this);
		_this.size(w, h);
		_this.pos(0, 0);
		_this.loadMap();
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
			this.tiledMap.createMap("res\\tiledmaps\\test.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
		}
	}, {
		key: "onLoadedMap",
		value: function onLoadedMap() {
			console.log("ok");
			var Event = Laya.Event;
			Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUP);

			this.whl = new _Wheel2.default(this.w / 4, this.h * 3 / 4, this.w / 15);
			this.atk = new _Wheel2.default(this.w * 3 / 4, this.h * 3 / 4, this.w / 15);
			this.atk.alpha = 0.8;

			window.the_Hero = new _hero2.default();

			// test
			Laya.timer.frameLoop(1, this, this.onFrame);

			var monster_test1 = new _Goblin2.default();
			monster_test1.mapX = 100;
			monster_test1.mapY = 100;
		}
	}, {
		key: "onFrame",
		value: function onFrame() {
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
				for (var _iterator3 = Wall_list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var the_wall = _step3.value;

					the_wall.up_date();
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

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = Thing_list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var the_thing = _step4.value;

					the_thing.up_date();
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

			the_Hero.up_date();
			the_Hero.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
			this.tiledMap.changeViewPort(the_Hero.mapX - Laya.Browser.clientWidth / 2, the_Hero.mapY - Laya.Browser.clientHeight / 2, Laya.Browser.clientWidth, Laya.Browser.clientHeight);
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
				x: this.whl.sp.x - this.whl.x,
				y: this.whl.sp.y - this.whl.y
			};
		}
	}, {
		key: "getShoot",
		value: function getShoot() {
			return this.atk.ID !== null;
		}
	}]);

	return Screen;
}(Laya.Sprite //screen
);

exports.default = Screen;

},{"./DragPoint":4,"./Goblin":6,"./Wheel":17,"./hero":18}],15:[function(require,module,exports){
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
        key: "action",
        value: function action() {
            if (player_is_nearby()) {
                this.set_sentence();
                if (this.click_the_thing()) {
                    this.use_it();
                }
            } else {
                this.hide_sentence();
            }
        }
    }, {
        key: "dead",
        value: function dead() {
            Thing_list.splice(Bullet_list.indexOf(this));
        }
    }, {
        key: "set_sentence",
        value: function set_sentence() {
            /*
            game.sentence = this.sentence;
            */
        }
    }, {
        key: "hide_sentence",
        value: function hide_sentence() {
            /*
            game.sentence = "";
            */
        }
    }, {
        key: "player_is_nearby",
        value: function player_is_nearby() {
            return false;
        }
    }, {
        key: "click_the_thing",
        value: function click_the_thing() {
            /*
            if(game.button_clicked){
                game.button_clicked = false;
                return true;
            }
            else{
                return false;
            }
            */
        }
    }, {
        key: "use_it",
        value: function use_it() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            console.log("branch_reset!");
            Thing_list.push(this);

            this.leaf_reset();
        }
    }]);

    return Thing;
}(_Beings3.default);

exports.default = Thing;

},{"./Beings":2}],16:[function(require,module,exports){
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

var Wall = function (_Beings) {
    _inherits(Wall, _Beings);

    function Wall(x1, x2, y1, y2) {
        _classCallCheck(this, Wall);

        var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this));

        _this.Type = "Wall";

        _this.x1 = x1;
        _this.x2 = x2;
        _this.y1 = y1;
        _this.y2 = y2;
        return _this;
    }

    _createClass(Wall, [{
        key: "action",
        value: function action() {}
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 30;
        }
    }]);

    return Wall;
}(_Beings3.default);

exports.default = Wall;

},{"./Beings":2}],17:[function(require,module,exports){
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

	function Wheel(x, y, r) {
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
		_this.alpha = 0.2;
		_this.mouseThrough = true;
		_this.setup();
		return _this;
	}

	_createClass(Wheel, [{
		key: "setup",
		value: function setup() {
			this.sp = new _DragPoint2.default(this.x, this.y, this.r / 5);
		}
	}, {
		key: "onStartDrag",
		value: function onStartDrag(e) {
			this.ID = e.touchId;
			this.moveTo(e.stageX, e.stageY);
		}
	}, {
		key: "onStopDrag",
		value: function onStopDrag() {
			this.ID = null;
			this.sp.pos(this.x, this.y);
		}
	}, {
		key: "moveTo",
		value: function moveTo(x, y) {
			//this.sp.pos(x,y)
			var dx = x - this.x;
			var dy = y - this.y;

			var R = Math.sqrt(dx * dx + dy * dy);
			var dx2 = R > this.r ? dx * this.r / R : dx;
			var dy2 = R > this.r ? dy * this.r / R : dy;
			this.sp.pos(this.x + dx2, this.y + dy2);
		}
	}]);

	return Wheel;
}(Laya.Sprite);

exports.default = Wheel;

},{"./DragPoint":4}],18:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Beings) {
    _inherits(Hero, _Beings);

    function Hero() {
        _classCallCheck(this, Hero);

        // move
        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 10;
        _this.armor_max = 10;
        _this.armot = 10;

        // shoot
        _this.direction_x = 1;
        _this.direction_y = 1;

        _this.shoot_power = 1000;
        _this.shoot_cost = 100;

        _this.pivot(16, 24);

        _this.ani = new Laya.Animation();
        _this.ani.loadAtlas("res//atlas//hero.atlas", Laya.Handler.create(_this, _this.onLoaded));
        return _this;
    }

    _createClass(Hero, [{
        key: "onLoaded",
        value: function onLoaded() {
            console.log("load!!!");
            Laya.stage.addChild(this.ani);
            this.ani.interval = 100;
            this.ani.pos(this.x, this.y);
            this.ani.index = 1;
            function getURLs(str, n) {
                var urls = [];
                for (var i = 0; i < n; i += 1) {
                    urls.push("res\\atlas\\" + str + i + ".png");
                }
                return urls;
            }

            Laya.Animation.createFrames(getURLs("hero\\up", 4), "hero_up");
            Laya.Animation.createFrames(getURLs("hero\\down", 4), "hero_down");
            Laya.Animation.createFrames(getURLs("hero\\left", 4), "hero_left");
            Laya.Animation.createFrames(getURLs("hero\\right", 4), "hero_right");
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }, {
        key: "action",
        value: function action() {
            //--------- movement control part ---------//
            var vx = this.getV().x;
            var vy = this.getV().y;

            vx /= 10;
            vy /= 10;

            // movement command detected
            var v = Math.sqrt(vx * vx + vy * vy);
            if (v > 1E-6) {
                // make sure that v <= v_max
                var v_scale = this.v_max / v;
                if (v_scale > 1) {
                    v_scale = 1;
                }

                this.mapX += vx * v_scale;
                this.mapY += vy * v_scale;
            }
            //--------- movement control part end ---------//

            //--------- shoot control part ---------//

            // Shooting delay
            if (this.shoot_power < 10000) {
                this.shoot_power += 1;
            }
            if (this.shoot_cost <= this.shoot_power && this.shoot()) {
                this.shoot_power = 0;
                this.shoot_event();
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

            function getDir(dx, dy, last) {
                if (dx > dy && dx > -dy) return "right";
                if (-dx > dy && -dx > -dy) return "left";
                if (dy > dx && dy > -dx) return "down";
                if (-dy > dx && -dy > -dx) return "up";
                return last;
            }

            var dir = getDir(this.direction_x, this.direction_y, this.pre_dir);
            if (dir != this.pre_dir) {
                this.ani.play(0, true, "hero_" + dir);
                this.pre_dir = dir;
            }
            //--------- shoot control part end ---------//
        }
    }, {
        key: "getV",
        value: function getV() {
            return the_screen.getVelosity();
        }
    }, {
        key: "shoot",
        value: function shoot() {
            return the_screen.getShoot();
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
        key: "shoot_event",
        value: function shoot_event() {
            var new_bullet = Laya.Pool.getItemByClass("Hero_Bullet_normal", _Hero_Bullet_normal2.default);
            new_bullet.root_reset();
            console.log("shoot!");
        }
    }, {
        key: "dead",
        value: function dead() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Hero_Bullet_normal":9,"./Monster":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9IZXJvLmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9TY3JlZW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XYWxsLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElBR0MsUUFBUSxLQUFLLEtBSGQ7QUFBQSxJQUlDLE9BQU8sS0FBSyxJQUpiO0FBQUEsSUFLQyxVQUFVLEtBQUssT0FMaEI7O0FBT0E7OztBQVpBO0FBZEM7QUEyQkQs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QWlDLFlBQXBDLEVBQWlEO0FBQzdDLHVDQUFlLEtBQUssWUFBTCxDQUFrQixXQUFsQixDQUFmO0FBQ0EsMENBQWtCLFdBQWxCO0FBQ0g7QUFDSjs7QUFFRDtBQVY2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVc3QixnQkFBRyxvQkFBb0IsSUFBdkIsRUFBNEI7QUFDeEIsdUJBQU07QUFDRix3QkFBSSxnQkFBZ0IsSUFBaEIsR0FBdUIsS0FBSyxJQUQ5QjtBQUVGLHdCQUFJLGdCQUFnQixJQUFoQixHQUF1QixLQUFLO0FBRjlCLGlCQUFOO0FBSUgsYUFMRCxNQU1JO0FBQ0EsdUJBQU87QUFDSCx3QkFBSSxDQUREO0FBRUgsd0JBQUk7QUFGRCxpQkFBUDtBQUlIO0FBQ0o7OztzQ0FFWTtBQUNULGdCQUFJLGFBQWEsS0FBSyxJQUFMLENBQVUsY0FBVixDQUF5QixvQkFBekIsRUFBK0MsNEJBQS9DLENBQWpCO0FBQ0EsdUJBQVcsVUFBWDtBQUNBLG9CQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0g7OzsrQkFFSyxDQUVMOzs7dUNBRWE7QUFDVixpQkFBSyxFQUFMLEdBQVUsS0FBSyxNQUFmO0FBQ0EsaUJBQUssS0FBTCxHQUFhLEtBQUssU0FBbEI7QUFDSDs7OztFQTdKNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcbmltcG9ydCBXYWxsIGZyb20gXCIuL3NjcmlwdC9XYWxsXCJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXG5pbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL3NjcmlwdC9EcmFnUG9pbnRcIlxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXG5cbi8vIOaJqeWFheeahOexu1xuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vc2NyaXB0L0dvYmxpblwiXG5cbmNvbnN0XG5cdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXIsXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxuXHRTdGF0ID0gTGF5YS5TdGF0LFxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xuXG4vL+WIneWni+WMluW8leaTjlxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XG5cbi8v5qiq5bGP5ri45oiPXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcblxuLy/nrYnmr5TkvovnvKnmlL5cbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcblxuLy/og4zmma/popzoibJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xuXG4vLyBzZXQgdGhlIFNjcmVlblxubGV0IHcgPSBCcm93c2VyLmNsaWVudFdpZHRoO1xubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcblxuTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcblxuU3RhdC5zaG93KCk7XG5cbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTtcblxuLy8g6KeS6Imy5a655ZmoXG53aW5kb3cuTW9uc3Rlcl9saXN0ID0gW107XG53aW5kb3cuQnVsbGV0X2xpc3QgPSBbXTtcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcbndpbmRvdy5UaGluZ19saXN0ID0gW107IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVpbmdzIGV4dGVuZHMgTGF5YS5TcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5IUCA9IDE7XG4gICAgICAgIHRoaXMubWFwWCA9IDA7XG4gICAgICAgIHRoaXMubWFwWSA9IDA7XG5cbiAgICAgICAgLy8gY29sbGlzaW9uIHN5c3RlbVxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xuICAgICAgICB0aGlzLncgPSA1MDtcbiAgICAgICAgdGhpcy5oID0gNTA7XG5cbiAgICAgICAgdGhpcy5yb290X3Jlc2V0KClcbiAgICB9XG5cbiAgICByb290X3Jlc2V0KCl7XG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9vdF9yZXNldCFcIilcblxuICAgICAgICB0aGlzLmJyYW5jaF9yZXNldCgpO1xuICAgIH1cblxuICAgIHVwX2RhdGUoKXtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5tYXBYIC0gdGhlX0hlcm8ubWFwWCArIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xuXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZF9hY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFkX2FjdGlvbigpe1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5UeXBlLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmRlYWQoKTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJCZWluZ3MgYWN0aW9uXCIpXG4gICAgfVxuXG4gICAgZGwoZHgsIGR5KXtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKmR5KTtcbiAgICB9XG5cbiAgICBPYmplY3RfZGwodGhlX29iamVjdCl7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhlX29iamVjdC5keCAqIHRoZV9vYmplY3QuZHggKyB0aGVfb2JqZWN0LmR5ICogdGhlX29iamVjdC5keSk7XG4gICAgfVxuXG4gICAgZ2V0X2Rpc3RhbmNlKGFub3RoZXIpe1xuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XG4gICAgICAgIGxldCBkeSA9IHRoaXMubWFwWSAtIGFub3RoZXIubWFwWTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGwoZHgsIGR5KTtcbiAgICB9XG5cbiAgICBnZXRfdmVjdG9yX3Yodl9tYXgsIHRoZV92eCwgdGhlX3Z5KXtcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XG4gICAgICAgIGlmKHRoZV92ID4gMUUtNiAmJiB2X21heCA+IDFFLTYpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcbiAgICAgICAgICAgICAgICB2eTogdGhlX3Z5ICogdl9tYXgvdGhlX3ZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIHZ4OiAwLFxuICAgICAgICAgICAgICAgIHZ5OiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5ncy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudnggPSAxO1xuICAgICAgICB0aGlzLnZ5ID0gMTtcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICB0aGlzLkhQIC09IDE7XG5cbiAgICAgICAgdGhpcy5tYXBYICs9IHRoaXMudng7XG4gICAgICAgIHRoaXMubWFwWSArPSB0aGlzLnZ5O1xuXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IHRoaXMuZ2V0X2F0dGFja19saXN0KCk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xuICAgICAgICAvLyBleHBsb3Npb24gIVxuICAgICAgICBpZihhdHRhY2tfbGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGF0dGFja1wiKTtcblxuICAgIH1cblxuICAgIGJyYW5jaF9yZXNldCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcblxuICAgICAgICB0aGlzLmJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdQb2ludCBleHRlbmRzIExheWEuU3ByaXRlICAvL25vIGV2ZW50c1xue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkYwMFwiKTtcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XG5cdFx0dGhpcy5yPXI7XG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcblx0fVxufSIsImltcG9ydCBUaGluZyBmcm9tIFwiLi9UaGluZ1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuaYr+WQpuWOu+W+gOS4i+S4gOWxgu+8n1wiO1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXG5cbiAgICB9XG59XG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xuXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxuXG4gICAgbGVhZl9yZXNldCgpe1xuXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcbiAgICB9XG59IiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIG1vdmVcbiAgICAgICAgdGhpcy52X21heCA9IDU7XG5cbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcblxuICAgICAgICAvLyBzaG9vdFxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gMTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XG5cbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDEwMDA7XG4gICAgICAgIHRoaXMuc2hvb3RfY29zdCA9IDEwMDtcblxuICAgICAgICB0aGlzLnBpdm90KDE2LDI0KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5hbmkubG9hZEF0bGFzKFwicmVzLy9hdGxhcy8vaGVyby5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7IFxuICAgIH1cblxuICAgIG9uTG9hZGVkKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCEhIVwiKVxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKTtcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xuICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcbiAgICAgICAgdGhpcy5hbmkuaW5kZXg9MTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0VVJMcyhzdHIsbilcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHVybHM9W107XG4gICAgICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKFwicmVzXFxcXGF0bGFzXFxcXFwiK3N0citpK1wiLnBuZ1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybHM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyhnZXRVUkxzKFwiaGVyb1xcXFx1cFwiLDQpLFwiaGVyb191cFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXGRvd25cIiw0KSxcImhlcm9fZG93blwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXGxlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXHJpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIik7XG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XG5cbiAgICAgICAgdnggLz0gMTA7XG4gICAgICAgIHZ5IC89IDEwO1xuXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuICAgICAgICBpZiAodiA+IDFFLTYpe1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xuICAgICAgICAgICAgaWYodl9zY2FsZSA+IDEpe1xuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gdnggKiB2X3NjYWxlO1xuICAgICAgICAgICAgdGhpcy5tYXBZICs9IHZ5ICogdl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIFxuICAgICAgICAvLyBTaG9vdGluZyBkZWxheVxuICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMTAwMDApe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfY29zdCA8PSB0aGlzLnNob290X3Bvd2VyICYmIHRoaXMuc2hvb3QoKSl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldERpcihkeCxkeSxsYXN0KXtcbiAgICAgICAgICAgIGlmKGR4PmR5JiZkeD4tZHkpcmV0dXJuIFwicmlnaHRcIjtcbiAgICAgICAgICAgIGlmKC1keD5keSYmLWR4Pi1keSlyZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgICAgICBpZihkeT5keCYmZHk+LWR4KXJldHVybiBcImRvd25cIjtcbiAgICAgICAgICAgIGlmKC1keT5keCYmLWR5Pi1keClyZXR1cm4gXCJ1cFwiO1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyPWdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG4gICAgfVxuXG4gICAgZ2V0Vigpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpO1xuICAgIH1cblxuICAgIHNob290KCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFNob290KCk7XG4gICAgfVxuXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgIGR5OiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdF9ldmVudCgpe1xuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkhlcm9fQnVsbGV0X25vcm1hbFwiLCBIZXJvX0J1bGxldF9ub3JtYWwpO1xuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG5cbiAgICBicmFuY2hfcmVzZXQoKXtcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XG4gICAgfVxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfbW9uc3Rlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xuICAgICAgICB0aGlzLnZ4ID0gdmVjdG9yX3Yudng7XG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcbiAgICAgICAgdGhpcy5tYXBZID0gdGhlX0hlcm8ubWFwWTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9IZXJvX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0X25vcm1hbCBleHRlbmRzIEhlcm9fQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudl9tYXggPSAxO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiO1xuXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuMSwwLjEpO1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyb19CdWxsZXRfbm9ybWFsIGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuSFAgLT0gMjA7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxuXG4gICAgbGVhZl9yZXNldCgpe1xuICAgICAgICB0aGlzLkhQID0gMTUwO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuSFAgPSBcIiwgdGhpcy5IUCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cbiAgICBcbiAgICBkZWFkKCl7XG4gICAgICAgIE1vbnN0ZXJfbGlzdC5zcGxpY2UoTW9uc3Rlcl9saXN0LmluZGV4T2YodGhpcykpO1xuICAgIH1cblxuICAgIGJyYW5jaF9yZXNldCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcblxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxuICAgIH1cbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9oZXJvKSl7XG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9oZXJvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0IGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiO1xuXG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZSBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDIwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcblxuICAgIH1cblxuICAgIGxlYWZfcmVzZXQoKXtcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuSFAgPSBcIiwgdGhpcy5IUCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXR7XG4gICAgY29uc3RydWN0b3IodngsIHZ5KXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcblxuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDEwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGxlYWZfcmVzZXQoKXtcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuSFAgPSBcIiwgdGhpcy5IUCk7XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vaGVyb1wiXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL0dvYmxpblwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9zY3JlZW5cbntcblx0Y29uc3RydWN0b3IodyxoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdHRoaXMudz13O1xuXHRcdHRoaXMuaD1oO1xuXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcblx0XHR0aGlzLnNpemUodyxoKTtcblx0XHR0aGlzLnBvcygwLDApO1xuXHRcdHRoaXMubG9hZE1hcCgpO1xuXHR9XG5cblx0bG9hZE1hcCgpXG5cdHtcblx0XHRjb25zdCBcblx0XHRcdFRpbGVkTWFwPUxheWEuVGlsZWRNYXAsXG5cdFx0XHRSZWN0YW5nbGU9TGF5YS5SZWN0YW5nbGUsXG5cdFx0XHRIYW5kbGVyPUxheWEuSGFuZGxlcixcblx0XHRcdEV2ZW50PUxheWEuRXZlbnQsXG5cdFx0XHRCcm93c2VyPUxheWEuQnJvd3Nlcjtcblx0XHR0aGlzLnRpbGVkTWFwPW5ldyBUaWxlZE1hcCgpO1xuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzXFxcXHRpbGVkbWFwc1xcXFx0ZXN0Lmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkTWFwKSk7XG5cdH1cblxuXHRvbkxvYWRlZE1hcCgpXG5cdHtcblx0XHRjb25zb2xlLmxvZyhcIm9rXCIpXG5cdFx0Y29uc3QgRXZlbnQ9TGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Nb3VzZURvd24pO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5vbk1vdXNlVVApO1xuXG5cdFx0dGhpcy53aGw9bmV3IFdoZWVsKHRoaXMudy80LHRoaXMuaCozLzQsdGhpcy53LzE1KTtcbiAgICAgICAgdGhpcy5hdGs9bmV3IFdoZWVsKHRoaXMudyozLzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xuXHRcdHRoaXMuYXRrLmFscGhhPTAuODtcblxuXHRcdHdpbmRvdy50aGVfSGVybyA9IG5ldyBIZXJvKCk7XG5cblx0XHQvLyB0ZXN0XG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkZyYW1lKTtcblxuXHRcdGxldCBtb25zdGVyX3Rlc3QxID0gbmV3IEdvYmxpbigpO1xuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWCA9IDEwMDtcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFkgPSAxMDA7XG5cdH1cblxuXHRvbkZyYW1lKCkge1xuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdGhlX3dhbGwgb2YgV2FsbF9saXN0KSB7XG5cdFx0XHR0aGVfd2FsbC51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XG5cdFx0XHR0aGVfdGhpbmcudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMik7XG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYLUxheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLHRoZV9IZXJvLm1hcFktTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yLExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCxMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxuXHR9XG5cblx0b25Nb3VzZURvd24oZSl7XG5cdFx0aWYoKHRoaXMud2hsLngtZS5zdGFnZVgpKih0aGlzLndobC54LWUuc3RhZ2VYKSsodGhpcy53aGwueS1lLnN0YWdlWSkqKHRoaXMud2hsLnktZS5zdGFnZVkpPD10aGlzLndobC5yKnRoaXMud2hsLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoKHRoaXMuYXRrLngtZS5zdGFnZVgpKih0aGlzLmF0ay54LWUuc3RhZ2VYKSsodGhpcy5hdGsueS1lLnN0YWdlWSkqKHRoaXMuYXRrLnktZS5zdGFnZVkpPD10aGlzLmF0ay5yKnRoaXMuYXRrLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VVcChlKVxuXHR7XG5cdFx0aWYodGhpcy53aGwuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLndobC5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VNb3ZlKGUpXG5cdHtcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMud2hsLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHRcdH1cblx0fVxuXG5cdGdldFZlbG9zaXR5KClcblx0e1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeCA6IHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54LFxuICAgICAgICAgICAgeSA6IHRoaXMud2hsLnNwLnkgLSB0aGlzLndobC55XG4gICAgICAgIH07XG5cdH1cblxuXHRnZXRTaG9vdCgpXG5cdHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXRrLklEICE9PSBudWxsO1xuXHR9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICBpZihwbGF5ZXJfaXNfbmVhcmJ5KCkpe1xuICAgICAgICAgICAgdGhpcy5zZXRfc2VudGVuY2UoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuY2xpY2tfdGhlX3RoaW5nKCkpe1xuICAgICAgICAgICAgICAgIHRoaXMudXNlX2l0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaGlkZV9zZW50ZW5jZSgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKEJ1bGxldF9saXN0LmluZGV4T2YodGhpcykpO1xuXG4gICAgfVxuXG4gICAgc2V0X3NlbnRlbmNlKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGdhbWUuc2VudGVuY2UgPSB0aGlzLnNlbnRlbmNlO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIGhpZGVfc2VudGVuY2UoKXtcbiAgICAgICAgLypcbiAgICAgICAgZ2FtZS5zZW50ZW5jZSA9IFwiXCI7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcGxheWVyX2lzX25lYXJieSgpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xpY2tfdGhlX3RoaW5nKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGlmKGdhbWUuYnV0dG9uX2NsaWNrZWQpe1xuICAgICAgICAgICAgZ2FtZS5idXR0b25fY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuXG4gICAgfVxuXG5cbiAgICBicmFuY2hfcmVzZXQoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxuXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeDIsIHkxLCB5Mil7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiV2FsbFwiO1xuXG4gICAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgICB0aGlzLnkxID0geTE7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbGVhZl9yZXNldCgpe1xuICAgICAgICB0aGlzLkhQID0gMzA7XG4gICAgfVxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlZWwgZXh0ZW5kcyBMYXlhLlNwcml0ZVxue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkZGRlwiKTtcblx0XHR0aGlzLnBvcyh4LHkpO1xuXHRcdHRoaXMucj1yO1xuICAgICAgICB0aGlzLklEPW51bGw7XG4gICAgICAgIHRoaXMuYWxwaGE9MC4yO1xuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XG5cdFx0dGhpcy5zZXR1cCgpO1xuXHR9XG5cblx0c2V0dXAoKVxuXHR7XG5cdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xuXHR9XG5cblx0b25TdGFydERyYWcoZSl7XG5cdFx0dGhpcy5JRD1lLnRvdWNoSWQ7XG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHR9XG5cblx0b25TdG9wRHJhZygpXG5cdHtcblx0XHR0aGlzLklEPW51bGw7XG5cdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcblx0fVxuXG5cdG1vdmVUbyh4LHkpXG5cdHtcblx0XHQvL3RoaXMuc3AucG9zKHgseSlcblx0XHRsZXQgZHg9eC10aGlzLng7XG5cdFx0bGV0IGR5PXktdGhpcy55O1xuXG5cdFx0bGV0IFI9TWF0aC5zcXJ0KGR4KmR4K2R5KmR5KTtcblx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XG5cdFx0bGV0IGR5Mj1SPnRoaXMucj8gZHkqdGhpcy5yL1I6IGR5O1xuXHRcdHRoaXMuc3AucG9zKHRoaXMueCtkeDIsdGhpcy55K2R5Milcblx0fVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIG1vdmVcbiAgICAgICAgdGhpcy52X21heCA9IDU7XG5cbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcblxuICAgICAgICAvLyBzaG9vdFxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gMTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XG5cbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDEwMDA7XG4gICAgICAgIHRoaXMuc2hvb3RfY29zdCA9IDEwMDtcblxuICAgICAgICB0aGlzLnBpdm90KDE2LDI0KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5hbmkubG9hZEF0bGFzKFwicmVzLy9hdGxhcy8vaGVyby5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7IFxuICAgIH1cblxuICAgIG9uTG9hZGVkKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCEhIVwiKVxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKTtcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xuICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcbiAgICAgICAgdGhpcy5hbmkuaW5kZXg9MTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0VVJMcyhzdHIsbilcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHVybHM9W107XG4gICAgICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKFwicmVzXFxcXGF0bGFzXFxcXFwiK3N0citpK1wiLnBuZ1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybHM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyhnZXRVUkxzKFwiaGVyb1xcXFx1cFwiLDQpLFwiaGVyb191cFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXGRvd25cIiw0KSxcImhlcm9fZG93blwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXGxlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXHJpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIik7XG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XG5cbiAgICAgICAgdnggLz0gMTA7XG4gICAgICAgIHZ5IC89IDEwO1xuXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuICAgICAgICBpZiAodiA+IDFFLTYpe1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xuICAgICAgICAgICAgaWYodl9zY2FsZSA+IDEpe1xuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gdnggKiB2X3NjYWxlO1xuICAgICAgICAgICAgdGhpcy5tYXBZICs9IHZ5ICogdl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIFxuICAgICAgICAvLyBTaG9vdGluZyBkZWxheVxuICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMTAwMDApe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfY29zdCA8PSB0aGlzLnNob290X3Bvd2VyICYmIHRoaXMuc2hvb3QoKSl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldERpcihkeCxkeSxsYXN0KXtcbiAgICAgICAgICAgIGlmKGR4PmR5JiZkeD4tZHkpcmV0dXJuIFwicmlnaHRcIjtcbiAgICAgICAgICAgIGlmKC1keD5keSYmLWR4Pi1keSlyZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgICAgICBpZihkeT5keCYmZHk+LWR4KXJldHVybiBcImRvd25cIjtcbiAgICAgICAgICAgIGlmKC1keT5keCYmLWR5Pi1keClyZXR1cm4gXCJ1cFwiO1xuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyPWdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG4gICAgfVxuXG4gICAgZ2V0Vigpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpO1xuICAgIH1cblxuICAgIHNob290KCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFNob290KCk7XG4gICAgfVxuXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgIGR5OiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdF9ldmVudCgpe1xuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkhlcm9fQnVsbGV0X25vcm1hbFwiLCBIZXJvX0J1bGxldF9ub3JtYWwpO1xuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG5cbiAgICBicmFuY2hfcmVzZXQoKXtcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XG4gICAgfVxufSJdfQ==
