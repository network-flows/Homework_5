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
            this.HP = 20;
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
        _this.second_waiting = 3;

        _this.loadImage("res/guns/gun0.png");
        Laya.stage.addChild(_this);
        _this.size(64, 32);
        _this.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
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
            this.pivot(8, 16);
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
        _this.size(32, 48);
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
                console.log(this.main_gun.sentence);
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
            if (!this.reachable(this.mapX, this.mapY)) console.log("bad thing happened now");
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
        _this.r = 40;
        _this.graphics.drawCircle(0, 0, _this.r, "#222222");
        _this.filters = [new Laya.GlowFilter("#222222", 10, 0, 0)];

        _this.v_max = 0.1;
        return _this;
    }

    _createClass(Monster_Bullet_curse, [{
        key: "attackable",
        value: function attackable(the_enemy) {
            return this.get_distance(the_enemy) < 60;
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
        _this.graphics.drawCircle(0, 0, _this.r, "#123456");
        _this.filters = [new Laya.GlowFilter("#123456", 10, 0, 0)];
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
        _this.graphics.drawCircle(0, 0, _this.r, "#F1F200");
        _this.filters = [new Laya.GlowFilter("#F1F2FF", 10, 0, 0)];
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
			this.dlg.zOrder = 1000;

			this.score = 0;
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

			// HP
			this.HPWindow = new _HPWindow2.default();
		}
	}, {
		key: "generate_monster",
		value: function generate_monster(monster_amount) {
			monster_amount = 10;
			var cur_amount = 0;
			while (cur_amount < monster_amount) {
				var new_monster = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
				new_monster.root_reset();
				cur_amount += 1;
				new_monster.placeRandomly();
			}

			cur_amount = 0;
			var strong_monster_amount1 = Math.floor(monster_amount / 5);
			while (cur_amount < strong_monster_amount1) {
				var _new_monster = Laya.Pool.getItemByClass("Sharpshooter", _Sharpshooter2.default);
				_new_monster.root_reset();
				cur_amount += 1;
				_new_monster.placeRandomly();
			}

			cur_amount = 0;
			var strong_monster_amount2 = Math.floor(monster_amount / 5);
			while (cur_amount < strong_monster_amount2) {
				var _new_monster2 = Laya.Pool.getItemByClass("wizard", _wizard2.default);
				_new_monster2.root_reset();
				cur_amount += 1;
				_new_monster2.placeRandomly();
			}

			cur_amount = 0;
			var strong_monster_amount3 = Math.floor(monster_amount / 5);
			while (cur_amount < strong_monster_amount3) {
				var _new_monster3 = Laya.Pool.getItemByClass("Charizard", _Charizard2.default);
				_new_monster3.root_reset();
				cur_amount += 1;
				_new_monster3.placeRandomly();
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
			//Laya.Tween.to(this.dlg,{alpha:0,y:this.dlg.y-100,fontSize:this.dlg.fontSize*2},1000)
		}
	}, {
		key: "map_change",
		value: function map_change() {
			this.paused = true;
			var number = this.number;
			this.number += 1;

			var bg = Math.floor(number / 15);
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
        _this.second_waiting = 50;

        _this.loadImage("res/guns/gun1.png");
        //this.graphics.drawRect(0,0,this.width,this.height,"#FFFF00");
        Laya.stage.addChild(_this);
        _this.size(32, 32);
        _this.pos(Laya.Browser.clientWidth / 2, Laya.Browser.clientHeight / 2);
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
            this.pivot(7, 15);
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
        _this.size(32, 48);
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
                console.log(this.main_gun.sentence);
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
        _this.range = 10 * 40;
        _this.v_max = 3;

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
            new_bullet.mapX = the_Hero.mapX;
            new_bullet.mapY = the_Hero.mapY;
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {
            this.HP = 20;
        }
    }]);

    return wizard;
}(_Monster3.default);

exports.default = wizard;

},{"./Monster":17,"./Monster_Bullet_curse":19}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2Rvd25sb2Fkcy9MYXlhQWlySURFX2JldGEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4uanMiLCJzcmMvc2NyaXB0L0JlaW5ncy5qcyIsInNyYy9zY3JpcHQvQnVsbGV0LmpzIiwic3JjL3NjcmlwdC9DaGFyaXphcmQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9Hb2QuanMiLCJzcmMvc2NyaXB0L0d1bi5qcyIsInNyYy9zY3JpcHQvR3VuX25vcm1hbC5qcyIsInNyYy9zY3JpcHQvR3VubmVyLmpzIiwic3JjL3NjcmlwdC9IUFdpbmRvdy5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2N1cnNlLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9maXJlX2JhbGwuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9TaGFycHNob290ZXIuanMiLCJzcmMvc2NyaXB0L1Nob3RndW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyIsInNyYy9zY3JpcHQvd2l6YXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7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LFFBQUwsQ0FBYyxPQUFkLEdBQXNCLElBQXRCO0FBQ0EsaUJBQUssYUFBTCxDQUFtQixPQUFuQixHQUEyQixLQUEzQjtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsQ0FBZCxFQUFnQixJQUFoQixFQUFxQixZQUFyQjtBQUNBLGlCQUFLLE9BQUwsR0FBYSxPQUFiO0FBQ0g7Ozs7RUFoTzZCLGdCOztrQkFBYixJOzs7Ozs7Ozs7OztBQ1ByQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLHNCQUFhO0FBQUE7O0FBQUE7O0FBRVQsY0FBSyxJQUFMLEdBQVksUUFBWjs7QUFFQSxjQUFLLElBQUwsQ0FBVSxFQUFWLEVBQWEsRUFBYjtBQUNBLGNBQUssS0FBTCxHQUFhLEtBQUssRUFBbEI7QUFDQSxjQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBO0FBQ0EsY0FBSyxHQUFMLEdBQVcsSUFBSSxLQUFLLFNBQVQsRUFBWDtBQUNBLGNBQUssR0FBTCxDQUFTLFFBQVQsR0FBa0IsR0FBbEI7QUFDQSxjQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsTUFBSyxLQUFMLEdBQVcsQ0FBMUIsRUFBNEIsTUFBSyxNQUFMLEdBQVksQ0FBeEM7QUFYUztBQVlaOzs7O2dDQUVNO0FBQ0gsZ0JBQUksYUFBYSxLQUFLLElBQUwsQ0FBVSxjQUFWLENBQXlCLHNCQUF6QixFQUFpRCw4QkFBakQsQ0FBakI7QUFDQSx1QkFBVyxVQUFYO0FBQ0EsdUJBQVcsSUFBWCxDQUFnQixJQUFoQjtBQUNBLHVCQUFXLElBQVgsR0FBa0IsU0FBUyxJQUEzQjtBQUNBLHVCQUFXLElBQVgsR0FBa0IsU0FBUyxJQUEzQjtBQUNIOzs7cUNBRVc7QUFDUixpQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNIOzs7O0VBekIrQixpQjs7a0JBQWYsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCLvu78vLyDln7rnoYDnmoTnsbtcclxuaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9zY3JpcHQvQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vc2NyaXB0L0hlcm9cIlxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9zY3JpcHQvTW9uc3RlclwiXHJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0hlcm9fQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldFwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcclxuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9zY3JpcHQvU2NyZWVuXCJcclxuaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9zY3JpcHQvRHJhZ1BvaW50XCJcclxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXHJcblxyXG4vLyDmianlhYXnmoTnsbtcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL3NjcmlwdC9Hb2JsaW5cIlxyXG5cclxuY29uc3RcclxuXHRCcm93c2VyID0gTGF5YS5Ccm93c2VyLFxyXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcclxuXHRTdGFnZSA9IExheWEuU3RhZ2UsXHJcblx0U3RhdCA9IExheWEuU3RhdCxcclxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5cclxuLy/liJ3lp4vljJblvJXmk45cclxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcblxyXG4vL+aoquWxj+a4uOaIj1xyXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcclxuXHJcbi8v562J5q+U5L6L57yp5pS+XHJcbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcclxuXHJcbi8v6IOM5pmv6aKc6ImyXHJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xyXG5cclxuLy8g6KeS6Imy5a655ZmoXHJcbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcclxud2luZG93LkJ1bGxldF9saXN0ID0gW107XHJcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcclxud2luZG93LlRoaW5nX2xpc3QgPSBbXTtcclxuXHJcbi8vIHNldCB0aGUgU2NyZWVuXHJcbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcclxubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcclxuXHJcbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHJcblN0YXQuc2hvdygpO1xyXG5cclxud2luZG93LnRoZV9zY3JlZW4gPSBuZXcgU2NyZWVuKHcsIGgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaW5ncyBleHRlbmRzIExheWEuU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDEwMDtcclxuXHJcbiAgICAgICAgLy8gY29sbGlzaW9uIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiQmVpbmdzXCI7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgICAgIC8vIG1vdmVtZW50XHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IDE7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgcm9vdF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5waXZvdCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLzIpXHJcbiAgICAgICAgdGhpcy56T3JkZXI9MDtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icmFuY2hfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cF9kYXRlKCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5tYXBYIC0gdGhlX0hlcm8ubWFwWCArIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMubWFwWSAtIHRoZV9IZXJvLm1hcFkgKyBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzI7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWRfYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5kZWFkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XHJcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XHJcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcclxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiAwLFxyXG4gICAgICAgICAgICAgICAgdnk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcbiAgICBnZXREaXIoZHgsZHksbGFzdCl7XHJcbiAgICAgICAgaWYoZHg+MClyZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIGlmKC1keD4wKXJldHVybiBcImxlZnRcIjtcclxuICAgICAgICByZXR1cm4gbGFzdDtcclxuICAgIH1cclxuXHJcbiAgICByZWFjaGFibGUobmV3X21hcFgsIG5ld19tYXBZKXtcclxuICAgICAgICBsZXQgcG9pbnRfc2V0ID0gW107XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggICAgICAgICAgICAgICAsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAgICAgICAgICAgICAgICwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IHRoZV9wb2ludCBvZiBwb2ludF9zZXQpe1xyXG4gICAgICAgICAgICBvayAmPSB0aGVfc2NyZWVuLmdldFBhc3ModGhlX3BvaW50LngsIHRoZV9wb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVfYnlfZHhfZHkoZHgsIGR5KXtcclxuICAgICAgICBpZihkeCA+IDMwKXtcclxuICAgICAgICAgICAgZHggPSAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZHkgPiAzMCl7XHJcbiAgICAgICAgICAgIGR5ID0gMzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCwgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWCArPSBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCAvIDIsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHggLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSAvIDIpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5IC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByb3RhdGVfdihvbGRfeCwgb2xkX3ksIGEpe1xyXG4gICAgICAgIGxldCBuZXdfeCA9IG9sZF94ICogTWF0aC5jb3MoYSkgLSBvbGRfeSAqIE1hdGguc2luKGEpO1xyXG4gICAgICAgIGxldCBuZXdfeSA9IG9sZF94ICogTWF0aC5zaW4oYSkgKyBvbGRfeSAqIE1hdGguY29zKGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG5ld194LFxyXG4gICAgICAgICAgICB5OiBuZXdfeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VSYW5kb21seSgpXHJcbiAgICB7XHJcbiAgICAgICAgd2hpbGUodHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfeCA9IE1hdGgucmFuZG9tKCkgKiB0aGVfc2NyZWVuLm1hcFhfbWF4O1xyXG4gICAgICAgICAgICBsZXQgbmV3X3kgPSBNYXRoLnJhbmRvbSgpICogdGhlX3NjcmVlbi5tYXBZX21heDtcclxuICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUobmV3X3gsIG5ld195KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFggPSBuZXdfeDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwWSA9IG5ld195O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gMTtcclxuICAgICAgICB0aGlzLnZ5ID0gMTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHdpbGxfZGllID0gdGhpcy5oaXRfd2FsbCh0aGlzLnZ4LCB0aGlzLnZ5KTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh0aGlzLnZ4LCB0aGlzLnZ5KVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih3aWxsX2RpZSl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgZWxlbWVudHMgdG8gYmUgYXR0YWNrXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xyXG4gICAgICAgIC8vIGV4cGxvc2lvbiAhXHJcbiAgICAgICAgaWYoYXR0YWNrX2xpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGF0dGFja19saXN0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbGVtZW50KXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBoaXRfd2FsbChkeCwgZHkpe1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSArIGR5KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9maXJlX2JhbGxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcml6YXJkIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkNoYXJpemFyZFwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG9sZF94ID0gdGhpcy5kaXJlY3Rpb25feDtcclxuICAgICAgICBsZXQgb2xkX3kgPSB0aGlzLmRpcmVjdGlvbl95O1xyXG5cclxuICAgICAgICBsZXQgZF9hID0gMC4yNTtcclxuICAgICAgICBsZXQgaGFsZl9OID0gMztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gLWhhbGZfTjsgaSA8PSBoYWxmX047IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfZGlyZWN0aW9uID0gdGhpcy5yb3RhdGVfdihvbGRfeCwgb2xkX3ksIGkgKiBkX2EpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmV3X2RpcmVjdGlvbi54O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmV3X2RpcmVjdGlvbi55O1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9maXJlX2JhbGxcIiwgTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsKTtcclxuICAgICAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gb2xkX3g7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG9sZF95O1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMucG9zKHgseSk7XHJcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XHJcblx0XHR0aGlzLnI9cjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0fVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdhdGVcIlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuWOu+W+gOS4i+S4gOWxglwiO1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnBpdm90KDE2LDE2KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5hbmkuZmlsdGVycz1bbmV3IExheWEuR2xvd0ZpbHRlcihcIkZGRkZBQVwiLDUsMCwwKV07XHJcblxyXG4gICAgICAgIC8qdGhpcy5yPTE1O1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy5yLHRoaXMucilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLHRoaXMucix0aGlzLnIsXCIjOTlGRkFBXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycz1bbmV3IExheWEuR2xvd0ZpbHRlcihcIkZGQkIwMFwiLDIwLDAsMCksbmV3IExheWEuR2xvd0ZpbHRlcihcIjAwQkJGRlwiLDUsMCwwKV07Ki9cclxuICAgIH1cclxuXHJcbiAgICB1c2VfaXQoKXtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5IUD0tMVxyXG5cclxuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXHJcbiAgICAgICAgaWYodGhlX3NjcmVlbi5kaWZmaWN1bHR5IDwgdGhpcy5kaWZmaWN1bHR5KXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5kaWZmaWN1bHR5ID0gdGhpcy5kaWZmaWN1bHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGVfc2NyZWVuLm1hcF9jaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5tYXBYPTEwMDtcclxuICAgICAgICB0aGlzLm1hcFk9MTAwO1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJrZXlcIik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2JsaW4gZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29ibGluXCI7XHJcblxyXG4gICAgICAgIHRoaXMud2lkdGggPSA0MDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCIuL29yei5qcGdcIikuc2NhbGUoMC40LDAuNCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG5cclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVGhpbmcgZnJvbSBcIi4vVGhpbmdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29kIGV4dGVuZHMgVGhpbmd7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHb2RcIlxyXG5cclxuICAgICAgICB0aGlzLm1hcFggPSAyMDA7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gMjAwO1xyXG5cclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLlhpLpmanlrrbvvIzkvaDpnIDopoHmjIflvJXlkJfvvJ9cIjtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiZ29kL2Rvd25cIiwzKSxcImdvZF9kb3duXCIpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICB1c2VfaXQoKXtcclxuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6K+36YCJ5oup5LiA5omH6Zeo77yM5bem6L655piv5aSp5aCC77yM5Y+z6L655piv5Zyw54uxXCJcclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShUaGluZ19saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImdvZF9kb3duXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDEwO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfbm9ybWFsO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5fbm9ybWFsIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VuX25vcm1hbFwiXHJcblxyXG5cclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMC5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSg2NCwzMik7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5waXZvdCg4LDE2KTtcclxuICAgICAgICB0aGlzLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlPVwi5p2A6Jmr5YmCXCJcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VubmVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bm5lclwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiLCBNb25zdGVyX0J1bGxldF9ub3JtYWwpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFBXaW5kb3cgZXh0ZW5kcyBMYXlhLlNwcml0ZSBcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLkhQPTA7XHJcbiAgICAgICAgdGhpcy5hcm1vcj0wO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuek9yZGVyPTEwMDA7XHJcbiAgICAgICAgdGhpcy5zaXplKDIwMCwxMjApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuSFAhPXRoZV9IZXJvLkhQfHx0aGlzLmFybW9yIT10aGVfSGVyby5hcm1vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IFRleHQ9TGF5YS5UZXh0XHJcbiAgICAgICAgICAgIHRoaXMuSFA9dGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3I9dGhlX0hlcm8uYXJtb3I7XHJcbiAgICAgICAgICAgIGxldCBsZW5fSFA9KDE2Ny03OCkvdGhlX0hlcm8uSFBfbWF4KnRoZV9IZXJvLkhQO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCwzMCxsZW5fSFAsMTcsXCIjRkZGRjAwXCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVuX2FybW9yPSgxNjctNzgpL3RoZV9IZXJvLmFybW9yX21heCp0aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSwxNjctNzgsMTcsXCIjNTU1NTU1XCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsNzksbGVuX2FybW9yLDE3LFwiI0ZGRkYwMFwiKSAgIC8vNzgsNzggIC0tLTE2Nyw5M1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZShcInJlcy9IUFdpbmRvdy9IUFdpbmRvdy5wbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5pbXBvcnQgR3VuX25vcm1hbCBmcm9tIFwiLi9HdW5fbm9ybWFsXCJcclxuaW1wb3J0IFNob3RndW4gZnJvbSBcIi4vU2hvdGd1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb1wiO1xyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuICAgICAgICB0aGlzLm1hcFggPSAxNTA7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gMTUwO1xyXG5cclxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcclxuICAgICAgICB0aGlzLkhQX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvd1xyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIGd1blxyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7O1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ1Nob3RndW4nLCBTaG90Z3VuKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vIGNoYW5nZSBndW5cclxuICAgICAgICBsZXQgY2hhbmdpbmc9dGhlX3NjcmVlbi5nZXRDaGFuZ2UoKTtcclxuICAgICAgICBpZihjaGFuZ2luZyYmIXRoaXMucHJlQ2hhbmdpbmcpe1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gdGhpcy5tYWluX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1biA9IHRoaXMuYWx0ZXJuYXRlX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IHRtcDtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1haW5fZ3VuLnNlbnRlbmNlKVxyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5tYWluX2d1bi5zZW50ZW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9Y2hhbmdpbmdcclxuXHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nLnVzZV9pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2hvb3RpbmdcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJzaG9vdFwiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpICAgLy8gc2hvb3QgYnV0dG9uIGNsaWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zaG9vdF9wb3dlciAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA+PSB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAtdGhpcy5tYWluX2d1bi5zZWNvbmRfd2FpdGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb25feD49MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9OTAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTI3MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgZW5kIC0tLS0tLS0tLS8vXHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RfZXZlbnQoKXtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnNob290KCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdGluZ19zb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290aW5nX3NvdW5kKCl7XHJcblx0XHRMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJyZXMvc291bmRzL3Nob290aW5nLm1wM1wiLCAxLCBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGR4OiAwLFxyXG4gICAgICAgICAgICAgICAgZHk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2l0ZW0oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF90aGluZyA9IHRoZV90aGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdFxyXG4gICAgICAgIGlmKG5lYXJlc3RfdGhpbmcgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBuZWFyZXN0X3RoaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1mYWxzZTtcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyPTA7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfaHVnZSBleHRlbmRzIEhlcm9fQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDIwO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfaHVnZVwiO1xyXG5cclxuICAgICAgICB0aGlzLnIgPSAyMDtcclxuICAgICAgICB0aGlzLnNpemUodGhpcy5yKjIsdGhpcy5yKjIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMuciwgdGhpcy5yLCB0aGlzLnIsIFwiI0JBMjJBQVwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGQkZGQUFcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNTA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDgwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9IZXJvX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBIZXJvX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAxMDtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnIgPSAyMDtcclxuICAgICAgICB0aGlzLnNpemUodGhpcy5yKjIsdGhpcy5yKjIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMuciwgdGhpcy5yLCB0aGlzLnIsIFwiI0IxRjNCQlwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGMUZGNUZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDUwO1xyXG5cclxuICAgICAgICAvL3RoaXMucm90YXRpb249LU1hdGguYXRhbjIodGhlX0hlcm8uZGlyZWN0aW9uX3gsdGhlX0hlcm8uZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgIC8vdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDUsIDAsIDApXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvb3RlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR5O1xyXG5cclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsdGhpcy5UeXBlK1wiX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndhbmRlcmluZygpO1xyXG5cclxuICAgICAgICAvLyBzaG9vdGluZyBjb250cm9sXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyID49IHRoaXMuc2tpbGxfY29zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsdGhpcy5tYXBZKSljb25zb2xlLmxvZyhcImJhZCB0aGluZyBoYXBwZW5lZCBub3dcIilcclxuICAgIH1cclxuXHJcbiAgICBmb3JjZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGZ4ID0gMDtcclxuICAgICAgICBsZXQgZnkgPSAwO1xyXG5cclxuICAgICAgICBpZihNYXRoLmFicyhkeCkgPiAxRS0yKXtcclxuICAgICAgICAgICAgZnggPSAxIC8gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR5KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeSA9IDEgLyBkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZ4OiBmeCwgXHJcbiAgICAgICAgICAgIGZ5OiBmeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgd2FuZGVyaW5nKCl7XHJcbiAgICAgICAgbGV0IHYgPSB7dng6IDAsIHZ5OiAwfTtcclxuICAgICAgICBpZih0aGlzLnNob290ZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfSGVybykgPiB0aGlzLnJhbmdlIC8gMS41KXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGlzLmRpcmVjdGlvbl94LCB0aGlzLmRpcmVjdGlvbl95KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdldF9kaXN0YW5jZSh0aGVfSGVybykgPCB0aGlzLnJhbmdlIC8gMil7XHJcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgLXRoaXMuZGlyZWN0aW9uX3gsIC10aGlzLmRpcmVjdGlvbl95KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZvcmNlX2F2ZyA9IHtcclxuICAgICAgICAgICAgZng6IDAsXHJcbiAgICAgICAgICAgIGZ5OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMgIT09IHRoZV9tb25zdGVyKXtcclxuICAgICAgICAgICAgICAgIGxldCBmID0gdGhpcy5mb3JjZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBmb3JjZV9hdmcuZnggKz0gZi5meDtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meSArPSBmLmZ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihNb25zdGVyX2xpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meCAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBmb3JjZV9hdmcuZnkgLz0gKE1vbnN0ZXJfbGlzdC5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2LnZ4ICsgZm9yY2VfYXZnLmZ4IC8gdGhpcy5tLCB2LnZ5ICsgZm9yY2VfYXZnLmZ4IC8gdGhpcy5tKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5zcGxpY2UoTW9uc3Rlcl9saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBhX2dhdGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG4gICAgICAgICAgICBhX2dhdGUucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBNb25zdGVyX2xpc3QucHVzaCh0aGlzKVxyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgICAgICB0aGlzLnNraWxsX3Bvd2VyPXRoaXMuc2tpbGxfY29zdCpNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCwgdHJ1ZSwgdGhpcy5UeXBlK1wiX3JpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hlcm9fb3JpZW50YXRpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkeDogdGhlX0hlcm8ubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgZHk6IHRoZV9IZXJvLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfSGVybykpe1xyXG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9IZXJvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGxhdW5jaGVyKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCBsYXVuY2hlci5kaXJlY3Rpb25feCwgbGF1bmNoZXIuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gbGF1bmNoZXIubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSBsYXVuY2hlci5tYXBZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2N1cnNlIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2N1cnNlXCI7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gNDA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjMjIyMjIyXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiIzIyMjIyMlwiLCAxMCwgMCwgMCldO1xyXG5cclxuICAgICAgICB0aGlzLnZfbWF4ID0gMC4xO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA2MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSg1KTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDEwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiIzEyMzQ1NlwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiMxMjM0NTZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oNSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9odWdlXCI7XHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMjA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRjFGMjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0YxRjJGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAxMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9Hb2JsaW5cIlxyXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5pbXBvcnQgSFBXaW5kb3cgZnJvbSBcIi4vSFBXaW5kb3dcIlxyXG5pbXBvcnQgR29kIGZyb20gXCIuL0dvZFwiXHJcbmltcG9ydCBTaGFycHNob290ZXIgZnJvbSBcIi4vU2hhcnBzaG9vdGVyXCJcclxuaW1wb3J0IHdpemFyZCBmcm9tIFwiLi93aXphcmRcIlxyXG5pbXBvcnQgQ2hhcml6YXJkIGZyb20gXCIuL0NoYXJpemFyZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9zY3JlZW5cclxue1xyXG5cdGNvbnN0cnVjdG9yKHcsIGgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0dGhpcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcblx0XHR0aGlzLmhlaWdodCA9IGg7XHJcblxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdHRoaXMuc2l6ZSh3LCBoKTtcclxuXHRcdHRoaXMucG9zKDAsIDApO1xyXG5cdFx0dGhpcy5sb2FkTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5udW1iZXIgPSAwO1xyXG5cdFx0dGhpcy5kaWZmaWN1bHR5ID0gMTtcclxuXHJcblx0XHR0aGlzLnRpbWVfY291bnQgPSAwO1xyXG5cdFx0dGhpcy50aW1lX2ludGVydmFsID0gODAwO1xyXG5cclxuXHRcdHRoaXMubWFwWF9tYXggPSAxMDAwO1xyXG5cdFx0dGhpcy5tYXBZX21heCA9IDEwMDA7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyby9sZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyby9yaWdodFwiLDQpLFwiaGVyb19yaWdodFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJrZXkvYmFzZVwiLDQpLFwia2V5XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9sZWZ0XCIsNCksXCJHdW5uZXJfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJndW5uZXIvcmlnaHRcIiw0KSxcIkd1bm5lcl9yaWdodFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJTaGFycHNob290ZXIvbGVmdFwiLDQpLFwiU2hhcnBzaG9vdGVyX2xlZnRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiU2hhcnBzaG9vdGVyL3JpZ2h0XCIsNCksXCJTaGFycHNob290ZXJfcmlnaHRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwid2l6YXJkL2xlZnRcIiw0KSxcIndpemFyZF9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIndpemFyZC9yaWdodFwiLDQpLFwid2l6YXJkX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIkNoYXJpemFyZC9sZWZ0XCIsNCksXCJDaGFyaXphcmRfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJDaGFyaXphcmQvcmlnaHRcIiw0KSxcIkNoYXJpemFyZF9yaWdodFwiKTtcclxuXHR9XHJcblxyXG5cdGxvYWRNYXAoKSB7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRUaWxlZE1hcCA9IExheWEuVGlsZWRNYXAsXHJcblx0XHRcdFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQsXHJcblx0XHRcdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcblx0XHR0aGlzLnRpbGVkTWFwID0gbmV3IFRpbGVkTWFwKCk7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNyZWF0ZU1hcChcInJlcy90aWxlZG1hcHMvc3RhcnQuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcCkpO1xyXG5cdH1cclxuXHJcblx0b25Mb2FkZWRNYXAoKSB7XHJcblx0XHRjb25zdCBFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm9uTW91c2VVcCk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfT1VULCB0aGlzLCB0aGlzLm9uTW91c2VVUCk7XHJcblxyXG5cdFx0dGhpcy53aGwgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmF0ayA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMyAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSk7XHJcblx0XHR0aGlzLmNoZyA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMC44MywgdGhpcy5oZWlnaHQgKjAuNTUsIHRoaXMud2lkdGggLyAzMCk7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG5cdFx0dGhpcy5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcblx0XHR0aGlzLndobC5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL3dobC5wbmdcIilcclxuXHRcdHRoaXMuY2hnLmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvY2hnLnBuZ1wiKVxyXG5cdFx0dGhpcy53aGwuek9yZGVyID0gMTAwMDtcclxuXHRcdHRoaXMuYXRrLnpPcmRlciA9IDEwMDE7XHJcblx0XHR0aGlzLmNoZy56T3JkZXIgPSAxMDAyO1xyXG5cdFx0dGhpcy53aGwuc3Auek9yZGVyPTEwMDM7XHJcblxyXG5cdFx0d2luZG93LnRoZV9IZXJvID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiSGVyb1wiLCBIZXJvKTtcclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBpbml0IHRleHRcclxuXHRcdHRoaXMuZGxnID0gbmV3IExheWEuVGV4dCgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmRsZyk7XHJcblx0XHR0aGlzLmRsZy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmRsZy5zaXplKDIwMCwgMTAwKTtcclxuXHRcdHRoaXMuZGxnLnBpdm90KDEwMCwgNTApO1xyXG5cdFx0dGhpcy5kbGcuZm9udFNpemUgPSAyMDtcclxuXHRcdHRoaXMuZGxnLmFsaWduID0gXCJjZW50ZXJcIlxyXG5cdFx0dGhpcy5kbGcudmFsaWduID0gXCJtaWRkbGVcIlxyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG5cdFx0dGhpcy5kbGcuZm9udCA9IFwiSW1wYWN0XCI7XHJcblx0XHR0aGlzLmRsZy56T3JkZXIgPSAxMDAwO1xyXG5cclxuXHRcdHRoaXMuc2NvcmU9MDtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93PW5ldyBMYXlhLlRleHQoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zY29yZV9XaW5kb3cpO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLDQwKTtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnNpemUoMjAwLCAxMDApO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cucGl2b3QoMTAwLCA1MCk7XHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5mb250U2l6ZSA9IDIwO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuYWxpZ24gPSBcImNlbnRlclwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy52YWxpZ24gPSBcIm1pZGRsZVwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5jb2xvciA9IFwiI0ZGMDAwMFwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5mb250ID0gXCJJbXBhY3RcIjtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnpPcmRlciA9IDEwMDA7XHJcblxyXG5cdFx0Ly8gcGxheSBtdXNpY1xyXG5cdFx0bGF5YS5tZWRpYS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKFwicmVzL3NvdW5kcy9CR00ubXAzXCIsIDApO1xyXG5cclxuXHRcdC8vIHJ1blxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMub25GcmFtZSk7XHJcblxyXG5cdFx0Ly8gc3RhcnQgZ2F0ZVxyXG5cdFx0bGV0IGdhdGUxID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR2F0ZVwiLCBHYXRlKTtcclxuXHRcdGdhdGUxLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRsZXQgZ2F0ZTIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG5cdFx0Z2F0ZTIucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdGdhdGUyLm1hcFggPSAzODA7XHJcblx0XHRnYXRlMi5tYXBZID0gMTAwO1xyXG5cdFx0Z2F0ZTIuZGlmZmljdWx0eSA9IDM7XHJcblxyXG5cdFx0Ly8gdGhlIGdvZCBhdCBob21lXHJcblx0XHRsZXQgYV9nb2QgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHb2RcIiwgR29kKTtcclxuXHRcdGFfZ29kLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBIUFxyXG5cdFx0dGhpcy5IUFdpbmRvdyA9IG5ldyBIUFdpbmRvdygpXHJcblx0fVx0XHJcblxyXG5cdGdlbmVyYXRlX21vbnN0ZXIobW9uc3Rlcl9hbW91bnQpIHtcclxuXHRcdG1vbnN0ZXJfYW1vdW50ID0gMTA7XHJcblx0XHRsZXQgY3VyX2Ftb3VudCA9IDA7XHJcblx0XHR3aGlsZShjdXJfYW1vdW50IDwgbW9uc3Rlcl9hbW91bnQpe1xyXG5cdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHdW5uZXJcIiwgR3VubmVyKTtcclxuXHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJfYW1vdW50ID0gMDtcclxuXHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQxID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDUpO1xyXG5cdFx0d2hpbGUoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDEpe1xyXG5cdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJTaGFycHNob290ZXJcIiwgU2hhcnBzaG9vdGVyKTtcclxuXHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJfYW1vdW50ID0gMDtcclxuXHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQyID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDUpO1xyXG5cdFx0d2hpbGUoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDIpe1xyXG5cdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJ3aXphcmRcIiwgd2l6YXJkKTtcclxuXHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJfYW1vdW50ID0gMDtcclxuXHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQzID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDUpO1xyXG5cdFx0d2hpbGUoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudDMpe1xyXG5cdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJDaGFyaXphcmRcIiwgQ2hhcml6YXJkKTtcclxuXHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRnJhbWUoKSB7XHJcblx0XHRpZih0aGlzLnBhdXNlZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDml6DlsL3mqKHlvI9cclxuXHRcdC8qXHJcblx0XHRpZiAodGhpcy50aW1lX2NvdW50ICUgdGhpcy50aW1lX2ludGVydmFsID09IDApIHtcclxuXHRcdFx0dGhpcy5nZW5lcmF0ZV9tb25zdGVyKCk7XHJcblx0XHRcdGlmICh0aGlzLnRpbWVfaW50ZXJ2YWwgPiAyMCkge1xyXG5cdFx0XHRcdHRoaXMudGltZV9pbnRlcnZhbCAtPSAyMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy50aW1lX2NvdW50ICs9IDE7XHJcblx0XHQqL1xyXG5cclxuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xyXG5cdFx0XHR0aGVfbW9uc3Rlci51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XHJcblx0XHRcdHRoZV9idWxsZXQudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcclxuXHRcdFx0dGhlX3RoaW5nLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XHJcblx0XHR0aGVfSGVyby5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDIpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYIC0gTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgdGhlX0hlcm8ubWFwWSAtIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0XHR0aGlzLkhQV2luZG93LnVwZGF0ZSgpXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5jaGFuZ2VUZXh0KFwiU2NvcmU6IFwiK3RoaXMuc2NvcmUpO1xyXG5cdH1cclxuXHJcblx0b25Nb3VzZURvd24oZSkge1xyXG5cdFx0aWYgKCh0aGlzLndobC54IC0gZS5zdGFnZVgpICogKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKyAodGhpcy53aGwueSAtIGUuc3RhZ2VZKSAqICh0aGlzLndobC55IC0gZS5zdGFnZVkpIDw9IHRoaXMud2hsLnIgKiB0aGlzLndobC5yKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoKHRoaXMuYXRrLnggLSBlLnN0YWdlWCkgKiAodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSArICh0aGlzLmF0ay55IC0gZS5zdGFnZVkpICogKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy5hdGsuciAqIHRoaXMuYXRrLnIpIHtcclxuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5jaGcueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmNoZy54IC0gZS5zdGFnZVgpICsgKHRoaXMuY2hnLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5jaGcueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmNoZy5yICogdGhpcy5jaGcucikge1xyXG5cdFx0XHR0aGlzLmNoZy5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VVcChlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLmNoZy5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy5jaGcub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZU1vdmUoZSkge1xyXG5cdFx0aWYgKHRoaXMud2hsLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuY2hnLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmNoZy5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlbG9zaXR5KCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogKHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54KSAvIHRoaXMud2hsLnIsXHJcblx0XHRcdHk6ICh0aGlzLndobC5zcC55IC0gdGhpcy53aGwueSkgLyB0aGlzLndobC5yXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvb3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRDaGFuZ2UoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGcuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRQYXNzKG1hcFgsIG1hcFkpIHtcclxuXHRcdGNvbnN0IGEgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyQnlJbmRleCgwKS5nZXRUaWxlRGF0YShNYXRoLmZsb29yKG1hcFggLyAzMiksIE1hdGguZmxvb3IobWFwWSAvIDMyKSk7XHJcblx0XHRpZiAodGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGlsZWRNYXAuX2pzb25EYXRhLnRpbGVzZXRzWzBdLnRpbGVzW2EgLSAxXS5wcm9wZXJ0aWVzWzBdLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzZXRQaWN0dXJlKHN0cikge1xyXG5cdFx0aWYgKHN0ciA9PSBcInNob290XCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInNob290XCIpIHtcclxuXHRcdFx0Y29uc3QgYXRrID0gdGhpcy5hdGs7XHJcblx0XHRcdGF0ay50eXBlID0gXCJzaG9vdFwiXHJcblx0XHRcdGF0ay5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL2F0azEucG5nXCIpXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzdHIgPT0gXCJwaWNrXCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInBpY2tcIikge1xyXG5cdFx0XHRjb25zdCBhdGsgPSB0aGlzLmF0aztcclxuXHRcdFx0YXRrLnR5cGUgPSBcInBpY2tcIlxyXG5cdFx0XHRhdGsubG9hZEltYWdlKFwicmVzL2F0bGFzL3doZWVscy9hdGsyLnBuZ1wiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGV4dCh0ZXh0LCBjb2xvciwgeCwgeSwgc3opIHtcclxuXHRcdGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHRleHQgPSBcIlwiO1xyXG5cdFx0aWYgKGNvbG9yID09PSB1bmRlZmluZWQpIGNvbG9yID0gXCIjRkZGRkZGXCI7XHJcblx0XHRpZiAoeCA9PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHggPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyXHJcblx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KjAuNDVcclxuXHRcdH1cclxuXHRcdGlmIChzeiA9PT0gdW5kZWZpbmVkKSBzeiA9IDIwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmRsZy5jaGFuZ2VUZXh0KHRleHQpO1xyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBjb2xvcjtcclxuXHRcdHRoaXMuZGxnLnBvcyh4LCB5KTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gc3o7XHJcblx0XHR0aGlzLmRsZy5hbHBoYSA9IDE7XHJcblx0XHQvL0xheWEuVHdlZW4udG8odGhpcy5kbGcse2FscGhhOjAseTp0aGlzLmRsZy55LTEwMCxmb250U2l6ZTp0aGlzLmRsZy5mb250U2l6ZSoyfSwxMDAwKVxyXG5cdH1cclxuXHJcblx0bWFwX2NoYW5nZSgpIHtcclxuXHRcdHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHRcdGNvbnN0IG51bWJlciA9IHRoaXMubnVtYmVyO1xyXG5cdFx0dGhpcy5udW1iZXIgKz0gMTtcclxuXHRcdFxyXG5cdFx0bGV0IGJnID0gTWF0aC5mbG9vcihudW1iZXIvMTUpO1xyXG5cdFx0bGV0IGlkeCA9IG51bWJlciUzO1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cclxuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xyXG5cdFx0XHR0aGVfbW9uc3Rlci5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LkhQID0gLTE7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCkge1xyXG5cdFx0XHR0aGVfdGhpbmcuSFAgPSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRpbGVkTWFwLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzL3RpbGVkbWFwcy9cIitiZytpZHgrXCIuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcDIpKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwMigpIHtcclxuXHRcdHRoZV9IZXJvLnBsYWNlUmFuZG9tbHkoKVxyXG5cclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHRcdHRoaXMuYXRrLnR5cGUgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY2hhbmdlVmlld1BvcnQoMCwgMCwgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxyXG5cdFx0dGhpcy5nZW5lcmF0ZV9tb25zdGVyKHRoaXMubnVtYmVyICogdGhpcy5kaWZmaWN1bHR5KVxyXG5cclxuXHRcdHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcnBzaG9vdGVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIlNoYXJwc2hvb3RlclwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9odWdlXCIsIE1vbnN0ZXJfQnVsbGV0X2h1Z2UpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X2h1Z2UgZnJvbSBcIi4vSGVyb19CdWxsZXRfaHVnZVwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3RndW4gZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJTaG90Z3VuXCJcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMjtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gNTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCJyZXMvZ3Vucy9ndW4xLnBuZ1wiKVxyXG4gICAgICAgIC8vdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCxcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNpemUoMzIsMzIpO1xyXG4gICAgICAgIHRoaXMucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfaHVnZTtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9odWdlXCJcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBvbGRfeCA9IHRoZV9IZXJvLmRpcmVjdGlvbl94O1xyXG4gICAgICAgIGxldCBvbGRfeSA9IHRoZV9IZXJvLmRpcmVjdGlvbl95O1xyXG5cclxuICAgICAgICBsZXQgZF9hID0gMC4yNTtcclxuICAgICAgICBsZXQgaGFsZl9OID0gMztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gLWhhbGZfTjsgaSA8PSBoYWxmX047IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfZGlyZWN0aW9uID0gdGhpcy5yb3RhdGVfdihvbGRfeCwgb2xkX3ksIGkgKiBkX2EpO1xyXG4gICAgICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feCA9IG5ld19kaXJlY3Rpb24ueDtcclxuICAgICAgICAgICAgdGhlX0hlcm8uZGlyZWN0aW9uX3kgPSBuZXdfZGlyZWN0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0aGlzLmJ1bGxldF90eXBlLCB0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlX0hlcm8uZGlyZWN0aW9uX3ggPSBvbGRfeDtcclxuICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feSA9IG9sZF95O1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnBpdm90KDcsMTUpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2U9XCLpnLDlvLnmnqpcIlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShUaGluZ19saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZV9pdCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnB1c2godGhpcylcclxuICAgICAgICB0aGlzLkhQPTE7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVlbCBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscixoYXNTcClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHQvL3RoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC42O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcbmltcG9ydCBTaG90Z3VuIGZyb20gXCIuL1Nob3RndW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9cIjtcclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTUwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDE1MDtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob3dcclxuICAgICAgICB0aGlzLnNpemUoMzIsNDgpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBndW5cclxuICAgICAgICB0aGlzLm1haW5fZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnR3VuX25vcm1hbCcsIEd1bl9ub3JtYWwpOztcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdTaG90Z3VuJywgU2hvdGd1bik7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICAvLyBjaGFuZ2UgZ3VuXHJcbiAgICAgICAgbGV0IGNoYW5naW5nPXRoZV9zY3JlZW4uZ2V0Q2hhbmdlKCk7XHJcbiAgICAgICAgaWYoY2hhbmdpbmcmJiF0aGlzLnByZUNoYW5naW5nKXtcclxuICAgICAgICAgICAgbGV0IHRtcCA9IHRoaXMubWFpbl9ndW47XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4gPSB0aGlzLmFsdGVybmF0ZV9ndW47XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uek9yZGVyPXRoaXMuek9yZGVyKzE7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4udmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSB0bXA7XHJcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tYWluX2d1bi5zZW50ZW5jZSlcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubWFpbl9ndW4uc2VudGVuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZUNoYW5naW5nPWNoYW5naW5nXHJcblxyXG4gICAgICAgIC8vIHJlcGFpciBhcm1vclxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPCB0aGlzLmFybW9yX21heCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXJtb3JfY291bnQgPj0gNjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vciArPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXHJcbiAgICAgICAgbGV0IHZ4ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLng7XHJcbiAgICAgICAgbGV0IHZ5ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLnk7XHJcbiAgICAgICAgbGV0IHY9dGhpcy5kbCh2eCx2eSk7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHZ4ICogdGhpcy52X21heCwgdnkgKiB0aGlzLnZfbWF4KTtcclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLyBnZXQgbmVhcmVzdF90aGluZ1xyXG4gICAgICAgIHRoaXMuY2hlY2tpdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIHVzaW5nIGdvb2RzXHJcbiAgICAgICAgaWYodGhpcy5uZWFyZXN0X3RoaW5nICE9PSBudWxsICYmIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoaXMubmVhcmVzdF90aGluZykgPCA1MCl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInBpY2tcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm5lYXJlc3RfdGhpbmcuc2VudGVuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlcj0wO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uek9yZGVyPXRoaXMuek9yZGVyKzE7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9jdXJzZSBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9jdXJzZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB3aXphcmQgZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwid2l6YXJkXCI7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSg0OCw0OClcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAgKiA0MDtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMztcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X2N1cnNlXCIsIE1vbnN0ZXJfQnVsbGV0X2N1cnNlKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICBuZXdfYnVsbGV0Lm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICB9XHJcbn1cclxuIl19
