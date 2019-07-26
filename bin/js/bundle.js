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

//Stat.show();

window.the_screen = new _Screen2.default(w, h);

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":5,"./script/Gate":6,"./script/Goblin":7,"./script/Hero":13,"./script/Hero_Bullet":14,"./script/Monster":17,"./script/Monster_Bullet":18,"./script/Monster_Bullet_huge":21,"./script/Monster_Bullet_normal":22,"./script/Screen":23,"./script/Thing":26,"./script/Wheel":27}],2:[function(require,module,exports){
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
                this.ani.visible = false;
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
                if (this.ani) {
                    this.ani.visible = true;
                }
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
        }
    }, {
        key: "rotate_v",
        value: function rotate_v(old_x, old_y, a) {
            var new_x = old_x * Math.cos(a) - old_y * Math.sin(a);
            var new_y = old_x * Math.sin(a) + old_y * Math.cos(a);

            return {
                x: new_x,
                y: new_y
            };
        }
    }, {
        key: "placeRandomly",
        value: function placeRandomly() {
            while (true) {
                var new_x = Math.random() * the_screen.mapX_max;
                var new_y = Math.random() * the_screen.mapY_max;
                if (this.reachable(new_x, new_y)) {
                    this.mapX = new_x;
                    this.mapY = new_y;
                    break;
                }
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster2 = require("./Monster");

var _Monster3 = _interopRequireDefault(_Monster2);

var _Monster_Bullet_fire_ball = require("./Monster_Bullet_fire_ball");

var _Monster_Bullet_fire_ball2 = _interopRequireDefault(_Monster_Bullet_fire_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Charizard = function (_Monster) {
    _inherits(Charizard, _Monster);

    function Charizard() {
        _classCallCheck(this, Charizard);

        var _this = _possibleConstructorReturn(this, (Charizard.__proto__ || Object.getPrototypeOf(Charizard)).call(this));

        _this.Type = "Charizard";

        _this.size(48, 48);
        _this.range = 10 * 40;
        _this.v_max = 3;

        // set picture
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        return _this;
    }

    _createClass(Charizard, [{
        key: "skill",
        value: function skill() {
            var old_x = this.direction_x;
            var old_y = this.direction_y;

            var d_a = 0.25;
            var half_N = 3;

            for (var i = -half_N; i <= half_N; i++) {
                var new_direction = this.rotate_v(old_x, old_y, i * d_a);
                this.direction_x = new_direction.x;
                this.direction_y = new_direction.y;

                var new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_fire_ball", _Monster_Bullet_fire_ball2.default);
                new_bullet.root_reset();
                new_bullet.init(this);
            }

            this.direction_x = old_x;
            this.direction_y = old_y;
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 100;
        }
    }]);

    return Charizard;
}(_Monster3.default);

exports.default = Charizard;

},{"./Monster":17,"./Monster_Bullet_fire_ball":20}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
        _this.ani.filters = [new Laya.GlowFilter("FFFFAA", 5, 0, 0)];

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
            this.difficulty = 1;
            this.ani.play(0, true, "key");
        }
    }]);

    return Gate;
}(_Thing3.default);

exports.default = Gate;

},{"./Thing":26}],7:[function(require,module,exports){
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

},{"./Monster":17}],8:[function(require,module,exports){
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
        }
    }, {
        key: "dead",
        value: function dead() {
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

},{"./Thing":26}],9:[function(require,module,exports){
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
        key: "branch_reset",
        value: function branch_reset() {
            this.leaf_reset();
        }
    }]);

    return Gun;
}(_Beings3.default);

exports.default = Gun;

},{"./Beings":2,"./Hero_Bullet_normal":16}],10:[function(require,module,exports){
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

        _this.first_waiting = 1;
        _this.second_waiting = 10;

        _this.loadImage("res/guns/gun0.png");
        Laya.stage.addChild(_this);
        _this.size(64, 32);
        _this.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2 + 14);
        _this.bullet = _Hero_Bullet_normal2.default;
        _this.bullet_type = "Hero_Bullet_normal";
        return _this;
    }

    _createClass(Gun_normal, [{
        key: "shoot",
        value: function shoot() {
            var new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
            new_bullet.root_reset();
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.pivot(2, 16);
            this.visible = true;
            this.sentence = "杀虫剂";
        }
    }]);

    return Gun_normal;
}(_Gun3.default);

exports.default = Gun_normal;

},{"./Beings":2,"./Gun":9,"./Hero_Bullet_normal":16}],11:[function(require,module,exports){
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

        _this.size(48, 48);
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
            this.HP = 100;
        }
    }]);

    return Gunner;
}(_Monster3.default);

exports.default = Gunner;

},{"./Monster":17,"./Monster_Bullet_normal":22}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

var _Shotgun = require("./Shotgun");

var _Shotgun2 = _interopRequireDefault(_Shotgun);

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
        _this.mapX = 150;
        _this.mapY = 150;

        // HP and armor
        _this.HP_max = 40;
        _this.HP = 40;
        _this.armor_max = 40;
        _this.armor = 40;
        _this.armor_count = 0;

        // shoot
        _this.shoot_power = 0;

        // show
        _this.size(48, 48);
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        _this.nearest_thing = null;

        // gun
        _this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);;
        _this.main_gun.root_reset();
        _this.alternate_gun = new Laya.Pool.getItemByClass('Shotgun', _Shotgun2.default);
        _this.alternate_gun.root_reset();
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // change gun
            var changing = the_screen.getChange();
            if (changing && !this.preChanging) {
                var tmp = this.main_gun;
                this.main_gun = this.alternate_gun;
                this.main_gun.zOrder = this.zOrder + 1;
                this.main_gun.visible = true;
                this.alternate_gun = tmp;
                this.alternate_gun.visible = false;
                this.shoot_power = 0;
                the_screen.setText(this.main_gun.sentence);
            }
            this.preChanging = changing;

            // repair armor
            if (this.armor < this.armor_max) {
                if (this.armor_count >= 60) {
                    this.armor += 2;
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
            if (this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50) {
                the_screen.setPicture("pick");
                the_screen.setText(this.nearest_thing.sentence);

                if (the_screen.getShoot()) {
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
            the_screen.shadowPauser.visible = true;
            the_screen.paused = true;
            the_screen.setText("游戏结束！\n\n 分数：" + the_screen.score, undefined, undefined, undefined, 50);
            return;
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
            this.preChanging = false;
            this.shoot_power = 0;
            this.main_gun.zOrder = this.zOrder + 1;
            this.main_gun.visible = true;
            this.alternate_gun.visible = false;
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":10,"./Hero_Bullet_normal":16,"./Monster":17,"./Shotgun":25}],14:[function(require,module,exports){
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

},{"./Bullet":3,"./Monster":17}],15:[function(require,module,exports){
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

var Hero_Bullet_huge = function (_Hero_Bullet) {
    _inherits(Hero_Bullet_huge, _Hero_Bullet);

    function Hero_Bullet_huge(vx, vy) {
        _classCallCheck(this, Hero_Bullet_huge);

        var _this = _possibleConstructorReturn(this, (Hero_Bullet_huge.__proto__ || Object.getPrototypeOf(Hero_Bullet_huge)).call(this));

        _this.v_max = 20;
        _this.Type = "Hero_Bullet_huge";

        _this.r = 20;
        _this.size(_this.r * 2, _this.r * 2);
        _this.graphics.drawCircle(_this.r, _this.r, _this.r, "#BA22AA");
        _this.filters = [new Laya.GlowFilter("#FBFFAA", 10, 0, 0)];
        return _this;
    }

    _createClass(Hero_Bullet_huge, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 50;
        }
    }, {
        key: "attack",
        value: function attack(enemy) {
            enemy.get_harm(20);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 80;
        }
    }]);

    return Hero_Bullet_huge;
}(_Hero_Bullet3.default);

exports.default = Hero_Bullet_huge;

},{"./Hero_Bullet":14}],16:[function(require,module,exports){
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
        _this.graphics.drawCircle(_this.r, _this.r, _this.r, "#B1F3BB");
        _this.filters = [new Laya.GlowFilter("#F1FF5F", 10, 0, 0)];
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

            //this.rotation=-Math.atan2(the_Hero.direction_x,the_Hero.direction_y)/Math.PI*180;
            //this.filters = [new Laya.GlowFilter("#FFFFFF", 5, 0, 0)];
        }
    }]);

    return Hero_Bullet_normal;
}(_Hero_Bullet3.default);

exports.default = Hero_Bullet_normal;

},{"./Hero_Bullet":14}],17:[function(require,module,exports){
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
                a_gate.placeRandomly();
            }

            // add score
            if (this.Type == "Gunner") {
                the_screen.score += 1;
            } else if (this.Type == "Sharpshooter") {
                the_screen.score += 3;
            } else if (this.Type == "Charizard") {
                the_screen.score += 5;
            } else if (this.Type == "wizard") {
                the_screen.score += 7;
            }
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            Monster_list.push(this);
            this.pre_dir = "right";
            this.skill_power = this.skill_cost * Math.random();
            this.ani.play(0, true, this.Type + "_right");
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

},{"./Beings":2,"./Gate":6}],18:[function(require,module,exports){
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

},{"./Bullet":3}],19:[function(require,module,exports){
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

var Monster_Bullet_curse = function (_Monster_Bullet) {
    _inherits(Monster_Bullet_curse, _Monster_Bullet);

    function Monster_Bullet_curse(vx, vy) {
        _classCallCheck(this, Monster_Bullet_curse);

        var _this = _possibleConstructorReturn(this, (Monster_Bullet_curse.__proto__ || Object.getPrototypeOf(Monster_Bullet_curse)).call(this));

        _this.Type = "Monster_Bullet_curse";

        _this.vx = vx;
        _this.vy = vy;

        // set picture
        _this.r = 30;
        _this.graphics.drawCircle(0, 0, _this.r, "#222222");
        _this.filters = [new Laya.GlowFilter("#222222", 10, 0, 0)];

        _this.v_max = 20;
        return _this;
    }

    _createClass(Monster_Bullet_curse, [{
        key: "action",
        value: function action() {
            this.HP -= 1;
            this.mapX += this.vx;
            this.mapY += this.vy;

            var attack_list = this.get_attack_list();
            this.explosion(attack_list);
        }
    }, {
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 40;
        }
    }, {
        key: "attack",
        value: function attack(enemy) {
            enemy.get_harm(1);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 400;
        }
    }]);

    return Monster_Bullet_curse;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_curse;

},{"./Monster_Bullet":18}],20:[function(require,module,exports){
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

var Monster_Bullet_fire_ball = function (_Monster_Bullet) {
    _inherits(Monster_Bullet_fire_ball, _Monster_Bullet);

    function Monster_Bullet_fire_ball(vx, vy) {
        _classCallCheck(this, Monster_Bullet_fire_ball);

        var _this = _possibleConstructorReturn(this, (Monster_Bullet_fire_ball.__proto__ || Object.getPrototypeOf(Monster_Bullet_fire_ball)).call(this));

        _this.Type = "Monster_Bullet_fire_ball";

        _this.vx = vx;
        _this.vy = vy;

        // set picture
        _this.r = 10;
        _this.graphics.drawCircle(0, 0, _this.r, "#ff4400");
        _this.filters = [new Laya.GlowFilter("#ff0000", 10, 0, 0)];
        return _this;
    }

    _createClass(Monster_Bullet_fire_ball, [{
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

    return Monster_Bullet_fire_ball;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_fire_ball;

},{"./Monster_Bullet":18}],21:[function(require,module,exports){
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
        _this.v_max = 20;

        // set picture
        _this.r = 20;
        _this.graphics.drawCircle(0, 0, _this.r, "#95ff00");
        _this.filters = [new Laya.GlowFilter("#0051ff", 10, 0, 0)];
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
            enemy.get_harm(10);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 80;
        }
    }]);

    return Monster_Bullet_huge;
}(_Monster_Bullet3.default);

exports.default = Monster_Bullet_huge;

},{"./Monster_Bullet":18}],22:[function(require,module,exports){
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
        _this.r = 10;
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

},{"./Monster_Bullet":18}],23:[function(require,module,exports){
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

var _Sharpshooter = require("./Sharpshooter");

var _Sharpshooter2 = _interopRequireDefault(_Sharpshooter);

var _wizard = require("./wizard");

var _wizard2 = _interopRequireDefault(_wizard);

var _Charizard = require("./Charizard");

var _Charizard2 = _interopRequireDefault(_Charizard);

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
		Laya.Animation.createFrames(_this.getURLs("Sharpshooter/left", 4), "Sharpshooter_left");
		Laya.Animation.createFrames(_this.getURLs("Sharpshooter/right", 4), "Sharpshooter_right");
		Laya.Animation.createFrames(_this.getURLs("wizard/left", 4), "wizard_left");
		Laya.Animation.createFrames(_this.getURLs("wizard/right", 4), "wizard_right");
		Laya.Animation.createFrames(_this.getURLs("Charizard/left", 4), "Charizard_left");
		Laya.Animation.createFrames(_this.getURLs("Charizard/right", 4), "Charizard_right");
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
			this.chg = new _Wheel2.default(this.width * 0.83, this.height * 0.55, this.width / 30);
			this.setPicture("pick");
			this.setPicture("shoot");
			this.whl.loadImage("res/atlas/wheels/whl.png");
			this.chg.loadImage("res/atlas/wheels/chg.png");
			this.whl.zOrder = 1000;
			this.atk.zOrder = 1001;
			this.chg.zOrder = 1002;
			this.whl.sp.zOrder = 1003;

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
			this.dlg.zOrder = 2001;

			this.score_Window = new Laya.Text();
			Laya.stage.addChild(this.score_Window);
			this.score_Window.pos(Laya.Browser.clientWidth / 2, 40);
			this.score_Window.size(200, 100);
			this.score_Window.pivot(100, 50);
			this.score_Window.fontSize = 20;
			this.score_Window.align = "center";
			this.score_Window.valign = "middle";
			this.score_Window.color = "#FF0000";
			this.score_Window.font = "Impact";
			this.score_Window.zOrder = 1000;

			// play music
			laya.media.SoundManager.playMusic("res/sounds/BGM.aac", 0);

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

			// HP
			this.HPWindow = new _HPWindow2.default();

			// tiny arrow
			var L = 10;
			this.tinyArrow = new Laya.Sprite();
			Laya.stage.addChild(this.tinyArrow);
			this.tinyArrow.loadImage("res/atlas/wheels/arrow.png");
			this.tinyArrow.alpha = 0.9;
			this.tinyArrow.visible = true;
			this.tinyArrow.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
			this.tinyArrow.pivot(16, 40);
			this.tinyArrow.size(32, 32);
			this.tinyArrow.zOrder = 1000;
			this.tinyArrow.filters = [new Laya.GlowFilter("#99FF99", 10, 0, 0)];

			this.score = 0;

			this.shadowPauser = new Laya.Sprite();
			Laya.stage.addChild(this.shadowPauser);
			this.shadowPauser.pos(0, 0);
			this.shadowPauser.size(this.width, this.height);
			this.shadowPauser.alpha = 0.7;
			this.shadowPauser.visible = false;
			this.shadowPauser.graphics.drawRect(0, 0, this.width, this.height, "#333333");
			this.shadowPauser.zOrder = 2000;
		}
	}, {
		key: "generate_monster",
		value: function generate_monster(monster_amount) {
			var cur_amount = 0;
			var BG = Math.floor((this.number - 1) / 5);
			if (BG > -1) {
				var _cur_amount = 0;
				while (_cur_amount < monster_amount) {
					var new_monster = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
					new_monster.root_reset();
					_cur_amount += 1;
					new_monster.placeRandomly();
				}
				_cur_amount = 0;
				var strong_monster_amount1 = Math.floor(monster_amount / 3);
				while (_cur_amount < strong_monster_amount1) {
					var _new_monster = Laya.Pool.getItemByClass("Sharpshooter", _Sharpshooter2.default);
					_new_monster.root_reset();
					_cur_amount += 1;
					_new_monster.placeRandomly();
				}
			}

			if (BG >= 1) {
				cur_amount = 0;
				var strong_monster_amount2 = Math.floor(monster_amount / 6);
				while (cur_amount < strong_monster_amount2) {
					var _new_monster2 = Laya.Pool.getItemByClass("wizard", _wizard2.default);
					_new_monster2.root_reset();
					cur_amount += 1;
					_new_monster2.placeRandomly();
				}
			}

			if (BG >= 2) {
				cur_amount = 0;
				var strong_monster_amount3 = Math.floor(monster_amount / 10);
				while (cur_amount < strong_monster_amount3) {
					var _new_monster3 = Laya.Pool.getItemByClass("Charizard", _Charizard2.default);
					_new_monster3.root_reset();
					cur_amount += 1;
					_new_monster3.placeRandomly();
				}
			}
		}
	}, {
		key: "onFrame",
		value: function onFrame() {
			if (this.paused) {
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
			this.score_Window.changeText("Score: " + this.score);

			// tiny arrow
			if (Thing_list.length == 1) {
				this.tinyArrow.visible = true;
				var dx = Thing_list[0].mapX - the_Hero.mapX;
				var dy = Thing_list[0].mapY - the_Hero.mapY;
				if (dx * dx + dy * dy > 2500) this.tinyArrow.rotation = 180 - Math.atan2(dx, dy) / Math.PI * 180;else this.tinyArrow.visible = false;
			} else this.tinyArrow.visible = false;
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(e) {
			if ((this.whl.x - e.stageX) * (this.whl.x - e.stageX) + (this.whl.y - e.stageY) * (this.whl.y - e.stageY) <= this.whl.r * this.whl.r) {
				this.whl.onStartDrag(e);
			} else if ((this.atk.x - e.stageX) * (this.atk.x - e.stageX) + (this.atk.y - e.stageY) * (this.atk.y - e.stageY) <= this.atk.r * this.atk.r) {
				this.atk.onStartDrag(e);
			} else if ((this.chg.x - e.stageX) * (this.chg.x - e.stageX) + (this.chg.y - e.stageY) * (this.chg.y - e.stageY) <= this.chg.r * this.chg.r) {
				this.chg.onStartDrag(e);
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp(e) {
			if (this.whl.ID == e.touchId) {
				this.whl.onStopDrag();
			} else if (this.atk.ID == e.touchId) {
				this.atk.onStopDrag();
			} else if (this.chg.ID == e.touchId) {
				this.chg.onStopDrag();
			}
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(e) {
			if (this.whl.ID == e.touchId) {
				this.whl.moveTo(e.stageX, e.stageY);
			} else if (this.atk.ID == e.touchId) {
				this.atk.moveTo(e.stageX, e.stageY);
			} else if (this.chg.ID == e.touchId) {
				this.chg.moveTo(e.stageX, e.stageY);
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
		key: "getChange",
		value: function getChange() {
			return this.chg.ID !== null;
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
			if (str == "shoot" && this.atk.type != "shoot") {
				var atk = this.atk;
				atk.type = "shoot";
				atk.loadImage("res/atlas/wheels/atk1.png");
			} else if (str == "pick" && this.atk.type != "pick") {
				var _atk = this.atk;
				_atk.type = "pick";
				_atk.loadImage("res/atlas/wheels/atk2.png");
			}
		}
	}, {
		key: "setText",
		value: function setText(text, color, x, y, sz) {
			if (text === undefined) text = "";
			if (color === undefined) color = "#FFFFFF";
			if (x == undefined || y === undefined) {
				x = Laya.Browser.clientWidth / 2;
				y = Laya.Browser.clientHeight * 0.45;
			}
			if (sz === undefined) sz = 20;

			this.dlg.changeText(text);
			this.dlg.color = color;
			this.dlg.pos(x, y);
			this.dlg.fontSize = sz;
			this.dlg.alpha = 1;
		}
	}, {
		key: "map_change",
		value: function map_change() {
			this.paused = true;
			var number = this.number;
			this.number += 1;

			var bg = Math.floor(number / 5);
			if (bg > 2) {
				this.shadowPauser.visible = true;
				this.paused = true;
				this.setText("游戏胜利！\n\n 分数：" + this.score, undefined, undefined, undefined, 50);
				return;
			}
			var idx = number % 3;
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
			the_Hero.placeRandomly();

			the_Hero.root_reset();
			this.atk.type = undefined;
			this.setPicture();
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

},{"./Charizard":4,"./DragPoint":5,"./Gate":6,"./Goblin":7,"./God":8,"./Gunner":11,"./HPWindow":12,"./Sharpshooter":24,"./Wheel":27,"./hero":28,"./wizard":29}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster2 = require("./Monster");

var _Monster3 = _interopRequireDefault(_Monster2);

var _Monster_Bullet_huge = require("./Monster_Bullet_huge");

var _Monster_Bullet_huge2 = _interopRequireDefault(_Monster_Bullet_huge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sharpshooter = function (_Monster) {
    _inherits(Sharpshooter, _Monster);

    function Sharpshooter() {
        _classCallCheck(this, Sharpshooter);

        var _this = _possibleConstructorReturn(this, (Sharpshooter.__proto__ || Object.getPrototypeOf(Sharpshooter)).call(this));

        _this.Type = "Sharpshooter";

        _this.size(48, 48);
        _this.range = 10 * 40;
        _this.v_max = 3;

        // set picture
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        return _this;
    }

    _createClass(Sharpshooter, [{
        key: "skill",
        value: function skill() {
            var new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_huge", _Monster_Bullet_huge2.default);
            new_bullet.root_reset();
            new_bullet.init(this);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 20;
        }
    }]);

    return Sharpshooter;
}(_Monster3.default);

exports.default = Sharpshooter;

},{"./Monster":17,"./Monster_Bullet_huge":21}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Beings = require("./Beings");

var _Beings2 = _interopRequireDefault(_Beings);

var _Hero_Bullet_huge = require("./Hero_Bullet_huge");

var _Hero_Bullet_huge2 = _interopRequireDefault(_Hero_Bullet_huge);

var _Gun2 = require("./Gun");

var _Gun3 = _interopRequireDefault(_Gun2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shotgun = function (_Gun) {
    _inherits(Shotgun, _Gun);

    function Shotgun() {
        _classCallCheck(this, Shotgun);

        var _this = _possibleConstructorReturn(this, (Shotgun.__proto__ || Object.getPrototypeOf(Shotgun)).call(this));

        _this.Type = "Shotgun";

        _this.first_waiting = 2;
        _this.second_waiting = 65;

        _this.loadImage("res/guns/gun1.png");
        Laya.stage.addChild(_this);
        _this.size(32, 32);
        _this.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2 + 14);
        _this.bullet = _Hero_Bullet_huge2.default;
        _this.bullet_type = "Hero_Bullet_huge";
        return _this;
    }

    _createClass(Shotgun, [{
        key: "shoot",
        value: function shoot() {
            var old_x = the_Hero.direction_x;
            var old_y = the_Hero.direction_y;

            var d_a = 0.25;
            var half_N = 3;

            for (var i = -half_N; i <= half_N; i++) {
                var new_direction = this.rotate_v(old_x, old_y, i * d_a);
                the_Hero.direction_x = new_direction.x;
                the_Hero.direction_y = new_direction.y;

                var new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
                new_bullet.root_reset();
            }

            the_Hero.direction_x = old_x;
            the_Hero.direction_y = old_y;
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.pivot(7, 16);
            this.visible = true;
            this.sentence = "霰弹枪";
        }
    }]);

    return Shotgun;
}(_Gun3.default);

exports.default = Shotgun;

},{"./Beings":2,"./Gun":9,"./Hero_Bullet_huge":15}],26:[function(require,module,exports){
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

},{"./Beings":2}],27:[function(require,module,exports){
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
		//this.graphics.drawCircle(r,r,r,"#FFFFFF");
		_this.pos(x, y);
		_this.r = r;
		_this.ID = null;
		_this.alpha = 0.6;
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

},{"./DragPoint":5}],28:[function(require,module,exports){
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

var _Shotgun = require("./Shotgun");

var _Shotgun2 = _interopRequireDefault(_Shotgun);

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
        _this.mapX = 150;
        _this.mapY = 150;

        // HP and armor
        _this.HP_max = 40;
        _this.HP = 40;
        _this.armor_max = 40;
        _this.armor = 40;
        _this.armor_count = 0;

        // shoot
        _this.shoot_power = 0;

        // show
        _this.size(48, 48);
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        _this.nearest_thing = null;

        // gun
        _this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);;
        _this.main_gun.root_reset();
        _this.alternate_gun = new Laya.Pool.getItemByClass('Shotgun', _Shotgun2.default);
        _this.alternate_gun.root_reset();
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // change gun
            var changing = the_screen.getChange();
            if (changing && !this.preChanging) {
                var tmp = this.main_gun;
                this.main_gun = this.alternate_gun;
                this.main_gun.zOrder = this.zOrder + 1;
                this.main_gun.visible = true;
                this.alternate_gun = tmp;
                this.alternate_gun.visible = false;
                this.shoot_power = 0;
                the_screen.setText(this.main_gun.sentence);
            }
            this.preChanging = changing;

            // repair armor
            if (this.armor < this.armor_max) {
                if (this.armor_count >= 60) {
                    this.armor += 2;
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
            if (this.nearest_thing !== null && this.get_distance(this.nearest_thing) < 50) {
                the_screen.setPicture("pick");
                the_screen.setText(this.nearest_thing.sentence);

                if (the_screen.getShoot()) {
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
            the_screen.shadowPauser.visible = true;
            the_screen.paused = true;
            the_screen.setText("游戏结束！\n\n 分数：" + the_screen.score, undefined, undefined, undefined, 50);
            return;
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;
            this.preChanging = false;
            this.shoot_power = 0;
            this.main_gun.zOrder = this.zOrder + 1;
            this.main_gun.visible = true;
            this.alternate_gun.visible = false;
            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":10,"./Hero_Bullet_normal":16,"./Monster":17,"./Shotgun":25}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Monster2 = require("./Monster");

var _Monster3 = _interopRequireDefault(_Monster2);

var _Monster_Bullet_curse = require("./Monster_Bullet_curse");

var _Monster_Bullet_curse2 = _interopRequireDefault(_Monster_Bullet_curse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wizard = function (_Monster) {
    _inherits(wizard, _Monster);

    function wizard() {
        _classCallCheck(this, wizard);

        var _this = _possibleConstructorReturn(this, (wizard.__proto__ || Object.getPrototypeOf(wizard)).call(this));

        _this.Type = "wizard";

        _this.size(48, 48);
        _this.range = 100000;
        _this.v_max = 3;
        _this.skill_cost = 30;

        // set picture
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
        return _this;
    }

    _createClass(wizard, [{
        key: "skill",
        value: function skill() {
            var new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_curse", _Monster_Bullet_curse2.default);
            new_bullet.root_reset();
            new_bullet.init(this);
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 40;
        }
    }]);

    return wizard;
}(_Monster3.default);

exports.default = wizard;

},{"./Monster":17,"./Monster_Bullet_curse":19}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2Rvd25sb2Fkcy9MYXlhQWlySURFX2JldGEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4uanMiLCJzcmMvc2NyaXB0L0JlaW5ncy5qcyIsInNyYy9zY3JpcHQvQnVsbGV0LmpzIiwic3JjL3NjcmlwdC9DaGFyaXphcmQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9Hb2QuanMiLCJzcmMvc2NyaXB0L0d1bi5qcyIsInNyYy9zY3JpcHQvR3VuX25vcm1hbC5qcyIsInNyYy9zY3JpcHQvR3VubmVyLmpzIiwic3JjL3NjcmlwdC9IUFdpbmRvdy5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2N1cnNlLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9maXJlX2JhbGwuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9TaGFycHNob290ZXIuanMiLCJzcmMvc2NyaXB0L1Nob3RndW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyIsInNyYy9zY3JpcHQvd2l6YXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7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RUFBYSxFQUFiO0FBQ0EsY0FBSyxLQUFMLEdBQWEsTUFBYjtBQUNBLGNBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxjQUFLLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUE7QUFDQSxjQUFLLEdBQUwsR0FBVyxJQUFJLEtBQUssU0FBVCxFQUFYO0FBQ0EsY0FBSyxHQUFMLENBQVMsUUFBVCxHQUFvQixHQUFwQjtBQUNBLGNBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxNQUFLLEtBQUwsR0FBVyxDQUExQixFQUE0QixNQUFLLE1BQUwsR0FBWSxDQUF4QztBQVpTO0FBYVo7Ozs7Z0NBRU07QUFDSCxnQkFBSSxhQUFhLEtBQUssSUFBTCxDQUFVLGNBQVYsQ0FBeUIsc0JBQXpCLEVBQWlELDhCQUFqRCxDQUFqQjtBQUNBLHVCQUFXLFVBQVg7QUFDQSx1QkFBVyxJQUFYLENBQWdCLElBQWhCO0FBQ0g7OztxQ0FFVztBQUNSLGlCQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0g7Ozs7RUF4QitCLGlCOztrQkFBZixNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7vy8vIOWfuuehgOeahOexu1xyXG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9CdWxsZXRcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9zY3JpcHQvSGVyb1wiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcclxuaW1wb3J0IFRoaW5nIGZyb20gXCIuL3NjcmlwdC9UaGluZ1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvSGVyb19CdWxsZXRcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vc2NyaXB0L0dhdGVcIlxyXG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL3NjcmlwdC9TY3JlZW5cIlxyXG5pbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL3NjcmlwdC9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vc2NyaXB0L1doZWVsXCJcclxuXHJcbi8vIOaJqeWFheeahOexu1xyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfaHVnZSBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZVwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXHJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vc2NyaXB0L0dvYmxpblwiXHJcblxyXG5jb25zdFxyXG5cdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXIsXHJcblx0V2ViR0wgPSBMYXlhLldlYkdMLFxyXG5cdFN0YWdlID0gTGF5YS5TdGFnZSxcclxuXHRTdGF0ID0gTGF5YS5TdGF0LFxyXG5cdEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XHJcblxyXG4vL+WIneWni+WMluW8leaTjlxyXG5MYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuXHJcbi8v5qiq5bGP5ri45oiPXHJcbkxheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuLy/nrYnmr5TkvovnvKnmlL5cclxuTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBTdGFnZS5TQ0FMRV9TSE9XQUxMO1xyXG5cclxuLy/og4zmma/popzoibJcclxuTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCIjMjMyNjI4XCI7XHJcblxyXG4vLyDop5LoibLlrrnlmahcclxud2luZG93Lk1vbnN0ZXJfbGlzdCA9IFtdO1xyXG53aW5kb3cuQnVsbGV0X2xpc3QgPSBbXTtcclxud2luZG93LldhbGxfbGlzdCA9IFtdO1xyXG53aW5kb3cuVGhpbmdfbGlzdCA9IFtdO1xyXG5cclxuLy8gc2V0IHRoZSBTY3JlZW5cclxubGV0IHcgPSBCcm93c2VyLmNsaWVudFdpZHRoO1xyXG5sZXQgaCA9IEJyb3dzZXIuY2xpZW50SGVpZ2h0O1xyXG5cclxuTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbkxheWEuc3RhZ2UuYWxpZ25IID0gU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG5cclxuLy9TdGF0LnNob3coKTtcclxuXHJcbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudFxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJvb3RfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8yKVxyXG4gICAgICAgIHRoaXMuek9yZGVyPTA7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5hbmkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnJhbmNoX3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBfZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xyXG4gICAgICAgIGlmKHRoaXMuYW5pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5kZWFkX2FjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmFuaSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkX2FjdGlvbigpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKVxyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlBvb2wucmVjb3Zlcih0aGlzLlR5cGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGVhZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRsKGR4LCBkeSl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3RfZGwodGhlX29iamVjdCl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGVfb2JqZWN0LmR4ICogdGhlX29iamVjdC5keCArIHRoZV9vYmplY3QuZHkgKiB0aGVfb2JqZWN0LmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGlzdGFuY2UoYW5vdGhlcil7XHJcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXBYIC0gYW5vdGhlci5tYXBYO1xyXG4gICAgICAgIGxldCBkeSA9IHRoaXMubWFwWSAtIGFub3RoZXIubWFwWTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kbChkeCwgZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF92ZWN0b3Jfdih2X21heCwgdGhlX3Z4LCB0aGVfdnkpe1xyXG4gICAgICAgIGxldCB0aGVfdiA9IHRoaXMuZGwodGhlX3Z4LCB0aGVfdnkpO1xyXG4gICAgICAgIGlmKHRoZV92ID4gMUUtNiAmJiB2X21heCA+IDFFLTYpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogdGhlX3Z4ICogdl9tYXgvdGhlX3YsXHJcbiAgICAgICAgICAgICAgICB2eTogdGhlX3Z5ICogdl9tYXgvdGhlX3ZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogMCxcclxuICAgICAgICAgICAgICAgIHZ5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VVJMcyhzdHIsbilcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJscz1bXTtcclxuICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goXCJyZXMvYXRsYXMvXCIrc3RyK2krXCIucG5nXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmxzO1xyXG4gICAgfVxyXG4gICAgZ2V0RGlyKGR4LGR5LGxhc3Qpe1xyXG4gICAgICAgIGlmKGR4PjApcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICBpZigtZHg+MClyZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhY2hhYmxlKG5ld19tYXBYLCBuZXdfbWFwWSl7XHJcbiAgICAgICAgbGV0IHBvaW50X3NldCA9IFtdO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICAgICAgICAgICAgICAgLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggICAgICAgICAgICAgICAsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCB0aGVfcG9pbnQgb2YgcG9pbnRfc2V0KXtcclxuICAgICAgICAgICAgb2sgJj0gdGhlX3NjcmVlbi5nZXRQYXNzKHRoZV9wb2ludC54LCB0aGVfcG9pbnQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvaztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlX2J5X2R4X2R5KGR4LCBkeSl7XHJcbiAgICAgICAgaWYoZHggPiAzMCl7XHJcbiAgICAgICAgICAgIGR4ID0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGR5ID4gMzApe1xyXG4gICAgICAgICAgICBkeSA9IDMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHggLyAyLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IGR4IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkgLyAyKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSBkeSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcm90YXRlX3Yob2xkX3gsIG9sZF95LCBhKXtcclxuICAgICAgICBsZXQgbmV3X3ggPSBvbGRfeCAqIE1hdGguY29zKGEpIC0gb2xkX3kgKiBNYXRoLnNpbihhKTtcclxuICAgICAgICBsZXQgbmV3X3kgPSBvbGRfeCAqIE1hdGguc2luKGEpICsgb2xkX3kgKiBNYXRoLmNvcyhhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBuZXdfeCxcclxuICAgICAgICAgICAgeTogbmV3X3lcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHBsYWNlUmFuZG9tbHkoKVxyXG4gICAge1xyXG4gICAgICAgIHdoaWxlKHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgbmV3X3ggPSBNYXRoLnJhbmRvbSgpICogdGhlX3NjcmVlbi5tYXBYX21heDtcclxuICAgICAgICAgICAgbGV0IG5ld195ID0gTWF0aC5yYW5kb20oKSAqIHRoZV9zY3JlZW4ubWFwWV9tYXg7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKG5ld194LCBuZXdfeSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBYID0gbmV3X3g7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFkgPSBuZXdfeTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IDE7XHJcbiAgICAgICAgdGhpcy52eSA9IDE7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIGxldCB3aWxsX2RpZSA9IHRoaXMuaGl0X3dhbGwodGhpcy52eCwgdGhpcy52eSk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgLT0gMTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodGhpcy52eCwgdGhpcy52eSlcclxuXHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gdGhpcy5nZXRfYXR0YWNrX2xpc3QoKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYod2lsbF9kaWUpe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBCdWxsZXRfbGlzdC5zcGxpY2UoQnVsbGV0X2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwbG9zaW9uKGF0dGFja19saXN0KXtcclxuICAgICAgICAvLyBleHBsb3Npb24gIVxyXG4gICAgICAgIGlmKGF0dGFja19saXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnB1c2godGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgaGl0X3dhbGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4LCB0aGlzLm1hcFkgKyBkeSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9maXJlX2JhbGwgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJpemFyZCBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJDaGFyaXphcmRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KVxyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMCAqIDQwO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAzO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBvbGRfeCA9IHRoaXMuZGlyZWN0aW9uX3g7XHJcbiAgICAgICAgbGV0IG9sZF95ID0gdGhpcy5kaXJlY3Rpb25feTtcclxuXHJcbiAgICAgICAgbGV0IGRfYSA9IDAuMjU7XHJcbiAgICAgICAgbGV0IGhhbGZfTiA9IDM7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IC1oYWxmX047IGkgPD0gaGFsZl9OOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmV3X2RpcmVjdGlvbiA9IHRoaXMucm90YXRlX3Yob2xkX3gsIG9sZF95LCBpICogZF9hKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5ld19kaXJlY3Rpb24ueDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5ld19kaXJlY3Rpb24ueTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsXCIsIE1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbCk7XHJcbiAgICAgICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG9sZF94O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBvbGRfeTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnUG9pbnQgZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9ubyBldmVudHNcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcclxuICAgICAgICB0aGlzLmFscGhhPTAuMjtcclxuXHRcdHRoaXMucj1yO1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgVGhpbmcgZnJvbSBcIi4vVGhpbmdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZSBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR2F0ZVwiXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5Y675b6A5LiL5LiA5bGCXCI7XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gMTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMucGl2b3QoMTYsMTYpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmFuaS5maWx0ZXJzPVtuZXcgTGF5YS5HbG93RmlsdGVyKFwiRkZGRkFBXCIsNSwwLDApXTtcclxuXHJcbiAgICAgICAgLyp0aGlzLnI9MTU7XHJcbiAgICAgICAgdGhpcy5waXZvdCh0aGlzLnIsdGhpcy5yKVxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSh0aGlzLnIsdGhpcy5yLHRoaXMucixcIiM5OUZGQUFcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzPVtuZXcgTGF5YS5HbG93RmlsdGVyKFwiRkZCQjAwXCIsMjAsMCwwKSxuZXcgTGF5YS5HbG93RmlsdGVyKFwiMDBCQkZGXCIsNSwwLDApXTsqL1xyXG4gICAgfVxyXG5cclxuICAgIHVzZV9pdCgpe1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkhQPS0xXHJcblxyXG4gICAgICAgIC8vIGdvIHRvIG5leHQgZmxvb3JcclxuICAgICAgICBpZih0aGVfc2NyZWVuLmRpZmZpY3VsdHkgPCB0aGlzLmRpZmZpY3VsdHkpe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLmRpZmZpY3VsdHkgPSB0aGlzLmRpZmZpY3VsdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoZV9zY3JlZW4ubWFwX2NoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLm1hcFg9MTAwO1xyXG4gICAgICAgIHRoaXMubWFwWT0xMDA7XHJcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gMTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImtleVwiKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvYmxpbiBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHb2JsaW5cIjtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDQwMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDQwMDtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjQsMC40KTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcclxuICAgIH1cclxufSIsImltcG9ydCBUaGluZyBmcm9tIFwiLi9UaGluZ1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2QgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvZFwiXHJcblxyXG4gICAgICAgIHRoaXMubWFwWCA9IDIwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAyMDA7XHJcblxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuWGkumZqeWutu+8jOS9oOmcgOimgeaMh+W8leWQl++8n1wiO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJnb2QvZG93blwiLDMpLFwiZ29kX2Rvd25cIik7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZV9pdCgpe1xyXG4gICAgICAgIC8vIGdvIHRvIG5leHQgZmxvb3JcclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLor7fpgInmi6nkuIDmiYfpl6jvvIzlt6bovrnmmK/lpKnloILvvIzlj7PovrnmmK/lnLDni7FcIlxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKFRoaW5nX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiZ29kX2Rvd25cIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW4gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMTA7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bl9ub3JtYWwgZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHdW5fbm9ybWFsXCJcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDE7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDEwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMC5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSg2NCwzMik7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKzE0KTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5waXZvdCgyLDE2KTtcclxuICAgICAgICB0aGlzLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlPVwi5p2A6Jmr5YmCXCJcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VubmVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bm5lclwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiLCBNb25zdGVyX0J1bGxldF9ub3JtYWwpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFBXaW5kb3cgZXh0ZW5kcyBMYXlhLlNwcml0ZSBcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLkhQPTA7XHJcbiAgICAgICAgdGhpcy5hcm1vcj0wO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuek9yZGVyPTEwMDA7XHJcbiAgICAgICAgdGhpcy5zaXplKDIwMCwxMjApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuSFAhPXRoZV9IZXJvLkhQfHx0aGlzLmFybW9yIT10aGVfSGVyby5hcm1vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IFRleHQ9TGF5YS5UZXh0XHJcbiAgICAgICAgICAgIHRoaXMuSFA9dGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3I9dGhlX0hlcm8uYXJtb3I7XHJcbiAgICAgICAgICAgIGxldCBsZW5fSFA9KDE2Ny03OCkvdGhlX0hlcm8uSFBfbWF4KnRoZV9IZXJvLkhQO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCwzMCxsZW5fSFAsMTcsXCIjRkZGRjAwXCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVuX2FybW9yPSgxNjctNzgpL3RoZV9IZXJvLmFybW9yX21heCp0aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSwxNjctNzgsMTcsXCIjNTU1NTU1XCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsNzksbGVuX2FybW9yLDE3LFwiI0ZGRkYwMFwiKSAgIC8vNzgsNzggIC0tLTE2Nyw5M1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZShcInJlcy9IUFdpbmRvdy9IUFdpbmRvdy5wbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5pbXBvcnQgR3VuX25vcm1hbCBmcm9tIFwiLi9HdW5fbm9ybWFsXCJcclxuaW1wb3J0IFNob3RndW4gZnJvbSBcIi4vU2hvdGd1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb1wiO1xyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuICAgICAgICB0aGlzLm1hcFggPSAxNTA7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gMTUwO1xyXG5cclxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcclxuICAgICAgICB0aGlzLkhQX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvd1xyXG4gICAgICAgIHRoaXMuc2l6ZSg0OCw0OCk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIGd1blxyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7O1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ1Nob3RndW4nLCBTaG90Z3VuKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vIGNoYW5nZSBndW5cclxuICAgICAgICBsZXQgY2hhbmdpbmc9dGhlX3NjcmVlbi5nZXRDaGFuZ2UoKTtcclxuICAgICAgICBpZihjaGFuZ2luZyYmIXRoaXMucHJlQ2hhbmdpbmcpe1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gdGhpcy5tYWluX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1biA9IHRoaXMuYWx0ZXJuYXRlX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IHRtcDtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5tYWluX2d1bi5zZW50ZW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9Y2hhbmdpbmdcclxuXHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nLnVzZV9pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2hvb3RpbmdcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJzaG9vdFwiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpICAgLy8gc2hvb3QgYnV0dG9uIGNsaWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zaG9vdF9wb3dlciAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA+PSB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAtdGhpcy5tYWluX2d1bi5zZWNvbmRfd2FpdGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb25feD49MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9OTAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTI3MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgZW5kIC0tLS0tLS0tLS8vXHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RfZXZlbnQoKXtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnNob290KCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdGluZ19zb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290aW5nX3NvdW5kKCl7XHJcblx0XHRMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJyZXMvc291bmRzL3Nob290aW5nLm1wM1wiLCAxLCBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGR4OiAwLFxyXG4gICAgICAgICAgICAgICAgZHk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2l0ZW0oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF90aGluZyA9IHRoZV90aGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdFxyXG4gICAgICAgIGlmKG5lYXJlc3RfdGhpbmcgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBuZWFyZXN0X3RoaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgICAgIHRoZV9zY3JlZW4uc2hhZG93UGF1c2VyLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGVfc2NyZWVuLnBhdXNlZD10cnVlO1xyXG4gICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dChcIua4uOaIj+e7k+adn++8gVxcblxcbiDliIbmlbDvvJpcIit0aGVfc2NyZWVuLnNjb3JlLHVuZGVmaW5lZCx1bmRlZmluZWQsdW5kZWZpbmVkLDUwKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlcj0wO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uek9yZGVyPXRoaXMuek9yZGVyKzE7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfbW9uc3Rlcikpe1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KCl7XHJcbiAgICAgICAgbGV0IHZlY3Rvcl92ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgdGhlX0hlcm8uZGlyZWN0aW9uX3gsIHRoZV9IZXJvLmRpcmVjdGlvbl95KTtcclxuICAgICAgICB0aGlzLnZ4ID0gdmVjdG9yX3Yudng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IHRoZV9IZXJvLm1hcFg7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gdGhlX0hlcm8ubWFwWTtcclxuXHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL0hlcm9fQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0X2h1Z2UgZXh0ZW5kcyBIZXJvX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAyMDtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9fQnVsbGV0X2h1Z2VcIjtcclxuXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5zaXplKHRoaXMucioyLHRoaXMucioyKVxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSh0aGlzLnIsIHRoaXMuciwgdGhpcy5yLCBcIiNCQTIyQUFcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkJGRkFBXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDUwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA4MDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5zaXplKHRoaXMucioyLHRoaXMucioyKVxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSh0aGlzLnIsIHRoaXMuciwgdGhpcy5yLCBcIiNCMUYzQkJcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRjFGRjVGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDQwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA1MDtcclxuXHJcbiAgICAgICAgLy90aGlzLnJvdGF0aW9uPS1NYXRoLmF0YW4yKHRoZV9IZXJvLmRpcmVjdGlvbl94LHRoZV9IZXJvLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAvL3RoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCA1LCAwLCAwKV07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9HYXRlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29zdCA9IDM2MDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNob290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB0aGlzLmdldF9oZXJvX29yaWVudGF0aW9uKCkuZHg7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keTtcclxuXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLHRoaXMuVHlwZStcIl9cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy53YW5kZXJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RpbmcgY29udHJvbFxyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfcG93ZXIgPCAxMDAwKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA+PSB0aGlzLnNraWxsX2Nvc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3JjZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGZ4ID0gMDtcclxuICAgICAgICBsZXQgZnkgPSAwO1xyXG5cclxuICAgICAgICBpZihNYXRoLmFicyhkeCkgPiAxRS0yKXtcclxuICAgICAgICAgICAgZnggPSAxIC8gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR5KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeSA9IDEgLyBkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZ4OiBmeCwgXHJcbiAgICAgICAgICAgIGZ5OiBmeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgd2FuZGVyaW5nKCl7XHJcbiAgICAgICAgbGV0IHYgPSB7dng6IDAsIHZ5OiAwfTtcclxuICAgICAgICBpZih0aGlzLnNob290ZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfSGVybykgPiB0aGlzLnJhbmdlIC8gMS41KXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGlzLmRpcmVjdGlvbl94LCB0aGlzLmRpcmVjdGlvbl95KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdldF9kaXN0YW5jZSh0aGVfSGVybykgPCB0aGlzLnJhbmdlIC8gMil7XHJcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgLXRoaXMuZGlyZWN0aW9uX3gsIC10aGlzLmRpcmVjdGlvbl95KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZvcmNlX2F2ZyA9IHtcclxuICAgICAgICAgICAgZng6IDAsXHJcbiAgICAgICAgICAgIGZ5OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMgIT09IHRoZV9tb25zdGVyKXtcclxuICAgICAgICAgICAgICAgIGxldCBmID0gdGhpcy5mb3JjZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBmb3JjZV9hdmcuZnggKz0gZi5meDtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meSArPSBmLmZ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihNb25zdGVyX2xpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meCAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3JjZV9hdmcuZnkgLz0gKE1vbnN0ZXJfbGlzdC5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2LnZ4ICsgZm9yY2VfYXZnLmZ4IC8gdGhpcy5tLCB2LnZ5ICsgZm9yY2VfYXZnLmZ4IC8gdGhpcy5tKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5zcGxpY2UoTW9uc3Rlcl9saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBhX2dhdGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG4gICAgICAgICAgICBhX2dhdGUucm9vdF9yZXNldCgpO1xyXG4gICAgICAgICAgICBhX2dhdGUucGxhY2VSYW5kb21seSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIHNjb3JlXHJcbiAgICAgICAgaWYodGhpcy5UeXBlID09IFwiR3VubmVyXCIpe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNjb3JlICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5UeXBlID09IFwiU2hhcnBzaG9vdGVyXCIpe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNjb3JlICs9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5UeXBlID09IFwiQ2hhcml6YXJkXCIpe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNjb3JlICs9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5UeXBlID09IFwid2l6YXJkXCIpe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNjb3JlICs9IDc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5wdXNoKHRoaXMpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgICAgIHRoaXMuc2tpbGxfcG93ZXI9dGhpcy5za2lsbF9jb3N0Kk1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLCB0cnVlLCB0aGlzLlR5cGUrXCJfcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGVyb19vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGR4OiB0aGVfSGVyby5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICBkeTogdGhlX0hlcm8ubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9IZXJvKSl7XHJcbiAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX0hlcm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQobGF1bmNoZXIpe1xyXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIGxhdW5jaGVyLmRpcmVjdGlvbl94LCBsYXVuY2hlci5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcclxuICAgICAgICB0aGlzLm1hcFggPSBsYXVuY2hlci5tYXBYO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IGxhdW5jaGVyLm1hcFk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfY3Vyc2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfY3Vyc2VcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAzMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiMyMjIyMjJcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjMjIyMjIyXCIsIDEwLCAwLCAwKV07XHJcblxyXG4gICAgICAgIHRoaXMudl9tYXggPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICB0aGlzLkhQIC09IDE7XHJcbiAgICAgICAgdGhpcy5tYXBYICs9IHRoaXMudng7XHJcbiAgICAgICAgdGhpcy5tYXBZICs9IHRoaXMudnk7XHJcblxyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IHRoaXMuZ2V0X2F0dGFja19saXN0KCk7XHJcbiAgICAgICAgdGhpcy5leHBsb3Npb24oYXR0YWNrX2xpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9maXJlX2JhbGxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAxMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNmZjQ0MDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjZmYwMDAwXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiO1xyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDIwO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiIzk1ZmYwMFwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiMwMDUxZmZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMTApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDgwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMTA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCAyMDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSg1KTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgIH1cclxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL1doZWVsXCJcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vaGVyb1wiXHJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vR29ibGluXCJcclxuaW1wb3J0IEd1bm5lciBmcm9tIFwiLi9HdW5uZXJcIlxyXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9HYXRlXCJcclxuaW1wb3J0IEhQV2luZG93IGZyb20gXCIuL0hQV2luZG93XCJcclxuaW1wb3J0IEdvZCBmcm9tIFwiLi9Hb2RcIlxyXG5pbXBvcnQgU2hhcnBzaG9vdGVyIGZyb20gXCIuL1NoYXJwc2hvb3RlclwiXHJcbmltcG9ydCB3aXphcmQgZnJvbSBcIi4vd2l6YXJkXCJcclxuaW1wb3J0IENoYXJpemFyZCBmcm9tIFwiLi9DaGFyaXphcmRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuIGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vc2NyZWVuXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih3LCBoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdHRoaXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoO1xyXG5cclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHR0aGlzLnNpemUodywgaCk7XHJcblx0XHR0aGlzLnBvcygwLCAwKTtcclxuXHRcdHRoaXMubG9hZE1hcCgpO1xyXG5cclxuXHRcdHRoaXMubnVtYmVyID0gMDtcclxuXHRcdHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcblxyXG5cdFx0dGhpcy50aW1lX2NvdW50ID0gMDtcclxuXHRcdHRoaXMudGltZV9pbnRlcnZhbCA9IDgwMDtcclxuXHJcblx0XHR0aGlzLm1hcFhfbWF4ID0gMTAwMDtcclxuXHRcdHRoaXMubWFwWV9tYXggPSAxMDAwO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm8vbGVmdFwiLCA0KSwgXCJoZXJvX2xlZnRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyby9yaWdodFwiLCA0KSwgXCJoZXJvX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImtleS9iYXNlXCIsIDQpLCBcImtleVwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJndW5uZXIvbGVmdFwiLCA0KSwgXCJHdW5uZXJfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJndW5uZXIvcmlnaHRcIiwgNCksIFwiR3VubmVyX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIlNoYXJwc2hvb3Rlci9sZWZ0XCIsIDQpLCBcIlNoYXJwc2hvb3Rlcl9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIlNoYXJwc2hvb3Rlci9yaWdodFwiLCA0KSwgXCJTaGFycHNob290ZXJfcmlnaHRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwid2l6YXJkL2xlZnRcIiwgNCksIFwid2l6YXJkX2xlZnRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwid2l6YXJkL3JpZ2h0XCIsIDQpLCBcIndpemFyZF9yaWdodFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJDaGFyaXphcmQvbGVmdFwiLCA0KSwgXCJDaGFyaXphcmRfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJDaGFyaXphcmQvcmlnaHRcIiwgNCksIFwiQ2hhcml6YXJkX3JpZ2h0XCIpO1xyXG5cdH1cclxuXHJcblx0bG9hZE1hcCgpIHtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFRpbGVkTWFwID0gTGF5YS5UaWxlZE1hcCxcclxuXHRcdFx0UmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGUsXHJcblx0XHRcdEhhbmRsZXIgPSBMYXlhLkhhbmRsZXIsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudCxcclxuXHRcdFx0QnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuXHRcdHRoaXMudGlsZWRNYXAgPSBuZXcgVGlsZWRNYXAoKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzL3RpbGVkbWFwcy9zdGFydC5qc29uXCIsIG5ldyBSZWN0YW5nbGUoMCwgMCwgQnJvd3Nlci53aWR0aCwgQnJvd3Nlci5oZWlnaHQpLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZGVkTWFwKSk7XHJcblx0fVxyXG5cclxuXHRvbkxvYWRlZE1hcCgpIHtcclxuXHRcdGNvbnN0IEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSwgdGhpcywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMub25Nb3VzZURvd24pO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9PVVQsIHRoaXMsIHRoaXMub25Nb3VzZVVQKTtcclxuXHJcblx0XHR0aGlzLndobCA9IG5ldyBXaGVlbCh0aGlzLndpZHRoIC8gNCwgdGhpcy5oZWlnaHQgKiAzIC8gNCwgdGhpcy53aWR0aCAvIDE1LCB0cnVlKTtcclxuXHRcdHRoaXMuYXRrID0gbmV3IFdoZWVsKHRoaXMud2lkdGggKiAzIC8gNCwgdGhpcy5oZWlnaHQgKiAzIC8gNCwgdGhpcy53aWR0aCAvIDE1KTtcclxuXHRcdHRoaXMuY2hnID0gbmV3IFdoZWVsKHRoaXMud2lkdGggKiAwLjgzLCB0aGlzLmhlaWdodCAqIDAuNTUsIHRoaXMud2lkdGggLyAzMCk7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG5cdFx0dGhpcy5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcblx0XHR0aGlzLndobC5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL3dobC5wbmdcIilcclxuXHRcdHRoaXMuY2hnLmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvY2hnLnBuZ1wiKVxyXG5cdFx0dGhpcy53aGwuek9yZGVyID0gMTAwMDtcclxuXHRcdHRoaXMuYXRrLnpPcmRlciA9IDEwMDE7XHJcblx0XHR0aGlzLmNoZy56T3JkZXIgPSAxMDAyO1xyXG5cdFx0dGhpcy53aGwuc3Auek9yZGVyID0gMTAwMztcclxuXHJcblx0XHR3aW5kb3cudGhlX0hlcm8gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJIZXJvXCIsIEhlcm8pO1xyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdC8vIGluaXQgdGV4dFxyXG5cdFx0dGhpcy5kbGcgPSBuZXcgTGF5YS5UZXh0KCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuZGxnKTtcclxuXHRcdHRoaXMuZGxnLnBvcygwLCAwKTtcclxuXHRcdHRoaXMuZGxnLnNpemUoMjAwLCAxMDApO1xyXG5cdFx0dGhpcy5kbGcucGl2b3QoMTAwLCA1MCk7XHJcblx0XHR0aGlzLmRsZy5mb250U2l6ZSA9IDIwO1xyXG5cdFx0dGhpcy5kbGcuYWxpZ24gPSBcImNlbnRlclwiXHJcblx0XHR0aGlzLmRsZy52YWxpZ24gPSBcIm1pZGRsZVwiXHJcblx0XHR0aGlzLmRsZy5jb2xvciA9IFwiIzAwMDAwMFwiXHJcblx0XHR0aGlzLmRsZy5mb250ID0gXCJJbXBhY3RcIjtcclxuXHRcdHRoaXMuZGxnLnpPcmRlciA9IDIwMDE7XHJcblxyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cgPSBuZXcgTGF5YS5UZXh0KCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NvcmVfV2luZG93KTtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCA0MCk7XHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5zaXplKDIwMCwgMTAwKTtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnBpdm90KDEwMCwgNTApO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuZm9udFNpemUgPSAyMDtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LmFsaWduID0gXCJjZW50ZXJcIlxyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cudmFsaWduID0gXCJtaWRkbGVcIlxyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuY29sb3IgPSBcIiNGRjAwMDBcIlxyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuZm9udCA9IFwiSW1wYWN0XCI7XHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy56T3JkZXIgPSAxMDAwO1xyXG5cclxuXHRcdC8vIHBsYXkgbXVzaWNcclxuXHRcdGxheWEubWVkaWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhcInJlcy9zb3VuZHMvQkdNLmFhY1wiLCAwKTtcclxuXHJcblx0XHQvLyBydW5cclxuXHRcdHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLm9uRnJhbWUpO1xyXG5cclxuXHRcdC8vIHN0YXJ0IGdhdGVcclxuXHRcdGxldCBnYXRlMSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcblx0XHRnYXRlMS5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0bGV0IGdhdGUyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR2F0ZVwiLCBHYXRlKTtcclxuXHRcdGdhdGUyLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRnYXRlMi5tYXBYID0gMzgwO1xyXG5cdFx0Z2F0ZTIubWFwWSA9IDEwMDtcclxuXHRcdGdhdGUyLmRpZmZpY3VsdHkgPSAzO1xyXG5cclxuXHRcdC8vIHRoZSBnb2QgYXQgaG9tZVxyXG5cdFx0bGV0IGFfZ29kID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR29kXCIsIEdvZCk7XHJcblx0XHRhX2dvZC5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0Ly8gSFBcclxuXHRcdHRoaXMuSFBXaW5kb3cgPSBuZXcgSFBXaW5kb3coKVxyXG5cclxuXHRcdC8vIHRpbnkgYXJyb3dcclxuXHRcdGxldCBMID0gMTA7XHJcblx0XHR0aGlzLnRpbnlBcnJvdyA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnRpbnlBcnJvdyk7XHJcblx0XHR0aGlzLnRpbnlBcnJvdy5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL2Fycm93LnBuZ1wiKVxyXG5cdFx0dGhpcy50aW55QXJyb3cuYWxwaGEgPSAwLjk7XHJcblx0XHR0aGlzLnRpbnlBcnJvdy52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMudGlueUFycm93LnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMik7XHJcblx0XHR0aGlzLnRpbnlBcnJvdy5waXZvdCgxNiwgNDApO1xyXG5cdFx0dGhpcy50aW55QXJyb3cuc2l6ZSgzMiwgMzIpO1xyXG5cdFx0dGhpcy50aW55QXJyb3cuek9yZGVyID0gMTAwMDtcclxuXHRcdHRoaXMudGlueUFycm93LmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiM5OUZGOTlcIiwgMTAsIDAsIDApXTtcclxuXHJcblx0XHR0aGlzLnNjb3JlID0gMDtcclxuXHJcblx0XHR0aGlzLnNoYWRvd1BhdXNlcj1uZXcgTGF5YS5TcHJpdGUoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zaGFkb3dQYXVzZXIpO1xyXG5cdFx0dGhpcy5zaGFkb3dQYXVzZXIucG9zKDAsMCk7XHJcblx0XHR0aGlzLnNoYWRvd1BhdXNlci5zaXplKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG5cdFx0dGhpcy5zaGFkb3dQYXVzZXIuYWxwaGE9MC43O1xyXG5cdFx0dGhpcy5zaGFkb3dQYXVzZXIudmlzaWJsZT1mYWxzZTtcclxuXHRcdHRoaXMuc2hhZG93UGF1c2VyLmdyYXBoaWNzLmRyYXdSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LFwiIzMzMzMzM1wiKTtcclxuXHRcdHRoaXMuc2hhZG93UGF1c2VyLnpPcmRlcj0yMDAwO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRnZW5lcmF0ZV9tb25zdGVyKG1vbnN0ZXJfYW1vdW50KXtcclxuXHRcdGxldCBjdXJfYW1vdW50ID0gMDtcclxuXHRcdGxldCBCRz1NYXRoLmZsb29yKCh0aGlzLm51bWJlci0xKSAvIDUpXHJcblx0XHRpZihCRz4tMSlcclxuXHRcdHtcclxuXHRcdFx0bGV0IGN1cl9hbW91bnQgPSAwO1xyXG5cdFx0XHR3aGlsZSAoY3VyX2Ftb3VudCA8IG1vbnN0ZXJfYW1vdW50KSB7XHJcblx0XHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR3VubmVyXCIsIEd1bm5lcik7XHJcblx0XHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5wbGFjZVJhbmRvbWx5KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y3VyX2Ftb3VudCA9IDA7XHJcblx0XHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQxID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDMpO1xyXG5cdFx0XHR3aGlsZSAoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDEpIHtcclxuXHRcdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJTaGFycHNob290ZXJcIiwgU2hhcnBzaG9vdGVyKTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5yb290X3Jlc2V0KCk7XHJcblx0XHRcdFx0Y3VyX2Ftb3VudCArPSAxO1xyXG5cdFx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihCRz49MSlcclxuXHRcdHtcclxuXHRcdFx0Y3VyX2Ftb3VudCA9IDA7XHJcblx0XHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQyID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDYpO1xyXG5cdFx0XHR3aGlsZSAoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDIpIHtcclxuXHRcdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJ3aXphcmRcIiwgd2l6YXJkKTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5yb290X3Jlc2V0KCk7XHJcblx0XHRcdFx0Y3VyX2Ftb3VudCArPSAxO1xyXG5cdFx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKEJHPj0yKVxyXG5cdFx0e1xyXG5cdFx0XHRjdXJfYW1vdW50ID0gMDtcclxuXHRcdFx0bGV0IHN0cm9uZ19tb25zdGVyX2Ftb3VudDMgPSBNYXRoLmZsb29yKG1vbnN0ZXJfYW1vdW50IC8gMTApO1xyXG5cdFx0XHR3aGlsZSAoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDMpIHtcclxuXHRcdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJDaGFyaXphcmRcIiwgQ2hhcml6YXJkKTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5yb290X3Jlc2V0KCk7XHJcblx0XHRcdFx0Y3VyX2Ftb3VudCArPSAxO1xyXG5cdFx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25GcmFtZSgpIHtcclxuXHRcdGlmICh0aGlzLnBhdXNlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5peg5bC95qih5byPXHJcblx0XHQvKlxyXG5cdFx0aWYgKHRoaXMudGltZV9jb3VudCAlIHRoaXMudGltZV9pbnRlcnZhbCA9PSAwKSB7XHJcblx0XHRcdHRoaXMuZ2VuZXJhdGVfbW9uc3RlcigpO1xyXG5cdFx0XHRpZiAodGhpcy50aW1lX2ludGVydmFsID4gMjApIHtcclxuXHRcdFx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgLT0gMjA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMudGltZV9jb3VudCArPSAxO1xyXG5cdFx0Ki9cclxuXHJcblx0XHRmb3IgKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3QpIHtcclxuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XHJcblx0XHRcdHRoZV90aGluZy51cF9kYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhlX0hlcm8udXBfZGF0ZSgpO1xyXG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY2hhbmdlVmlld1BvcnQodGhlX0hlcm8ubWFwWCAtIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIHRoZV9IZXJvLm1hcFkgLSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxyXG5cdFx0dGhpcy5IUFdpbmRvdy51cGRhdGUoKVxyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuY2hhbmdlVGV4dChcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUpO1xyXG5cclxuXHJcblx0XHQvLyB0aW55IGFycm93XHJcblx0XHRpZihUaGluZ19saXN0Lmxlbmd0aCA9PSAxKVxyXG7CoMKgwqDCoMKgwqDCoMKge1xyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqB0aGlzLnRpbnlBcnJvdy52aXNpYmxlPXRydWU7XHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoGNvbnN0IGR4PVRoaW5nX2xpc3RbMF0ubWFwWC10aGVfSGVyby5tYXBYO1xyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBjb25zdCBkeT1UaGluZ19saXN0WzBdLm1hcFktdGhlX0hlcm8ubWFwWTtcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgaWYoZHgqZHgrZHkqZHk+MjUwMClcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqB0aGlzLnRpbnlBcnJvdy5yb3RhdGlvbj0xODAtTWF0aC5hdGFuMihkeCxkeSkvTWF0aC5QSSoxODBcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgZWxzZVxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoHRoaXMudGlueUFycm93LnZpc2libGU9ZmFsc2U7XHJcbsKgwqDCoMKgwqDCoMKgwqB9XHJcbsKgwqDCoMKgwqDCoMKgwqBlbHNlIHRoaXMudGlueUFycm93LnZpc2libGU9ZmFsc2U7XHJcblx0fVxyXG5cclxuXHRvbk1vdXNlRG93bihlKSB7XHJcblx0XHRpZiAoKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKiAodGhpcy53aGwueCAtIGUuc3RhZ2VYKSArICh0aGlzLndobC55IC0gZS5zdGFnZVkpICogKHRoaXMud2hsLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy53aGwuciAqIHRoaXMud2hsLnIpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmF0ay54IC0gZS5zdGFnZVgpICsgKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5hdGsueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmF0ay5yICogdGhpcy5hdGsucikge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCh0aGlzLmNoZy54IC0gZS5zdGFnZVgpICogKHRoaXMuY2hnLnggLSBlLnN0YWdlWCkgKyAodGhpcy5jaGcueSAtIGUuc3RhZ2VZKSAqICh0aGlzLmNoZy55IC0gZS5zdGFnZVkpIDw9IHRoaXMuY2hnLnIgKiB0aGlzLmNoZy5yKSB7XHJcblx0XHRcdHRoaXMuY2hnLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZVVwKGUpIHtcclxuXHRcdGlmICh0aGlzLndobC5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5hdGsuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuY2hnLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmNoZy5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbk1vdXNlTW92ZShlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm1vdmVUbyhlLnN0YWdlWCwgZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5hdGsuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuYXRrLm1vdmVUbyhlLnN0YWdlWCwgZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5jaGcuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuY2hnLm1vdmVUbyhlLnN0YWdlWCwgZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0VmVsb3NpdHkoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiAodGhpcy53aGwuc3AueCAtIHRoaXMud2hsLngpIC8gdGhpcy53aGwucixcclxuXHRcdFx0eTogKHRoaXMud2hsLnNwLnkgLSB0aGlzLndobC55KSAvIHRoaXMud2hsLnJcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRnZXRTaG9vdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0ay5JRCAhPT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldENoYW5nZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNoZy5JRCAhPT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldFBhc3MobWFwWCwgbWFwWSkge1xyXG5cdFx0Y29uc3QgYSA9IHRoaXMudGlsZWRNYXAuZ2V0TGF5ZXJCeUluZGV4KDApLmdldFRpbGVEYXRhKE1hdGguZmxvb3IobWFwWCAvIDMyKSwgTWF0aC5mbG9vcihtYXBZIC8gMzIpKTtcclxuXHRcdGlmICh0aGlzLnRpbGVkTWFwLl9qc29uRGF0YS50aWxlc2V0c1swXS50aWxlc1thIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdLnByb3BlcnRpZXNbMF0udmFsdWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHNldFBpY3R1cmUoc3RyKSB7XHJcblx0XHRpZiAoc3RyID09IFwic2hvb3RcIiAmJiB0aGlzLmF0ay50eXBlICE9IFwic2hvb3RcIikge1xyXG5cdFx0XHRjb25zdCBhdGsgPSB0aGlzLmF0aztcclxuXHRcdFx0YXRrLnR5cGUgPSBcInNob290XCJcclxuXHRcdFx0YXRrLmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvYXRrMS5wbmdcIilcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHN0ciA9PSBcInBpY2tcIiAmJiB0aGlzLmF0ay50eXBlICE9IFwicGlja1wiKSB7XHJcblx0XHRcdGNvbnN0IGF0ayA9IHRoaXMuYXRrO1xyXG5cdFx0XHRhdGsudHlwZSA9IFwicGlja1wiXHJcblx0XHRcdGF0ay5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL2F0azIucG5nXCIpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRUZXh0KHRleHQsIGNvbG9yLCB4LCB5LCBzeikge1xyXG5cdFx0aWYgKHRleHQgPT09IHVuZGVmaW5lZCkgdGV4dCA9IFwiXCI7XHJcblx0XHRpZiAoY29sb3IgPT09IHVuZGVmaW5lZCkgY29sb3IgPSBcIiNGRkZGRkZcIjtcclxuXHRcdGlmICh4ID09IHVuZGVmaW5lZCB8fCB5ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0eCA9IExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDJcclxuXHRcdFx0eSA9IExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgKiAwLjQ1XHJcblx0XHR9XHJcblx0XHRpZiAoc3ogPT09IHVuZGVmaW5lZCkgc3ogPSAyMDtcclxuXHJcblx0XHR0aGlzLmRsZy5jaGFuZ2VUZXh0KHRleHQpO1xyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBjb2xvcjtcclxuXHRcdHRoaXMuZGxnLnBvcyh4LCB5KTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gc3o7XHJcblx0XHR0aGlzLmRsZy5hbHBoYSA9IDE7XHJcblx0fVxyXG5cclxuXHRtYXBfY2hhbmdlKCkge1xyXG5cdFx0dGhpcy5wYXVzZWQgPSB0cnVlO1xyXG5cdFx0Y29uc3QgbnVtYmVyID0gdGhpcy5udW1iZXI7XHJcblx0XHR0aGlzLm51bWJlciArPSAxO1xyXG5cdFx0XHJcblx0XHRsZXQgYmcgPSBNYXRoLmZsb29yKG51bWJlciAvIDUpO1xyXG5cdFx0aWYoYmc+MilcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5zaGFkb3dQYXVzZXIudmlzaWJsZT10cnVlO1xyXG5cdFx0XHR0aGlzLnBhdXNlZD10cnVlO1xyXG5cdFx0XHR0aGlzLnNldFRleHQoXCLmuLjmiI/og5zliKnvvIFcXG5cXG4g5YiG5pWw77yaXCIrdGhpcy5zY29yZSx1bmRlZmluZWQsdW5kZWZpbmVkLHVuZGVmaW5lZCw1MClcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGlkeCA9IG51bWJlciAlIDM7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRUaWxlZE1hcCA9IExheWEuVGlsZWRNYXAsXHJcblx0XHRcdFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQsXHJcblx0XHRcdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcblxyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLkhQID0gLTE7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XHJcblx0XHRcdHRoZV9idWxsZXQuSFAgPSAtMTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XHJcblx0XHRcdHRoZV90aGluZy5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudGlsZWRNYXAuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXMvdGlsZWRtYXBzL1wiICsgYmcgKyBpZHggKyBcIi5qc29uXCIsIG5ldyBSZWN0YW5nbGUoMCwgMCwgQnJvd3Nlci53aWR0aCwgQnJvd3Nlci5oZWlnaHQpLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZGVkTWFwMikpO1xyXG5cdH1cclxuXHJcblx0b25Mb2FkZWRNYXAyKCkge1xyXG5cdFx0dGhlX0hlcm8ucGxhY2VSYW5kb21seSgpXHJcblxyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cdFx0dGhpcy5hdGsudHlwZSA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuc2V0UGljdHVyZSgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCgwLCAwLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0XHR0aGlzLmdlbmVyYXRlX21vbnN0ZXIodGhpcy5udW1iZXIgKiB0aGlzLmRpZmZpY3VsdHkpXHJcblxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGdldFVSTHMoc3RyLCBuKSB7XHJcblx0XHRsZXQgdXJscyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpICs9IDEpIHtcclxuXHRcdFx0dXJscy5wdXNoKFwicmVzL2F0bGFzL1wiICsgc3RyICsgaSArIFwiLnBuZ1wiKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybHM7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfaHVnZSBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJwc2hvb3RlciBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJTaGFycHNob290ZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KVxyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMCAqIDQwO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAzO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiLCBNb25zdGVyX0J1bGxldF9odWdlKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9odWdlIGZyb20gXCIuL0hlcm9fQnVsbGV0X2h1Z2VcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG90Z3VuIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiU2hvdGd1blwiXHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDI7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDY1O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMS5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiwzMik7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMisxNCk7XHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9odWdlO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X2h1Z2VcIlxyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG9sZF94ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3g7XHJcbiAgICAgICAgbGV0IG9sZF95ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3k7XHJcblxyXG4gICAgICAgIGxldCBkX2EgPSAwLjI1O1xyXG4gICAgICAgIGxldCBoYWxmX04gPSAzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAtaGFsZl9OOyBpIDw9IGhhbGZfTjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5ld19kaXJlY3Rpb24gPSB0aGlzLnJvdGF0ZV92KG9sZF94LCBvbGRfeSwgaSAqIGRfYSk7XHJcbiAgICAgICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl94ID0gbmV3X2RpcmVjdGlvbi54O1xyXG4gICAgICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feSA9IG5ld19kaXJlY3Rpb24ueTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feCA9IG9sZF94O1xyXG4gICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl95ID0gb2xkX3k7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMucGl2b3QoNywxNik7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZT1cIumcsOW8ueaeqlwiXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmcgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6L+Y5rKh5pyJ6K6+572u5Y+l5a2Q77yBXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKFRoaW5nX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxyXG4gICAgICAgIHRoaXMuSFA9MTtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlZWwgZXh0ZW5kcyBMYXlhLlNwcml0ZVxyXG57XHJcblx0Y29uc3RydWN0b3IoeCx5LHIsaGFzU3ApXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xyXG5cdFx0dGhpcy5waXZvdChyLHIpO1xyXG5cdFx0Ly90aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRkZGXCIpO1xyXG5cdFx0dGhpcy5wb3MoeCx5KTtcclxuXHRcdHRoaXMucj1yO1xyXG4gICAgICAgIHRoaXMuSUQ9bnVsbDtcclxuICAgICAgICB0aGlzLmFscGhhPTAuNjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0XHR0aGlzLmhhc1NwPWhhc1NwO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xyXG5cdH1cclxuXHJcblx0b25TdGFydERyYWcoZSl7XHJcblx0XHR0aGlzLklEPWUudG91Y2hJZDtcclxuXHRcdHRoaXMubW92ZVRvKGUuc3RhZ2VYLGUuc3RhZ2VZKTtcclxuXHR9XHJcblxyXG5cdG9uU3RvcERyYWcoKVxyXG5cdHtcclxuXHRcdHRoaXMuSUQ9bnVsbDtcclxuXHRcdGlmKHRoaXMuaGFzU3ApXHJcblx0XHRcdHRoaXMuc3AucG9zKHRoaXMueCx0aGlzLnkpXHJcblx0fVxyXG5cclxuXHRtb3ZlVG8oeCx5KVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuaGFzU3ApXHJcblx0XHR7XHJcblx0XHRcdGxldCBkeD14LXRoaXMueDtcclxuXHRcdFx0bGV0IGR5PXktdGhpcy55O1xyXG5cclxuXHRcdFx0bGV0IFI9TWF0aC5zcXJ0KGR4KmR4K2R5KmR5KTtcclxuXHRcdFx0bGV0IGR4Mj1SPnRoaXMucj8gZHgqdGhpcy5yL1I6IGR4O1xyXG5cdFx0XHRsZXQgZHkyPVI+dGhpcy5yPyBkeSp0aGlzLnIvUjogZHk7XHJcblx0XHRcdHRoaXMuc3AucG9zKHRoaXMueCtkeDIsdGhpcy55K2R5MilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi9TaG90Z3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvXCI7XHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDE1MDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxNTA7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG9vdFxyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG93XHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZ3VuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTs7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnU2hvdGd1bicsIFNob3RndW4pO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gY2hhbmdlIGd1blxyXG4gICAgICAgIGxldCBjaGFuZ2luZz10aGVfc2NyZWVuLmdldENoYW5nZSgpO1xyXG4gICAgICAgIGlmKGNoYW5naW5nJiYhdGhpcy5wcmVDaGFuZ2luZyl7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLm1haW5fZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuID0gdGhpcy5hbHRlcm5hdGVfZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnpPcmRlcj10aGlzLnpPcmRlcisxO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gdG1wO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm1haW5fZ3VuLnNlbnRlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1jaGFuZ2luZ1xyXG5cclxuICAgICAgICAvLyByZXBhaXIgYXJtb3JcclxuICAgICAgICBpZih0aGlzLmFybW9yIDwgdGhpcy5hcm1vcl9tYXgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFybW9yX2NvdW50ID49IDYwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3IgKz0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS55O1xyXG4gICAgICAgIGxldCB2PXRoaXMuZGwodngsdnkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2eCAqIHRoaXMudl9tYXgsIHZ5ICogdGhpcy52X21heCk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8gZ2V0IG5lYXJlc3RfdGhpbmdcclxuICAgICAgICB0aGlzLmNoZWNraXRlbSgpO1xyXG5cclxuICAgICAgICAvLyB1c2luZyBnb29kc1xyXG4gICAgICAgIGlmKHRoaXMubmVhcmVzdF90aGluZyAhPT0gbnVsbCAmJiB0aGlzLmdldF9kaXN0YW5jZSh0aGlzLm5lYXJlc3RfdGhpbmcpIDwgNTApe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5uZWFyZXN0X3RoaW5nLnNlbnRlbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcudXNlX2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaG9vdGluZ1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInNob290XCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSkgICAvLyBzaG9vdCBidXR0b24gY2xpY2tlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnNob290X3Bvd2VyICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID49IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbl94Pj0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9MTtcclxuICAgICAgICAgICAgbGV0IGFyZz05MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9MjcwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdF9ldmVudCgpe1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcclxuICAgICAgICB0aGlzLnNob290aW5nX3NvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3Rpbmdfc291bmQoKXtcclxuXHRcdExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInJlcy9zb3VuZHMvc2hvb3RpbmcubXAzXCIsIDEsIG5ldyBMYXlhLkhhbmRsZXIodGhpcywgdGhpcy5vbkNvbXBsZXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNraXRlbSgpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZyk7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3RoaW5nID0gdGhlX3RoaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0XHJcbiAgICAgICAgaWYobmVhcmVzdF90aGluZyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG5lYXJlc3RfdGhpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gdGhpcy5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICAgICAgdGhlX3NjcmVlbi5zaGFkb3dQYXVzZXIudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoZV9zY3JlZW4ucGF1c2VkPXRydWU7XHJcbiAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KFwi5ri45oiP57uT5p2f77yBXFxuXFxuIOWIhuaVsO+8mlwiK3RoZV9zY3JlZW4uc2NvcmUsdW5kZWZpbmVkLHVuZGVmaW5lZCx1bmRlZmluZWQsNTApXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1mYWxzZTtcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyPTA7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2N1cnNlIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X2N1cnNlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHdpemFyZCBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJ3aXphcmRcIjtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KVxyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMDAwMDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbCA9IDEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X2N1cnNlXCIsIE1vbnN0ZXJfQnVsbGV0X2N1cnNlKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgIH1cclxufVxyXG4iXX0=
