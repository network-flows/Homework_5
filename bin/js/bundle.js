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

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":12,"./script/Hero_Bullet":13,"./script/Monster":16,"./script/Monster_Bullet":17,"./script/Monster_Bullet_huge":18,"./script/Monster_Bullet_normal":19,"./script/Screen":20,"./script/Thing":23,"./script/Wheel":24}],2:[function(require,module,exports){
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

},{"./Thing":23}],6:[function(require,module,exports){
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

},{"./Monster":16}],7:[function(require,module,exports){
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

},{"./Thing":23}],8:[function(require,module,exports){
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

},{"./Beings":2,"./Hero_Bullet_normal":15}],9:[function(require,module,exports){
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

},{"./Beings":2,"./Gun":8,"./Hero_Bullet_normal":15}],10:[function(require,module,exports){
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

},{"./Monster":16,"./Monster_Bullet_normal":19}],11:[function(require,module,exports){
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

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":15,"./Monster":16,"./Shotgun":22}],13:[function(require,module,exports){
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

},{"./Bullet":3,"./Monster":16}],14:[function(require,module,exports){
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
        _this.Type = "Hero_Bullet_normal";

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

},{"./Hero_Bullet":13}],15:[function(require,module,exports){
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

},{"./Hero_Bullet":13}],16:[function(require,module,exports){
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

},{"./Beings":2,"./Gate":5}],17:[function(require,module,exports){
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

},{"./Bullet":3}],18:[function(require,module,exports){
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

},{"./Monster_Bullet":17}],19:[function(require,module,exports){
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

},{"./Monster_Bullet":17}],20:[function(require,module,exports){
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
			var cur_amount = 0;
			while (cur_amount < monster_amount) {
				var new_monster = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
				new_monster.root_reset();
				cur_amount += 1;
				new_monster.placeRandomly();
			}

			cur_amount = 0;
			var strong_monster_amount = Math.floor(monster_amount / 5);
			while (cur_amount < strong_monster_amount) {
				var _new_monster = Laya.Pool.getItemByClass("Sharpshooter", _Sharpshooter2.default);
				_new_monster.root_reset();
				cur_amount += 1;
				_new_monster.placeRandomly();
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

},{"./DragPoint":4,"./Gate":5,"./Goblin":6,"./God":7,"./Gunner":10,"./HPWindow":11,"./Sharpshooter":21,"./Wheel":24,"./hero":25}],21:[function(require,module,exports){
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
        key: "shoot",
        value: function shoot() {
            var new_bullet = Laya.Pool.getItemByClass(this.bullet_type, this.bullet);
            new_bullet.root_reset();
        }
    }, {
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

},{"./Monster":16,"./Monster_Bullet_huge":18}],22:[function(require,module,exports){
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

},{"./Beings":2,"./Gun":8,"./Hero_Bullet_huge":14}],23:[function(require,module,exports){
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

},{"./Beings":2}],24:[function(require,module,exports){
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

},{"./DragPoint":4}],25:[function(require,module,exports){
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

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":15,"./Monster":16,"./Shotgun":22}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9Hb2QuanMiLCJzcmMvc2NyaXB0L0d1bi5qcyIsInNyYy9zY3JpcHQvR3VuX25vcm1hbC5qcyIsInNyYy9zY3JpcHQvR3VubmVyLmpzIiwic3JjL3NjcmlwdC9IUFdpbmRvdy5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9TaGFycHNob290ZXIuanMiLCJzcmMvc2NyaXB0L1Nob3RndW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7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QUssS0FBTCxHQUFhLEtBQUssU0FBbEI7QUFDQSxpQkFBSyxXQUFMLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUssV0FBTCxHQUFpQixDQUFqQjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLEtBQUssTUFBTCxHQUFZLENBQWpDO0FBQ0EsaUJBQUssUUFBTCxDQUFjLE9BQWQsR0FBc0IsSUFBdEI7QUFDQSxpQkFBSyxhQUFMLENBQW1CLE9BQW5CLEdBQTJCLEtBQTNCO0FBQ0EsaUJBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxDQUFkLEVBQWdCLElBQWhCLEVBQXFCLFlBQXJCO0FBQ0EsaUJBQUssT0FBTCxHQUFhLE9BQWI7QUFDSDs7OztFQWhPNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XHJcbmltcG9ydCBCZWluZ3MgZnJvbSBcIi4vc2NyaXB0L0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0J1bGxldFwiXHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJcIlxyXG5pbXBvcnQgVGhpbmcgZnJvbSBcIi4vc2NyaXB0L1RoaW5nXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRcIlxyXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9zY3JpcHQvR2F0ZVwiXHJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXHJcbmltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vc2NyaXB0L0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxyXG5cclxuLy8g5omp5YWF55qE57G7XHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9zY3JpcHQvR29ibGluXCJcclxuXHJcbmNvbnN0XHJcblx0QnJvd3NlciA9IExheWEuQnJvd3NlcixcclxuXHRXZWJHTCA9IExheWEuV2ViR0wsXHJcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxyXG5cdFN0YXQgPSBMYXlhLlN0YXQsXHJcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuXHJcbi8v5Yid5aeL5YyW5byV5pOOXHJcbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuLy/mqKrlsY/muLjmiI9cclxuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG4vL+etieavlOS+i+e8qeaUvlxyXG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XHJcblxyXG4vL+iDjOaZr+minOiJslxyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcclxuXHJcbi8vIOinkuiJsuWuueWZqFxyXG53aW5kb3cuTW9uc3Rlcl9saXN0ID0gW107XHJcbndpbmRvdy5CdWxsZXRfbGlzdCA9IFtdO1xyXG53aW5kb3cuV2FsbF9saXN0ID0gW107XHJcbndpbmRvdy5UaGluZ19saXN0ID0gW107XHJcblxyXG4vLyBzZXQgdGhlIFNjcmVlblxyXG5sZXQgdyA9IEJyb3dzZXIuY2xpZW50V2lkdGg7XHJcbmxldCBoID0gQnJvd3Nlci5jbGllbnRIZWlnaHQ7XHJcblxyXG5MYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcblxyXG5TdGF0LnNob3coKTtcclxuXHJcbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudFxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJvb3RfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8yKVxyXG4gICAgICAgIHRoaXMuek9yZGVyPTA7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5hbmkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnJhbmNoX3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBfZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xyXG4gICAgICAgIGlmKHRoaXMuYW5pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5kZWFkX2FjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmFuaSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkX2FjdGlvbigpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKVxyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlBvb2wucmVjb3Zlcih0aGlzLlR5cGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGVhZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRsKGR4LCBkeSl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3RfZGwodGhlX29iamVjdCl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGVfb2JqZWN0LmR4ICogdGhlX29iamVjdC5keCArIHRoZV9vYmplY3QuZHkgKiB0aGVfb2JqZWN0LmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGlzdGFuY2UoYW5vdGhlcil7XHJcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXBYIC0gYW5vdGhlci5tYXBYO1xyXG4gICAgICAgIGxldCBkeSA9IHRoaXMubWFwWSAtIGFub3RoZXIubWFwWTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kbChkeCwgZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF92ZWN0b3Jfdih2X21heCwgdGhlX3Z4LCB0aGVfdnkpe1xyXG4gICAgICAgIGxldCB0aGVfdiA9IHRoaXMuZGwodGhlX3Z4LCB0aGVfdnkpO1xyXG4gICAgICAgIGlmKHRoZV92ID4gMUUtNiAmJiB2X21heCA+IDFFLTYpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogdGhlX3Z4ICogdl9tYXgvdGhlX3YsXHJcbiAgICAgICAgICAgICAgICB2eTogdGhlX3Z5ICogdl9tYXgvdGhlX3ZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogMCxcclxuICAgICAgICAgICAgICAgIHZ5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VVJMcyhzdHIsbilcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJscz1bXTtcclxuICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goXCJyZXMvYXRsYXMvXCIrc3RyK2krXCIucG5nXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmxzO1xyXG4gICAgfVxyXG4gICAgZ2V0RGlyKGR4LGR5LGxhc3Qpe1xyXG4gICAgICAgIGlmKGR4PjApcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICBpZigtZHg+MClyZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhY2hhYmxlKG5ld19tYXBYLCBuZXdfbWFwWSl7XHJcbiAgICAgICAgbGV0IHBvaW50X3NldCA9IFtdO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICAgICAgICAgICAgICAgLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggICAgICAgICAgICAgICAsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCB0aGVfcG9pbnQgb2YgcG9pbnRfc2V0KXtcclxuICAgICAgICAgICAgb2sgJj0gdGhlX3NjcmVlbi5nZXRQYXNzKHRoZV9wb2ludC54LCB0aGVfcG9pbnQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvaztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlX2J5X2R4X2R5KGR4LCBkeSl7XHJcbiAgICAgICAgaWYoZHggPiAzMCl7XHJcbiAgICAgICAgICAgIGR4ID0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGR5ID4gMzApe1xyXG4gICAgICAgICAgICBkeSA9IDMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHggLyAyLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IGR4IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkgLyAyKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSBkeSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcm90YXRlX3Yob2xkX3gsIG9sZF95LCBhKXtcclxuICAgICAgICBsZXQgbmV3X3ggPSBvbGRfeCAqIE1hdGguY29zKGEpIC0gb2xkX3kgKiBNYXRoLnNpbihhKTtcclxuICAgICAgICBsZXQgbmV3X3kgPSBvbGRfeCAqIE1hdGguc2luKGEpICsgb2xkX3kgKiBNYXRoLmNvcyhhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBuZXdfeCxcclxuICAgICAgICAgICAgeTogbmV3X3lcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHBsYWNlUmFuZG9tbHkoKVxyXG4gICAge1xyXG4gICAgICAgIHdoaWxlKHRydWUpe1xyXG4gICAgICAgICAgICBsZXQgbmV3X3ggPSBNYXRoLnJhbmRvbSgpICogdGhlX3NjcmVlbi5tYXBYX21heDtcclxuICAgICAgICAgICAgbGV0IG5ld195ID0gTWF0aC5yYW5kb20oKSAqIHRoZV9zY3JlZW4ubWFwWV9tYXg7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKG5ld194LCBuZXdfeSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBYID0gbmV3X3g7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFkgPSBuZXdfeTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IDE7XHJcbiAgICAgICAgdGhpcy52eSA9IDE7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIGxldCB3aWxsX2RpZSA9IHRoaXMuaGl0X3dhbGwodGhpcy52eCwgdGhpcy52eSk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgLT0gMTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodGhpcy52eCwgdGhpcy52eSlcclxuXHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gdGhpcy5nZXRfYXR0YWNrX2xpc3QoKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYod2lsbF9kaWUpe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBCdWxsZXRfbGlzdC5zcGxpY2UoQnVsbGV0X2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwbG9zaW9uKGF0dGFja19saXN0KXtcclxuICAgICAgICAvLyBleHBsb3Npb24gIVxyXG4gICAgICAgIGlmKGF0dGFja19saXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnB1c2godGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgaGl0X3dhbGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4LCB0aGlzLm1hcFkgKyBkeSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMucG9zKHgseSk7XHJcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XHJcblx0XHR0aGlzLnI9cjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0fVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdhdGVcIlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuWOu+W+gOS4i+S4gOWxglwiO1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnBpdm90KDE2LDE2KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5hbmkuZmlsdGVycz1bbmV3IExheWEuR2xvd0ZpbHRlcihcIkZGRkZBQVwiLDUsMCwwKV07XHJcblxyXG4gICAgICAgIC8qdGhpcy5yPTE1O1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy5yLHRoaXMucilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLHRoaXMucix0aGlzLnIsXCIjOTlGRkFBXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycz1bbmV3IExheWEuR2xvd0ZpbHRlcihcIkZGQkIwMFwiLDIwLDAsMCksbmV3IExheWEuR2xvd0ZpbHRlcihcIjAwQkJGRlwiLDUsMCwwKV07Ki9cclxuICAgIH1cclxuXHJcbiAgICB1c2VfaXQoKXtcclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5IUD0tMVxyXG5cclxuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXHJcbiAgICAgICAgaWYodGhlX3NjcmVlbi5kaWZmaWN1bHR5IDwgdGhpcy5kaWZmaWN1bHR5KXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5kaWZmaWN1bHR5ID0gdGhpcy5kaWZmaWN1bHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGVfc2NyZWVuLm1hcF9jaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5tYXBYPTEwMDtcclxuICAgICAgICB0aGlzLm1hcFk9MTAwO1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJrZXlcIik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2JsaW4gZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29ibGluXCI7XHJcblxyXG4gICAgICAgIHRoaXMud2lkdGggPSA0MDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCIuL29yei5qcGdcIikuc2NhbGUoMC40LDAuNCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG5cclxuICAgICAgICB0aGlzLkhQID0gMjA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVGhpbmcgZnJvbSBcIi4vVGhpbmdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29kIGV4dGVuZHMgVGhpbmd7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHb2RcIlxyXG5cclxuICAgICAgICB0aGlzLm1hcFggPSAyMDA7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gMjAwO1xyXG5cclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLlhpLpmanlrrbvvIzkvaDpnIDopoHmjIflvJXlkJfvvJ9cIjtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiZ29kL2Rvd25cIiwzKSxcImdvZF9kb3duXCIpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICB1c2VfaXQoKXtcclxuICAgICAgICAvLyBnbyB0byBuZXh0IGZsb29yXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6K+36YCJ5oup5LiA5omH6Zeo77yM5bem6L655piv5aSp5aCC77yM5Y+z6L655piv5Zyw54uxXCJcclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShUaGluZ19saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImdvZF9kb3duXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDEwO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfbm9ybWFsO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5fbm9ybWFsIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VuX25vcm1hbFwiXHJcblxyXG5cclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMC5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSg2NCwzMik7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5waXZvdCg4LDE2KTtcclxuICAgICAgICB0aGlzLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlPVwi5p2A6Jmr5YmCXCJcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VubmVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bm5lclwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiLCBNb25zdGVyX0J1bGxldF9ub3JtYWwpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFBXaW5kb3cgZXh0ZW5kcyBMYXlhLlNwcml0ZSBcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLkhQPTA7XHJcbiAgICAgICAgdGhpcy5hcm1vcj0wO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuek9yZGVyPTEwMDA7XHJcbiAgICAgICAgdGhpcy5zaXplKDIwMCwxMjApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuSFAhPXRoZV9IZXJvLkhQfHx0aGlzLmFybW9yIT10aGVfSGVyby5hcm1vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IFRleHQ9TGF5YS5UZXh0XHJcbiAgICAgICAgICAgIHRoaXMuSFA9dGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3I9dGhlX0hlcm8uYXJtb3I7XHJcbiAgICAgICAgICAgIGxldCBsZW5fSFA9KDE2Ny03OCkvdGhlX0hlcm8uSFBfbWF4KnRoZV9IZXJvLkhQO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCwzMCxsZW5fSFAsMTcsXCIjRkZGRjAwXCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVuX2FybW9yPSgxNjctNzgpL3RoZV9IZXJvLmFybW9yX21heCp0aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSwxNjctNzgsMTcsXCIjNTU1NTU1XCIpICAgLy83OCwzMiAgLS0tMTY3LDQ3XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsNzksbGVuX2FybW9yLDE3LFwiI0ZGRkYwMFwiKSAgIC8vNzgsNzggIC0tLTE2Nyw5M1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZShcInJlcy9IUFdpbmRvdy9IUFdpbmRvdy5wbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5pbXBvcnQgR3VuX25vcm1hbCBmcm9tIFwiLi9HdW5fbm9ybWFsXCJcclxuaW1wb3J0IFNob3RndW4gZnJvbSBcIi4vU2hvdGd1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb1wiO1xyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuICAgICAgICB0aGlzLm1hcFggPSAxNTA7XHJcbiAgICAgICAgdGhpcy5tYXBZID0gMTUwO1xyXG5cclxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcclxuICAgICAgICB0aGlzLkhQX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuXHJcbiAgICAgICAgLy8gc2hvd1xyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIGd1blxyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7O1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ1Nob3RndW4nLCBTaG90Z3VuKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vIGNoYW5nZSBndW5cclxuICAgICAgICBsZXQgY2hhbmdpbmc9dGhlX3NjcmVlbi5nZXRDaGFuZ2UoKTtcclxuICAgICAgICBpZihjaGFuZ2luZyYmIXRoaXMucHJlQ2hhbmdpbmcpe1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gdGhpcy5tYWluX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1biA9IHRoaXMuYWx0ZXJuYXRlX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IHRtcDtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1haW5fZ3VuLnNlbnRlbmNlKVxyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5tYWluX2d1bi5zZW50ZW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9Y2hhbmdpbmdcclxuXHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nLnVzZV9pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2hvb3RpbmdcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJzaG9vdFwiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpICAgLy8gc2hvb3QgYnV0dG9uIGNsaWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zaG9vdF9wb3dlciAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA+PSB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAtdGhpcy5tYWluX2d1bi5zZWNvbmRfd2FpdGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb25feD49MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9OTAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTI3MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgZW5kIC0tLS0tLS0tLS8vXHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RfZXZlbnQoKXtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnNob290KCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdGluZ19zb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290aW5nX3NvdW5kKCl7XHJcblx0XHRMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJyZXMvc291bmRzL3Nob290aW5nLm1wM1wiLCAxLCBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGR4OiAwLFxyXG4gICAgICAgICAgICAgICAgZHk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2l0ZW0oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF90aGluZyA9IHRoZV90aGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdFxyXG4gICAgICAgIGlmKG5lYXJlc3RfdGhpbmcgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBuZWFyZXN0X3RoaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcbiAgICAgICAgdGhpcy5wcmVDaGFuZ2luZz1mYWxzZTtcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyPTA7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi56T3JkZXI9dGhpcy56T3JkZXIrMTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4udmlzaWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfaHVnZSBleHRlbmRzIEhlcm9fQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDIwO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSh0aGlzLnIqMix0aGlzLnIqMilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLCB0aGlzLnIsIHRoaXMuciwgXCIjQkEyMkFBXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZCRkZBQVwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA1MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL0hlcm9fQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0X25vcm1hbCBleHRlbmRzIEhlcm9fQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSh0aGlzLnIqMix0aGlzLnIqMilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLCB0aGlzLnIsIHRoaXMuciwgXCIjQjFGM0JCXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0YxRkY1RlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNTA7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yb3RhdGlvbj0tTWF0aC5hdGFuMih0aGVfSGVyby5kaXJlY3Rpb25feCx0aGVfSGVyby5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgLy90aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgNSwgMCwgMCldO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vR2F0ZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMTAwMDtcclxuICAgICAgICB0aGlzLnNraWxsX2Nvc3QgPSAzNjA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG9vdGVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR4O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB0aGlzLmdldF9oZXJvX29yaWVudGF0aW9uKCkuZHk7XHJcblxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSx0aGlzLlR5cGUrXCJfXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud2FuZGVyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIHNob290aW5nIGNvbnRyb2xcclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyIDwgMTAwMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfcG93ZXIgPj0gdGhpcy5za2lsbF9jb3N0KXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCx0aGlzLm1hcFkpKWNvbnNvbGUubG9nKFwiYmFkIHRoaW5nIGhhcHBlbmVkIG5vd1wiKVxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZnggPSAwO1xyXG4gICAgICAgIGxldCBmeSA9IDA7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeCA9IDEgLyBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZHkpID4gMUUtMil7XHJcbiAgICAgICAgICAgIGZ5ID0gMSAvIGR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZng6IGZ4LCBcclxuICAgICAgICAgICAgZnk6IGZ5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB3YW5kZXJpbmcoKXtcclxuICAgICAgICBsZXQgdiA9IHt2eDogMCwgdnk6IDB9O1xyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA+IHRoaXMucmFuZ2UgLyAxLjUpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoaXMuZGlyZWN0aW9uX3gsIHRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA8IHRoaXMucmFuZ2UgLyAyKXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCAtdGhpcy5kaXJlY3Rpb25feCwgLXRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9yY2VfYXZnID0ge1xyXG4gICAgICAgICAgICBmeDogMCxcclxuICAgICAgICAgICAgZnk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcyAhPT0gdGhlX21vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGYgPSB0aGlzLmZvcmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meCArPSBmLmZ4O1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ5ICs9IGYuZnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ4IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meSAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHYudnggKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0sIHYudnkgKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgICAgaWYoTW9uc3Rlcl9saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGFfZ2F0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcbiAgICAgICAgICAgIGFfZ2F0ZS5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5wdXNoKHRoaXMpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgICAgIHRoaXMuc2tpbGxfcG93ZXI9dGhpcy5za2lsbF9jb3N0Kk1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLCB0cnVlLCB0aGlzLlR5cGUrXCJfcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGVyb19vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGR4OiB0aGVfSGVyby5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICBkeTogdGhlX0hlcm8ubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9IZXJvKSl7XHJcbiAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX0hlcm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQobGF1bmNoZXIpe1xyXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIGxhdW5jaGVyLmRpcmVjdGlvbl94LCBsYXVuY2hlci5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcclxuICAgICAgICB0aGlzLm1hcFggPSBsYXVuY2hlci5tYXBYO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IGxhdW5jaGVyLm1hcFk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9odWdlXCI7XHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMjA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRjFGMjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0YxRjJGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAxMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9Hb2JsaW5cIlxyXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5pbXBvcnQgSFBXaW5kb3cgZnJvbSBcIi4vSFBXaW5kb3dcIlxyXG5pbXBvcnQgR29kIGZyb20gXCIuL0dvZFwiXHJcbmltcG9ydCBTaGFycHNob290ZXIgZnJvbSBcIi4vU2hhcnBzaG9vdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxyXG57XHJcblx0Y29uc3RydWN0b3IodywgaCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHR0aGlzLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaDtcclxuXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0dGhpcy5zaXplKHcsIGgpO1xyXG5cdFx0dGhpcy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmxvYWRNYXAoKTtcclxuXHJcblx0XHR0aGlzLm51bWJlciA9IDA7XHJcblx0XHR0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG5cclxuXHRcdHRoaXMudGltZV9jb3VudCA9IDA7XHJcblx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgPSA4MDA7XHJcblxyXG5cdFx0dGhpcy5tYXBYX21heCA9IDEwMDA7XHJcblx0XHR0aGlzLm1hcFlfbWF4ID0gMTAwMDtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL2xlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL3JpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImtleS9iYXNlXCIsNCksXCJrZXlcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiZ3VubmVyL2xlZnRcIiw0KSxcIkd1bm5lcl9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9yaWdodFwiLDQpLFwiR3VubmVyX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIlNoYXJwc2hvb3Rlci9sZWZ0XCIsNCksXCJTaGFycHNob290ZXJfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJTaGFycHNob290ZXIvcmlnaHRcIiw0KSxcIlNoYXJwc2hvb3Rlcl9yaWdodFwiKTtcclxuXHR9XHJcblxyXG5cdGxvYWRNYXAoKSB7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRUaWxlZE1hcCA9IExheWEuVGlsZWRNYXAsXHJcblx0XHRcdFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQsXHJcblx0XHRcdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcblx0XHR0aGlzLnRpbGVkTWFwID0gbmV3IFRpbGVkTWFwKCk7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNyZWF0ZU1hcChcInJlcy90aWxlZG1hcHMvc3RhcnQuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcCkpO1xyXG5cdH1cclxuXHJcblx0b25Mb2FkZWRNYXAoKSB7XHJcblx0XHRjb25zdCBFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm9uTW91c2VVcCk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfT1VULCB0aGlzLCB0aGlzLm9uTW91c2VVUCk7XHJcblxyXG5cdFx0dGhpcy53aGwgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmF0ayA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMyAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSk7XHJcblx0XHR0aGlzLmNoZyA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMC44MywgdGhpcy5oZWlnaHQgKjAuNTUsIHRoaXMud2lkdGggLyAzMCk7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG5cdFx0dGhpcy5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcblx0XHR0aGlzLndobC5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL3dobC5wbmdcIilcclxuXHRcdHRoaXMuY2hnLmxvYWRJbWFnZShcInJlcy9hdGxhcy93aGVlbHMvY2hnLnBuZ1wiKVxyXG5cdFx0dGhpcy53aGwuek9yZGVyID0gMTAwMDtcclxuXHRcdHRoaXMuYXRrLnpPcmRlciA9IDEwMDE7XHJcblx0XHR0aGlzLmNoZy56T3JkZXIgPSAxMDAyO1xyXG5cdFx0dGhpcy53aGwuc3Auek9yZGVyPTEwMDM7XHJcblxyXG5cdFx0d2luZG93LnRoZV9IZXJvID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiSGVyb1wiLCBIZXJvKTtcclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBpbml0IHRleHRcclxuXHRcdHRoaXMuZGxnID0gbmV3IExheWEuVGV4dCgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmRsZyk7XHJcblx0XHR0aGlzLmRsZy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmRsZy5zaXplKDIwMCwgMTAwKTtcclxuXHRcdHRoaXMuZGxnLnBpdm90KDEwMCwgNTApO1xyXG5cdFx0dGhpcy5kbGcuZm9udFNpemUgPSAyMDtcclxuXHRcdHRoaXMuZGxnLmFsaWduID0gXCJjZW50ZXJcIlxyXG5cdFx0dGhpcy5kbGcudmFsaWduID0gXCJtaWRkbGVcIlxyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG5cdFx0dGhpcy5kbGcuZm9udCA9IFwiSW1wYWN0XCI7XHJcblx0XHR0aGlzLmRsZy56T3JkZXIgPSAxMDAwO1xyXG5cclxuXHRcdC8vIHBsYXkgbXVzaWNcclxuXHRcdGxheWEubWVkaWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhcInJlcy9zb3VuZHMvQkdNLm1wM1wiLCAwKTtcclxuXHJcblx0XHQvLyBydW5cclxuXHRcdHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLm9uRnJhbWUpO1xyXG5cclxuXHRcdC8vIHN0YXJ0IGdhdGVcclxuXHRcdGxldCBnYXRlMSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcblx0XHRnYXRlMS5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0bGV0IGdhdGUyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR2F0ZVwiLCBHYXRlKTtcclxuXHRcdGdhdGUyLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRnYXRlMi5tYXBYID0gMzgwO1xyXG5cdFx0Z2F0ZTIubWFwWSA9IDEwMDtcclxuXHRcdGdhdGUyLmRpZmZpY3VsdHkgPSAzO1xyXG5cclxuXHRcdC8vIHRoZSBnb2QgYXQgaG9tZVxyXG5cdFx0bGV0IGFfZ29kID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR29kXCIsIEdvZCk7XHJcblx0XHRhX2dvZC5yb290X3Jlc2V0KCk7XHJcblxyXG5cdFx0Ly8gSFBcclxuXHRcdHRoaXMuSFBXaW5kb3cgPSBuZXcgSFBXaW5kb3coKVxyXG5cdH1cdFxyXG5cclxuXHRnZW5lcmF0ZV9tb25zdGVyKG1vbnN0ZXJfYW1vdW50KSB7XHJcblx0XHRsZXQgY3VyX2Ftb3VudCA9IDA7XHJcblx0XHR3aGlsZShjdXJfYW1vdW50IDwgbW9uc3Rlcl9hbW91bnQpe1xyXG5cdFx0XHRsZXQgbmV3X21vbnN0ZXIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHdW5uZXJcIiwgR3VubmVyKTtcclxuXHRcdFx0bmV3X21vbnN0ZXIucm9vdF9yZXNldCgpO1xyXG5cdFx0XHRjdXJfYW1vdW50ICs9IDE7XHJcblx0XHRcdG5ld19tb25zdGVyLnBsYWNlUmFuZG9tbHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJfYW1vdW50ID0gMDtcclxuXHRcdGxldCBzdHJvbmdfbW9uc3Rlcl9hbW91bnQgPSBNYXRoLmZsb29yKG1vbnN0ZXJfYW1vdW50IC8gNSk7XHJcblx0XHR3aGlsZShjdXJfYW1vdW50IDwgc3Ryb25nX21vbnN0ZXJfYW1vdW50KXtcclxuXHRcdFx0bGV0IG5ld19tb25zdGVyID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiU2hhcnBzaG9vdGVyXCIsIFNoYXJwc2hvb3Rlcik7XHJcblx0XHRcdG5ld19tb25zdGVyLnJvb3RfcmVzZXQoKTtcclxuXHRcdFx0Y3VyX2Ftb3VudCArPSAxO1xyXG5cdFx0XHRuZXdfbW9uc3Rlci5wbGFjZVJhbmRvbWx5KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkZyYW1lKCkge1xyXG5cdFx0aWYodGhpcy5wYXVzZWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5peg5bC95qih5byPXHJcblx0XHQvKlxyXG5cdFx0aWYgKHRoaXMudGltZV9jb3VudCAlIHRoaXMudGltZV9pbnRlcnZhbCA9PSAwKSB7XHJcblx0XHRcdHRoaXMuZ2VuZXJhdGVfbW9uc3RlcigpO1xyXG5cdFx0XHRpZiAodGhpcy50aW1lX2ludGVydmFsID4gMjApIHtcclxuXHRcdFx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgLT0gMjA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMudGltZV9jb3VudCArPSAxO1xyXG5cdFx0Ki9cclxuXHJcblx0XHRmb3IgKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3QpIHtcclxuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XHJcblx0XHRcdHRoZV90aGluZy51cF9kYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhlX0hlcm8udXBfZGF0ZSgpO1xyXG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY2hhbmdlVmlld1BvcnQodGhlX0hlcm8ubWFwWCAtIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIHRoZV9IZXJvLm1hcFkgLSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxyXG5cdFx0dGhpcy5IUFdpbmRvdy51cGRhdGUoKVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZURvd24oZSkge1xyXG5cdFx0aWYgKCh0aGlzLndobC54IC0gZS5zdGFnZVgpICogKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKyAodGhpcy53aGwueSAtIGUuc3RhZ2VZKSAqICh0aGlzLndobC55IC0gZS5zdGFnZVkpIDw9IHRoaXMud2hsLnIgKiB0aGlzLndobC5yKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoKHRoaXMuYXRrLnggLSBlLnN0YWdlWCkgKiAodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSArICh0aGlzLmF0ay55IC0gZS5zdGFnZVkpICogKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy5hdGsuciAqIHRoaXMuYXRrLnIpIHtcclxuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5jaGcueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmNoZy54IC0gZS5zdGFnZVgpICsgKHRoaXMuY2hnLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5jaGcueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmNoZy5yICogdGhpcy5jaGcucikge1xyXG5cdFx0XHR0aGlzLmNoZy5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VVcChlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLmNoZy5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy5jaGcub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZU1vdmUoZSkge1xyXG5cdFx0aWYgKHRoaXMud2hsLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuY2hnLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmNoZy5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlbG9zaXR5KCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogKHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54KSAvIHRoaXMud2hsLnIsXHJcblx0XHRcdHk6ICh0aGlzLndobC5zcC55IC0gdGhpcy53aGwueSkgLyB0aGlzLndobC5yXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvb3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRDaGFuZ2UoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGcuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRQYXNzKG1hcFgsIG1hcFkpIHtcclxuXHRcdGNvbnN0IGEgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyQnlJbmRleCgwKS5nZXRUaWxlRGF0YShNYXRoLmZsb29yKG1hcFggLyAzMiksIE1hdGguZmxvb3IobWFwWSAvIDMyKSk7XHJcblx0XHRpZiAodGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGlsZWRNYXAuX2pzb25EYXRhLnRpbGVzZXRzWzBdLnRpbGVzW2EgLSAxXS5wcm9wZXJ0aWVzWzBdLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzZXRQaWN0dXJlKHN0cikge1xyXG5cdFx0aWYgKHN0ciA9PSBcInNob290XCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInNob290XCIpIHtcclxuXHRcdFx0Y29uc3QgYXRrID0gdGhpcy5hdGs7XHJcblx0XHRcdGF0ay50eXBlID0gXCJzaG9vdFwiXHJcblx0XHRcdGF0ay5sb2FkSW1hZ2UoXCJyZXMvYXRsYXMvd2hlZWxzL2F0azEucG5nXCIpXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzdHIgPT0gXCJwaWNrXCIgJiYgdGhpcy5hdGsudHlwZSAhPSBcInBpY2tcIikge1xyXG5cdFx0XHRjb25zdCBhdGsgPSB0aGlzLmF0aztcclxuXHRcdFx0YXRrLnR5cGUgPSBcInBpY2tcIlxyXG5cdFx0XHRhdGsubG9hZEltYWdlKFwicmVzL2F0bGFzL3doZWVscy9hdGsyLnBuZ1wiKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGV4dCh0ZXh0LCBjb2xvciwgeCwgeSwgc3opIHtcclxuXHRcdGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHRleHQgPSBcIlwiO1xyXG5cdFx0aWYgKGNvbG9yID09PSB1bmRlZmluZWQpIGNvbG9yID0gXCIjRkZGRkZGXCI7XHJcblx0XHRpZiAoeCA9PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHggPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyXHJcblx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KjAuNDVcclxuXHRcdH1cclxuXHRcdGlmIChzeiA9PT0gdW5kZWZpbmVkKSBzeiA9IDIwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmRsZy5jaGFuZ2VUZXh0KHRleHQpO1xyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBjb2xvcjtcclxuXHRcdHRoaXMuZGxnLnBvcyh4LCB5KTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gc3o7XHJcblx0XHR0aGlzLmRsZy5hbHBoYSA9IDE7XHJcblx0XHQvL0xheWEuVHdlZW4udG8odGhpcy5kbGcse2FscGhhOjAseTp0aGlzLmRsZy55LTEwMCxmb250U2l6ZTp0aGlzLmRsZy5mb250U2l6ZSoyfSwxMDAwKVxyXG5cdH1cclxuXHJcblx0bWFwX2NoYW5nZSgpIHtcclxuXHRcdHRoaXMucGF1c2VkID0gdHJ1ZTtcclxuXHRcdGNvbnN0IG51bWJlciA9IHRoaXMubnVtYmVyO1xyXG5cdFx0dGhpcy5udW1iZXIgKz0gMTtcclxuXHRcdFxyXG5cdFx0bGV0IGJnID0gTWF0aC5mbG9vcihudW1iZXIvMTUpO1xyXG5cdFx0bGV0IGlkeCA9IG51bWJlciUzO1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cclxuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xyXG5cdFx0XHR0aGVfbW9uc3Rlci5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LkhQID0gLTE7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCkge1xyXG5cdFx0XHR0aGVfdGhpbmcuSFAgPSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRpbGVkTWFwLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY3JlYXRlTWFwKFwicmVzL3RpbGVkbWFwcy9cIitiZytpZHgrXCIuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcDIpKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwMigpIHtcclxuXHRcdHRoZV9IZXJvLnBsYWNlUmFuZG9tbHkoKVxyXG5cclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHRcdHRoaXMuYXRrLnR5cGUgPSB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLnNldFBpY3R1cmUoKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY2hhbmdlVmlld1BvcnQoMCwgMCwgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxyXG5cdFx0dGhpcy5nZW5lcmF0ZV9tb25zdGVyKHRoaXMubnVtYmVyICogdGhpcy5kaWZmaWN1bHR5KVxyXG5cclxuXHRcdHRoaXMucGF1c2VkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcnBzaG9vdGVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIlNoYXJwc2hvb3RlclwiO1xyXG5cclxuICAgICAgICB0aGlzLnNpemUoNDgsNDgpXHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModGhpcy5idWxsZXRfdHlwZSwgdGhpcy5idWxsZXQpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9odWdlXCIsIE1vbnN0ZXJfQnVsbGV0X2h1Z2UpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X2h1Z2UgZnJvbSBcIi4vSGVyb19CdWxsZXRfaHVnZVwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3RndW4gZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJTaG90Z3VuXCJcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMjtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gNTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCJyZXMvZ3Vucy9ndW4xLnBuZ1wiKVxyXG4gICAgICAgIC8vdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCxcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNpemUoMzIsMzIpO1xyXG4gICAgICAgIHRoaXMucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfaHVnZTtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9odWdlXCJcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBvbGRfeCA9IHRoZV9IZXJvLmRpcmVjdGlvbl94O1xyXG4gICAgICAgIGxldCBvbGRfeSA9IHRoZV9IZXJvLmRpcmVjdGlvbl95O1xyXG5cclxuICAgICAgICBsZXQgZF9hID0gMC4yNTtcclxuICAgICAgICBsZXQgaGFsZl9OID0gMztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gLWhhbGZfTjsgaSA8PSBoYWxmX047IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuZXdfZGlyZWN0aW9uID0gdGhpcy5yb3RhdGVfdihvbGRfeCwgb2xkX3ksIGkgKiBkX2EpO1xyXG4gICAgICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feCA9IG5ld19kaXJlY3Rpb24ueDtcclxuICAgICAgICAgICAgdGhlX0hlcm8uZGlyZWN0aW9uX3kgPSBuZXdfZGlyZWN0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0aGlzLmJ1bGxldF90eXBlLCB0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhlX0hlcm8uZGlyZWN0aW9uX3ggPSBvbGRfeDtcclxuICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feSA9IG9sZF95O1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnBpdm90KDcsMTUpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2U9XCLpnLDlvLnmnqpcIlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShUaGluZ19saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZV9pdCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnB1c2godGhpcylcclxuICAgICAgICB0aGlzLkhQPTE7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVlbCBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscixoYXNTcClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHQvL3RoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC42O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcbmltcG9ydCBTaG90Z3VuIGZyb20gXCIuL1Nob3RndW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9cIjtcclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTUwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDE1MDtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob3dcclxuICAgICAgICB0aGlzLnNpemUoMzIsNDgpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBndW5cclxuICAgICAgICB0aGlzLm1haW5fZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnR3VuX25vcm1hbCcsIEd1bl9ub3JtYWwpOztcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdTaG90Z3VuJywgU2hvdGd1bik7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICAvLyBjaGFuZ2UgZ3VuXHJcbiAgICAgICAgbGV0IGNoYW5naW5nPXRoZV9zY3JlZW4uZ2V0Q2hhbmdlKCk7XHJcbiAgICAgICAgaWYoY2hhbmdpbmcmJiF0aGlzLnByZUNoYW5naW5nKXtcclxuICAgICAgICAgICAgbGV0IHRtcCA9IHRoaXMubWFpbl9ndW47XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4gPSB0aGlzLmFsdGVybmF0ZV9ndW47XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uek9yZGVyPXRoaXMuek9yZGVyKzE7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4udmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSB0bXA7XHJcbiAgICAgICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tYWluX2d1bi5zZW50ZW5jZSlcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubWFpbl9ndW4uc2VudGVuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZUNoYW5naW5nPWNoYW5naW5nXHJcblxyXG4gICAgICAgIC8vIHJlcGFpciBhcm1vclxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPCB0aGlzLmFybW9yX21heCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXJtb3JfY291bnQgPj0gNjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vciArPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXHJcbiAgICAgICAgbGV0IHZ4ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLng7XHJcbiAgICAgICAgbGV0IHZ5ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLnk7XHJcbiAgICAgICAgbGV0IHY9dGhpcy5kbCh2eCx2eSk7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHZ4ICogdGhpcy52X21heCwgdnkgKiB0aGlzLnZfbWF4KTtcclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLyBnZXQgbmVhcmVzdF90aGluZ1xyXG4gICAgICAgIHRoaXMuY2hlY2tpdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIHVzaW5nIGdvb2RzXHJcbiAgICAgICAgaWYodGhpcy5uZWFyZXN0X3RoaW5nICE9PSBudWxsICYmIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoaXMubmVhcmVzdF90aGluZykgPCA1MCl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInBpY2tcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm5lYXJlc3RfdGhpbmcuc2VudGVuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIHRoaXMucHJlQ2hhbmdpbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlcj0wO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uek9yZGVyPXRoaXMuek9yZGVyKzE7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpXHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG59Il19
