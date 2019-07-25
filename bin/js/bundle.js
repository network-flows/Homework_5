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

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":12,"./script/Hero_Bullet":13,"./script/Monster":15,"./script/Monster_Bullet":16,"./script/Monster_Bullet_huge":17,"./script/Monster_Bullet_normal":18,"./script/Screen":19,"./script/Thing":22,"./script/Wheel":23}],2:[function(require,module,exports){
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
            this.difficulty = 1;
            this.ani.play(0, true, "key");
        }
    }]);

    return Gate;
}(_Thing3.default);

exports.default = Gate;

},{"./Thing":22}],6:[function(require,module,exports){
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

},{"./Thing":22}],8:[function(require,module,exports){
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
        _this.main_gun = new Laya.Pool.getItemByClass('Shotgun', _Shotgun2.default);
        _this.main_gun.root_reset();
        _this.alternate_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);;
        _this.alternate_gun.root_reset();
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // change gun
            if (the_screen.getChange()) {
                var tmp = this.main_gun;
                this.main_gun = this.alternate_gun;
                this.alternate_gun = tmp;
                this.shoot_power = 0;
            }

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

            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":14,"./Monster":15,"./Shotgun":21}],13:[function(require,module,exports){
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
            if (this.Type !== "Sharpshooter") {
                Monster_list.push(this);
                this.pre_dir = "right";
                this.ani.play(0, true, this.Type + "_right");
            }
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

        _this.v_max = 20;

        // set picture
        _this.r = 20;
        _this.graphics.drawCircle(0, 0, _this.r, "#FFFF00");
        _this.filters = [new Laya.GlowFilter("#FFFFFF", 10, 0, 0)];
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
			this.chg = new _Wheel2.default(this.width * 1 / 2, this.height * 3 / 4, this.width / 30);
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

			cur_amount = 0;
			var strong_monster_amount = Math.floor(monster_amount / 5);
			while (cur_amount < strong_monster_amount) {
				var _new_monster = Laya.Pool.getItemByClass("Sharpshooter", _Sharpshooter2.default);
				_new_monster.root_reset();
				cur_amount += 1;
				while (true) {
					var _new_x = Math.random() * this.mapX_max;
					var _new_y = Math.random() * this.mapY_max;
					if (_new_monster.reachable(_new_x, _new_y)) {
						_new_monster.mapX = _new_x;
						_new_monster.mapY = _new_y;
						break;
					}
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
			the_Hero.mapX = 110;
			the_Hero.mapY = 110;

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

},{"./DragPoint":4,"./Gate":5,"./Goblin":6,"./God":7,"./Gunner":10,"./HPWindow":11,"./Sharpshooter":20,"./Wheel":23,"./hero":24}],20:[function(require,module,exports){
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

        _this.Type = "Gunner";

        _this.width = 100;
        _this.height = 100;
        _this.range = 20 * 40;
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

},{"./Monster":15,"./Monster_Bullet_huge":17}],21:[function(require,module,exports){
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

var Shotgun = function (_Gun) {
    _inherits(Shotgun, _Gun);

    function Shotgun() {
        _classCallCheck(this, Shotgun);

        var _this = _possibleConstructorReturn(this, (Shotgun.__proto__ || Object.getPrototypeOf(Shotgun)).call(this));

        _this.Type = "Shotgun";

        _this.first_waiting = 2;
        _this.second_waiting = 50;

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
            this.pivot(8, 16);
            this.visible = true;
        }
    }]);

    return Shotgun;
}(_Gun3.default);

exports.default = Shotgun;

},{"./Beings":2,"./Gun":8,"./Hero_Bullet_normal":14}],22:[function(require,module,exports){
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

},{"./Beings":2}],23:[function(require,module,exports){
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

},{"./DragPoint":4}],24:[function(require,module,exports){
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
        _this.main_gun = new Laya.Pool.getItemByClass('Shotgun', _Shotgun2.default);
        _this.main_gun.root_reset();
        _this.alternate_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);;
        _this.alternate_gun.root_reset();
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            // change gun
            if (the_screen.getChange()) {
                var tmp = this.main_gun;
                this.main_gun = this.alternate_gun;
                this.alternate_gun = tmp;
                this.shoot_power = 0;
            }

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

            this.ani.play(0, true, "hero_right");
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":9,"./Hero_Bullet_normal":14,"./Monster":15,"./Shotgun":21}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9Hb2QuanMiLCJzcmMvc2NyaXB0L0d1bi5qcyIsInNyYy9zY3JpcHQvR3VuX25vcm1hbC5qcyIsInNyYy9zY3JpcHQvR3VubmVyLmpzIiwic3JjL3NjcmlwdC9IUFdpbmRvdy5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9TaGFycHNob290ZXIuanMiLCJzcmMvc2NyaXB0L1Nob3RndW4uanMiLCJzcmMvc2NyaXB0L1RoaW5nLmpzIiwic3JjL3NjcmlwdC9XaGVlbC5qcyIsInNyYy9zY3JpcHQvaGVyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFoQkM7QUFrQkQs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SSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCLvu78vLyDln7rnoYDnmoTnsbtcclxuaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9zY3JpcHQvQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vc2NyaXB0L0hlcm9cIlxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9zY3JpcHQvTW9uc3RlclwiXHJcbmltcG9ydCBUaGluZyBmcm9tIFwiLi9zY3JpcHQvVGhpbmdcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0hlcm9fQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldFwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL3NjcmlwdC9HYXRlXCJcclxuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9zY3JpcHQvU2NyZWVuXCJcclxuaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9zY3JpcHQvRHJhZ1BvaW50XCJcclxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL3NjcmlwdC9XaGVlbFwiXHJcblxyXG4vLyDmianlhYXnmoTnsbtcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2VcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL3NjcmlwdC9Hb2JsaW5cIlxyXG5cclxuY29uc3RcclxuXHRCcm93c2VyID0gTGF5YS5Ccm93c2VyLFxyXG5cdFdlYkdMID0gTGF5YS5XZWJHTCxcclxuXHRTdGFnZSA9IExheWEuU3RhZ2UsXHJcblx0U3RhdCA9IExheWEuU3RhdCxcclxuXHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5cclxuLy/liJ3lp4vljJblvJXmk45cclxuTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcblxyXG4vL+aoquWxj+a4uOaIj1xyXG5MYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBcImhvcml6b250YWxcIjtcclxuXHJcbi8v562J5q+U5L6L57yp5pS+XHJcbkxheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfU0hPV0FMTDtcclxuXHJcbi8v6IOM5pmv6aKc6ImyXHJcbkxheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzIzMjYyOFwiO1xyXG5cclxuLy8g6KeS6Imy5a655ZmoXHJcbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcclxud2luZG93LkJ1bGxldF9saXN0ID0gW107XHJcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcclxud2luZG93LlRoaW5nX2xpc3QgPSBbXTtcclxuXHJcbi8vIHNldCB0aGUgU2NyZWVuXHJcbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcclxubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcclxuXHJcbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHJcblN0YXQuc2hvdygpO1xyXG5cclxud2luZG93LnRoZV9zY3JlZW4gPSBuZXcgU2NyZWVuKHcsIGgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaW5ncyBleHRlbmRzIExheWEuU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDEwMDtcclxuXHJcbiAgICAgICAgLy8gY29sbGlzaW9uIHN5c3RlbVxyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiQmVpbmdzXCI7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XHJcblxyXG4gICAgICAgIC8vIG1vdmVtZW50XHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IDE7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgcm9vdF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5waXZvdCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLzIpXHJcbiAgICAgICAgdGhpcy56T3JkZXI9MDtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5icmFuY2hfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cF9kYXRlKCl7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5tYXBYIC0gdGhlX0hlcm8ubWFwWCArIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMubWFwWSAtIHRoZV9IZXJvLm1hcFkgKyBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzI7XHJcbiAgICAgICAgaWYodGhpcy5hbmkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWRfYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmFuaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5kZWFkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XHJcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XHJcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcclxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiAwLFxyXG4gICAgICAgICAgICAgICAgdnk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcbiAgICBnZXREaXIoZHgsZHksbGFzdCl7XHJcbiAgICAgICAgaWYoZHg+MClyZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIGlmKC1keD4wKXJldHVybiBcImxlZnRcIjtcclxuICAgICAgICByZXR1cm4gbGFzdDtcclxuICAgIH1cclxuXHJcbiAgICByZWFjaGFibGUobmV3X21hcFgsIG5ld19tYXBZKXtcclxuICAgICAgICBsZXQgcG9pbnRfc2V0ID0gW107XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFgsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWX0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFl9KTtcclxuXHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCB0aGVfcG9pbnQgb2YgcG9pbnRfc2V0KXtcclxuICAgICAgICAgICAgb2sgJj0gdGhlX3NjcmVlbi5nZXRQYXNzKHRoZV9wb2ludC54LCB0aGVfcG9pbnQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvaztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlX2J5X2R4X2R5KGR4LCBkeSl7XHJcbiAgICAgICAgaWYoZHggPiAzMCl7XHJcbiAgICAgICAgICAgIGR4ID0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGR5ID4gMzApe1xyXG4gICAgICAgICAgICBkeSA9IDMwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHggLyAyLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IGR4IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgZHkgLyAyKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSBkeSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHdoaWxlKE1hdGguYWJzKGR4KSA+IDAuMyB8fCBNYXRoLmFicyhkeSkgPiAwLjMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi4uLlwiKVxyXG4gICAgICAgICAgICAvLyB0cnk6IG1vdmUgeFxyXG4gICAgICAgICAgICBpZihkeCA+IDAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyAwLjMsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR4IC09IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFggKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGR4IDwgLTAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggLSAwLjMsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR4ICs9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFggLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRyeTogbW92ZSB5XHJcbiAgICAgICAgICAgIGlmKGR5ID4gMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZICsgMC4zKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWSArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZHkgPCAtMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCwgdGhpcy5tYXBZIC0gMC4zKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWSAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgcm90YXRlX3Yob2xkX3gsIG9sZF95LCBhKXtcclxuICAgICAgICBsZXQgbmV3X3ggPSBvbGRfeCAqIE1hdGguY29zKGEpIC0gb2xkX3kgKiBNYXRoLnNpbihhKTtcclxuICAgICAgICBsZXQgbmV3X3kgPSBvbGRfeCAqIE1hdGguc2luKGEpICsgb2xkX3kgKiBNYXRoLmNvcyhhKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBuZXdfeCxcclxuICAgICAgICAgICAgeTogbmV3X3lcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IDE7XHJcbiAgICAgICAgdGhpcy52eSA9IDE7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDEwO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIGxldCB3aWxsX2RpZSA9IHRoaXMuaGl0X3dhbGwodGhpcy52eCwgdGhpcy52eSk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgLT0gMTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodGhpcy52eCwgdGhpcy52eSlcclxuXHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gdGhpcy5nZXRfYXR0YWNrX2xpc3QoKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYod2lsbF9kaWUpe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBCdWxsZXRfbGlzdC5zcGxpY2UoQnVsbGV0X2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwbG9zaW9uKGF0dGFja19saXN0KXtcclxuICAgICAgICAvLyBleHBsb3Npb24gIVxyXG4gICAgICAgIGlmKGF0dGFja19saXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnB1c2godGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgaGl0X3dhbGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4LCB0aGlzLm1hcFkgKyBkeSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMucG9zKHgseSk7XHJcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XHJcblx0XHR0aGlzLnI9cjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0fVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdhdGVcIlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuWOu+W+gOS4i+S4gOWxglwiO1xyXG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnBpdm90KDE2LDE2KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcblxyXG5cclxuICAgICAgICAvKnRoaXMucj0xNTtcclxuICAgICAgICB0aGlzLnBpdm90KHRoaXMucix0aGlzLnIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMucix0aGlzLnIsdGhpcy5yLFwiIzk5RkZBQVwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnM9W25ldyBMYXlhLkdsb3dGaWx0ZXIoXCJGRkJCMDBcIiwyMCwwLDApLG5ldyBMYXlhLkdsb3dGaWx0ZXIoXCIwMEJCRkZcIiw1LDAsMCldOyovXHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSFA9LTFcclxuXHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIGlmKHRoZV9zY3JlZW4uZGlmZmljdWx0eSA8IHRoaXMuZGlmZmljdWx0eSl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uZGlmZmljdWx0eSA9IHRoaXMuZGlmZmljdWx0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhlX3NjcmVlbi5tYXBfY2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubWFwWD0xMDA7XHJcbiAgICAgICAgdGhpcy5tYXBZPTEwMDtcclxuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwia2V5XCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDAwO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvZCBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29kXCJcclxuXHJcbiAgICAgICAgdGhpcy5tYXBYID0gMjAwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDIwMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5YaS6Zmp5a6277yM5L2g6ZyA6KaB5oyH5byV5ZCX77yfXCI7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImdvZC9kb3duXCIsMyksXCJnb2RfZG93blwiKTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIuivt+mAieaLqeS4gOaJh+mXqO+8jOW3pui+ueaYr+WkqeWggu+8jOWPs+i+ueaYr+WcsOeLsVwiXHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICAgICAgVGhpbmdfbGlzdC5zcGxpY2UoVGhpbmdfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJnb2RfZG93blwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1biBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxMDtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEd1biBmcm9tIFwiLi9HdW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuX25vcm1hbCBleHRlbmRzIEd1bntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bl9ub3JtYWxcIlxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMjtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCJyZXMvZ3Vucy9ndW4wLnBuZ1wiKVxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zaXplKDY0LDMyKTtcclxuICAgICAgICB0aGlzLnc9NjQ7XHJcbiAgICAgICAgdGhpcy5oPTMyO1xyXG4gICAgICAgIHRoaXMucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvb3QoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0aGlzLmJ1bGxldF90eXBlLCB0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMucGl2b3QoOCwxNik7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPXRydWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bm5lciBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHdW5uZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDEwMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDEwMDtcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAgKiA0MDtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMztcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCIsIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgbmV3X2J1bGxldC5pbml0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMTAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIUFdpbmRvdyBleHRlbmRzIExheWEuU3ByaXRlIFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuSFA9MDtcclxuICAgICAgICB0aGlzLmFybW9yPTA7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy56T3JkZXI9MTAwMDtcclxuICAgICAgICB0aGlzLnNpemUoMjAwLDEyMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5IUCE9dGhlX0hlcm8uSFB8fHRoaXMuYXJtb3IhPXRoZV9IZXJvLmFybW9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgVGV4dD1MYXlhLlRleHRcclxuICAgICAgICAgICAgdGhpcy5IUD10aGVfSGVyby5IUDtcclxuICAgICAgICAgICAgdGhpcy5hcm1vcj10aGVfSGVyby5hcm1vcjtcclxuICAgICAgICAgICAgbGV0IGxlbl9IUD0oMTY3LTc4KS90aGVfSGVyby5IUF9tYXgqdGhlX0hlcm8uSFA7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoNzgsMzAsMTY3LTc4LDE3LFwiIzU1NTU1NVwiKSAgIC8vNzgsMzIgIC0tLTE2Nyw0N1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDMwLGxlbl9IUCwxNyxcIiNGRkZGMDBcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuXHJcbiAgICAgICAgICAgIGxldCBsZW5fYXJtb3I9KDE2Ny03OCkvdGhlX0hlcm8uYXJtb3JfbWF4KnRoZV9IZXJvLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KDc4LDc5LDE2Ny03OCwxNyxcIiM1NTU1NTVcIikgICAvLzc4LDMyICAtLS0xNjcsNDdcclxuICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCg3OCw3OSxsZW5fYXJtb3IsMTcsXCIjRkZGRjAwXCIpICAgLy83OCw3OCAgLS0tMTY3LDkzXHJcbiAgICAgICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL0hQV2luZG93L0hQV2luZG93LnBuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi9TaG90Z3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvXCI7XHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDE1MDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxNTA7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IDQwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG9vdFxyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG5cclxuICAgICAgICAvLyBzaG93XHJcbiAgICAgICAgdGhpcy5zaXplKDMyLDQ4KTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZ3VuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ1Nob3RndW4nLCBTaG90Z3VuKTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7O1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8gY2hhbmdlIGd1blxyXG4gICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0Q2hhbmdlKCkpe1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gdGhpcy5tYWluX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1biA9IHRoaXMuYWx0ZXJuYXRlX2d1bjtcclxuICAgICAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gdG1wO1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlcGFpciBhcm1vclxyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPCB0aGlzLmFybW9yX21heCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXJtb3JfY291bnQgPj0gNjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vciArPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJtb3JfY291bnQgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXHJcbiAgICAgICAgbGV0IHZ4ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLng7XHJcbiAgICAgICAgbGV0IHZ5ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLnk7XHJcbiAgICAgICAgbGV0IHY9dGhpcy5kbCh2eCx2eSk7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHZ4ICogdGhpcy52X21heCwgdnkgKiB0aGlzLnZfbWF4KTtcclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIFNob290aW5nIGFuZCB1c2luZyBnb29kcyAtLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvLyBnZXQgbmVhcmVzdF90aGluZ1xyXG4gICAgICAgIHRoaXMuY2hlY2tpdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIHVzaW5nIGdvb2RzXHJcbiAgICAgICAgaWYodGhpcy5uZWFyZXN0X3RoaW5nICE9PSBudWxsICYmIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoaXMubmVhcmVzdF90aGluZykgPCA1MCl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInBpY2tcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm5lYXJlc3RfdGhpbmcuc2VudGVuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIHRoaXMuYXJtb3JfY291bnQgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuSFAgPCAxKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG5cclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIilcclxuICAgICAgICB0aGlzLnByZV9kaXI9XCJyaWdodFwiXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9tb25zdGVyKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5zaXplKHRoaXMucioyLHRoaXMucioyKVxyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSh0aGlzLnIsIHRoaXMuciwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDQwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA1MDtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbj0tTWF0aC5hdGFuMih0aGVfSGVyby5kaXJlY3Rpb25feCx0aGVfSGVyby5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDUsIDAsIDApXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvb3RlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR5O1xyXG5cclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsdGhpcy5UeXBlK1wiX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndhbmRlcmluZygpO1xyXG5cclxuICAgICAgICAvLyBzaG9vdGluZyBjb250cm9sXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyID49IHRoaXMuc2tpbGxfY29zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZnggPSAwO1xyXG4gICAgICAgIGxldCBmeSA9IDA7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeCA9IDEgLyBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZHkpID4gMUUtMil7XHJcbiAgICAgICAgICAgIGZ5ID0gMSAvIGR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZng6IGZ4LCBcclxuICAgICAgICAgICAgZnk6IGZ5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB3YW5kZXJpbmcoKXtcclxuICAgICAgICBsZXQgdiA9IHt2eDogMCwgdnk6IDB9O1xyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA+IHRoaXMucmFuZ2UgLyAxLjUpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoaXMuZGlyZWN0aW9uX3gsIHRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA8IHRoaXMucmFuZ2UgLyAyKXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCAtdGhpcy5kaXJlY3Rpb25feCwgLXRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9yY2VfYXZnID0ge1xyXG4gICAgICAgICAgICBmeDogMCxcclxuICAgICAgICAgICAgZnk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcyAhPT0gdGhlX21vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGYgPSB0aGlzLmZvcmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meCArPSBmLmZ4O1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ5ICs9IGYuZnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ4IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meSAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHYudnggKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0sIHYudnkgKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgICAgaWYoTW9uc3Rlcl9saXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGFfZ2F0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkdhdGVcIiwgR2F0ZSk7XHJcbiAgICAgICAgICAgIGFfZ2F0ZS5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIGlmKHRoaXMuVHlwZSAhPT0gXCJTaGFycHNob290ZXJcIil7XHJcbiAgICAgICAgICAgIE1vbnN0ZXJfbGlzdC5wdXNoKHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLCB0cnVlLCB0aGlzLlR5cGUrXCJfcmlnaHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hlcm9fb3JpZW50YXRpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkeDogdGhlX0hlcm8ubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgZHk6IHRoZV9IZXJvLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfSGVybykpe1xyXG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9IZXJvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGxhdW5jaGVyKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCBsYXVuY2hlci5kaXJlY3Rpb25feCwgbGF1bmNoZXIuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gbGF1bmNoZXIubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSBsYXVuY2hlci5tYXBZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG5cclxuICAgICAgICB0aGlzLnZfbWF4ID0gMjA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gODA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAyMDtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9Hb2JsaW5cIlxyXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXHJcbmltcG9ydCBHYXRlIGZyb20gXCIuL0dhdGVcIlxyXG5pbXBvcnQgSFBXaW5kb3cgZnJvbSBcIi4vSFBXaW5kb3dcIlxyXG5pbXBvcnQgR29kIGZyb20gXCIuL0dvZFwiXHJcbmltcG9ydCBTaGFycHNob290ZXIgZnJvbSBcIi4vU2hhcnBzaG9vdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxyXG57XHJcblx0Y29uc3RydWN0b3IodywgaCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHR0aGlzLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaDtcclxuXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0dGhpcy5zaXplKHcsIGgpO1xyXG5cdFx0dGhpcy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmxvYWRNYXAoKTtcclxuXHJcblx0XHR0aGlzLm51bWJlciA9IDA7XHJcblx0XHR0aGlzLmRpZmZpY3VsdHkgPSAxO1xyXG5cclxuXHRcdHRoaXMudGltZV9jb3VudCA9IDA7XHJcblx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgPSA4MDA7XHJcblxyXG5cdFx0dGhpcy5tYXBYX21heCA9IDEwMDA7XHJcblx0XHR0aGlzLm1hcFlfbWF4ID0gMTAwMDtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL2xlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL3JpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImtleS9iYXNlXCIsNCksXCJrZXlcIik7XHJcblx0XHRMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiZ3VubmVyL2xlZnRcIiw0KSxcIkd1bm5lcl9sZWZ0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImd1bm5lci9yaWdodFwiLDQpLFwiR3VubmVyX3JpZ2h0XCIpO1xyXG5cdFx0TGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcIlNoYXJwc2hvb3Rlci9sZWZ0XCIsNCksXCJTaGFycHNob290ZXJfbGVmdFwiKTtcclxuXHRcdExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJTaGFycHNob290ZXIvcmlnaHRcIiw0KSxcIlNoYXJwc2hvb3Rlcl9yaWdodFwiKTtcclxuXHR9XHJcblxyXG5cdGxvYWRNYXAoKSB7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRUaWxlZE1hcCA9IExheWEuVGlsZWRNYXAsXHJcblx0XHRcdFJlY3RhbmdsZSA9IExheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyID0gTGF5YS5IYW5kbGVyLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQsXHJcblx0XHRcdEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcblx0XHR0aGlzLnRpbGVkTWFwID0gbmV3IFRpbGVkTWFwKCk7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNyZWF0ZU1hcChcInJlcy90aWxlZG1hcHMvc3RhcnQuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSwgSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZE1hcCkpO1xyXG5cdH1cclxuXHJcblx0b25Mb2FkZWRNYXAoKSB7XHJcblx0XHRjb25zdCBFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm9uTW91c2VVcCk7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfT1VULCB0aGlzLCB0aGlzLm9uTW91c2VVUCk7XHJcblxyXG5cdFx0dGhpcy53aGwgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSwgdHJ1ZSk7XHJcblx0XHR0aGlzLmF0ayA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMyAvIDQsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAxNSk7XHJcblx0XHR0aGlzLmNoZyA9IG5ldyBXaGVlbCh0aGlzLndpZHRoICogMSAvIDIsIHRoaXMuaGVpZ2h0ICogMyAvIDQsIHRoaXMud2lkdGggLyAzMCk7XHJcblx0XHR0aGlzLmF0ay50eXBlID0gXCJzaG9vdFwiO1xyXG5cdFx0dGhpcy53aGwuek9yZGVyID0gMTAwMDtcclxuXHRcdHRoaXMuYXRrLnpPcmRlciA9IDEwMDE7XHJcblx0XHR3aW5kb3cudGhlX0hlcm8gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJIZXJvXCIsIEhlcm8pO1xyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdC8vIGluaXQgdGV4dFxyXG5cdFx0dGhpcy5kbGcgPSBuZXcgTGF5YS5UZXh0KCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuZGxnKTtcclxuXHRcdHRoaXMuZGxnLnBvcygwLCAwKTtcclxuXHRcdHRoaXMuZGxnLnNpemUoMjAwLCAxMDApO1xyXG5cdFx0dGhpcy5kbGcucGl2b3QoMTAwLCA1MCk7XHJcblx0XHR0aGlzLmRsZy5mb250U2l6ZSA9IDIwO1xyXG5cdFx0dGhpcy5kbGcuYWxpZ24gPSBcImNlbnRlclwiXHJcblx0XHR0aGlzLmRsZy52YWxpZ24gPSBcIm1pZGRsZVwiXHJcblx0XHR0aGlzLmRsZy5jb2xvciA9IFwiIzAwMDAwMFwiXHJcblx0XHR0aGlzLmRsZy5mb250ID0gXCJJbXBhY3RcIjtcclxuXHRcdHRoaXMuZGxnLnpPcmRlciA9IDEwMDA7XHJcblxyXG5cdFx0Ly8gcGxheSBtdXNpY1xyXG5cdFx0bGF5YS5tZWRpYS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKFwicmVzL3NvdW5kcy9CR00ubXAzXCIsIDApO1xyXG5cclxuXHRcdC8vIHJ1blxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMub25GcmFtZSk7XHJcblxyXG5cdFx0Ly8gc3RhcnQgZ2F0ZVxyXG5cdFx0bGV0IGdhdGUxID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR2F0ZVwiLCBHYXRlKTtcclxuXHRcdGdhdGUxLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRsZXQgZ2F0ZTIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG5cdFx0Z2F0ZTIucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdGdhdGUyLm1hcFggPSAzODA7XHJcblx0XHRnYXRlMi5tYXBZID0gMTAwO1xyXG5cdFx0Z2F0ZTIuZGlmZmljdWx0eSA9IDM7XHJcblxyXG5cdFx0Ly8gdGhlIGdvZCBhdCBob21lXHJcblx0XHRsZXQgYV9nb2QgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHb2RcIiwgR29kKTtcclxuXHRcdGFfZ29kLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBIUFxyXG5cdFx0dGhpcy5IUFdpbmRvdyA9IG5ldyBIUFdpbmRvdygpXHJcblx0fVx0XHJcblxyXG5cdGdlbmVyYXRlX21vbnN0ZXIobW9uc3Rlcl9hbW91bnQpIHtcclxuXHRcdGxldCBjdXJfYW1vdW50ID0gMDtcclxuXHRcdHdoaWxlKGN1cl9hbW91bnQgPCBtb25zdGVyX2Ftb3VudCl7XHJcblx0XHRcdGxldCBuZXdfbW9uc3RlciA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkd1bm5lclwiLCBHdW5uZXIpO1xyXG5cdFx0XHRuZXdfbW9uc3Rlci5yb290X3Jlc2V0KCk7XHJcblx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0d2hpbGUodHJ1ZSl7XHJcblx0XHRcdFx0bGV0IG5ld194ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWFwWF9tYXg7XHJcblx0XHRcdFx0bGV0IG5ld195ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWFwWV9tYXg7XHJcblx0XHRcdFx0aWYobmV3X21vbnN0ZXIucmVhY2hhYmxlKG5ld194LCBuZXdfeSkpe1xyXG5cdFx0XHRcdFx0bmV3X21vbnN0ZXIubWFwWCA9IG5ld194O1xyXG5cdFx0XHRcdFx0bmV3X21vbnN0ZXIubWFwWSA9IG5ld195O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y3VyX2Ftb3VudCA9IDA7XHJcblx0XHRsZXQgc3Ryb25nX21vbnN0ZXJfYW1vdW50ID0gTWF0aC5mbG9vcihtb25zdGVyX2Ftb3VudCAvIDUpO1xyXG5cdFx0d2hpbGUoY3VyX2Ftb3VudCA8IHN0cm9uZ19tb25zdGVyX2Ftb3VudCl7XHJcblx0XHRcdGxldCBuZXdfbW9uc3RlciA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIlNoYXJwc2hvb3RlclwiLCBTaGFycHNob290ZXIpO1xyXG5cdFx0XHRuZXdfbW9uc3Rlci5yb290X3Jlc2V0KCk7XHJcblx0XHRcdGN1cl9hbW91bnQgKz0gMTtcclxuXHRcdFx0d2hpbGUodHJ1ZSl7XHJcblx0XHRcdFx0bGV0IG5ld194ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWFwWF9tYXg7XHJcblx0XHRcdFx0bGV0IG5ld195ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWFwWV9tYXg7XHJcblx0XHRcdFx0aWYobmV3X21vbnN0ZXIucmVhY2hhYmxlKG5ld194LCBuZXdfeSkpe1xyXG5cdFx0XHRcdFx0bmV3X21vbnN0ZXIubWFwWCA9IG5ld194O1xyXG5cdFx0XHRcdFx0bmV3X21vbnN0ZXIubWFwWSA9IG5ld195O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkZyYW1lKCkge1xyXG5cdFx0aWYodGhpcy5wYXVzZWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5peg5bC95qih5byPXHJcblx0XHQvKlxyXG5cdFx0aWYgKHRoaXMudGltZV9jb3VudCAlIHRoaXMudGltZV9pbnRlcnZhbCA9PSAwKSB7XHJcblx0XHRcdHRoaXMuZ2VuZXJhdGVfbW9uc3RlcigpO1xyXG5cdFx0XHRpZiAodGhpcy50aW1lX2ludGVydmFsID4gMjApIHtcclxuXHRcdFx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgLT0gMjA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMudGltZV9jb3VudCArPSAxO1xyXG5cdFx0Ki9cclxuXHJcblx0XHRmb3IgKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3QpIHtcclxuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX2J1bGxldCBvZiBCdWxsZXRfbGlzdCkge1xyXG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XHJcblx0XHRcdHRoZV90aGluZy51cF9kYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhlX0hlcm8udXBfZGF0ZSgpO1xyXG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyKTtcclxuXHRcdHRoaXMudGlsZWRNYXAuY2hhbmdlVmlld1BvcnQodGhlX0hlcm8ubWFwWCAtIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCAvIDIsIHRoZV9IZXJvLm1hcFkgLSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxyXG5cdFx0dGhpcy5IUFdpbmRvdy51cGRhdGUoKVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZURvd24oZSkge1xyXG5cdFx0aWYgKCh0aGlzLndobC54IC0gZS5zdGFnZVgpICogKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKyAodGhpcy53aGwueSAtIGUuc3RhZ2VZKSAqICh0aGlzLndobC55IC0gZS5zdGFnZVkpIDw9IHRoaXMud2hsLnIgKiB0aGlzLndobC5yKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoKHRoaXMuYXRrLnggLSBlLnN0YWdlWCkgKiAodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSArICh0aGlzLmF0ay55IC0gZS5zdGFnZVkpICogKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy5hdGsuciAqIHRoaXMuYXRrLnIpIHtcclxuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5jaGcueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmNoZy54IC0gZS5zdGFnZVgpICsgKHRoaXMuY2hnLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5jaGcueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmNoZy5yICogdGhpcy5jaGcucikge1xyXG5cdFx0XHR0aGlzLmNoZy5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VVcChlKSB7XHJcblx0XHRpZiAodGhpcy53aGwuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMud2hsLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLmNoZy5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy5jaGcub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZU1vdmUoZSkge1xyXG5cdFx0aWYgKHRoaXMud2hsLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuY2hnLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmNoZy5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlbG9zaXR5KCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogKHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54KSAvIHRoaXMud2hsLnIsXHJcblx0XHRcdHk6ICh0aGlzLndobC5zcC55IC0gdGhpcy53aGwueSkgLyB0aGlzLndobC5yXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0U2hvb3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdGsuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRDaGFuZ2UoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGcuSUQgIT09IG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRQYXNzKG1hcFgsIG1hcFkpIHtcclxuXHRcdGNvbnN0IGEgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyQnlJbmRleCgwKS5nZXRUaWxlRGF0YShNYXRoLmZsb29yKG1hcFggLyAzMiksIE1hdGguZmxvb3IobWFwWSAvIDMyKSk7XHJcblx0XHRpZiAodGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGlsZWRNYXAuX2pzb25EYXRhLnRpbGVzZXRzWzBdLnRpbGVzW2EgLSAxXS5wcm9wZXJ0aWVzWzBdLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRzZXRQaWN0dXJlKHN0cikge1xyXG5cdFx0aWYgKHN0ciA9PSBcInNob290XCIgJiYgdGhpcy5hdGsudHlwZSA9PSBcInBpY2tcIikge1xyXG5cdFx0XHRjb25zdCBhdGsgPSB0aGlzLmF0aztcclxuXHRcdFx0YXRrLnR5cGUgPSBcInNob290XCJcclxuXHRcdFx0YXRrLmdyYXBoaWNzLmRyYXdDaXJjbGUoYXRrLnIsIGF0ay5yLCBhdGsuciwgXCIjRkZGRjAwXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoc3RyID09IFwicGlja1wiICYmIHRoaXMuYXRrLnR5cGUgPT0gXCJzaG9vdFwiKSB7XHJcblx0XHRcdGNvbnN0IGF0ayA9IHRoaXMuYXRrO1xyXG5cdFx0XHRhdGsudHlwZSA9IFwicGlja1wiXHJcblx0XHRcdGF0ay5ncmFwaGljcy5kcmF3Q2lyY2xlKGF0ay5yLCBhdGsuciwgYXRrLnIsIFwiIzAwMDAwMFwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFRleHQodGV4dCwgY29sb3IsIHgsIHksIHN6KSB7XHJcblx0XHRpZiAodGV4dCA9PT0gdW5kZWZpbmVkKSB0ZXh0ID0gXCJcIjtcclxuXHRcdGlmIChjb2xvciA9PT0gdW5kZWZpbmVkKSBjb2xvciA9IFwiI0ZGRkZGRlwiO1xyXG5cdFx0aWYgKHggPT0gdW5kZWZpbmVkIHx8IHkgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR4ID0gTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMlxyXG5cdFx0XHR5ID0gTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDJcclxuXHRcdH1cclxuXHRcdGlmIChzeiA9PT0gdW5kZWZpbmVkKSBzeiA9IDIwO1xyXG5cdFx0dGhpcy5kbGcuY2hhbmdlVGV4dCh0ZXh0KTtcclxuXHRcdHRoaXMuZGxnLmNvbG9yID0gY29sb3I7XHJcblx0XHR0aGlzLmRsZy5wb3MoeCwgeSk7XHJcblx0XHR0aGlzLmRsZy5mb250U2l6ZSA9IHN6O1xyXG5cdFx0dGhpcy5kbGcuYWxwaGEgPSAxO1xyXG5cdFx0Ly9MYXlhLlR3ZWVuLnRvKHRoaXMuZGxnLHthbHBoYTowLHk6dGhpcy5kbGcueS0xMDAsZm9udFNpemU6dGhpcy5kbGcuZm9udFNpemUqMn0sMTAwMClcclxuXHR9XHJcblxyXG5cdG1hcF9jaGFuZ2UoKSB7XHJcblx0XHR0aGlzLnBhdXNlZCA9IHRydWU7XHJcblx0XHRjb25zdCBudW1iZXIgPSB0aGlzLm51bWJlcjtcclxuXHRcdHRoaXMubnVtYmVyICs9IDE7XHJcblx0XHRcclxuXHRcdGxldCBiZyA9IE1hdGguZmxvb3IobnVtYmVyLzE1KTtcclxuXHRcdGxldCBpZHggPSBudW1iZXIlMjtcclxuXHRcdGNvbnN0XHJcblx0XHRcdFRpbGVkTWFwID0gTGF5YS5UaWxlZE1hcCxcclxuXHRcdFx0UmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGUsXHJcblx0XHRcdEhhbmRsZXIgPSBMYXlhLkhhbmRsZXIsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudCxcclxuXHRcdFx0QnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuXHJcblx0XHRmb3IgKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3QpIHtcclxuXHRcdFx0dGhlX21vbnN0ZXIuSFAgPSAtMTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcclxuXHRcdFx0dGhlX2J1bGxldC5IUCA9IC0xO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcclxuXHRcdFx0dGhlX3RoaW5nLkhQID0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50aWxlZE1hcC5kZXN0cm95KCk7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNyZWF0ZU1hcChcInJlcy90aWxlZG1hcHMvXCIrYmcraWR4K1wiLmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWRNYXAyKSk7XHJcblx0fVxyXG5cclxuXHRvbkxvYWRlZE1hcDIoKSB7XHJcblx0XHR0aGVfSGVyby5tYXBYID0gMTEwO1xyXG5cdFx0dGhlX0hlcm8ubWFwWSA9IDExMDtcclxuXHJcblx0XHR0aGVfSGVyby5yb290X3Jlc2V0KCk7XHJcblx0XHR0aGlzLmF0ay50eXBlID0gXCJzaG9vdFwiO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCgwLCAwLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0XHR0aGlzLmdlbmVyYXRlX21vbnN0ZXIodGhpcy5udW1iZXIgKiB0aGlzLmRpZmZpY3VsdHkpXHJcblxyXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGdldFVSTHMoc3RyLG4pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHVybHM9W107XHJcbiAgICAgICAgZm9yKHZhciBpID0wO2k8bjtpKz0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXJscy5wdXNoKFwicmVzL2F0bGFzL1wiK3N0citpK1wiLnBuZ1wiKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJscztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRfaHVnZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFycHNob290ZXIgZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VubmVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMud2lkdGggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDIwICogNDA7XHJcbiAgICAgICAgdGhpcy52X21heCA9IDM7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModGhpcy5idWxsZXRfdHlwZSwgdGhpcy5idWxsZXQpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9odWdlXCIsIE1vbnN0ZXJfQnVsbGV0X2h1Z2UpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5pbXBvcnQgR3VuIGZyb20gXCIuL0d1blwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG90Z3VuIGV4dGVuZHMgR3Vue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiU2hvdGd1blwiXHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDI7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDUwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzL2d1bnMvZ3VuMC5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSg2NCwzMik7XHJcbiAgICAgICAgdGhpcy53PTY0O1xyXG4gICAgICAgIHRoaXMuaD0zMjtcclxuICAgICAgICB0aGlzLnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMiwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG9sZF94ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3g7XHJcbiAgICAgICAgbGV0IG9sZF95ID0gdGhlX0hlcm8uZGlyZWN0aW9uX3k7XHJcblxyXG4gICAgICAgIGxldCBkX2EgPSAwLjI1O1xyXG4gICAgICAgIGxldCBoYWxmX04gPSAzO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAtaGFsZl9OOyBpIDw9IGhhbGZfTjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5ld19kaXJlY3Rpb24gPSB0aGlzLnJvdGF0ZV92KG9sZF94LCBvbGRfeSwgaSAqIGRfYSk7XHJcbiAgICAgICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl94ID0gbmV3X2RpcmVjdGlvbi54O1xyXG4gICAgICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feSA9IG5ld19kaXJlY3Rpb24ueTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICAgICAgbmV3X2J1bGxldC5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGVfSGVyby5kaXJlY3Rpb25feCA9IG9sZF94O1xyXG4gICAgICAgIHRoZV9IZXJvLmRpcmVjdGlvbl95ID0gb2xkX3k7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMucGl2b3QoOCwxNik7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPXRydWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhpbmcgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi6L+Y5rKh5pyJ6K6+572u5Y+l5a2Q77yBXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKFRoaW5nX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxyXG4gICAgICAgIHRoaXMuSFA9MTtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZWVsIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyLGhhc1NwKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC40O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcbmltcG9ydCBTaG90Z3VuIGZyb20gXCIuL1Nob3RndW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9cIjtcclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gMTUwO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IDE1MDtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSA0MDtcclxuICAgICAgICB0aGlzLmFybW9yID0gNDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIHNob3dcclxuICAgICAgICB0aGlzLnNpemUoMzIsNDgpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBndW5cclxuICAgICAgICB0aGlzLm1haW5fZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnU2hvdGd1bicsIFNob3RndW4pO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTs7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICAvLyBjaGFuZ2UgZ3VuXHJcbiAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRDaGFuZ2UoKSl7XHJcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLm1haW5fZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuID0gdGhpcy5hbHRlcm5hdGVfZ3VuO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSB0bXA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVwYWlyIGFybW9yXHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA8IHRoaXMuYXJtb3JfbWF4KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hcm1vcl9jb3VudCA+PSA2MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yICs9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFybW9yX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcm1vcl9jb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gU2hvb3RpbmcgYW5kIHVzaW5nIGdvb2RzIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vIGdldCBuZWFyZXN0X3RoaW5nXHJcbiAgICAgICAgdGhpcy5jaGVja2l0ZW0oKTtcclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZ29vZHNcclxuICAgICAgICBpZih0aGlzLm5lYXJlc3RfdGhpbmcgIT09IG51bGwgJiYgdGhpcy5nZXRfZGlzdGFuY2UodGhpcy5uZWFyZXN0X3RoaW5nKSA8IDUwKXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwicGlja1wiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KHRoaXMubmVhcmVzdF90aGluZy5zZW50ZW5jZSk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nLnVzZV9pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2hvb3RpbmdcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJzaG9vdFwiKTtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRUZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpICAgLy8gc2hvb3QgYnV0dG9uIGNsaWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5zaG9vdF9wb3dlciAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA+PSB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAtdGhpcy5tYWluX2d1bi5zZWNvbmRfd2FpdGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb25feD49MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9OTAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTI3MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLSBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHMgZW5kIC0tLS0tLS0tLS8vXHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RfZXZlbnQoKXtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnNob290KCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdGluZ19zb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290aW5nX3NvdW5kKCl7XHJcblx0XHRMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJyZXMvc291bmRzL3Nob290aW5nLm1wM1wiLCAxLCBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0IG1vbnN0ZXJcclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICBkeDogbmVhcmVzdF9tb25zdGVyLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGR4OiAwLFxyXG4gICAgICAgICAgICAgICAgZHk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2l0ZW0oKXtcclxuICAgICAgICBsZXQgbWluX2Rpc3RhbmNlID0gMUU2O1xyXG4gICAgICAgIGxldCBuZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF90aGluZyA9IHRoZV90aGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdFxyXG4gICAgICAgIGlmKG5lYXJlc3RfdGhpbmcgIT09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBuZWFyZXN0X3RoaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9jb3VudCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKVxyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxufSJdfQ==
