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

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":10,"./script/Hero_Bullet":11,"./script/Monster":13,"./script/Monster_Bullet":14,"./script/Monster_Bullet_huge":15,"./script/Monster_Bullet_normal":16,"./script/Screen":17,"./script/Thing":18,"./script/Wheel":19}],2:[function(require,module,exports){
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
            Laya.stage.addChild(this);
            this.pivot(this.width / 2, this.height / 2);
            console.log("root_reset!");
            this.zOrder = 0;
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
        key: "get_harm",
        value: function get_harm(value) {
            this.HP -= value;
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
            console.log("before: " + Bullet_list.length);
            Bullet_list.splice(Bullet_list.indexOf(this), 1);
            console.log("after: " + Bullet_list.length);
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
            console.log("branch_reset 123!");
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

        _this.sentence = "是否去往下一层？";

        // set picture
        _this.loadImage("orz.jpg");
        return _this;
    }

    _createClass(Gate, [{
        key: "use_it",
        value: function use_it() {
            // go to next floor
            the_screen.map_change();
            console.log("use gate");
        }
    }, {
        key: "leaf_reset",
        value: function leaf_reset() {}
    }]);

    return Gate;
}(_Thing3.default);

exports.default = Gate;

},{"./Thing":18}],6:[function(require,module,exports){
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

},{"./Monster":13}],7:[function(require,module,exports){
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

},{"./Beings":2,"./Hero_Bullet_normal":12}],8:[function(require,module,exports){
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
        }
    }]);

    return Gun_normal;
}(_Gun3.default);

exports.default = Gun_normal;

},{"./Beings":2,"./Gun":7,"./Hero_Bullet_normal":12}],9:[function(require,module,exports){
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
        _this.loadImage("orz.jpg");
        return _this;
    }

    _createClass(Gunner, [{
        key: "skill",
        value: function skill() {
            var new_bullet = Laya.Pool.getItemByClass("Monster_Bullet_normal", _Monster_Bullet_normal2.default);
            new_bullet.root_reset();
            new_bullet.init(this);

            console.log("shoot!");
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

},{"./Monster":13,"./Monster_Bullet_normal":16}],10:[function(require,module,exports){
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

        // move
        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 100;
        _this.HP = 100;
        _this.armor_max = 10;
        _this.armot = 10;

        // shoot
        _this.shoot_power = 0;
        _this.shoot_waiting = false;

        _this.size(32, 48);
        Laya.Animation.createFrames(_this.getURLs("hero/left", 4), "hero_left");
        Laya.Animation.createFrames(_this.getURLs("hero/right", 4), "hero_right");
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);

        _this.nearest_thing = null;
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            //--------- movement control part ---------//
            var vx = the_screen.getVelosity().x;
            var vy = the_screen.getVelosity().y;
            var v = this.dl(vx, vy);
            this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);

            // Shooting and using goods

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
            this.ani.pos(this.x, this.y);
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
            //--------- shoot control part end ---------//
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
            console.log("播放音效");
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
            console.log(1);
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
            console.log(2);
        }
    }, {
        key: "get_harm",
        value: function get_harm(value) {
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
            Laya.stage.addChild(this.ani);

            this.ani.pos(this.x, this.y);

            this.ani.index = 1;
            this.ani.play(0, true, "hero_right");

            this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
            this.main_gun.root_reset();
            this.alternate_gun = null;
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":8,"./Hero_Bullet_normal":12,"./Monster":13}],11:[function(require,module,exports){
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

},{"./Bullet":3,"./Monster":13}],12:[function(require,module,exports){
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

        _this.v_max = 5;
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
            console.log("Hero_Bullet_normal attack");

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

},{"./Hero_Bullet":11}],13:[function(require,module,exports){
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
            console.log(Monster_list.length);
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
        }
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            console.log("branch_reset!");
            Monster_list.push(this);

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

},{"./Beings":2}],14:[function(require,module,exports){
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
        value: function attack(element) {
            console.log("Monster_Bullet attack");
        }
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

},{"./Bullet":3}],15:[function(require,module,exports){
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
            console.log("Monster_Bullet_huge attack");

            enemy.get_harm(20);
        }
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

},{"./Monster_Bullet":14}],16:[function(require,module,exports){
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
            console.log("Monster_Bullet_normal attack");

            enemy.get_harm(10);
        }
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

},{"./Monster_Bullet":14}],17:[function(require,module,exports){
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

		_this.time_count = 0;
		_this.time_interval = 800;
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
			this.tiledMap.createMap("res/tiledmaps/00.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
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

			this.whl = new _Wheel2.default(this.width / 4, this.height * 3 / 4, this.width / 15, true);
			this.atk = new _Wheel2.default(this.width * 3 / 4, this.height * 3 / 4, this.width / 15);
			this.atk.type = "shoot";
			this.whl.zOrder = 1000;
			this.atk.zOrder = 1001;
			window.the_Hero = Laya.Pool.getItemByClass("Hero", _hero2.default);
			the_Hero.root_reset();

			var a_gate = Laya.Pool.getItemByClass("Gate", _Gate2.default);
			a_gate.root_reset();

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

			// play music
			laya.media.SoundManager.playMusic("res/sounds/BGM.mp3", 0);

			// run
			Laya.timer.frameLoop(1, this, this.onFrame);
		}
	}, {
		key: "generate_monster",
		value: function generate_monster() {
			var monster_test1 = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
			monster_test1.root_reset();
			monster_test1.mapX = 500;
			monster_test1.mapY = 500;

			var monster_test2 = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
			monster_test2.root_reset();
			monster_test2.mapX = 400;
			monster_test2.mapY = 500;

			var monster_test3 = Laya.Pool.getItemByClass("Gunner", _Gunner2.default);
			monster_test3.root_reset();
			monster_test3.mapX = 500;
			monster_test3.mapY = 400;
		}
	}, {
		key: "onFrame",
		value: function onFrame() {
			if (this.time_count % this.time_interval == 0) {
				this.generate_monster();
				if (this.time_interval > 20) {
					this.time_interval -= 20;
				}
			}
			this.time_count += 1;

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
		value: function map_change() {}
	}]);

	return Screen;
}(Laya.Sprite //screen
);

exports.default = Screen;

},{"./DragPoint":4,"./Gate":5,"./Goblin":6,"./Gunner":9,"./Wheel":19,"./hero":20}],18:[function(require,module,exports){
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
            Thing_list.splice(Bullet_list.indexOf(this), 1);
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

},{"./Beings":2}],19:[function(require,module,exports){
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

},{"./DragPoint":4}],20:[function(require,module,exports){
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

        // move
        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this));

        _this.v_max = 5;

        // HP and armor
        _this.HP_max = 100;
        _this.HP = 100;
        _this.armor_max = 10;
        _this.armot = 10;

        // shoot
        _this.shoot_power = 0;
        _this.shoot_waiting = false;

        _this.size(32, 48);
        Laya.Animation.createFrames(_this.getURLs("hero/left", 4), "hero_left");
        Laya.Animation.createFrames(_this.getURLs("hero/right", 4), "hero_right");
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);

        _this.nearest_thing = null;
        return _this;
    }

    _createClass(Hero, [{
        key: "action",
        value: function action() {
            //--------- movement control part ---------//
            var vx = the_screen.getVelosity().x;
            var vy = the_screen.getVelosity().y;
            var v = this.dl(vx, vy);
            this.move_by_dx_dy(vx * this.v_max, vy * this.v_max);

            // Shooting and using goods

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
            this.ani.pos(this.x, this.y);
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
            //--------- shoot control part end ---------//
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
            console.log("播放音效");
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
            console.log(1);
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
            console.log(2);
        }
    }, {
        key: "get_harm",
        value: function get_harm(value) {
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
            Laya.stage.addChild(this.ani);

            this.ani.pos(this.x, this.y);

            this.ani.index = 1;
            this.ani.play(0, true, "hero_right");

            this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
            this.main_gun.root_reset();
            this.alternate_gun = null;
            this.pre_dir = "right";
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":8,"./Hero_Bullet_normal":12,"./Monster":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9HdW4uanMiLCJzcmMvc2NyaXB0L0d1bl9ub3JtYWwuanMiLCJzcmMvc2NyaXB0L0d1bm5lci5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9UaGluZy5qcyIsInNyYy9zY3JpcHQvV2hlZWwuanMiLCJzcmMvc2NyaXB0L2hlcm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBaEJDO0FBa0JELElBQ0MsVUFBVSxLQUFLLE9BRGhCO0FBQUEsSUFFQyxRQUFRLEtBQUssS0FGZDtBQUFBLElBR0MsUUFBUSxLQUFLLEtBSGQ7QUFBQSxJQUlDLE9BQU8sS0FBSyxJQUpiO0FB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QUFMLEdBQXFCLElBQXJCO0FBQ0EsaUJBQUssT0FBTCxHQUFhLE9BQWI7QUFDSDs7OztFQW5NNkIsZ0I7O2tCQUFiLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8g5Z+656GA55qE57G7XHJcbmltcG9ydCBCZWluZ3MgZnJvbSBcIi4vc2NyaXB0L0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0J1bGxldFwiXHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL3NjcmlwdC9IZXJvXCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJcIlxyXG5pbXBvcnQgVGhpbmcgZnJvbSBcIi4vc2NyaXB0L1RoaW5nXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9IZXJvX0J1bGxldFwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRcIlxyXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9zY3JpcHQvR2F0ZVwiXHJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXHJcbmltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vc2NyaXB0L0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxyXG5cclxuLy8g5omp5YWF55qE57G7XHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9zY3JpcHQvR29ibGluXCJcclxuXHJcbmNvbnN0XHJcblx0QnJvd3NlciA9IExheWEuQnJvd3NlcixcclxuXHRXZWJHTCA9IExheWEuV2ViR0wsXHJcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxyXG5cdFN0YXQgPSBMYXlhLlN0YXQsXHJcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuXHJcbi8v5Yid5aeL5YyW5byV5pOOXHJcbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuLy/mqKrlsY/muLjmiI9cclxuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG4vL+etieavlOS+i+e8qeaUvlxyXG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XHJcblxyXG4vL+iDjOaZr+minOiJslxyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcclxuXHJcbi8vIOinkuiJsuWuueWZqFxyXG53aW5kb3cuTW9uc3Rlcl9saXN0ID0gW107XHJcbndpbmRvdy5CdWxsZXRfbGlzdCA9IFtdO1xyXG53aW5kb3cuV2FsbF9saXN0ID0gW107XHJcbndpbmRvdy5UaGluZ19saXN0ID0gW107XHJcblxyXG4vLyBzZXQgdGhlIFNjcmVlblxyXG5sZXQgdyA9IEJyb3dzZXIuY2xpZW50V2lkdGg7XHJcbmxldCBoID0gQnJvd3Nlci5jbGllbnRIZWlnaHQ7XHJcblxyXG5MYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcblxyXG5TdGF0LnNob3coKTtcclxuXHJcbndpbmRvdy50aGVfc2NyZWVuID0gbmV3IFNjcmVlbih3LCBoKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudFxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJvb3RfcmVzZXQoKXtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGl2b3QodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8yKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9vdF9yZXNldCFcIilcclxuICAgICAgICB0aGlzLnpPcmRlcj0wO1xyXG4gICAgICAgIHRoaXMuYnJhbmNoX3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBfZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xyXG5cclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhZF9hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZF9hY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVhZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCZWluZ3MgYWN0aW9uXCIpXHJcbiAgICB9XHJcblxyXG4gICAgZGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XHJcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XHJcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcclxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiAwLFxyXG4gICAgICAgICAgICAgICAgdnk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlcy9hdGxhcy9cIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlyKGR4LGR5LGxhc3Qpe1xyXG4gICAgICAgIGlmKGR4PjApcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICBpZigtZHg+MClyZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhY2hhYmxlKG5ld19tYXBYLCBuZXdfbWFwWSl7XHJcbiAgICAgICAgbGV0IHBvaW50X3NldCA9IFtdO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFl9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZfSk7XHJcblxyXG4gICAgICAgIGxldCBvayA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvcihsZXQgdGhlX3BvaW50IG9mIHBvaW50X3NldCl7XHJcbiAgICAgICAgICAgIG9rICY9IHRoZV9zY3JlZW4uZ2V0UGFzcyh0aGVfcG9pbnQueCwgdGhlX3BvaW50LnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2s7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZV9ieV9keF9keShkeCwgZHkpe1xyXG4gICAgICAgIGlmKGR4ID4gMzApe1xyXG4gICAgICAgICAgICBkeCA9IDMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkeSA+IDMwKXtcclxuICAgICAgICAgICAgZHkgPSAzMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4LCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBYICs9IGR4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4IC8gMiwgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWCArPSBkeCAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSArIGR5KSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWSArPSBkeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSArIGR5IC8gMikpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gZHkgLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB3aGlsZShNYXRoLmFicyhkeCkgPiAwLjMgfHwgTWF0aC5hYnMoZHkpID4gMC4zKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIuLi5cIilcclxuICAgICAgICAgICAgLy8gdHJ5OiBtb3ZlIHhcclxuICAgICAgICAgICAgaWYoZHggPiAwLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgMC4zLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeCAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBYICs9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkeCA8IC0wLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYIC0gMC4zLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeCArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBYIC09IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB0cnk6IG1vdmUgeVxyXG4gICAgICAgICAgICBpZihkeSA+IDAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSArIDAuMykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR5IC09IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFkgKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGR5IDwgLTAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSAtIDAuMykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR5ICs9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFkgLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5ncy5qc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSAxO1xyXG4gICAgICAgIHRoaXMudnkgPSAxO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAxMDtcclxuXHJcbiAgICAgICAgdGhpcy5tID0gMC4wMTtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICBsZXQgd2lsbF9kaWUgPSB0aGlzLmhpdF93YWxsKHRoaXMudngsIHRoaXMudnkpO1xyXG5cclxuICAgICAgICB0aGlzLkhQIC09IDE7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHRoaXMudngsIHRoaXMudnkpXHJcblxyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IHRoaXMuZ2V0X2F0dGFja19saXN0KCk7XHJcbiAgICAgICAgdGhpcy5leHBsb3Npb24oYXR0YWNrX2xpc3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHdpbGxfZGllKXtcclxuICAgICAgICAgICAgdGhpcy5IUCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiZWZvcmU6IFwiK0J1bGxldF9saXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgQnVsbGV0X2xpc3Quc3BsaWNlKEJ1bGxldF9saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWZ0ZXI6IFwiK0J1bGxldF9saXN0Lmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgbGlzdCB0aGF0IGNvbnRhaW4gdGhlIGVsZW1lbnRzIHRvIGJlIGF0dGFja1xyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwbG9zaW9uKGF0dGFja19saXN0KXtcclxuICAgICAgICAvLyBleHBsb3Npb24gIVxyXG4gICAgICAgIGlmKGF0dGFja19saXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XHJcbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBvZiBhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCdWxsZXQgYXR0YWNrXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCAxMjMhXCIpXHJcbiAgICAgICAgQnVsbGV0X2xpc3QucHVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBoaXRfd2FsbChkeCwgZHkpe1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgZHgsIHRoaXMubWFwWSArIGR5KTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnUG9pbnQgZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9ubyBldmVudHNcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgdGhpcy5wb3MoeCx5KTtcclxuICAgICAgICB0aGlzLmFscGhhPTAuMjtcclxuXHRcdHRoaXMucj1yO1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgVGhpbmcgZnJvbSBcIi4vVGhpbmdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZSBleHRlbmRzIFRoaW5ne1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLmmK/lkKbljrvlvoDkuIvkuIDlsYLvvJ9cIjtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIm9yei5qcGdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG4gICAgICAgIHRoZV9zY3JlZW4ubWFwX2NoYW5nZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlIGdhdGVcIilcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkdvYmxpblwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDAwO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpLnNjYWxlKDAuNCwwLjQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuXHJcbiAgICAgICAgdGhpcy5IUCA9IDIwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfd2FpdGluZyA9IDEwO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gSGVyb19CdWxsZXRfbm9ybWFsO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3R5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModGhpcy5idWxsZXRfdHlwZSwgdGhpcy5idWxsZXQpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInNob290IVwiKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcclxuXHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEd1biBmcm9tIFwiLi9HdW5cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VuX25vcm1hbCBleHRlbmRzIEd1bntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAyO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kX3dhaXRpbmcgPSAxMDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcInJlcy9ndW5zL2d1bjAucG5nXCIpXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNpemUoNjQsMzIpO1xyXG4gICAgICAgIHRoaXMudz02NDtcclxuICAgICAgICB0aGlzLmg9MzI7XHJcbiAgICAgICAgdGhpcy5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5waXZvdCg4LDE2KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VubmVyIGV4dGVuZHMgTW9uc3RlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkd1bm5lclwiO1xyXG5cclxuICAgICAgICB0aGlzLndpZHRoID0gMTAwO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTAwO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMCAqIDQwO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSAzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCJvcnouanBnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIiwgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSAxMDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuSFAgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcclxuICAgICAgICB0aGlzLmFybW90ID0gMTA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm8vbGVmdFwiLDQpLFwiaGVyb19sZWZ0XCIpO1xyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvL3JpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBpdm90KHRoaXMud2lkdGgvMix0aGlzLmhlaWdodC8yKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueDtcclxuICAgICAgICBsZXQgdnkgPSB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCkueTtcclxuICAgICAgICBsZXQgdj10aGlzLmRsKHZ4LHZ5KTtcclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB0aGlzLnZfbWF4LCB2eSAqIHRoaXMudl9tYXgpO1xyXG5cclxuICAgICAgICAvLyBTaG9vdGluZyBhbmQgdXNpbmcgZ29vZHNcclxuXHJcbiAgICAgICAgLy8gZ2V0IG5lYXJlc3RfdGhpbmdcclxuICAgICAgICB0aGlzLmNoZWNraXRlbSgpO1xyXG5cclxuICAgICAgICAvLyB1c2luZyBnb29kc1xyXG4gICAgICAgIGlmKHRoaXMubmVhcmVzdF90aGluZyAhPT0gbnVsbCAmJiB0aGlzLmdldF9kaXN0YW5jZSh0aGlzLm5lYXJlc3RfdGhpbmcpIDwgNTApe1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFBpY3R1cmUoXCJwaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQodGhpcy5uZWFyZXN0X3RoaW5nLnNlbnRlbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcudXNlX2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaG9vdGluZ1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInNob290XCIpO1xyXG4gICAgICAgICAgICB0aGVfc2NyZWVuLnNldFRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoZV9zY3JlZW4uZ2V0U2hvb3QoKSkgICAvLyBzaG9vdCBidXR0b24gY2xpY2tlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnNob290X3Bvd2VyICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID49IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbl94Pj0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9MTtcclxuICAgICAgICAgICAgbGV0IGFyZz05MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9MjcwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdF9ldmVudCgpe1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcclxuICAgICAgICB0aGlzLnNob290aW5nX3NvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3Rpbmdfc291bmQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaSreaUvumfs+aViFwiKTtcclxuXHRcdExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInJlcy9zb3VuZHMvc2hvb3RpbmcubXAzXCIsIDEsIG5ldyBMYXlhLkhhbmRsZXIodGhpcywgdGhpcy5vbkNvbXBsZXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNraXRlbSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKDEpO1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgICAgIGZvcihsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfdGhpbmcpIDwgbWluX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZyk7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X3RoaW5nID0gdGhlX3RoaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGV4aXN0XHJcbiAgICAgICAgaWYobmVhcmVzdF90aGluZyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG5lYXJlc3RfdGhpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKDIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXJtb3IgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xyXG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuYW5pKTtcclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5hbmkpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaS5pbmRleD0xO1xyXG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcclxuICAgICAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xyXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoZV9IZXJvLmRpcmVjdGlvbl94LCB0aGVfSGVyby5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcclxuICAgICAgICB0aGlzLm1hcFggPSB0aGVfSGVyby5tYXBYO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IHRoZV9IZXJvLm1hcFk7XHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9IZXJvX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBIZXJvX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2l6ZSh0aGlzLnIqMix0aGlzLnIqMilcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUodGhpcy5yLCB0aGlzLnIsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcm9fQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XHJcblxyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA1MDtcclxuXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbj0tTWF0aC5hdGFuMih0aGVfSGVyby5kaXJlY3Rpb25feCx0aGVfSGVyby5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDUsIDAsIDApXTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMTAwMDtcclxuICAgICAgICB0aGlzLnNraWxsX2Nvc3QgPSAzNjA7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvb3RlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR5O1xyXG5cclxuICAgICAgICB0aGlzLndhbmRlcmluZygpO1xyXG5cclxuICAgICAgICAvLyBzaG9vdGluZyBjb250cm9sXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyID49IHRoaXMuc2tpbGxfY29zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvcmNlKGFub3RoZXIpe1xyXG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcclxuICAgICAgICBsZXQgZHkgPSB0aGlzLm1hcFkgLSBhbm90aGVyLm1hcFk7XHJcbiAgICBcclxuICAgICAgICBsZXQgZnggPSAwO1xyXG4gICAgICAgIGxldCBmeSA9IDA7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR4KSA+IDFFLTIpe1xyXG4gICAgICAgICAgICBmeCA9IDEgLyBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZHkpID4gMUUtMil7XHJcbiAgICAgICAgICAgIGZ5ID0gMSAvIGR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZng6IGZ4LCBcclxuICAgICAgICAgICAgZnk6IGZ5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB3YW5kZXJpbmcoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhNb25zdGVyX2xpc3QubGVuZ3RoKVxyXG4gICAgICAgIGxldCB2ID0ge3Z4OiAwLCB2eTogMH07XHJcbiAgICAgICAgaWYodGhpcy5zaG9vdGVyKXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRfZGlzdGFuY2UodGhlX0hlcm8pID4gdGhpcy5yYW5nZSAvIDEuNSl7XHJcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgdGhpcy5kaXJlY3Rpb25feCwgdGhpcy5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRfZGlzdGFuY2UodGhlX0hlcm8pIDwgdGhpcy5yYW5nZSAvIDIpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIC10aGlzLmRpcmVjdGlvbl94LCAtdGhpcy5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3JjZV9hdmcgPSB7XHJcbiAgICAgICAgICAgIGZ4OiAwLFxyXG4gICAgICAgICAgICBmeTogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzICE9PSB0aGVfbW9uc3Rlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgZiA9IHRoaXMuZm9yY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ4ICs9IGYuZng7XHJcbiAgICAgICAgICAgICAgICBmb3JjZV9hdmcuZnkgKz0gZi5meTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoTW9uc3Rlcl9saXN0Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICBmb3JjZV9hdmcuZnggLz0gKE1vbnN0ZXJfbGlzdC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ5IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodi52eCArIGZvcmNlX2F2Zy5meCAvIHRoaXMubSwgdi52eSArIGZvcmNlX2F2Zy5meCAvIHRoaXMubSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlYWQoKXtcclxuICAgICAgICBNb25zdGVyX2xpc3Quc3BsaWNlKE1vbnN0ZXJfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGVyb19vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGR4OiB0aGVfSGVyby5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICBkeTogdGhlX0hlcm8ubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldCBleHRlbmRzIEJ1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfSGVybykpe1xyXG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9IZXJvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXQgYXR0YWNrXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGxhdW5jaGVyKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCBsYXVuY2hlci5kaXJlY3Rpb25feCwgbGF1bmNoZXIuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gbGF1bmNoZXIubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSBsYXVuY2hlci5tYXBZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2h1Z2VcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZSBhdHRhY2tcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCAyMDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XHJcblxyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuSFAgPSBcIiwgdGhpcy5IUCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9XaGVlbFwiXHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL2hlcm9cIlxyXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL0dvYmxpblwiXHJcbmltcG9ydCBHdW5uZXIgZnJvbSBcIi4vR3VubmVyXCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vR2F0ZVwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuIGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vc2NyZWVuXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih3LCBoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdHRoaXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoO1xyXG5cclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHR0aGlzLnNpemUodywgaCk7XHJcblx0XHR0aGlzLnBvcygwLCAwKTtcclxuXHRcdHRoaXMubG9hZE1hcCgpO1xyXG5cclxuXHRcdHRoaXMudGltZV9jb3VudCA9IDA7XHJcblx0XHR0aGlzLnRpbWVfaW50ZXJ2YWwgPSA4MDA7XHJcblx0fVxyXG5cclxuXHRsb2FkTWFwKCkge1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cdFx0dGhpcy50aWxlZE1hcCA9IG5ldyBUaWxlZE1hcCgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXMvdGlsZWRtYXBzLzAwLmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWRNYXApKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJva1wiKVxyXG5cdFx0Y29uc3QgRXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX09VVCwgdGhpcywgdGhpcy5vbk1vdXNlVVApO1xyXG5cclxuXHRcdHRoaXMud2hsID0gbmV3IFdoZWVsKHRoaXMud2lkdGggLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUsIHRydWUpO1xyXG5cdFx0dGhpcy5hdGsgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAqIDMgLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUpO1xyXG5cdFx0dGhpcy5hdGsudHlwZSA9IFwic2hvb3RcIjtcclxuXHRcdHRoaXMud2hsLnpPcmRlcj0xMDAwO1xyXG5cdFx0dGhpcy5hdGsuek9yZGVyPTEwMDE7XHJcblx0XHR3aW5kb3cudGhlX0hlcm8gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJIZXJvXCIsIEhlcm8pO1xyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdGxldCBhX2dhdGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHYXRlXCIsIEdhdGUpO1xyXG5cdFx0YV9nYXRlLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHQvLyBpbml0IHRleHRcclxuXHRcdHRoaXMuZGxnID0gbmV3IExheWEuVGV4dCgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmRsZyk7XHJcblx0XHR0aGlzLmRsZy5wb3MoMCwgMCk7XHJcblx0XHR0aGlzLmRsZy5zaXplKDIwMCwgMTAwKTtcclxuXHRcdHRoaXMuZGxnLnBpdm90KDEwMCwgNTApO1xyXG5cdFx0dGhpcy5kbGcuZm9udFNpemUgPSAyMDtcclxuXHRcdHRoaXMuZGxnLmFsaWduID0gXCJjZW50ZXJcIlxyXG5cdFx0dGhpcy5kbGcudmFsaWduID0gXCJtaWRkbGVcIlxyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG5cdFx0dGhpcy5kbGcuZm9udCA9IFwiSW1wYWN0XCI7XHJcblxyXG5cdFx0Ly8gcGxheSBtdXNpY1xyXG5cdFx0bGF5YS5tZWRpYS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKFwicmVzL3NvdW5kcy9CR00ubXAzXCIsMCk7IFxyXG5cclxuXHRcdC8vIHJ1blxyXG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkZyYW1lKTtcclxuXHR9XHJcblxyXG5cdGdlbmVyYXRlX21vbnN0ZXIoKSB7XHJcblx0XHRsZXQgbW9uc3Rlcl90ZXN0MSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkd1bm5lclwiLCBHdW5uZXIpO1xyXG5cdFx0bW9uc3Rlcl90ZXN0MS5yb290X3Jlc2V0KCk7XHJcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFggPSA1MDA7XHJcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFkgPSA1MDA7XHJcblxyXG5cdFx0bGV0IG1vbnN0ZXJfdGVzdDIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHdW5uZXJcIiwgR3VubmVyKTtcclxuXHRcdG1vbnN0ZXJfdGVzdDIucm9vdF9yZXNldCgpO1xyXG5cdFx0bW9uc3Rlcl90ZXN0Mi5tYXBYID0gNDAwO1xyXG5cdFx0bW9uc3Rlcl90ZXN0Mi5tYXBZID0gNTAwO1xyXG5cclxuXHRcdGxldCBtb25zdGVyX3Rlc3QzID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR3VubmVyXCIsIEd1bm5lcik7XHJcblx0XHRtb25zdGVyX3Rlc3QzLnJvb3RfcmVzZXQoKTtcclxuXHRcdG1vbnN0ZXJfdGVzdDMubWFwWCA9IDUwMDtcclxuXHRcdG1vbnN0ZXJfdGVzdDMubWFwWSA9IDQwMDtcclxuXHR9XHJcblxyXG5cdG9uRnJhbWUoKSB7XHJcblx0XHRpZiAodGhpcy50aW1lX2NvdW50ICUgdGhpcy50aW1lX2ludGVydmFsID09IDApIHtcclxuXHRcdFx0dGhpcy5nZW5lcmF0ZV9tb25zdGVyKCk7XHJcblx0XHRcdGlmICh0aGlzLnRpbWVfaW50ZXJ2YWwgPiAyMCkge1xyXG5cdFx0XHRcdHRoaXMudGltZV9pbnRlcnZhbCAtPSAyMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy50aW1lX2NvdW50ICs9IDE7XHJcblxyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcclxuXHRcdFx0dGhlX2J1bGxldC51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCkge1xyXG5cdFx0XHR0aGVfdGhpbmcudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoZV9IZXJvLnVwX2RhdGUoKTtcclxuXHRcdHRoZV9IZXJvLnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMik7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KHRoZV9IZXJvLm1hcFggLSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyLCB0aGVfSGVyby5tYXBZIC0gTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDIsIExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodClcclxuXHR9XHJcblxyXG5cdG9uTW91c2VEb3duKGUpIHtcclxuXHRcdGlmICgodGhpcy53aGwueCAtIGUuc3RhZ2VYKSAqICh0aGlzLndobC54IC0gZS5zdGFnZVgpICsgKHRoaXMud2hsLnkgLSBlLnN0YWdlWSkgKiAodGhpcy53aGwueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLndobC5yICogdGhpcy53aGwucikge1xyXG5cdFx0XHR0aGlzLndobC5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCh0aGlzLmF0ay54IC0gZS5zdGFnZVgpICogKHRoaXMuYXRrLnggLSBlLnN0YWdlWCkgKyAodGhpcy5hdGsueSAtIGUuc3RhZ2VZKSAqICh0aGlzLmF0ay55IC0gZS5zdGFnZVkpIDw9IHRoaXMuYXRrLnIgKiB0aGlzLmF0ay5yKSB7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Nb3VzZVVwKGUpIHtcclxuXHRcdGlmICh0aGlzLndobC5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5hdGsuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTW91c2VNb3ZlKGUpIHtcclxuXHRcdGlmICh0aGlzLndobC5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy53aGwubW92ZVRvKGUuc3RhZ2VYLCBlLnN0YWdlWSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLmF0ay5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy5hdGsubW92ZVRvKGUuc3RhZ2VYLCBlLnN0YWdlWSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRWZWxvc2l0eSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6ICh0aGlzLndobC5zcC54IC0gdGhpcy53aGwueCkgLyB0aGlzLndobC5yLFxyXG5cdFx0XHR5OiAodGhpcy53aGwuc3AueSAtIHRoaXMud2hsLnkpIC8gdGhpcy53aGwuclxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGdldFNob290KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXRrLklEICE9PSBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0UGFzcyhtYXBYLCBtYXBZKSB7XHJcblx0XHRjb25zdCBhID0gdGhpcy50aWxlZE1hcC5nZXRMYXllckJ5SW5kZXgoMCkuZ2V0VGlsZURhdGEoTWF0aC5mbG9vcihtYXBYIC8gMzIpLCBNYXRoLmZsb29yKG1hcFkgLyAzMikpO1xyXG5cdFx0aWYgKHRoaXMudGlsZWRNYXAuX2pzb25EYXRhLnRpbGVzZXRzWzBdLnRpbGVzW2EgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRpbGVkTWFwLl9qc29uRGF0YS50aWxlc2V0c1swXS50aWxlc1thIC0gMV0ucHJvcGVydGllc1swXS52YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHNldFBpY3R1cmUoc3RyKSB7XHJcblx0XHRpZiAoc3RyID09IFwic2hvb3RcIiAmJiB0aGlzLmF0ay50eXBlID09IFwicGlja1wiKSB7XHJcblx0XHRcdGNvbnN0IGF0ayA9IHRoaXMuYXRrO1xyXG5cdFx0XHRhdGsudHlwZSA9IFwic2hvb3RcIlxyXG5cdFx0XHRhdGsuZ3JhcGhpY3MuZHJhd0NpcmNsZShhdGsuciwgYXRrLnIsIGF0ay5yLCBcIiNGRkZGMDBcIik7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChzdHIgPT0gXCJwaWNrXCIgJiYgdGhpcy5hdGsudHlwZSA9PSBcInNob290XCIpIHtcclxuXHRcdFx0Y29uc3QgYXRrID0gdGhpcy5hdGs7XHJcblx0XHRcdGF0ay50eXBlID0gXCJwaWNrXCJcclxuXHRcdFx0YXRrLmdyYXBoaWNzLmRyYXdDaXJjbGUoYXRrLnIsIGF0ay5yLCBhdGsuciwgXCIjMDAwMDAwXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGV4dCh0ZXh0LCBjb2xvciwgeCwgeSwgc3opIHtcclxuXHRcdGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHRleHQgPSBcIlwiO1xyXG5cdFx0aWYgKGNvbG9yID09PSB1bmRlZmluZWQpIGNvbG9yID0gXCIjRkZGRkZGXCI7XHJcblx0XHRpZiAoeCA9PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHggPSBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggLyAyXHJcblx0XHRcdHkgPSBMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0IC8gMlxyXG5cdFx0fVxyXG5cdFx0aWYgKHN6ID09PSB1bmRlZmluZWQpIHN6ID0gMjA7XHJcblx0XHR0aGlzLmRsZy5jaGFuZ2VUZXh0KHRleHQpO1xyXG5cdFx0dGhpcy5kbGcuY29sb3IgPSBjb2xvcjtcclxuXHRcdHRoaXMuZGxnLnBvcyh4LCB5KTtcclxuXHRcdHRoaXMuZGxnLmZvbnRTaXplID0gc3o7XHJcblx0XHR0aGlzLmRsZy5hbHBoYSA9IDE7XHJcblx0XHQvL0xheWEuVHdlZW4udG8odGhpcy5kbGcse2FscGhhOjAseTp0aGlzLmRsZy55LTEwMCxmb250U2l6ZTp0aGlzLmRsZy5mb250U2l6ZSoyfSwxMDAwKVxyXG5cdH1cclxuXHJcblx0bWFwX2NoYW5nZSgpIHtcclxuXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnJhbmNoX3Jlc2V0IVwiKVxyXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZWVsIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyLGhhc1NwKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC40O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDEwO1xyXG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDMyLDQ4KTtcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyby9sZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm8vcmlnaHRcIiw0KSxcImhlcm9fcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG5cclxuICAgICAgICB0aGlzLm5lYXJlc3RfdGhpbmcgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS55O1xyXG4gICAgICAgIGxldCB2PXRoaXMuZGwodngsdnkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2eCAqIHRoaXMudl9tYXgsIHZ5ICogdGhpcy52X21heCk7XHJcblxyXG4gICAgICAgIC8vIFNob290aW5nIGFuZCB1c2luZyBnb29kc1xyXG5cclxuICAgICAgICAvLyBnZXQgbmVhcmVzdF90aGluZ1xyXG4gICAgICAgIHRoaXMuY2hlY2tpdGVtKCk7XHJcblxyXG4gICAgICAgIC8vIHVzaW5nIGdvb2RzXHJcbiAgICAgICAgaWYodGhpcy5uZWFyZXN0X3RoaW5nICE9PSBudWxsICYmIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoaXMubmVhcmVzdF90aGluZykgPCA1MCl7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0UGljdHVyZShcInBpY2tcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCh0aGlzLm5lYXJlc3RfdGhpbmcuc2VudGVuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVhcmVzdF90aGluZy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNob290aW5nXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhlX3NjcmVlbi5zZXRQaWN0dXJlKFwic2hvb3RcIik7XHJcbiAgICAgICAgICAgIHRoZV9zY3JlZW4uc2V0VGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuc2hvb3RfcG93ZXIgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rpbmdfc291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdGluZ19zb3VuZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pKt5pS+6Z+z5pWIXCIpO1xyXG5cdFx0TGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwicmVzL3NvdW5kcy9zaG9vdGluZy5tcDNcIiwgMSwgbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tpdGVtKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF90aGluZyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfdGhpbmcgb2YgVGhpbmdfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV90aGluZykgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX3RoaW5nKTtcclxuICAgICAgICAgICAgICAgIG5lYXJlc3RfdGhpbmcgPSB0aGVfdGhpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3RcclxuICAgICAgICBpZihuZWFyZXN0X3RoaW5nICE9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbmVhcmVzdF90aGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5uZWFyZXN0X3RoaW5nID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coMik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYW5pLmluZGV4PTE7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLm1haW5fZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnR3VuX25vcm1hbCcsIEd1bl9ub3JtYWwpO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG59Il19
