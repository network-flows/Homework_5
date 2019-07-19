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

        Laya.stage.addChild(_this);

        _this.HP = 1;
        _this.mapX = 0;
        _this.mapY = 0;
        //this.visible = false;

        // collision system
        _this.Type = "Beings";
        _this.w = 50;
        _this.h = 50;
        return _this;
    }

    _createClass(Beings, [{
        key: "up_date",
        value: function up_date() {
            this.x = this.mapX - the_Hero.mapX + Laya.Browser.clientWidth / 2;
            this.y = this.mapY - the_Hero.mapY + Laya.Browser.clientHeight / 2;

            if (this.HP < 1) {
                this.dead_action();
            } else {
                this.action();
            }
        }
    }, {
        key: "dead_action",
        value: function dead_action() {
            Laya.Pool.recover(this.Type, this);
            Laya.stage.removeChild(this);

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

        Bullet_list.push(_this);
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

        _this.HP = 1;

        // set picture
        _this.loadImage("./orz.jpg").scale(0.4, 0.4);
        return _this;
    }

    _createClass(Goblin, [{
        key: "action",
        value: function action() {}
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
            console.log("shoot!");
        }
    }, {
        key: "dead",
        value: function dead() {}
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

        var _this = _possibleConstructorReturn(this, (Hero_Bullet.__proto__ || Object.getPrototypeOf(Hero_Bullet)).call(this));

        var vector_v = _this.get_vector_v(_this.v_max, the_Hero.direction_x, the_Hero.direction_y);
        _this.vx = vector_v.vx;
        _this.vy = vector_v.vy;
        _this.mapX = the_Hero.mapX;
        _this.mapY = the_Hero.mapY;
        return _this;
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

        _this.v_max = 10;
        _this.Type = "Hero_Bullet_normal";

        _this.HP = 40;
        console.log("this.HP = ", _this.HP);

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
        value: function dead() {
            // Laya.Pool.recover("Hero_Bullet_normal", this.owner);
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

        var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this));

        Monster_list.push(_this);
        return _this;
    }

    _createClass(Monster, [{
        key: "action",
        value: function action() {}
    }, {
        key: "dead",
        value: function dead() {
            Monster_list.splice(Monster_list.indexOf(this));
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

        _this.HP = 40;
        console.log("this.HP = ", _this.HP);
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

        _this.HP = 40;
        console.log("this.HP = ", _this.HP);
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
            console.log("shoot!");
        }
    }, {
        key: "dead",
        value: function dead() {}
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Hero_Bullet_normal":9,"./Monster":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9IZXJvLmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9TY3JlZW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XYWxsLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElBR0MsUUFBUSxLQUFLLEtBSGQ7QUFBQSxJQUlDLE9BQU8sS0FBSyxJQUpiO0FBQUEsSUFLQyxVQUFVLEtBQUssT0FMaEI7O0FBT0E7OztBQVpBO0FBZEM7QUEyQkQs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Q0FBZCxFQUFnQixJQUFoQixFQUFxQixVQUFRLEdBQTdCO0FBQ0EscUJBQUssT0FBTCxHQUFhLEdBQWI7QUFDSDtBQUNEO0FBQ0g7OzsrQkFFSztBQUNGLG1CQUFPLFdBQVcsV0FBWCxFQUFQO0FBQ0g7OztnQ0FFTTtBQUNILG1CQUFPLFdBQVcsUUFBWCxFQUFQO0FBQ0g7OzswREFFZ0M7QUFDN0IsZ0JBQUksZUFBZSxHQUFuQjtBQUNBLGdCQUFJLGtCQUFrQixJQUF0QjtBQUY2QjtBQUFBO0FBQUE7O0FBQUE7QUFHN0IscUNBQXVCLFlBQXZCLDhIQUFvQztBQUFBLHdCQUE1QixXQUE0Qjs7QUFDaEMsd0JBQUcsS0FBSyxZQUFMLENBQWtCLFdBQWxCLElBQWlDLFlBQXBDLEVBQWlEO0FBQzdDLHVDQUFlLEtBQUssWUFBTCxDQUFrQixXQUFsQixDQUFmO0FBQ0EsMENBQWtCLFdBQWxCO0FBQ0g7QUFDSjs7QUFFRDtBQVY2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVc3QixnQkFBRyxvQkFBb0IsSUFBdkIsRUFBNEI7QUFDeEIsdUJBQU07QUFDRix3QkFBSSxnQkFBZ0IsSUFBaEIsR0FBdUIsS0FBSyxJQUQ5QjtBQUVGLHdCQUFJLGdCQUFnQixJQUFoQixHQUF1QixLQUFLO0FBRjlCLGlCQUFOO0FBSUgsYUFMRCxNQU1JO0FBQ0EsdUJBQU87QUFDSCx3QkFBSSxDQUREO0FBRUgsd0JBQUk7QUFGRCxpQkFBUDtBQUlIO0FBQ0o7OztzQ0FFWTtBQUNULGdCQUFJLGFBQWEsS0FBSyxJQUFMLENBQVUsY0FBVixDQUF5QixvQkFBekIsRUFBK0MsNEJBQS9DLENBQWpCO0FBQ0Esb0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSDs7OytCQUVLLENBRUw7Ozs7RUF2SjZCLGdCOztrQkFBYixJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7vy8vIOWfuuehgOeahOexu1xuaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9zY3JpcHQvQmVpbmdzXCJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0J1bGxldFwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9zY3JpcHQvSGVyb1wiXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9zY3JpcHQvTW9uc3RlclwiXG5pbXBvcnQgVGhpbmcgZnJvbSBcIi4vc2NyaXB0L1RoaW5nXCJcbmltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvSGVyb19CdWxsZXRcIlxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldFwiXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9zY3JpcHQvR2F0ZVwiXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi9zY3JpcHQvV2FsbFwiXG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL3NjcmlwdC9TY3JlZW5cIlxuaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9zY3JpcHQvRHJhZ1BvaW50XCJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxuXG4vLyDmianlhYXnmoTnsbtcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL3NjcmlwdC9Hb2JsaW5cIlxuXG5jb25zdFxuXHRCcm93c2VyID0gTGF5YS5Ccm93c2VyLFxuXHRXZWJHTCA9IExheWEuV2ViR0wsXG5cdFN0YWdlID0gTGF5YS5TdGFnZSxcblx0U3RhdCA9IExheWEuU3RhdCxcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcblxuLy/liJ3lp4vljJblvJXmk45cbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xuXG4vL+aoquWxj+a4uOaIj1xuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XG5cbi8v562J5q+U5L6L57yp5pS+XG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XG5cbi8v6IOM5pmv6aKc6ImyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcblxuLy8gc2V0IHRoZSBTY3JlZW5cbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcbmxldCBoID0gQnJvd3Nlci5jbGllbnRIZWlnaHQ7XG5cbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xuTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XG5cblN0YXQuc2hvdygpO1xuXG53aW5kb3cudGhlX3NjcmVlbiA9IG5ldyBTY3JlZW4odywgaCk7XG5cbi8vIOinkuiJsuWuueWZqFxud2luZG93Lk1vbnN0ZXJfbGlzdCA9IFtdO1xud2luZG93LkJ1bGxldF9saXN0ID0gW107XG53aW5kb3cuV2FsbF9saXN0ID0gW107XG53aW5kb3cuVGhpbmdfbGlzdCA9IFtdOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaW5ncyBleHRlbmRzIExheWEuU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuSFAgPSAxO1xuICAgICAgICB0aGlzLm1hcFggPSAwO1xuICAgICAgICB0aGlzLm1hcFkgPSAwO1xuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cbiAgICAgICAgdGhpcy5UeXBlID0gXCJCZWluZ3NcIjtcbiAgICAgICAgdGhpcy53ID0gNTA7XG4gICAgICAgIHRoaXMuaCA9IDUwO1xuICAgIH1cblxuICAgIHVwX2RhdGUoKXtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5tYXBYIC0gdGhlX0hlcm8ubWFwWCArIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xuXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZF9hY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWRfYWN0aW9uKCl7XG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5kZWFkKCk7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVpbmdzIGFjdGlvblwiKVxuICAgIH1cblxuICAgIGRsKGR4LCBkeSl7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICpkeSk7XG4gICAgfVxuXG4gICAgT2JqZWN0X2RsKHRoZV9vYmplY3Qpe1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xuICAgIH1cblxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXBYIC0gYW5vdGhlci5tYXBYO1xuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XG4gICAgfVxuXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XG4gICAgICAgIGxldCB0aGVfdiA9IHRoaXMuZGwodGhlX3Z4LCB0aGVfdnkpO1xuICAgICAgICBpZih0aGVfdiA+IDFFLTYgJiYgdl9tYXggPiAxRS02KXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICB2eDogdGhlX3Z4ICogdl9tYXgvdGhlX3YsXG4gICAgICAgICAgICAgICAgdnk6IHRoZV92eSAqIHZfbWF4L3RoZV92XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICB2eDogMCxcbiAgICAgICAgICAgICAgICB2eTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnZ4ID0gMTtcbiAgICAgICAgdGhpcy52eSA9IDE7XG4gICAgICAgIHRoaXMudl9tYXggPSAxMDtcblxuICAgICAgICBCdWxsZXRfbGlzdC5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICB0aGlzLkhQIC09IDE7XG5cbiAgICAgICAgdGhpcy5tYXBYICs9IHRoaXMudng7XG4gICAgICAgIHRoaXMubWFwWSArPSB0aGlzLnZ5O1xuXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IHRoaXMuZ2V0X2F0dGFja19saXN0KCk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xuICAgICAgICAvLyBleHBsb3Npb24gIVxuICAgICAgICBpZihhdHRhY2tfbGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGF0dGFja1wiKTtcblxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdQb2ludCBleHRlbmRzIExheWEuU3ByaXRlICAvL25vIGV2ZW50c1xue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkYwMFwiKTtcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XG5cdFx0dGhpcy5yPXI7XG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcblx0fVxufSIsImltcG9ydCBUaGluZyBmcm9tIFwiLi9UaGluZ1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuaYr+WQpuWOu+W+gOS4i+S4gOWxgu+8n1wiO1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXG5cbiAgICB9XG59XG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xuXG4gICAgICAgIHRoaXMuSFAgPSAxO1xuXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBtb3ZlXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xuXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxuICAgICAgICB0aGlzLkhQX21heCA9IDEwO1xuICAgICAgICB0aGlzLmFybW9yX21heCA9IDEwO1xuICAgICAgICB0aGlzLmFybW90ID0gMTA7XG5cbiAgICAgICAgLy8gc2hvb3RcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IDE7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xuXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAxMDAwO1xuICAgICAgICB0aGlzLnNob290X2Nvc3QgPSAxMDA7XG5cbiAgICAgICAgdGhpcy5waXZvdCgxNiwyNClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYW5pLmxvYWRBdGxhcyhcInJlcy8vYXRsYXMvL2hlcm8uYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpOyBcbiAgICB9XG5cbiAgICBvbkxvYWRlZCgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQhISFcIilcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSk7XG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcbiAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXG4gICAgICAgIHRoaXMuYW5pLmluZGV4PTE7XG4gICAgICAgIGZ1bmN0aW9uIGdldFVSTHMoc3RyLG4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB1cmxzPVtdO1xuICAgICAgICAgICAgZm9yKHZhciBpID0wO2k8bjtpKz0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVybHMucHVzaChcInJlc1xcXFxhdGxhc1xcXFxcIitzdHIraStcIi5wbmdcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmxzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXMoZ2V0VVJMcyhcImhlcm9cXFxcdXBcIiw0KSxcImhlcm9fdXBcIik7XG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyhnZXRVUkxzKFwiaGVyb1xcXFxkb3duXCIsNCksXCJoZXJvX2Rvd25cIik7XG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyhnZXRVUkxzKFwiaGVyb1xcXFxsZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyhnZXRVUkxzKFwiaGVyb1xcXFxyaWdodFwiLDQpLFwiaGVyb19yaWdodFwiKTtcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpO1xuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xuICAgICAgICBsZXQgdnggPSB0aGlzLmdldFYoKS54O1xuICAgICAgICBsZXQgdnkgPSB0aGlzLmdldFYoKS55O1xuXG4gICAgICAgIHZ4IC89IDEwO1xuICAgICAgICB2eSAvPSAxMDtcblxuICAgICAgICAvLyBtb3ZlbWVudCBjb21tYW5kIGRldGVjdGVkXG4gICAgICAgIGxldCB2ID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcbiAgICAgICAgaWYgKHYgPiAxRS02KXtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHYgPD0gdl9tYXhcbiAgICAgICAgICAgIGxldCB2X3NjYWxlID10aGlzLnZfbWF4IC8gdjtcbiAgICAgICAgICAgIGlmKHZfc2NhbGUgPiAxKXtcbiAgICAgICAgICAgICAgICB2X3NjYWxlID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IHZ4ICogdl9zY2FsZTtcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSB2eSAqIHZfc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xuICAgICAgICBcbiAgICAgICAgLy8gU2hvb3RpbmcgZGVsYXlcbiAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDEwMDAwKXtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNob290X2Nvc3QgPD0gdGhpcy5zaG9vdF9wb3dlciAmJiB0aGlzLnNob290KCkpe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XG4gICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXREaXIoZHgsZHksbGFzdCl7XG4gICAgICAgICAgICBpZihkeD5keSYmZHg+LWR5KXJldHVybiBcInJpZ2h0XCI7XG4gICAgICAgICAgICBpZigtZHg+ZHkmJi1keD4tZHkpcmV0dXJuIFwibGVmdFwiO1xuICAgICAgICAgICAgaWYoZHk+ZHgmJmR5Pi1keClyZXR1cm4gXCJkb3duXCI7XG4gICAgICAgICAgICBpZigtZHk+ZHgmJi1keT4tZHgpcmV0dXJuIFwidXBcIjtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpcj1nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuICAgIH1cblxuICAgIGdldFYoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKTtcbiAgICB9XG5cbiAgICBzaG9vdCgpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRTaG9vdCgpO1xuICAgIH1cblxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkeDogMCxcbiAgICAgICAgICAgICAgICBkeTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3RfZXZlbnQoKXtcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJIZXJvX0J1bGxldF9ub3JtYWxcIiwgSGVyb19CdWxsZXRfbm9ybWFsKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG59IiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoZV9IZXJvLmRpcmVjdGlvbl94LCB0aGVfSGVyby5kaXJlY3Rpb25feSk7XG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xuICAgICAgICB0aGlzLm1hcFggPSB0aGVfSGVyby5tYXBYO1xuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG59XG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBIZXJvX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5cblxuICAgICAgICB0aGlzLkhQID0gNDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcblxuICAgICAgICAvLyBzZXQgcGljdHVyZVxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjEsMC4xKTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcm9fQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDIwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgLy8gTGF5YS5Qb29sLnJlY292ZXIoXCJIZXJvX0J1bGxldF9ub3JtYWxcIiwgdGhpcy5vd25lcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cbiAgICBcbiAgICBkZWFkKCl7XG4gICAgICAgIE1vbnN0ZXJfbGlzdC5zcGxpY2UoTW9uc3Rlcl9saXN0LmluZGV4T2YodGhpcykpO1xuICAgIH1cbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9oZXJvKSl7XG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9oZXJvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0IGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2h1Z2VcIjtcblxuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcblxuICAgICAgICB0aGlzLkhQID0gNDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X2h1Z2UgYXR0YWNrXCIpO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5IUCAtPSAyMDtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiO1xuXG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCAyMDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuSFAgLT0gMTA7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICBcbiAgICB9XG59XG5cbiIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9XaGVlbFwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vR29ibGluXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxue1xuXHRjb25zdHJ1Y3Rvcih3LGgpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdGNvbnN0IFxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XG5cdFx0dGhpcy53PXc7XG5cdFx0dGhpcy5oPWg7XG5cblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdHRoaXMuc2l6ZSh3LGgpO1xuXHRcdHRoaXMucG9zKDAsMCk7XG5cdFx0dGhpcy5sb2FkTWFwKCk7XG5cdH1cblxuXHRsb2FkTWFwKClcblx0e1xuXHRcdGNvbnN0IFxuXHRcdFx0VGlsZWRNYXA9TGF5YS5UaWxlZE1hcCxcblx0XHRcdFJlY3RhbmdsZT1MYXlhLlJlY3RhbmdsZSxcblx0XHRcdEhhbmRsZXI9TGF5YS5IYW5kbGVyLFxuXHRcdFx0RXZlbnQ9TGF5YS5FdmVudCxcblx0XHRcdEJyb3dzZXI9TGF5YS5Ccm93c2VyO1xuXHRcdHRoaXMudGlsZWRNYXA9bmV3IFRpbGVkTWFwKCk7XG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXNcXFxcdGlsZWRtYXBzXFxcXHRlc3QuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSxIYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWRNYXApKTtcblx0fVxuXG5cdG9uTG9hZGVkTWFwKClcblx0e1xuXHRcdGNvbnNvbGUubG9nKFwib2tcIilcblx0XHRjb25zdCBFdmVudD1MYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLm9uTW91c2VVcCk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLHRoaXMsdGhpcy5vbk1vdXNlTW92ZSk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm9uTW91c2VVUCk7XG5cblx0XHR0aGlzLndobD1uZXcgV2hlZWwodGhpcy53LzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xuICAgICAgICB0aGlzLmF0az1uZXcgV2hlZWwodGhpcy53KjMvNCx0aGlzLmgqMy80LHRoaXMudy8xNSk7XG5cdFx0dGhpcy5hdGsuYWxwaGE9MC44O1xuXG5cdFx0d2luZG93LnRoZV9IZXJvID0gbmV3IEhlcm8oKTtcblxuXHRcdC8vIHRlc3Rcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLm9uRnJhbWUpO1xuXG5cdFx0bGV0IG1vbnN0ZXJfdGVzdDEgPSBuZXcgR29ibGluKCk7XG5cdFx0bW9uc3Rlcl90ZXN0MS5tYXBYID0gMTAwO1xuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWSA9IDEwMDtcblx0fVxuXG5cdG9uRnJhbWUoKSB7XG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XG5cdFx0XHR0aGVfbW9uc3Rlci51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcblx0XHRcdHRoZV9idWxsZXQudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3QpIHtcblx0XHRcdHRoZV93YWxsLnVwX2RhdGUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcblx0XHRcdHRoZV90aGluZy51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoZV9IZXJvLnVwX2RhdGUoKTtcblx0XHR0aGVfSGVyby5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KHRoZV9IZXJvLm1hcFgtTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsdGhlX0hlcm8ubWFwWS1MYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIsTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXG5cdH1cblxuXHRvbk1vdXNlRG93bihlKXtcblx0XHRpZigodGhpcy53aGwueC1lLnN0YWdlWCkqKHRoaXMud2hsLngtZS5zdGFnZVgpKyh0aGlzLndobC55LWUuc3RhZ2VZKSoodGhpcy53aGwueS1lLnN0YWdlWSk8PXRoaXMud2hsLnIqdGhpcy53aGwucilcblx0XHR7XG5cdFx0XHR0aGlzLndobC5vblN0YXJ0RHJhZyhlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZigodGhpcy5hdGsueC1lLnN0YWdlWCkqKHRoaXMuYXRrLngtZS5zdGFnZVgpKyh0aGlzLmF0ay55LWUuc3RhZ2VZKSoodGhpcy5hdGsueS1lLnN0YWdlWSk8PXRoaXMuYXRrLnIqdGhpcy5hdGsucilcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5vblN0YXJ0RHJhZyhlKTtcblx0XHR9XG5cdH1cblx0b25Nb3VzZVVwKGUpXG5cdHtcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmF0ay5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcblx0XHR9XG5cdH1cblx0b25Nb3VzZU1vdmUoZSlcblx0e1xuXHRcdGlmKHRoaXMud2hsLklEPT1lLnRvdWNoSWQpXG5cdFx0e1xuXHRcdFx0dGhpcy53aGwubW92ZVRvKGUuc3RhZ2VYLGUuc3RhZ2VZKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmF0ay5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMuYXRrLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VmVsb3NpdHkoKVxuXHR7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4IDogdGhpcy53aGwuc3AueCAtIHRoaXMud2hsLngsXG4gICAgICAgICAgICB5IDogdGhpcy53aGwuc3AueSAtIHRoaXMud2hsLnlcbiAgICAgICAgfTtcblx0fVxuXG5cdGdldFNob290KClcblx0e1xuICAgICAgICByZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XG5cdH1cbn1cbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmcgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6L+Y5rKh5pyJ6K6+572u5Y+l5a2Q77yBXCI7XG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIGlmKHBsYXllcl9pc19uZWFyYnkoKSl7XG4gICAgICAgICAgICB0aGlzLnNldF9zZW50ZW5jZSgpO1xuICAgICAgICAgICAgaWYodGhpcy5jbGlja190aGVfdGhpbmcoKSl7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VfaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5oaWRlX3NlbnRlbmNlKCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgVGhpbmdfbGlzdC5zcGxpY2UoQnVsbGV0X2xpc3QuaW5kZXhPZih0aGlzKSk7XG5cbiAgICB9XG5cbiAgICBzZXRfc2VudGVuY2UoKXtcbiAgICAgICAgLypcbiAgICAgICAgZ2FtZS5zZW50ZW5jZSA9IHRoaXMuc2VudGVuY2U7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgaGlkZV9zZW50ZW5jZSgpe1xuICAgICAgICAvKlxuICAgICAgICBnYW1lLnNlbnRlbmNlID0gXCJcIjtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICBwbGF5ZXJfaXNfbmVhcmJ5KCl7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjbGlja190aGVfdGhpbmcoKXtcbiAgICAgICAgLypcbiAgICAgICAgaWYoZ2FtZS5idXR0b25fY2xpY2tlZCl7XG4gICAgICAgICAgICBnYW1lLmJ1dHRvbl9jbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgdXNlX2l0KCl7XG5cbiAgICB9XG59IiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKHgxLCB4MiwgeTEsIHkyKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5UeXBlID0gXCJXYWxsXCI7XG5cbiAgICAgICAgdGhpcy54MSA9IHgxO1xuICAgICAgICB0aGlzLngyID0geDI7XG4gICAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgICAgdGhpcy55MiA9IHkyO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVlbCBleHRlbmRzIExheWEuU3ByaXRlXG57XG5cdGNvbnN0cnVjdG9yKHgseSxyKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xuXHRcdHRoaXMucGl2b3QocixyKTtcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRkZGXCIpO1xuXHRcdHRoaXMucG9zKHgseSk7XG5cdFx0dGhpcy5yPXI7XG4gICAgICAgIHRoaXMuSUQ9bnVsbDtcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcblx0XHR0aGlzLnNldHVwKCk7XG5cdH1cblxuXHRzZXR1cCgpXG5cdHtcblx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XG5cdH1cblxuXHRvblN0YXJ0RHJhZyhlKXtcblx0XHR0aGlzLklEPWUudG91Y2hJZDtcblx0XHR0aGlzLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdH1cblxuXHRvblN0b3BEcmFnKClcblx0e1xuXHRcdHRoaXMuSUQ9bnVsbDtcblx0XHR0aGlzLnNwLnBvcyh0aGlzLngsdGhpcy55KVxuXHR9XG5cblx0bW92ZVRvKHgseSlcblx0e1xuXHRcdC8vdGhpcy5zcC5wb3MoeCx5KVxuXHRcdGxldCBkeD14LXRoaXMueDtcblx0XHRsZXQgZHk9eS10aGlzLnk7XG5cblx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xuXHRcdGxldCBkeDI9Uj50aGlzLnI/IGR4KnRoaXMuci9SOiBkeDtcblx0XHRsZXQgZHkyPVI+dGhpcy5yPyBkeSp0aGlzLnIvUjogZHk7XG5cdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxuXHR9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gbW92ZVxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcblxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vdCA9IDEwO1xuXG4gICAgICAgIC8vIHNob290XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gMTtcblxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaG9vdF9jb3N0ID0gMTAwO1xuXG4gICAgICAgIHRoaXMucGl2b3QoMTYsMjQpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmFuaS5sb2FkQXRsYXMoXCJyZXMvL2F0bGFzLy9oZXJvLmF0bGFzXCIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTsgXG4gICAgfVxuXG4gICAgb25Mb2FkZWQoKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkISEhXCIpXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5hbmkpO1xuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxuICAgICAgICB0aGlzLmFuaS5pbmRleD0xO1xuICAgICAgICBmdW5jdGlvbiBnZXRVUkxzKHN0cixuKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdXJscz1bXTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2goXCJyZXNcXFxcYXRsYXNcXFxcXCIrc3RyK2krXCIucG5nXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJscztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKGdldFVSTHMoXCJoZXJvXFxcXHVwXCIsNCksXCJoZXJvX3VwXCIpO1xuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXMoZ2V0VVJMcyhcImhlcm9cXFxcZG93blwiLDQpLFwiaGVyb19kb3duXCIpO1xuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXMoZ2V0VVJMcyhcImhlcm9cXFxcbGVmdFwiLDQpLFwiaGVyb19sZWZ0XCIpO1xuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXMoZ2V0VVJMcyhcImhlcm9cXFxccmlnaHRcIiw0KSxcImhlcm9fcmlnaHRcIik7XG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKTtcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgbGV0IHZ4ID0gdGhpcy5nZXRWKCkueDtcbiAgICAgICAgbGV0IHZ5ID0gdGhpcy5nZXRWKCkueTtcblxuICAgICAgICB2eCAvPSAxMDtcbiAgICAgICAgdnkgLz0gMTA7XG5cbiAgICAgICAgLy8gbW92ZW1lbnQgY29tbWFuZCBkZXRlY3RlZFxuICAgICAgICBsZXQgdiA9IE1hdGguc3FydCh2eCAqIHZ4ICsgdnkgKiB2eSk7XG4gICAgICAgIGlmICh2ID4gMUUtNil7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB2IDw9IHZfbWF4XG4gICAgICAgICAgICBsZXQgdl9zY2FsZSA9dGhpcy52X21heCAvIHY7XG4gICAgICAgICAgICBpZih2X3NjYWxlID4gMSl7XG4gICAgICAgICAgICAgICAgdl9zY2FsZSA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWFwWCArPSB2eCAqIHZfc2NhbGU7XG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gdnkgKiB2X3NjYWxlO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cblxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgXG4gICAgICAgIC8vIFNob290aW5nIGRlbGF5XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAxMDAwMCl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zaG9vdF9jb3N0IDw9IHRoaXMuc2hvb3RfcG93ZXIgJiYgdGhpcy5zaG9vdCgpKXtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0RGlyKGR4LGR5LGxhc3Qpe1xuICAgICAgICAgICAgaWYoZHg+ZHkmJmR4Pi1keSlyZXR1cm4gXCJyaWdodFwiO1xuICAgICAgICAgICAgaWYoLWR4PmR5JiYtZHg+LWR5KXJldHVybiBcImxlZnRcIjtcbiAgICAgICAgICAgIGlmKGR5PmR4JiZkeT4tZHgpcmV0dXJuIFwiZG93blwiO1xuICAgICAgICAgICAgaWYoLWR5PmR4JiYtZHk+LWR4KXJldHVybiBcInVwXCI7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXI9Z2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cbiAgICB9XG5cbiAgICBnZXRWKCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCk7XG4gICAgfVxuXG4gICAgc2hvb3QoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0U2hvb3QoKTtcbiAgICB9XG5cbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHg6IDAsXG4gICAgICAgICAgICAgICAgZHk6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob290X2V2ZW50KCl7XG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiSGVyb19CdWxsZXRfbm9ybWFsXCIsIEhlcm9fQnVsbGV0X25vcm1hbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxufSJdfQ==
