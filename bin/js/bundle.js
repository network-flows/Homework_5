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

        _this.HP = 100;

        // set picture
        _this.loadImage("./orz.jpg").scale(0.4, 0.4);
        return _this;
    }

    _createClass(Goblin, [{
        key: "action",
        value: function action() {}
    }, {
        key: "dead",
        value: function dead() {}
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
        value: function dead() {}
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
        value: function dead() {
            // Laya.Pool.recover("Monster_Bullet_normal", this.owner);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9IZXJvLmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9TY3JlZW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XYWxsLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElBR0MsUUFBUSxLQUFLLEtBSGQ7QUFBQSxJQUlDLE9BQU8sS0FBSyxJQUpiO0FBQUEsSUFLQyxVQUFVLEtBQUssT0FMaEI7O0FBT0E7OztBQVpBO0FBZEM7QUEyQkQs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QUFXN0IsZ0JBQUcsb0JBQW9CLElBQXZCLEVBQTRCO0FBQ3hCLHVCQUFNO0FBQ0Ysd0JBQUksZ0JBQWdCLElBQWhCLEdBQXVCLEtBQUssSUFEOUI7QUFFRix3QkFBSSxnQkFBZ0IsSUFBaEIsR0FBdUIsS0FBSztBQUY5QixpQkFBTjtBQUlILGFBTEQsTUFNSTtBQUNBLHVCQUFPO0FBQ0gsd0JBQUksQ0FERDtBQUVILHdCQUFJO0FBRkQsaUJBQVA7QUFJSDtBQUNKOzs7c0NBRVk7QUFDVCxnQkFBSSxhQUFhLElBQUksNEJBQUosRUFBakI7QUFDQSxvQkFBUSxHQUFSLENBQVksUUFBWjtBQUNIOzs7K0JBRUssQ0FFTDs7OztFQS9HNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcbmltcG9ydCBXYWxsIGZyb20gXCIuL3NjcmlwdC9XYWxsXCJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXG5pbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL3NjcmlwdC9EcmFnUG9pbnRcIlxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXG5cbi8vIOaJqeWFheeahOexu1xuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vc2NyaXB0L0dvYmxpblwiXG5cbmNvbnN0XG5cdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXIsXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxuXHRTdGF0ID0gTGF5YS5TdGF0LFxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xuXG4vL+WIneWni+WMluW8leaTjlxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XG5cbi8v5qiq5bGP5ri45oiPXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcblxuLy/nrYnmr5TkvovnvKnmlL5cbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcblxuLy/og4zmma/popzoibJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xuXG4vLyBzZXQgdGhlIFNjcmVlblxubGV0IHcgPSBCcm93c2VyLmNsaWVudFdpZHRoO1xubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcblxuTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcblxuU3RhdC5zaG93KCk7XG5cbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTtcblxuLy8g6KeS6Imy5a655ZmoXG5cbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcbndpbmRvdy5CdWxsZXRfbGlzdCA9IFtdO1xud2luZG93LldhbGxfbGlzdCA9IFtdO1xud2luZG93LlRoaW5nX2xpc3QgPSBbXTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcblxuICAgICAgICB0aGlzLkhQID0gMTtcbiAgICAgICAgdGhpcy5tYXBYID0gMDtcbiAgICAgICAgdGhpcy5tYXBZID0gMDtcbiAgICAgICAgLy90aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB1cF9kYXRlKCl7XG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5tYXBZIC0gdGhlX0hlcm8ubWFwWSArIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMjtcblxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFkX2FjdGlvbigpe1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZWFkKCk7XG5cbiAgICAgICAgLy9MYXlhLlBvb2wucmVjb3ZlcihTdHJpbmcoXCJ0aGUgY2xhc3MgbmFtZVwiLCB0aGlzLm93bmVyKSk7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVpbmdzIGFjdGlvblwiKVxuICAgIH1cblxuICAgIGRsKGR4LCBkeSl7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICpkeSk7XG4gICAgfVxuXG4gICAgT2JqZWN0X2RsKHRoZV9vYmplY3Qpe1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xuICAgIH1cblxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXBYIC0gYW5vdGhlci5tYXBYO1xuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XG4gICAgfVxuXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XG4gICAgICAgIGxldCB0aGVfdiA9IHRoaXMuZGwodGhlX3Z4LCB0aGVfdnkpO1xuICAgICAgICBpZih0aGVfdiA+IDFFLTYgJiYgdl9tYXggPiAxRS02KXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICB2eDogdGhlX3Z4ICogdl9tYXgvdGhlX3YsXG4gICAgICAgICAgICAgICAgdnk6IHRoZV92eSAqIHZfbWF4L3RoZV92XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICB2eDogMCxcbiAgICAgICAgICAgICAgICB2eTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnZ4ID0gMTtcbiAgICAgICAgdGhpcy52eSA9IDE7XG4gICAgICAgIHRoaXMudl9tYXggPSAxMDtcblxuICAgICAgICBCdWxsZXRfbGlzdC5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICB0aGlzLkhQIC09IDE7XG5cbiAgICAgICAgdGhpcy5tYXBYICs9IHRoaXMudng7XG4gICAgICAgIHRoaXMubWFwWSArPSB0aGlzLnZ5O1xuXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IHRoaXMuZ2V0X2F0dGFja19saXN0KCk7XG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG5cbiAgICB9XG5cbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgZWxlbWVudHMgdG8gYmUgYXR0YWNrXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGV4cGxvc2lvbihhdHRhY2tfbGlzdCl7XG4gICAgICAgIC8vIGV4cGxvc2lvbiAhXG4gICAgICAgIGlmKGF0dGFja19saXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGhpcy5IUCA9IC0xO1xuICAgICAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGF0dGFja19saXN0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0dGFjayhlbGVtZW50KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJCdWxsZXQgYXR0YWNrXCIpO1xuXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXG57XG5cdGNvbnN0cnVjdG9yKHgseSxyKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xuXHRcdHRoaXMucGl2b3QocixyKTtcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xuICAgICAgICB0aGlzLnBvcyh4LHkpO1xuICAgICAgICB0aGlzLmFscGhhPTAuMjtcblx0XHR0aGlzLnI9cjtcblx0XHR0aGlzLm1vdXNlVGhyb3VnaD10cnVlO1xuXHR9XG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZSBleHRlbmRzIFRoaW5ne1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5piv5ZCm5Y675b6A5LiL5LiA5bGC77yfXCI7XG4gICAgfVxuXG4gICAgdXNlX2l0KCl7XG4gICAgICAgIC8vIGdvIHRvIG5leHQgZmxvb3JcblxuICAgIH1cbn1cbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2JsaW4gZXh0ZW5kcyBNb25zdGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcblxuICAgICAgICAvLyBzZXQgcGljdHVyZVxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjQsMC40KTtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cbiAgICBcbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gbW92ZVxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcblxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vdCA9IDEwO1xuXG4gICAgICAgIC8vIHNob290XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gMTtcblxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaG9vdF9jb3N0ID0gMTAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5waXZvdCg1MCw1MClcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgwLDAsMTAwLDEwMCxcIiNGRkZGMDBcIilcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XG5cbiAgICAgICAgdnggLz0gMTA7XG4gICAgICAgIHZ5IC89IDEwO1xuXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuICAgICAgICBpZiAodiA+IDFFLTYpe1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xuICAgICAgICAgICAgaWYodl9zY2FsZSA+IDEpe1xuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gdnggKiB2X3NjYWxlO1xuICAgICAgICAgICAgdGhpcy5tYXBZICs9IHZ5ICogdl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIFxuICAgICAgICAvLyBTaG9vdGluZyBkZWxheVxuICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMTAwMDApe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2hvb3RfY29zdCA8PSB0aGlzLnNob290X3Bvd2VyICYmIHRoaXMuc2hvb3QoKSl7XG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbilcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuICAgIH1cblxuICAgIGdldFYoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKTtcbiAgICB9XG5cbiAgICBzaG9vdCgpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRTaG9vdCgpO1xuICAgIH1cblxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkeDogMCxcbiAgICAgICAgICAgICAgICBkeTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3RfZXZlbnQoKXtcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBuZXcgSGVyb19CdWxsZXRfbm9ybWFsKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xuICAgICAgICB0aGlzLnZ4ID0gdmVjdG9yX3Yudng7XG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcbiAgICAgICAgdGhpcy5tYXBZID0gdGhlX0hlcm8ubWFwWTtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfbW9uc3Rlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xuICAgIH1cblxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcbiAgICAgICAgXG4gICAgfVxufVxuIiwiaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL0hlcm9fQnVsbGV0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXR7XG4gICAgY29uc3RydWN0b3IodngsIHZ5KXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xuICAgICAgICBcblxuICAgICAgICB0aGlzLkhQID0gNDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcblxuICAgICAgICAvLyBzZXQgcGljdHVyZVxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjEsMC4xKTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcm9fQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDIwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgLy8gTGF5YS5Qb29sLnJlY292ZXIoXCJIZXJvX0J1bGxldF9ub3JtYWxcIiwgdGhpcy5vd25lcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cbiAgICBcbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9oZXJvKSl7XG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9oZXJvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0IGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcblxuICAgICAgICB0aGlzLkhQID0gNDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X2h1Z2UgYXR0YWNrXCIpO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5IUCAtPSAyMDtcbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIC8vIExheWEuUG9vbC5yZWNvdmVyKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiLCB0aGlzLm93bmVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcblxuICAgICAgICB0aGlzLkhQID0gNDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LkhQIC09IDEwO1xuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgLy8gTGF5YS5Qb29sLnJlY292ZXIoXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIiwgdGhpcy5vd25lcik7XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vaGVyb1wiXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL0dvYmxpblwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9zY3JlZW5cbntcblx0Y29uc3RydWN0b3IodyxoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdHRoaXMudz13O1xuXHRcdHRoaXMuaD1oO1xuXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcblx0XHR0aGlzLnNpemUodyxoKTtcblx0XHR0aGlzLnBvcygwLDApO1xuXHRcdHRoaXMubG9hZE1hcCgpO1xuXHR9XG5cblx0bG9hZE1hcCgpXG5cdHtcblx0XHRjb25zdCBcblx0XHRcdFRpbGVkTWFwPUxheWEuVGlsZWRNYXAsXG5cdFx0XHRSZWN0YW5nbGU9TGF5YS5SZWN0YW5nbGUsXG5cdFx0XHRIYW5kbGVyPUxheWEuSGFuZGxlcixcblx0XHRcdEV2ZW50PUxheWEuRXZlbnQsXG5cdFx0XHRCcm93c2VyPUxheWEuQnJvd3Nlcjtcblx0XHR0aGlzLnRpbGVkTWFwPW5ldyBUaWxlZE1hcCgpO1xuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzXFxcXHRpbGVkbWFwc1xcXFx0ZXN0Lmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkTWFwKSk7XG5cdH1cblxuXHRvbkxvYWRlZE1hcCgpXG5cdHtcblx0XHRjb25zb2xlLmxvZyhcIm9rXCIpXG5cdFx0Y29uc3QgRXZlbnQ9TGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Nb3VzZURvd24pO1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5vbk1vdXNlVVApO1xuXG5cdFx0dGhpcy53aGw9bmV3IFdoZWVsKHRoaXMudy80LHRoaXMuaCozLzQsdGhpcy53LzE1KTtcbiAgICAgICAgdGhpcy5hdGs9bmV3IFdoZWVsKHRoaXMudyozLzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xuXHRcdHRoaXMuYXRrLmFscGhhPTAuODtcblxuXHRcdHdpbmRvdy50aGVfSGVybyA9IG5ldyBIZXJvKCk7XG5cblx0XHQvLyB0ZXN0XG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkZyYW1lKTtcblxuXHRcdGxldCBtb25zdGVyX3Rlc3QxID0gbmV3IEdvYmxpbigpO1xuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWCA9IDEwMDtcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFkgPSAxMDA7XG5cdH1cblxuXHRvbkZyYW1lKCkge1xuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdGhlX3dhbGwgb2YgV2FsbF9saXN0KSB7XG5cdFx0XHR0aGVfd2FsbC51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XG5cdFx0XHR0aGVfdGhpbmcudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMik7XG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYLUxheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLHRoZV9IZXJvLm1hcFktTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yLExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCxMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxuXHR9XG5cblx0b25Nb3VzZURvd24oZSl7XG5cdFx0aWYoKHRoaXMud2hsLngtZS5zdGFnZVgpKih0aGlzLndobC54LWUuc3RhZ2VYKSsodGhpcy53aGwueS1lLnN0YWdlWSkqKHRoaXMud2hsLnktZS5zdGFnZVkpPD10aGlzLndobC5yKnRoaXMud2hsLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoKHRoaXMuYXRrLngtZS5zdGFnZVgpKih0aGlzLmF0ay54LWUuc3RhZ2VYKSsodGhpcy5hdGsueS1lLnN0YWdlWSkqKHRoaXMuYXRrLnktZS5zdGFnZVkpPD10aGlzLmF0ay5yKnRoaXMuYXRrLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VVcChlKVxuXHR7XG5cdFx0aWYodGhpcy53aGwuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLndobC5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VNb3ZlKGUpXG5cdHtcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMud2hsLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHRcdH1cblx0fVxuXG5cdGdldFZlbG9zaXR5KClcblx0e1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeCA6IHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54LFxuICAgICAgICAgICAgeSA6IHRoaXMud2hsLnNwLnkgLSB0aGlzLndobC55XG4gICAgICAgIH07XG5cdH1cblxuXHRnZXRTaG9vdCgpXG5cdHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXRrLklEICE9PSBudWxsO1xuXHR9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICBpZihwbGF5ZXJfaXNfbmVhcmJ5KCkpe1xuICAgICAgICAgICAgdGhpcy5zZXRfc2VudGVuY2UoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuY2xpY2tfdGhlX3RoaW5nKCkpe1xuICAgICAgICAgICAgICAgIHRoaXMudXNlX2l0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaGlkZV9zZW50ZW5jZSgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNldF9zZW50ZW5jZSgpe1xuICAgICAgICAvKlxuICAgICAgICBnYW1lLnNlbnRlbmNlID0gdGhpcy5zZW50ZW5jZTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICBoaWRlX3NlbnRlbmNlKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGdhbWUuc2VudGVuY2UgPSBcIlwiO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHBsYXllcl9pc19uZWFyYnkoKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNsaWNrX3RoZV90aGluZygpe1xuICAgICAgICAvKlxuICAgICAgICBpZihnYW1lLmJ1dHRvbl9jbGlja2VkKXtcbiAgICAgICAgICAgIGdhbWUuYnV0dG9uX2NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICB1c2VfaXQoKXtcblxuICAgIH1cbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGwgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoeDEsIHgyLCB5MSwgeTIpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgICB0aGlzLnkxID0geTE7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlZWwgZXh0ZW5kcyBMYXlhLlNwcml0ZVxue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkZGRlwiKTtcblx0XHR0aGlzLnBvcyh4LHkpO1xuXHRcdHRoaXMucj1yO1xuICAgICAgICB0aGlzLklEPW51bGw7XG4gICAgICAgIHRoaXMuYWxwaGE9MC4yO1xuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XG5cdFx0dGhpcy5zZXR1cCgpO1xuXHR9XG5cblx0c2V0dXAoKVxuXHR7XG5cdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xuXHR9XG5cblx0b25TdGFydERyYWcoZSl7XG5cdFx0dGhpcy5JRD1lLnRvdWNoSWQ7XG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHR9XG5cblx0b25TdG9wRHJhZygpXG5cdHtcblx0XHR0aGlzLklEPW51bGw7XG5cdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcblx0fVxuXG5cdG1vdmVUbyh4LHkpXG5cdHtcblx0XHQvL3RoaXMuc3AucG9zKHgseSlcblx0XHRsZXQgZHg9eC10aGlzLng7XG5cdFx0bGV0IGR5PXktdGhpcy55O1xuXG5cdFx0bGV0IFI9TWF0aC5zcXJ0KGR4KmR4K2R5KmR5KTtcblx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XG5cdFx0bGV0IGR5Mj1SPnRoaXMucj8gZHkqdGhpcy5yL1I6IGR5O1xuXHRcdHRoaXMuc3AucG9zKHRoaXMueCtkeDIsdGhpcy55K2R5Milcblx0fVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIG1vdmVcbiAgICAgICAgdGhpcy52X21heCA9IDU7XG5cbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcblxuICAgICAgICAvLyBzaG9vdFxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gMTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XG5cbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDEwMDA7XG4gICAgICAgIHRoaXMuc2hvb3RfY29zdCA9IDEwMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGl2b3QoNTAsNTApXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoMCwwLDEwMCwxMDAsXCIjRkZGRjAwXCIpXG4gICAgfVxuXG4gICAgYWN0aW9uKCl7XG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xuICAgICAgICBsZXQgdnggPSB0aGlzLmdldFYoKS54O1xuICAgICAgICBsZXQgdnkgPSB0aGlzLmdldFYoKS55O1xuXG4gICAgICAgIHZ4IC89IDEwO1xuICAgICAgICB2eSAvPSAxMDtcblxuICAgICAgICAvLyBtb3ZlbWVudCBjb21tYW5kIGRldGVjdGVkXG4gICAgICAgIGxldCB2ID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcbiAgICAgICAgaWYgKHYgPiAxRS02KXtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHYgPD0gdl9tYXhcbiAgICAgICAgICAgIGxldCB2X3NjYWxlID10aGlzLnZfbWF4IC8gdjtcbiAgICAgICAgICAgIGlmKHZfc2NhbGUgPiAxKXtcbiAgICAgICAgICAgICAgICB2X3NjYWxlID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IHZ4ICogdl9zY2FsZTtcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSB2eSAqIHZfc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xuICAgICAgICBcbiAgICAgICAgLy8gU2hvb3RpbmcgZGVsYXlcbiAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDEwMDAwKXtcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNob290X2Nvc3QgPD0gdGhpcy5zaG9vdF9wb3dlciAmJiB0aGlzLnNob290KCkpe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XG4gICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cbiAgICB9XG5cbiAgICBnZXRWKCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCk7XG4gICAgfVxuXG4gICAgc2hvb3QoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0U2hvb3QoKTtcbiAgICB9XG5cbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHg6IDAsXG4gICAgICAgICAgICAgICAgZHk6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob290X2V2ZW50KCl7XG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gbmV3IEhlcm9fQnVsbGV0X25vcm1hbCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNob290IVwiKVxuICAgIH1cblxuICAgIGRlYWQoKXtcblxuICAgIH1cbn0iXX0=
