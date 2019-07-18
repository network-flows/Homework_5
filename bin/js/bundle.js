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
            this.visible = false;
            this.dead();

            //Laya.Pool.recover(String("the class name", this.owner));
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
        value: function dead() {}

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

        _this.pivot(50, 50);
        _this.graphics.drawRect(0, 0, 100, 100, "#FFFF00");
        return _this;
    }

    _createClass(Hero, [{
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
            console.log(nearest_monster_orientation);
            if (this.Object_dl(nearest_monster_orientation) > 1E-6) {
                this.direction_x = nearest_monster_orientation.dx;
                this.direction_y = nearest_monster_orientation.dy;
            } else if (v > 1E-6) {
                this.direction_x = vx;
                this.direction_y = vy;
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
            var new_bullet = new _Hero_Bullet_normal2.default();
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
        value: function dead() {
            // Laya.Pool.recover("Monster_Bullet_huge", this.owner);
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
        value: function dead() {}
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

        _this.pivot(50, 50);
        _this.graphics.drawRect(0, 0, 100, 100, "#FFFF00");
        return _this;
    }

    _createClass(Hero, [{
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
            console.log(nearest_monster_orientation);
            if (this.Object_dl(nearest_monster_orientation) > 1E-6) {
                this.direction_x = nearest_monster_orientation.dx;
                this.direction_y = nearest_monster_orientation.dy;
            } else if (v > 1E-6) {
                this.direction_x = vx;
                this.direction_y = vy;
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
            var new_bullet = new _Hero_Bullet_normal2.default();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9IZXJvLmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9TY3JlZW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XYWxsLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElBR0MsUUFBUSxLQUFLLEtBSGQ7QUFBQSxJQUlDLE9BQU8sS0FBSyxJQUpiO0FBQUEsSUFLQyxVQUFVLEtBQUssT0FMaEI7O0FBT0E7OztBQVpBO0FBZEM7QUEyQkQs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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXN0IsZ0JBQUcsb0JBQW9CLElBQXZCLEVBQTRCO0FBQ3hCLHVCQUFNO0FBQ0Ysd0JBQUksZ0JBQWdCLElBQWhCLEdBQXVCLEtBQUssSUFEOUI7QUFFRix3QkFBSSxnQkFBZ0IsSUFBaEIsR0FBdUIsS0FBSztBQUY5QixpQkFBTjtBQUlILGFBTEQsTUFNSTtBQUNBLHVCQUFPO0FBQ0gsd0JBQUksQ0FERDtBQUVILHdCQUFJO0FBRkQsaUJBQVA7QUFJSDtBQUNKOzs7c0NBRVk7QUFDVCxnQkFBSSxhQUFhLElBQUksNEJBQUosRUFBakI7QUFDQSxvQkFBUSxHQUFSLENBQVksUUFBWjtBQUNIOzs7K0JBRUssQ0FFTDs7OztFQS9HNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcbmltcG9ydCBXYWxsIGZyb20gXCIuL3NjcmlwdC9XYWxsXCJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXG5pbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL3NjcmlwdC9EcmFnUG9pbnRcIlxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXG5cbi8vIOaJqeWFheeahOexu1xuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vc2NyaXB0L0dvYmxpblwiXG5cbmNvbnN0XG5cdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXIsXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxuXHRTdGF0ID0gTGF5YS5TdGF0LFxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xuXG4vL+WIneWni+WMluW8leaTjlxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XG5cbi8v5qiq5bGP5ri45oiPXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcblxuLy/nrYnmr5TkvovnvKnmlL5cbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcblxuLy/og4zmma/popzoibJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xuXG4vLyBzZXQgdGhlIFNjcmVlblxubGV0IHcgPSBCcm93c2VyLmNsaWVudFdpZHRoO1xubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcblxuTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcblxuU3RhdC5zaG93KCk7XG5cbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTtcblxuLy8g6KeS6Imy5a655ZmoXG53aW5kb3cuTW9uc3Rlcl9saXN0ID0gW107XG53aW5kb3cuQnVsbGV0X2xpc3QgPSBbXTtcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcbndpbmRvdy5UaGluZ19saXN0ID0gW107IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVpbmdzIGV4dGVuZHMgTGF5YS5TcHJpdGUge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5IUCA9IDE7XG4gICAgICAgIHRoaXMubWFwWCA9IDA7XG4gICAgICAgIHRoaXMubWFwWSA9IDA7XG4gICAgICAgIC8vdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBfZGF0ZSgpe1xuICAgICAgICB0aGlzLnggPSB0aGlzLm1hcFggLSB0aGVfSGVyby5tYXBYICsgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzI7XG4gICAgICAgIHRoaXMueSA9IHRoaXMubWFwWSAtIHRoZV9IZXJvLm1hcFkgKyBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzI7XG5cbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xuICAgICAgICAgICAgdGhpcy5kZWFkX2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVhZF9hY3Rpb24oKXtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVhZCgpO1xuXG4gICAgICAgIC8vTGF5YS5Qb29sLnJlY292ZXIoU3RyaW5nKFwidGhlIGNsYXNzIG5hbWVcIiwgdGhpcy5vd25lcikpO1xuICAgIH1cblxuICAgIGRlYWQoKXtcblxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJlaW5ncyBhY3Rpb25cIilcbiAgICB9XG5cbiAgICBkbChkeCwgZHkpe1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xuICAgIH1cblxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGVfb2JqZWN0LmR4ICogdGhlX29iamVjdC5keCArIHRoZV9vYmplY3QuZHkgKiB0aGVfb2JqZWN0LmR5KTtcbiAgICB9XG5cbiAgICBnZXRfZGlzdGFuY2UoYW5vdGhlcil7XG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xuICAgICAgICByZXR1cm4gdGhpcy5kbChkeCwgZHkpO1xuICAgIH1cblxuICAgIGdldF92ZWN0b3Jfdih2X21heCwgdGhlX3Z4LCB0aGVfdnkpe1xuICAgICAgICBsZXQgdGhlX3YgPSB0aGlzLmRsKHRoZV92eCwgdGhlX3Z5KTtcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgdng6IHRoZV92eCAqIHZfbWF4L3RoZV92LFxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgdng6IDAsXG4gICAgICAgICAgICAgICAgdnk6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy52eCA9IDE7XG4gICAgICAgIHRoaXMudnkgPSAxO1xuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XG5cbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xuXG4gICAgICAgIHRoaXMubWFwWCArPSB0aGlzLnZ4O1xuICAgICAgICB0aGlzLm1hcFkgKz0gdGhpcy52eTtcblxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxuXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xuICAgICAgICAvLyBleHBsb3Npb24gIVxuICAgICAgICBpZihhdHRhY2tfbGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGF0dGFja1wiKTtcblxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdQb2ludCBleHRlbmRzIExheWEuU3ByaXRlICAvL25vIGV2ZW50c1xue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkYwMFwiKTtcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XG5cdFx0dGhpcy5yPXI7XG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcblx0fVxufSIsImltcG9ydCBUaGluZyBmcm9tIFwiLi9UaGluZ1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuaYr+WQpuWOu+W+gOS4i+S4gOWxgu+8n1wiO1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXG5cbiAgICB9XG59XG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSFAgPSAxO1xuXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBtb3ZlXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xuXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxuICAgICAgICB0aGlzLkhQX21heCA9IDEwO1xuICAgICAgICB0aGlzLmFybW9yX21heCA9IDEwO1xuICAgICAgICB0aGlzLmFybW90ID0gMTA7XG5cbiAgICAgICAgLy8gc2hvb3RcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IDE7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xuXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAxMDAwO1xuICAgICAgICB0aGlzLnNob290X2Nvc3QgPSAxMDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBpdm90KDUwLDUwKVxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDAsMCwxMDAsMTAwLFwiI0ZGRkYwMFwiKVxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgbGV0IHZ4ID0gdGhpcy5nZXRWKCkueDtcbiAgICAgICAgbGV0IHZ5ID0gdGhpcy5nZXRWKCkueTtcblxuICAgICAgICB2eCAvPSAxMDtcbiAgICAgICAgdnkgLz0gMTA7XG5cbiAgICAgICAgLy8gbW92ZW1lbnQgY29tbWFuZCBkZXRlY3RlZFxuICAgICAgICBsZXQgdiA9IE1hdGguc3FydCh2eCAqIHZ4ICsgdnkgKiB2eSk7XG4gICAgICAgIGlmICh2ID4gMUUtNil7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB2IDw9IHZfbWF4XG4gICAgICAgICAgICBsZXQgdl9zY2FsZSA9dGhpcy52X21heCAvIHY7XG4gICAgICAgICAgICBpZih2X3NjYWxlID4gMSl7XG4gICAgICAgICAgICAgICAgdl9zY2FsZSA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWFwWCArPSB2eCAqIHZfc2NhbGU7XG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gdnkgKiB2X3NjYWxlO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cblxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgXG4gICAgICAgIC8vIFNob290aW5nIGRlbGF5XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAxMDAwMCl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zaG9vdF9jb3N0IDw9IHRoaXMuc2hvb3RfcG93ZXIgJiYgdGhpcy5zaG9vdCgpKXtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKVxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG4gICAgfVxuXG4gICAgZ2V0Vigpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpO1xuICAgIH1cblxuICAgIHNob290KCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFNob290KCk7XG4gICAgfVxuXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgIGR5OiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdF9ldmVudCgpe1xuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IG5ldyBIZXJvX0J1bGxldF9ub3JtYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG59IiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoZV9IZXJvLmRpcmVjdGlvbl94LCB0aGVfSGVyby5kaXJlY3Rpb25feSk7XG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xuICAgICAgICB0aGlzLm1hcFggPSB0aGVfSGVyby5tYXBYO1xuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG59XG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBIZXJvX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuMSwwLjEpO1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVyb19CdWxsZXRfbm9ybWFsIGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuSFAgLT0gMjA7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICAvLyBMYXlhLlBvb2wucmVjb3ZlcihcIkhlcm9fQnVsbGV0X25vcm1hbFwiLCB0aGlzLm93bmVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBNb25zdGVyX2xpc3QucHVzaCh0aGlzKVxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxuICAgIFxuICAgIGRlYWQoKXtcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSk7XG4gICAgfVxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX2hlcm8pKXtcbiAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX2hlcm8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXQgYXR0YWNrXCIpO1xuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZSBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDIwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgLy8gTGF5YS5Qb29sLnJlY292ZXIoXCJNb25zdGVyX0J1bGxldF9odWdlXCIsIHRoaXMub3duZXIpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCAyMDtcbiAgICB9XG5cbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuSFAgLT0gMTA7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICBcbiAgICB9XG59XG5cbiIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9XaGVlbFwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vR29ibGluXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxue1xuXHRjb25zdHJ1Y3Rvcih3LGgpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdGNvbnN0IFxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XG5cdFx0dGhpcy53PXc7XG5cdFx0dGhpcy5oPWg7XG5cblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdHRoaXMuc2l6ZSh3LGgpO1xuXHRcdHRoaXMucG9zKDAsMCk7XG5cdFx0dGhpcy5sb2FkTWFwKCk7XG5cdH1cblxuXHRsb2FkTWFwKClcblx0e1xuXHRcdGNvbnN0IFxuXHRcdFx0VGlsZWRNYXA9TGF5YS5UaWxlZE1hcCxcblx0XHRcdFJlY3RhbmdsZT1MYXlhLlJlY3RhbmdsZSxcblx0XHRcdEhhbmRsZXI9TGF5YS5IYW5kbGVyLFxuXHRcdFx0RXZlbnQ9TGF5YS5FdmVudCxcblx0XHRcdEJyb3dzZXI9TGF5YS5Ccm93c2VyO1xuXHRcdHRoaXMudGlsZWRNYXA9bmV3IFRpbGVkTWFwKCk7XG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXNcXFxcdGlsZWRtYXBzXFxcXHRlc3QuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSxIYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWRNYXApKTtcblx0fVxuXG5cdG9uTG9hZGVkTWFwKClcblx0e1xuXHRcdGNvbnNvbGUubG9nKFwib2tcIilcblx0XHRjb25zdCBFdmVudD1MYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLm9uTW91c2VVcCk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLHRoaXMsdGhpcy5vbk1vdXNlTW92ZSk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm9uTW91c2VVUCk7XG5cblx0XHR0aGlzLndobD1uZXcgV2hlZWwodGhpcy53LzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xuICAgICAgICB0aGlzLmF0az1uZXcgV2hlZWwodGhpcy53KjMvNCx0aGlzLmgqMy80LHRoaXMudy8xNSk7XG5cdFx0dGhpcy5hdGsuYWxwaGE9MC44O1xuXG5cdFx0d2luZG93LnRoZV9IZXJvID0gbmV3IEhlcm8oKTtcblxuXHRcdC8vIHRlc3Rcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLm9uRnJhbWUpO1xuXG5cdFx0bGV0IG1vbnN0ZXJfdGVzdDEgPSBuZXcgR29ibGluKCk7XG5cdFx0bW9uc3Rlcl90ZXN0MS5tYXBYID0gMTAwO1xuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWSA9IDEwMDtcblx0fVxuXG5cdG9uRnJhbWUoKSB7XG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XG5cdFx0XHR0aGVfbW9uc3Rlci51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcblx0XHRcdHRoZV9idWxsZXQudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3QpIHtcblx0XHRcdHRoZV93YWxsLnVwX2RhdGUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcblx0XHRcdHRoZV90aGluZy51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoZV9IZXJvLnVwX2RhdGUoKTtcblx0XHR0aGVfSGVyby5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KHRoZV9IZXJvLm1hcFgtTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsdGhlX0hlcm8ubWFwWS1MYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIsTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXG5cdH1cblxuXHRvbk1vdXNlRG93bihlKXtcblx0XHRpZigodGhpcy53aGwueC1lLnN0YWdlWCkqKHRoaXMud2hsLngtZS5zdGFnZVgpKyh0aGlzLndobC55LWUuc3RhZ2VZKSoodGhpcy53aGwueS1lLnN0YWdlWSk8PXRoaXMud2hsLnIqdGhpcy53aGwucilcblx0XHR7XG5cdFx0XHR0aGlzLndobC5vblN0YXJ0RHJhZyhlKTtcblx0XHR9XG5cdFx0ZWxzZSBpZigodGhpcy5hdGsueC1lLnN0YWdlWCkqKHRoaXMuYXRrLngtZS5zdGFnZVgpKyh0aGlzLmF0ay55LWUuc3RhZ2VZKSoodGhpcy5hdGsueS1lLnN0YWdlWSk8PXRoaXMuYXRrLnIqdGhpcy5hdGsucilcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5vblN0YXJ0RHJhZyhlKTtcblx0XHR9XG5cdH1cblx0b25Nb3VzZVVwKGUpXG5cdHtcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmF0ay5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcblx0XHR9XG5cdH1cblx0b25Nb3VzZU1vdmUoZSlcblx0e1xuXHRcdGlmKHRoaXMud2hsLklEPT1lLnRvdWNoSWQpXG5cdFx0e1xuXHRcdFx0dGhpcy53aGwubW92ZVRvKGUuc3RhZ2VYLGUuc3RhZ2VZKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmF0ay5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMuYXRrLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VmVsb3NpdHkoKVxuXHR7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4IDogdGhpcy53aGwuc3AueCAtIHRoaXMud2hsLngsXG4gICAgICAgICAgICB5IDogdGhpcy53aGwuc3AueSAtIHRoaXMud2hsLnlcbiAgICAgICAgfTtcblx0fVxuXG5cdGdldFNob290KClcblx0e1xuICAgICAgICByZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XG5cdH1cbn1cbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmcgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6L+Y5rKh5pyJ6K6+572u5Y+l5a2Q77yBXCI7XG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIGlmKHBsYXllcl9pc19uZWFyYnkoKSl7XG4gICAgICAgICAgICB0aGlzLnNldF9zZW50ZW5jZSgpO1xuICAgICAgICAgICAgaWYodGhpcy5jbGlja190aGVfdGhpbmcoKSl7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VfaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5oaWRlX3NlbnRlbmNlKCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0X3NlbnRlbmNlKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGdhbWUuc2VudGVuY2UgPSB0aGlzLnNlbnRlbmNlO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIGhpZGVfc2VudGVuY2UoKXtcbiAgICAgICAgLypcbiAgICAgICAgZ2FtZS5zZW50ZW5jZSA9IFwiXCI7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcGxheWVyX2lzX25lYXJieSgpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xpY2tfdGhlX3RoaW5nKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGlmKGdhbWUuYnV0dG9uX2NsaWNrZWQpe1xuICAgICAgICAgICAgZ2FtZS5idXR0b25fY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuXG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeDIsIHkxLCB5Mil7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy54MSA9IHgxO1xuICAgICAgICB0aGlzLngyID0geDI7XG4gICAgICAgIHRoaXMueTEgPSB5MTtcbiAgICAgICAgdGhpcy55MiA9IHkyO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuXG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICBcbiAgICB9XG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVlbCBleHRlbmRzIExheWEuU3ByaXRlXG57XG5cdGNvbnN0cnVjdG9yKHgseSxyKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xuXHRcdHRoaXMucGl2b3QocixyKTtcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRkZGXCIpO1xuXHRcdHRoaXMucG9zKHgseSk7XG5cdFx0dGhpcy5yPXI7XG4gICAgICAgIHRoaXMuSUQ9bnVsbDtcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcblx0XHR0aGlzLnNldHVwKCk7XG5cdH1cblxuXHRzZXR1cCgpXG5cdHtcblx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XG5cdH1cblxuXHRvblN0YXJ0RHJhZyhlKXtcblx0XHR0aGlzLklEPWUudG91Y2hJZDtcblx0XHR0aGlzLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdH1cblxuXHRvblN0b3BEcmFnKClcblx0e1xuXHRcdHRoaXMuSUQ9bnVsbDtcblx0XHR0aGlzLnNwLnBvcyh0aGlzLngsdGhpcy55KVxuXHR9XG5cblx0bW92ZVRvKHgseSlcblx0e1xuXHRcdC8vdGhpcy5zcC5wb3MoeCx5KVxuXHRcdGxldCBkeD14LXRoaXMueDtcblx0XHRsZXQgZHk9eS10aGlzLnk7XG5cblx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xuXHRcdGxldCBkeDI9Uj50aGlzLnI/IGR4KnRoaXMuci9SOiBkeDtcblx0XHRsZXQgZHkyPVI+dGhpcy5yPyBkeSp0aGlzLnIvUjogZHk7XG5cdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxuXHR9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gbW92ZVxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcblxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vdCA9IDEwO1xuXG4gICAgICAgIC8vIHNob290XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gMTtcblxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaG9vdF9jb3N0ID0gMTAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5waXZvdCg1MCw1MClcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgwLDAsMTAwLDEwMCxcIiNGRkZGMDBcIilcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XG5cbiAgICAgICAgdnggLz0gMTA7XG4gICAgICAgIHZ5IC89IDEwO1xuXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuICAgICAgICBpZiAodiA+IDFFLTYpe1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xuICAgICAgICAgICAgaWYodl9zY2FsZSA+IDEpe1xuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gdnggKiB2X3NjYWxlO1xuICAgICAgICAgICAgdGhpcy5tYXBZICs9IHZ5ICogdl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIFxuICAgICAgICAvLyBTaG9vdGluZyBkZWxheVxuICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMTAwMDApe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfY29zdCA8PSB0aGlzLnNob290X3Bvd2VyICYmIHRoaXMuc2hvb3QoKSl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbilcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuICAgIH1cblxuICAgIGdldFYoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKTtcbiAgICB9XG5cbiAgICBzaG9vdCgpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRTaG9vdCgpO1xuICAgIH1cblxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkeDogMCxcbiAgICAgICAgICAgICAgICBkeTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3RfZXZlbnQoKXtcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBuZXcgSGVyb19CdWxsZXRfbm9ybWFsKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxufSJdfQ==
