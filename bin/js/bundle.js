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
            } else {
                console.log("unknow monster!");
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

		_this.score = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0NoYXJpemFyZC5qcyIsInNyYy9zY3JpcHQvRHJhZ1BvaW50LmpzIiwic3JjL3NjcmlwdC9HYXRlLmpzIiwic3JjL3NjcmlwdC9Hb2JsaW4uanMiLCJzcmMvc2NyaXB0L0dvZC5qcyIsInNyYy9zY3JpcHQvR3VuLmpzIiwic3JjL3NjcmlwdC9HdW5fbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9HdW5uZXIuanMiLCJzcmMvc2NyaXB0L0hQV2luZG93LmpzIiwic3JjL3NjcmlwdC9IZXJvLmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfY3Vyc2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfaHVnZS5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9TY3JlZW4uanMiLCJzcmMvc2NyaXB0L1NoYXJwc2hvb3Rlci5qcyIsInNyYy9zY3JpcHQvU2hvdGd1bi5qcyIsInNyYy9zY3JpcHQvVGhpbmcuanMiLCJzcmMvc2NyaXB0L1doZWVsLmpzIiwic3JjL3NjcmlwdC9oZXJvLmpzIiwic3JjL3NjcmlwdC93aXphcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFxQixZQUFyQjtBQUNBLGlCQUFLLE9BQUwsR0FBYSxPQUFiO0FBQ0g7Ozs7RUFoTzZCLGdCOztrQkFBYixJOzs7Ozs7Ozs7OztBQ1ByQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLHNCQUFhO0FBQUE7O0FBQUE7O0FBRVQsY0FBSyxJQUFMLEdBQVksUUFBWjs7QUFFQSxjQUFLLElBQUwsQ0FBVSxFQUFWLEVBQWEsRUFBYjtBQUNBLGNBQUssS0FBTCxHQUFhLE1BQWI7QUFDQSxjQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsY0FBSyxVQUFMLEdBQWtCLEVBQWxCOztBQUVBO0FBQ0EsY0FBSyxHQUFMLEdBQVcsSUFBSSxLQUFLLFNBQVQsRUFBWDtBQUNBLGNBQUssR0FBTCxDQUFTLFFBQVQsR0FBb0IsR0FBcEI7QUFDQSxjQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsTUFBSyxLQUFMLEdBQVcsQ0FBMUIsRUFBNEIsTUFBSyxNQUFMLEdBQVksQ0FBeEM7QUFaUztBQWFaOzs7O2dDQUVNO0FBQ0gsZ0JBQUksYUFBYSxLQUFLLElBQUwsQ0FBVSxjQUFWLENBQXlCLHNCQUF6QixFQUFpRCw4QkFBakQsQ0FBakI7QUFDQSx1QkFBVyxVQUFYO0FBQ0EsdUJBQVcsSUFBWCxDQUFnQixJQUFoQjtBQUNIOzs7cUNBRVc7QUFDUixpQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNIOzs7O0VBeEIrQixpQjs7a0JBQWYsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCLvu78vLyDln7rnoYDnmoTnsbtcclxuaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9zY3JpcHQvQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vc2NyaXB0L0hlcm9cIlxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9zY3JpcHQvTW9uc3RlclwiXHJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0hlcm9fQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldFwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcclxuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9zY3JpcHQvU2NyZWVuXCJcclxuaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9zY3JpcHQvRHJhZ1BvaW50XCJcclxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXHJcblxyXG4vLyDmianlhYXnmoTnsbtcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL3NjcmlwdC9Hb2JsaW5cIlxyXG5cclxuY29uc3RcclxuXHRCcm93c2VyID0gTGF5YS5Ccm93c2VyLFxyXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcclxuXHRTdGFnZSA9IExheWEuU3RhZ2UsXHJcblx0U3RhdCA9IExheWEuU3RhdCxcclxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5cclxuLy/liJ3lp4vljJblvJXmk45cclxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcblxyXG4vL+aoquWxj+a4uOaIj1xyXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcclxuXHJcbi8v562J5q+U5L6L57yp5pS+XHJcbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcclxuXHJcbi8v6IOM5pmv6aKc6ImyXHJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xyXG5cclxuLy8g6KeS6Imy5a655ZmoXHJcbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcclxud2luZG93LkJ1bGxldF9saXN0ID0gW107XHJcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcclxud2luZG93LlRoaW5nX2xpc3QgPSBbXTtcclxuXHJcbi8vIHNldCB0aGUgU2NyZWVuXHJcbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcclxubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcclxuXHJcbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHJcblN0YXQuc2hvdygpO1xyXG5cclxud2luZG93LnRoZV9zY3JlZW4gPSBuZXcgU2NyZWVuKHcsIGgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaW5ncyBleHRlbmRzIExheWEuU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDEwMDtcclxuXHJcbiAgICAgICAgLy8gY29sbGlzaW9uIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiQmVpbmdzXCI7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgICAgIC8vIG1vdmVtZW50XHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IDE7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgcm9vdF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5waXZvdCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLzIpXHJcbiAgICAgICAgdGhpcy56T3JkZXI9MDtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icmFuY2hfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cF9kYXRlKCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5tYXBYIC0gdGhlX0hlcm8ubWFwWCArIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMubWFwWSAtIHRoZV9IZXJvLm1hcFkgKyBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzI7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWRfYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5kZWFkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XHJcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XHJcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcclxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiAwLFxyXG4gICAgICAgICAgICAgICAgdnk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcbiAgICBnZXREaXIoZHgsZHksbGFzdCl7XHJcbiAgICAgICAgaWYoZHg+MClyZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIGlmKC1keD4wKXJldHVybiBcImxlZnRcIjtcclxuICAgICAgICByZXR1cm4gbGFzdDtcclxuICAgIH1cclxuXHJcbiAgICByZWFjaGFibGUobmV3X21hcFgsIG5ld19tYXBZKXtcclxuICAgICAgICBsZXQgcG9pbnRfc2V0ID0gW107XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggICAgICAgICAgICAgICAsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAgICAgICAgICAgICAgICwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IHRoZV9wb2ludCBvZiBwb2ludF9zZXQpe1xyXG4gICAgICAgICAgICBvayAmPSB0aGVfc2NyZWVuLmdldFBhc3ModGhlX3BvaW50LngsIHRoZV9wb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVfYnlfZHhfZHkoZHgsIGR5KXtcclxuICAgICAgICBpZihkeCA+IDMwKXtcclxuICAgICAgICAgICAgZHggPSAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZHkgPiAzMCl7XHJcbiAgICAgICAgICAgIGR5ID0gMzA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCwgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWCArPSBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCAvIDIsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHggLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSAvIDIpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5IC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByb3RhdGVfdihvbGRfeCwgb2xkX3ksIGEpe1xyXG4gICAgICAgIGxldCBuZXdfeCA9IG9sZF94ICogTWF0aC5jb3MoYSkgLSBvbGRfeSAqIE1hdGguc2luKGEpO1xyXG4gICAgICAgIGxldCBuZXdfeSA9IG9sZF94ICogTWF0aC5zaW4oYSkgKyBvbGRfeSAqIE1hdGguY29zKGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IG5ld194LFxyXG4gICAgICAgICAgICB5OiBuZXdfeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VSYW5kb21seSgpXHJcbiAgICB7XHJcbiAgICAgICAgd2hpbGUodHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfeCA9IE1hdGgucmFuZG9tKCkgKiB0aGVfc2NyZWVuLm1hcFhfbWF4O1xyXG4gICAgICAgICAgICBsZXQgbmV3X3kgPSBNYXRoLnJhbmRvbSgpICogdGhlX3NjcmVlbi5tYXBZX21heDtcclxuICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUobmV3X3gsIG5ld195KSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFggPSBuZXdfeDtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwWSA9IG5ld195O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gMTtcclxuICAgICAgICB0aGlzLnZ5ID0gMTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHdpbGxfZGllID0gdGhpcy5oaXRfd2FsbCh0aGlzLnZ4LCB0aGlzLnZ5KTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh0aGlzLnZ4LCB0aGlzLnZ5KVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih3aWxsX2RpZSl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSBsaXN0IHRoYXQgY29udGFpbiB0aGUgZWxlbWVudHMgdG8gYmUgYXR0YWNrXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBsb3Npb24oYXR0YWNrX2xpc3Qpe1xyXG4gICAgICAgIC8vIGV4cGxvc2lvbiAhXHJcbiAgICAgICAgaWYoYXR0YWNrX2xpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICAgICAgZm9yKGxldCBlbGVtZW50IG9mIGF0dGFja19saXN0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbGVtZW50KXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBoaXRfd2FsbChkeCwgZHkpe1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSArIGR5KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9maXJlX2JhbGxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcml6YXJkIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkNoYXJpemFyZFwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG9sZF94ID0gdGhpcy5kaXJlY3Rpb25feDtcclxuICAgICAgICBsZXQgb2xkX3kgPSB0aGlzLmRpcmVjdGlvbl95O1xyXG5cclxuICAgICAgICBsZXQgZF9hID0gMC4yNTtcclxuICAgICAgICBsZXQgaGFsZl9OID0gMztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gLWhhbGZfTjsgaSA8PSBoYWxmX047IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfZGlyZWN0aW9uID0gdGhpcy5yb3RhdGVfdihvbGRfeCwgb2xkX3ksIGkgKiBkX2EpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmV3X2RpcmVjdGlvbi54O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmV3X2RpcmVjdGlvbi55O1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9maXJlX2JhbGxcIiwgTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsKTtcclxuICAgICAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gb2xkX3g7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG9sZF95O1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMTAwO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdQb2ludCBleHRlbmRzIExheWEuU3ByaXRlICAvL25vIGV2ZW50c1xyXG57XHJcblx0Y29uc3RydWN0b3IoeCx5LHIpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xyXG5cdFx0dGhpcy5waXZvdChyLHIpO1xyXG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkYwMFwiKTtcclxuICAgICAgICB0aGlzLnBvcyh4LHkpO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC4yO1xyXG5cdFx0dGhpcy5yPXI7XHJcblx0XHR0aGlzLm1vdXNlVGhyb3VnaD10cnVlO1xyXG5cdH1cclxufSIsImltcG9ydCBUaGluZyBmcm9tIFwiLi9UaGluZ1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYXRlIGV4dGVuZHMgVGhpbmd7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHYXRlXCJcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLljrvlvoDkuIvkuIDlsYJcIjtcclxuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5waXZvdCgxNiwxNik7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuYW5pLmZpbHRlcnM9W25ldyBMYXlhLkdsb3dGaWx0ZXIoXCJGRkZGQUFcIiw1LDAsMCldO1xyXG5cclxuICAgICAgICAvKnRoaXMucj0xNTtcclxuICAgICAgICB0aGlzLnBpdm90KHRoaXMucix0aGlzLnIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMucix0aGlzLnIsdGhpcy5yLFwiIzk5RkZBQVwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnM9W25ldyBMYXlhLkdsb3dGaWx0ZXIoXCJGRkJCMDBcIiwyMCwwLDApLG5ldyBMYXlhLkdsb3dGaWx0ZXIoXCIwMEJCRkZcIiw1LDAsMCldOyovXHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSFA9LTFcclxuXHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIGlmKHRoZV9zY3JlZW4uZGlmZmljdWx0eSA8IHRoaXMuZGlmZmljdWx0eSl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uZGlmZmljdWx0eSA9IHRoaXMuZGlmZmljdWx0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhlX3NjcmVlbi5tYXBfY2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubWFwWD0xMDA7XHJcbiAgICAgICAgdGhpcy5tYXBZPTEwMDtcclxuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwia2V5XCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDAwO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvZCBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29kXCJcclxuXHJcbiAgICAgICAgdGhpcy5tYXBYID0gMjAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDIwMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5YaS6Zmp5a6277yM5L2g6ZyA6KaB5oyH5byV5ZCX77yfXCI7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImdvZC9kb3duXCIsMyksXCJnb2RfZG93blwiKTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuivt+mAieaLqeS4gOaJh+mXqO+8jOW3pui+ueaYr+WkqeWggu+8jOWPs+i+ueaYr+WcsOeLsVwiXHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICAgICAgVGhpbmdfbGlzdC5zcGxpY2UoVGhpbmdfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJnb2RfZG93blwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1biBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxMDtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEd1biBmcm9tIFwiLi9HdW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuX25vcm1hbCBleHRlbmRzIEd1bntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bl9ub3JtYWxcIlxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMTtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCJyZXMvZ3Vucy9ndW4wLnBuZ1wiKVxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zaXplKDY0LDMyKTtcclxuICAgICAgICB0aGlzLnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMixMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIrMTQpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfbm9ybWFsO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModGhpcy5idWxsZXRfdHlwZSwgdGhpcy5idWxsZXQpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnBpdm90KDIsMTYpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2U9XCLmnYDomavliYJcIlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5uZXIgZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VubmVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSg0OCw0OClcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAgKiA0MDtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMztcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCIsIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5pbml0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMTAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIUFdpbmRvdyBleHRlbmRzIExheWEuU3ByaXRlIFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuSFA9MDtcclxuICAgICAgICB0aGlzLmFybW9yPTA7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy56T3JkZXI9MTAwMDtcclxuICAgICAgICB0aGlzLnNpemUoMjAwLDEyMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5IUCE9dGhlX0hlcm8uSFB8fHRoaXMuYXJtb3IhPXRoZV9IZXJvLmFybW9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgVGV4dD1MYXlhLlRleHRcclxuICAgICAgICAgICAgdGhpcy5IUD10aGVfSGVyby5IUDtcclxuICAgICAgICAgICAgdGhpcy5hcm1vcj10aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgbGV0IGxlbl9IUD0oMTY3LTc4KS90aGVfSGVyby5IUF9tYXgqdGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsMzAsMTY3LTc4LDE3LFwiIzU1NTU1NVwiKSAgIC8vNzgsMzIgIC0tLTE2Nyw0N1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLGxlbl9IUCwxNyxcIiNGRkZGMDBcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuXHJcbiAgICAgICAgICAgIGxldCBsZW5fYXJtb3I9KDE2Ny03OCkvdGhlX0hlcm8uYXJtb3JfbWF4KnRoZV9IZXJvLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDc5LDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSxsZW5fYXJtb3IsMTcsXCIjRkZGRjAwXCIpICAgLy83OCw3OCAgLS0tMTY3LDkzXHJcbiAgICAgICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL0hQV2luZG93L0hQV2luZG93LnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi9TaG90Z3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvXCI7XHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDE1MDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxNTA7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG9vdFxyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG93XHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZ3VuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTs7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnU2hvdGd1bicsIFNob3RndW4pO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gY2hhbmdlIGd1blxyXG4gICAgICAgIGxldCBjaGFuZ2luZz10aGVfc2NyZWVuLmdldENoYW5nZSgpO1xyXG4gICAgICAgIGlmKGNoYW5naW5nJiYhdGhpcy5wcmVDaGFuZ2luZyl7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLm1haW5fZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuID0gdGhpcy5hbHRlcm5hdGVfZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnpPcmRlcj10aGlzLnpPcmRlcisxO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gdG1wO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFpbl9ndW4uc2VudGVuY2UpXHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm1haW5fZ3VuLnNlbnRlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1jaGFuZ2luZ1xyXG5cclxuICAgICAgICAvLyByZXBhaXIgYXJtb3JcclxuICAgICAgICBpZih0aGlzLmFybW9yIDwgdGhpcy5hcm1vcl9tYXgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFybW9yX2NvdW50ID49IDYwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3IgKz0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS55O1xyXG4gICAgICAgIGxldCB2PXRoaXMuZGwodngsdnkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2eCAqIHRoaXMudl9tYXgsIHZ5ICogdGhpcy52X21heCk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8gZ2V0IG5lYXJlc3RfdGhpbmdcclxuICAgICAgICB0aGlzLmNoZWNraXRlbSgpO1xyXG5cclxuICAgICAgICAvLyB1c2luZyBnb29kc1xyXG4gICAgICAgIGlmKHRoaXMubmVhcmVzdF90aGluZyAhPT0gbnVsbCAmJiB0aGlzLmdldF9kaXN0YW5jZSh0aGlzLm5lYXJlc3RfdGhpbmcpIDwgNTApe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5uZWFyZXN0X3RoaW5nLnNlbnRlbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcudXNlX2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaG9vdGluZ1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInNob290XCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSkgICAvLyBzaG9vdCBidXR0b24gY2xpY2tlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnNob290X3Bvd2VyICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID49IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbl94Pj0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9MTtcclxuICAgICAgICAgICAgbGV0IGFyZz05MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9MjcwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdF9ldmVudCgpe1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcclxuICAgICAgICB0aGlzLnNob290aW5nX3NvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3Rpbmdfc291bmQoKXtcclxuXHRcdExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInJlcy9zb3VuZHMvc2hvb3RpbmcubXAzXCIsIDEsIG5ldyBMYXlhLkhhbmRsZXIodGhpcywgdGhpcy5vbkNvbXBsZXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNraXRlbSgpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZyk7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3RoaW5nID0gdGhlX3RoaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0XHJcbiAgICAgICAgaWYobmVhcmVzdF90aGluZyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG5lYXJlc3RfdGhpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gdGhpcy5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSB0aGlzLmFybW9yX21heDtcclxuICAgICAgICB0aGlzLnByZUNoYW5naW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXI9MDtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnpPcmRlcj10aGlzLnpPcmRlcisxO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4udmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKVxyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcclxuICAgICAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xyXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoZV9IZXJvLmRpcmVjdGlvbl94LCB0aGVfSGVyby5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcclxuICAgICAgICB0aGlzLm1hcFggPSB0aGVfSGVyby5tYXBYO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IHRoZV9IZXJvLm1hcFk7XHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9IZXJvX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldF9odWdlIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMjA7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvX0J1bGxldF9odWdlXCI7XHJcblxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSh0aGlzLnIqMix0aGlzLnIqMilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLCB0aGlzLnIsIHRoaXMuciwgXCIjQkEyMkFBXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZCRkZBQVwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA1MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL0hlcm9fQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0X25vcm1hbCBleHRlbmRzIEhlcm9fQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSh0aGlzLnIqMix0aGlzLnIqMilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLCB0aGlzLnIsIHRoaXMuciwgXCIjQjFGM0JCXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0YxRkY1RlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNTA7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yb3RhdGlvbj0tTWF0aC5hdGFuMih0aGVfSGVyby5kaXJlY3Rpb25feCx0aGVfSGVyby5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgLy90aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgNSwgMCwgMCldO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vR2F0ZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMTAwMDtcclxuICAgICAgICB0aGlzLnNraWxsX2Nvc3QgPSAzNjA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG9vdGVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR4O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB0aGlzLmdldF9oZXJvX29yaWVudGF0aW9uKCkuZHk7XHJcblxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSx0aGlzLlR5cGUrXCJfXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2FuZGVyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIHNob290aW5nIGNvbnRyb2xcclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyIDwgMTAwMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfcG93ZXIgPj0gdGhpcy5za2lsbF9jb3N0KXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCx0aGlzLm1hcFkpKWNvbnNvbGUubG9nKFwiYmFkIHRoaW5nIGhhcHBlbmVkIG5vd1wiKVxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZnggPSAwO1xyXG4gICAgICAgIGxldCBmeSA9IDA7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeCA9IDEgLyBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZHkpID4gMUUtMil7XHJcbiAgICAgICAgICAgIGZ5ID0gMSAvIGR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZng6IGZ4LCBcclxuICAgICAgICAgICAgZnk6IGZ5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB3YW5kZXJpbmcoKXtcclxuICAgICAgICBsZXQgdiA9IHt2eDogMCwgdnk6IDB9O1xyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA+IHRoaXMucmFuZ2UgLyAxLjUpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoaXMuZGlyZWN0aW9uX3gsIHRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA8IHRoaXMucmFuZ2UgLyAyKXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCAtdGhpcy5kaXJlY3Rpb25feCwgLXRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9yY2VfYXZnID0ge1xyXG4gICAgICAgICAgICBmeDogMCxcclxuICAgICAgICAgICAgZnk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcyAhPT0gdGhlX21vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGYgPSB0aGlzLmZvcmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meCArPSBmLmZ4O1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ5ICs9IGYuZnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ4IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meSAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHYudnggKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0sIHYudnkgKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgICAgaWYoTW9uc3Rlcl9saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGFfZ2F0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcbiAgICAgICAgICAgIGFfZ2F0ZS5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgICAgIGFfZ2F0ZS5wbGFjZVJhbmRvbWx5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgc2NvcmVcclxuICAgICAgICBpZih0aGlzLlR5cGUgPT0gXCJHdW5uZXJcIil7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2NvcmUgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlR5cGUgPT0gXCJTaGFycHNob290ZXJcIil7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2NvcmUgKz0gMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlR5cGUgPT0gXCJDaGFyaXphcmRcIil7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2NvcmUgKz0gNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlR5cGUgPT0gXCJ3aXphcmRcIil7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2NvcmUgKz0gNztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmtub3cgbW9uc3RlciFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlcj10aGlzLnNraWxsX2Nvc3QqTWF0aC5yYW5kb20oKTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsIHRydWUsIHRoaXMuVHlwZStcIl9yaWdodFwiKTtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oZXJvX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZHg6IHRoZV9IZXJvLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgIGR5OiB0aGVfSGVyby5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcclxuICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX0hlcm8pKXtcclxuICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfSGVybyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGF0dGFjayhlbGVtZW50KXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChsYXVuY2hlcil7XHJcbiAgICAgICAgbGV0IHZlY3Rvcl92ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgbGF1bmNoZXIuZGlyZWN0aW9uX3gsIGxhdW5jaGVyLmRpcmVjdGlvbl95KTtcclxuICAgICAgICB0aGlzLnZ4ID0gdmVjdG9yX3Yudng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IGxhdW5jaGVyLm1hcFg7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gbGF1bmNoZXIubWFwWTtcclxuICAgIH1cclxufSIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9jdXJzZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9jdXJzZVwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDMwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiIzIyMjIyMlwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiMyMjIyMjJcIiwgMTAsIDAsIDApXTtcclxuXHJcbiAgICAgICAgdGhpcy52X21heCA9IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIHRoaXMuSFAgLT0gMTtcclxuICAgICAgICB0aGlzLm1hcFggKz0gdGhpcy52eDtcclxuICAgICAgICB0aGlzLm1hcFkgKz0gdGhpcy52eTtcclxuXHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gdGhpcy5nZXRfYXR0YWNrX2xpc3QoKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDQwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfZmlyZV9iYWxsIGV4dGVuZHMgTW9uc3Rlcl9CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2ZpcmVfYmFsbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDEwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiI2ZmNDQwMFwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNmZjAwMDBcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oNSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9odWdlXCI7XHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMjA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjOTVmZjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiIzAwNTFmZlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAxMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9Hb2JsaW5cIlxyXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5pbXBvcnQgSFBXaW5kb3cgZnJvbSBcIi4vSFBXaW5kb3dcIlxyXG5pbXBvcnQgR29kIGZyb20gXCIuL0dvZFwiXHJcbmltcG9ydCBTaGFycHNob290ZXIgZnJvbSBcIi4vU2hhcnBzaG9vdGVyXCJcclxuaW1wb3J0IHdpemFyZCBmcm9tIFwiLi93aXphcmRcIlxyXG5pbXBvcnQgQ2hhcml6YXJkIGZyb20gXCIuL0NoYXJpemFyZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9zY3JlZW5cclxue1xyXG5cdGNvbnN0cnVjdG9yKHcsIGgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0dGhpcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcblx0XHR0aGlzLmhlaWdodCA9IGg7XHJcblxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdHRoaXMuc2l6ZSh3LCBoKTtcclxuXHRcdHRoaXMucG9zKDAsIDApO1xyXG5cdFx0dGhpcy5sb2FkTWFwKCk7XHJcblxyXG5cdFx0dGhpcy5udW1iZXIgPSAwO1xyXG5cdFx0dGhpcy5kaWZmaWN1bHR5ID0gMTtcclxuXHJcblx0XHR0aGlzLnRpbWVfY291bnQgPSAwO1xyXG5cdFx0dGhpcy50aW1lX2ludGVydmFsID0gODAwO1xyXG5cclxuXHRcdHRoaXMubWFwWF9tYXggPSAxMDAwO1xyXG5cdFx0dGhpcy5tYXBZX21heCA9IDEwMDA7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyby9sZWZ0XCIsIDQpLCBcImhlcm9fbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL3JpZ2h0XCIsIDQpLCBcImhlcm9fcmlnaHRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwia2V5L2Jhc2VcIiwgNCksIFwia2V5XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9sZWZ0XCIsIDQpLCBcIkd1bm5lcl9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9yaWdodFwiLCA0KSwgXCJHdW5uZXJfcmlnaHRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiU2hhcnBzaG9vdGVyL2xlZnRcIiwgNCksIFwiU2hhcnBzaG9vdGVyX2xlZnRcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiU2hhcnBzaG9vdGVyL3JpZ2h0XCIsIDQpLCBcIlNoYXJwc2hvb3Rlcl9yaWdodFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJ3aXphcmQvbGVmdFwiLCA0KSwgXCJ3aXphcmRfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJ3aXphcmQvcmlnaHRcIiwgNCksIFwid2l6YXJkX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIkNoYXJpemFyZC9sZWZ0XCIsIDQpLCBcIkNoYXJpemFyZF9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIkNoYXJpemFyZC9yaWdodFwiLCA0KSwgXCJDaGFyaXphcmRfcmlnaHRcIik7XHJcblxyXG5cdFx0dGhpcy5zY29yZSA9IDA7XHJcblx0fVxyXG5cclxuXHRsb2FkTWFwKCkge1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cdFx0dGhpcy50aWxlZE1hcCA9IG5ldyBUaWxlZE1hcCgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXMvdGlsZWRtYXBzL3N0YXJ0Lmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWRNYXApKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwKCkge1xyXG5cdFx0Y29uc3QgRXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX09VVCwgdGhpcywgdGhpcy5vbk1vdXNlVVApO1xyXG5cclxuXHRcdHRoaXMud2hsID0gbmV3IFdoZWVsKHRoaXMud2lkdGggLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUsIHRydWUpO1xyXG5cdFx0dGhpcy5hdGsgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAqIDMgLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUpO1xyXG5cdFx0dGhpcy5jaGcgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAqIDAuODMsIHRoaXMuaGVpZ2h0ICogMC41NSwgdGhpcy53aWR0aCAvIDMwKTtcclxuXHRcdHRoaXMuc2V0UGljdHVyZShcInBpY2tcIik7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoXCJzaG9vdFwiKTtcclxuXHRcdHRoaXMud2hsLmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvd2hsLnBuZ1wiKVxyXG5cdFx0dGhpcy5jaGcubG9hZEltYWdlKFwicmVzL2F0bGFzL3doZWVscy9jaGcucG5nXCIpXHJcblx0XHR0aGlzLndobC56T3JkZXIgPSAxMDAwO1xyXG5cdFx0dGhpcy5hdGsuek9yZGVyID0gMTAwMTtcclxuXHRcdHRoaXMuY2hnLnpPcmRlciA9IDEwMDI7XHJcblx0XHR0aGlzLndobC5zcC56T3JkZXIgPSAxMDAzO1xyXG5cclxuXHRcdHdpbmRvdy50aGVfSGVybyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkhlcm9cIiwgSGVybyk7XHJcblx0XHR0aGVfSGVyby5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0Ly8gaW5pdCB0ZXh0XHJcblx0XHR0aGlzLmRsZyA9IG5ldyBMYXlhLlRleHQoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kbGcpO1xyXG5cdFx0dGhpcy5kbGcucG9zKDAsIDApO1xyXG5cdFx0dGhpcy5kbGcuc2l6ZSgyMDAsIDEwMCk7XHJcblx0XHR0aGlzLmRsZy5waXZvdCgxMDAsIDUwKTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gMjA7XHJcblx0XHR0aGlzLmRsZy5hbGlnbiA9IFwiY2VudGVyXCJcclxuXHRcdHRoaXMuZGxnLnZhbGlnbiA9IFwibWlkZGxlXCJcclxuXHRcdHRoaXMuZGxnLmNvbG9yID0gXCIjMDAwMDAwXCJcclxuXHRcdHRoaXMuZGxnLmZvbnQgPSBcIkltcGFjdFwiO1xyXG5cdFx0dGhpcy5kbGcuek9yZGVyID0gMTAwMDtcclxuXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdyA9IG5ldyBMYXlhLlRleHQoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zY29yZV9XaW5kb3cpO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIDQwKTtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnNpemUoMjAwLCAxMDApO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cucGl2b3QoMTAwLCA1MCk7XHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5mb250U2l6ZSA9IDIwO1xyXG5cdFx0dGhpcy5zY29yZV9XaW5kb3cuYWxpZ24gPSBcImNlbnRlclwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy52YWxpZ24gPSBcIm1pZGRsZVwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5jb2xvciA9IFwiI0ZGMDAwMFwiXHJcblx0XHR0aGlzLnNjb3JlX1dpbmRvdy5mb250ID0gXCJJbXBhY3RcIjtcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LnpPcmRlciA9IDEwMDA7XHJcblxyXG5cdFx0Ly8gcGxheSBtdXNpY1xyXG5cdFx0bGF5YS5tZWRpYS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKFwicmVzL3NvdW5kcy9CR00uYWFjXCIsIDApO1xyXG5cclxuXHRcdC8vIHJ1blxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMub25GcmFtZSk7XHJcblxyXG5cdFx0Ly8gc3RhcnQgZ2F0ZVxyXG5cdFx0bGV0IGdhdGUxID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR2F0ZVwiLCBHYXRlKTtcclxuXHRcdGdhdGUxLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRsZXQgZ2F0ZTIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG5cdFx0Z2F0ZTIucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdGdhdGUyLm1hcFggPSAzODA7XHJcblx0XHRnYXRlMi5tYXBZID0gMTAwO1xyXG5cdFx0Z2F0ZTIuZGlmZmljdWx0eSA9IDM7XHJcblxyXG5cdFx0Ly8gdGhlIGdvZCBhdCBob21lXHJcblx0XHRsZXQgYV9nb2QgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHb2RcIiwgR29kKTtcclxuXHRcdGFfZ29kLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBIUFxyXG5cdFx0dGhpcy5IUFdpbmRvdyA9IG5ldyBIUFdpbmRvdygpXHJcblxyXG5cdFx0Ly8gdGlueSBhcnJvd1xyXG5cdFx0bGV0IEwgPSAxMDtcclxuXHRcdHRoaXMudGlueUFycm93ID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMudGlueUFycm93KTtcclxuXHRcdHRoaXMudGlueUFycm93LmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvYXJyb3cucG5nXCIpXHJcblx0XHR0aGlzLnRpbnlBcnJvdy5hbHBoYSA9IDAuOTtcclxuXHRcdHRoaXMudGlueUFycm93LnZpc2libGUgPSB0cnVlO1xyXG5cdFx0dGhpcy50aW55QXJyb3cucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyKTtcclxuXHRcdHRoaXMudGlueUFycm93LnBpdm90KDE2LCA0MCk7XHJcblx0XHR0aGlzLnRpbnlBcnJvdy5zaXplKDMyLCAzMik7XHJcblx0XHR0aGlzLnRpbnlBcnJvdy56T3JkZXIgPSAxMDAwO1xyXG5cdFx0dGhpcy50aW55QXJyb3cuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiIzk5RkY5OVwiLCAxMCwgMCwgMCldO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJhdGVfbW9uc3Rlcihtb25zdGVyX2Ftb3VudCl7XHJcblx0XHRsZXQgY3VyX2Ftb3VudCA9IDA7XHJcblx0XHRsZXQgQkc9TWF0aC5mbG9vcigodGhpcy5udW1iZXItMSkgLyA1KVxyXG5cdFx0aWYoQkc+LTEpXHJcblx0XHR7XHJcblx0XHRcdGxldCBjdXJfYW1vdW50ID0gMDtcclxuXHRcdFx0d2hpbGUgKGN1cl9hbW91bnQgPCBtb25zdGVyX2Ftb3VudCkge1xyXG5cdFx0XHRcdGxldCBuZXdfbW9uc3RlciA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkd1bm5lclwiLCBHdW5uZXIpO1xyXG5cdFx0XHRcdG5ld19tb25zdGVyLnJvb3RfcmVzZXQoKTtcclxuXHRcdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdFx0bmV3X21vbnN0ZXIucGxhY2VSYW5kb21seSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGN1cl9hbW91bnQgPSAwO1xyXG5cdFx0XHRsZXQgc3Ryb25nX21vbnN0ZXJfYW1vdW50MSA9IE1hdGguZmxvb3IobW9uc3Rlcl9hbW91bnQgLyAzKTtcclxuXHRcdFx0d2hpbGUgKGN1cl9hbW91bnQgPCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQxKSB7XHJcblx0XHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiU2hhcnBzaG9vdGVyXCIsIFNoYXJwc2hvb3Rlcik7XHJcblx0XHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5wbGFjZVJhbmRvbWx5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoQkc+PTEpXHJcblx0XHR7XHJcblx0XHRcdGN1cl9hbW91bnQgPSAwO1xyXG5cdFx0XHRsZXQgc3Ryb25nX21vbnN0ZXJfYW1vdW50MiA9IE1hdGguZmxvb3IobW9uc3Rlcl9hbW91bnQgLyA2KTtcclxuXHRcdFx0d2hpbGUgKGN1cl9hbW91bnQgPCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQyKSB7XHJcblx0XHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwid2l6YXJkXCIsIHdpemFyZCk7XHJcblx0XHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5wbGFjZVJhbmRvbWx5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZihCRz49MilcclxuXHRcdHtcclxuXHRcdFx0Y3VyX2Ftb3VudCA9IDA7XHJcblx0XHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQzID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDEwKTtcclxuXHRcdFx0d2hpbGUgKGN1cl9hbW91bnQgPCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQzKSB7XHJcblx0XHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiQ2hhcml6YXJkXCIsIENoYXJpemFyZCk7XHJcblx0XHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0XHRuZXdfbW9uc3Rlci5wbGFjZVJhbmRvbWx5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRnJhbWUoKSB7XHJcblx0XHRpZiAodGhpcy5wYXVzZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOaXoOWwveaooeW8j1xyXG5cdFx0LypcclxuXHRcdGlmICh0aGlzLnRpbWVfY291bnQgJSB0aGlzLnRpbWVfaW50ZXJ2YWwgPT0gMCkge1xyXG5cdFx0XHR0aGlzLmdlbmVyYXRlX21vbnN0ZXIoKTtcclxuXHRcdFx0aWYgKHRoaXMudGltZV9pbnRlcnZhbCA+IDIwKSB7XHJcblx0XHRcdFx0dGhpcy50aW1lX2ludGVydmFsIC09IDIwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLnRpbWVfY291bnQgKz0gMTtcclxuXHRcdCovXHJcblxyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcclxuXHRcdFx0dGhlX2J1bGxldC51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCkge1xyXG5cdFx0XHR0aGVfdGhpbmcudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoZV9IZXJvLnVwX2RhdGUoKTtcclxuXHRcdHRoZV9IZXJvLnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMik7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KHRoZV9IZXJvLm1hcFggLSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCB0aGVfSGVyby5tYXBZIC0gTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodClcclxuXHRcdHRoaXMuSFBXaW5kb3cudXBkYXRlKClcclxuXHRcdHRoaXMuc2NvcmVfV2luZG93LmNoYW5nZVRleHQoXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlKTtcclxuXHJcblxyXG5cdFx0Ly8gdGlueSBhcnJvd1xyXG5cdFx0aWYoVGhpbmdfbGlzdC5sZW5ndGggPT0gMSlcclxuwqDCoMKgwqDCoMKgwqDCoHtcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgdGhpcy50aW55QXJyb3cudmlzaWJsZT10cnVlO1xyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBjb25zdCBkeD1UaGluZ19saXN0WzBdLm1hcFgtdGhlX0hlcm8ubWFwWDtcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgY29uc3QgZHk9VGhpbmdfbGlzdFswXS5tYXBZLXRoZV9IZXJvLm1hcFk7XHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoGlmKGR4KmR4K2R5KmR5PjI1MDApXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgdGhpcy50aW55QXJyb3cucm90YXRpb249MTgwLU1hdGguYXRhbjIoZHgsZHkpL01hdGguUEkqMTgwXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoGVsc2VcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqB0aGlzLnRpbnlBcnJvdy52aXNpYmxlPWZhbHNlO1xyXG7CoMKgwqDCoMKgwqDCoMKgfVxyXG7CoMKgwqDCoMKgwqDCoMKgZWxzZSB0aGlzLnRpbnlBcnJvdy52aXNpYmxlPWZhbHNlO1xyXG5cdH1cclxuXHJcblx0b25Nb3VzZURvd24oZSkge1xyXG5cdFx0aWYgKCh0aGlzLndobC54IC0gZS5zdGFnZVgpICogKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKyAodGhpcy53aGwueSAtIGUuc3RhZ2VZKSAqICh0aGlzLndobC55IC0gZS5zdGFnZVkpIDw9IHRoaXMud2hsLnIgKiB0aGlzLndobC5yKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoKHRoaXMuYXRrLnggLSBlLnN0YWdlWCkgKiAodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSArICh0aGlzLmF0ay55IC0gZS5zdGFnZVkpICogKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy5hdGsuciAqIHRoaXMuYXRrLnIpIHtcclxuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5jaGcueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmNoZy54IC0gZS5zdGFnZVgpICsgKHRoaXMuY2hnLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5jaGcueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmNoZy5yICogdGhpcy5jaGcucikge1xyXG5cdFx0XHR0aGlzLmNoZy5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VVcChlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLmNoZy5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy5jaGcub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZU1vdmUoZSkge1xyXG5cdFx0aWYgKHRoaXMud2hsLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuY2hnLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmNoZy5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlbG9zaXR5KCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogKHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54KSAvIHRoaXMud2hsLnIsXHJcblx0XHRcdHk6ICh0aGlzLndobC5zcC55IC0gdGhpcy53aGwueSkgLyB0aGlzLndobC5yXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvb3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRDaGFuZ2UoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGcuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRQYXNzKG1hcFgsIG1hcFkpIHtcclxuXHRcdGNvbnN0IGEgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyQnlJbmRleCgwKS5nZXRUaWxlRGF0YShNYXRoLmZsb29yKG1hcFggLyAzMiksIE1hdGguZmxvb3IobWFwWSAvIDMyKSk7XHJcblx0XHRpZiAodGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGlsZWRNYXAuX2pzb25EYXRhLnRpbGVzZXRzWzBdLnRpbGVzW2EgLSAxXS5wcm9wZXJ0aWVzWzBdLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzZXRQaWN0dXJlKHN0cikge1xyXG5cdFx0aWYgKHN0ciA9PSBcInNob290XCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInNob290XCIpIHtcclxuXHRcdFx0Y29uc3QgYXRrID0gdGhpcy5hdGs7XHJcblx0XHRcdGF0ay50eXBlID0gXCJzaG9vdFwiXHJcblx0XHRcdGF0ay5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL2F0azEucG5nXCIpXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzdHIgPT0gXCJwaWNrXCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInBpY2tcIikge1xyXG5cdFx0XHRjb25zdCBhdGsgPSB0aGlzLmF0aztcclxuXHRcdFx0YXRrLnR5cGUgPSBcInBpY2tcIlxyXG5cdFx0XHRhdGsubG9hZEltYWdlKFwicmVzL2F0bGFzL3doZWVscy9hdGsyLnBuZ1wiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGV4dCh0ZXh0LCBjb2xvciwgeCwgeSwgc3opIHtcclxuXHRcdGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHRleHQgPSBcIlwiO1xyXG5cdFx0aWYgKGNvbG9yID09PSB1bmRlZmluZWQpIGNvbG9yID0gXCIjRkZGRkZGXCI7XHJcblx0XHRpZiAoeCA9PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHggPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyXHJcblx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0ICogMC40NVxyXG5cdFx0fVxyXG5cdFx0aWYgKHN6ID09PSB1bmRlZmluZWQpIHN6ID0gMjA7XHJcblxyXG5cdFx0dGhpcy5kbGcuY2hhbmdlVGV4dCh0ZXh0KTtcclxuXHRcdHRoaXMuZGxnLmNvbG9yID0gY29sb3I7XHJcblx0XHR0aGlzLmRsZy5wb3MoeCwgeSk7XHJcblx0XHR0aGlzLmRsZy5mb250U2l6ZSA9IHN6O1xyXG5cdFx0dGhpcy5kbGcuYWxwaGEgPSAxO1xyXG5cdH1cclxuXHJcblx0bWFwX2NoYW5nZSgpIHtcclxuXHRcdHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHRcdGNvbnN0IG51bWJlciA9IHRoaXMubnVtYmVyO1xyXG5cdFx0dGhpcy5udW1iZXIgKz0gMTtcclxuXHJcblx0XHRsZXQgYmcgPSBNYXRoLmZsb29yKG51bWJlciAvIDUpO1xyXG5cdFx0bGV0IGlkeCA9IG51bWJlciAlIDM7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRUaWxlZE1hcCA9IExheWEuVGlsZWRNYXAsXHJcblx0XHRcdFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQsXHJcblx0XHRcdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcblxyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLkhQID0gLTE7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XHJcblx0XHRcdHRoZV9idWxsZXQuSFAgPSAtMTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XHJcblx0XHRcdHRoZV90aGluZy5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudGlsZWRNYXAuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXMvdGlsZWRtYXBzL1wiICsgYmcgKyBpZHggKyBcIi5qc29uXCIsIG5ldyBSZWN0YW5nbGUoMCwgMCwgQnJvd3Nlci53aWR0aCwgQnJvd3Nlci5oZWlnaHQpLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZGVkTWFwMikpO1xyXG5cdH1cclxuXHJcblx0b25Mb2FkZWRNYXAyKCkge1xyXG5cdFx0dGhlX0hlcm8ucGxhY2VSYW5kb21seSgpXHJcblxyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cdFx0dGhpcy5hdGsudHlwZSA9IHVuZGVmaW5lZDtcclxuXHRcdHRoaXMuc2V0UGljdHVyZSgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCgwLCAwLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0XHR0aGlzLmdlbmVyYXRlX21vbnN0ZXIodGhpcy5udW1iZXIgKiB0aGlzLmRpZmZpY3VsdHkpXHJcblxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGdldFVSTHMoc3RyLCBuKSB7XHJcblx0XHRsZXQgdXJscyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpICs9IDEpIHtcclxuXHRcdFx0dXJscy5wdXNoKFwicmVzL2F0bGFzL1wiICsgc3RyICsgaSArIFwiLnBuZ1wiKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybHM7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfaHVnZSBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJwc2hvb3RlciBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJTaGFycHNob290ZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KVxyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMCAqIDQwO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAzO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiLCBNb25zdGVyX0J1bGxldF9odWdlKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9odWdlIGZyb20gXCIuL0hlcm9fQnVsbGV0X2h1Z2VcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG90Z3VuIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiU2hvdGd1blwiXHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDI7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDY1O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMS5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiwzMik7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMisxNCk7XHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9odWdlO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X2h1Z2VcIlxyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG9sZF94ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3g7XHJcbiAgICAgICAgbGV0IG9sZF95ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3k7XHJcblxyXG4gICAgICAgIGxldCBkX2EgPSAwLjI1O1xyXG4gICAgICAgIGxldCBoYWxmX04gPSAzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAtaGFsZl9OOyBpIDw9IGhhbGZfTjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5ld19kaXJlY3Rpb24gPSB0aGlzLnJvdGF0ZV92KG9sZF94LCBvbGRfeSwgaSAqIGRfYSk7XHJcbiAgICAgICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl94ID0gbmV3X2RpcmVjdGlvbi54O1xyXG4gICAgICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feSA9IG5ld19kaXJlY3Rpb24ueTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feCA9IG9sZF94O1xyXG4gICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl95ID0gb2xkX3k7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMucGl2b3QoNywxNik7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZT1cIumcsOW8ueaeqlwiXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmcgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6L+Y5rKh5pyJ6K6+572u5Y+l5a2Q77yBXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKFRoaW5nX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxyXG4gICAgICAgIHRoaXMuSFA9MTtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlZWwgZXh0ZW5kcyBMYXlhLlNwcml0ZVxyXG57XHJcblx0Y29uc3RydWN0b3IoeCx5LHIsaGFzU3ApXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xyXG5cdFx0dGhpcy5waXZvdChyLHIpO1xyXG5cdFx0Ly90aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRkZGXCIpO1xyXG5cdFx0dGhpcy5wb3MoeCx5KTtcclxuXHRcdHRoaXMucj1yO1xyXG4gICAgICAgIHRoaXMuSUQ9bnVsbDtcclxuICAgICAgICB0aGlzLmFscGhhPTAuNjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0XHR0aGlzLmhhc1NwPWhhc1NwO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xyXG5cdH1cclxuXHJcblx0b25TdGFydERyYWcoZSl7XHJcblx0XHR0aGlzLklEPWUudG91Y2hJZDtcclxuXHRcdHRoaXMubW92ZVRvKGUuc3RhZ2VYLGUuc3RhZ2VZKTtcclxuXHR9XHJcblxyXG5cdG9uU3RvcERyYWcoKVxyXG5cdHtcclxuXHRcdHRoaXMuSUQ9bnVsbDtcclxuXHRcdGlmKHRoaXMuaGFzU3ApXHJcblx0XHRcdHRoaXMuc3AucG9zKHRoaXMueCx0aGlzLnkpXHJcblx0fVxyXG5cclxuXHRtb3ZlVG8oeCx5KVxyXG5cdHtcclxuXHRcdGlmKHRoaXMuaGFzU3ApXHJcblx0XHR7XHJcblx0XHRcdGxldCBkeD14LXRoaXMueDtcclxuXHRcdFx0bGV0IGR5PXktdGhpcy55O1xyXG5cclxuXHRcdFx0bGV0IFI9TWF0aC5zcXJ0KGR4KmR4K2R5KmR5KTtcclxuXHRcdFx0bGV0IGR4Mj1SPnRoaXMucj8gZHgqdGhpcy5yL1I6IGR4O1xyXG5cdFx0XHRsZXQgZHkyPVI+dGhpcy5yPyBkeSp0aGlzLnIvUjogZHk7XHJcblx0XHRcdHRoaXMuc3AucG9zKHRoaXMueCtkeDIsdGhpcy55K2R5MilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi9TaG90Z3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvXCI7XHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDE1MDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxNTA7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG9vdFxyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG93XHJcbiAgICAgICAgdGhpcy5zaXplKDQ4LDQ4KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZ3VuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTs7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnU2hvdGd1bicsIFNob3RndW4pO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gY2hhbmdlIGd1blxyXG4gICAgICAgIGxldCBjaGFuZ2luZz10aGVfc2NyZWVuLmdldENoYW5nZSgpO1xyXG4gICAgICAgIGlmKGNoYW5naW5nJiYhdGhpcy5wcmVDaGFuZ2luZyl7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLm1haW5fZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuID0gdGhpcy5hbHRlcm5hdGVfZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnpPcmRlcj10aGlzLnpPcmRlcisxO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gdG1wO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFpbl9ndW4uc2VudGVuY2UpXHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm1haW5fZ3VuLnNlbnRlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1jaGFuZ2luZ1xyXG5cclxuICAgICAgICAvLyByZXBhaXIgYXJtb3JcclxuICAgICAgICBpZih0aGlzLmFybW9yIDwgdGhpcy5hcm1vcl9tYXgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmFybW9yX2NvdW50ID49IDYwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3IgKz0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS55O1xyXG4gICAgICAgIGxldCB2PXRoaXMuZGwodngsdnkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2eCAqIHRoaXMudl9tYXgsIHZ5ICogdGhpcy52X21heCk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8gZ2V0IG5lYXJlc3RfdGhpbmdcclxuICAgICAgICB0aGlzLmNoZWNraXRlbSgpO1xyXG5cclxuICAgICAgICAvLyB1c2luZyBnb29kc1xyXG4gICAgICAgIGlmKHRoaXMubmVhcmVzdF90aGluZyAhPT0gbnVsbCAmJiB0aGlzLmdldF9kaXN0YW5jZSh0aGlzLm5lYXJlc3RfdGhpbmcpIDwgNTApe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5uZWFyZXN0X3RoaW5nLnNlbnRlbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcudXNlX2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaG9vdGluZ1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInNob290XCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSkgICAvLyBzaG9vdCBidXR0b24gY2xpY2tlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnNob290X3Bvd2VyICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID49IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbl94Pj0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9MTtcclxuICAgICAgICAgICAgbGV0IGFyZz05MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9MjcwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdF9ldmVudCgpe1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcclxuICAgICAgICB0aGlzLnNob290aW5nX3NvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3Rpbmdfc291bmQoKXtcclxuXHRcdExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInJlcy9zb3VuZHMvc2hvb3RpbmcubXAzXCIsIDEsIG5ldyBMYXlhLkhhbmRsZXIodGhpcywgdGhpcy5vbkNvbXBsZXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNraXRlbSgpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZyk7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3RoaW5nID0gdGhlX3RoaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0XHJcbiAgICAgICAgaWYobmVhcmVzdF90aGluZyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG5lYXJlc3RfdGhpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gdGhpcy5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSB0aGlzLmFybW9yX21heDtcclxuICAgICAgICB0aGlzLnByZUNoYW5naW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXI9MDtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnpPcmRlcj10aGlzLnpPcmRlcisxO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4udmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKVxyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxufSIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfY3Vyc2UgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRfY3Vyc2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgd2l6YXJkIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIndpemFyZFwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwMDAwMDtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMztcclxuICAgICAgICB0aGlzLnNraWxsX2Nvc3QgPSAzMDtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsID0gMTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfY3Vyc2VcIiwgTW9uc3Rlcl9CdWxsZXRfY3Vyc2UpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
