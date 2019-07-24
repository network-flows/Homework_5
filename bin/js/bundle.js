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

},{"./script/Beings":2,"./script/Bullet":3,"./script/DragPoint":4,"./script/Gate":5,"./script/Goblin":6,"./script/Hero":10,"./script/Hero_Bullet":11,"./script/Monster":13,"./script/Monster_Bullet":14,"./script/Monster_Bullet_huge":15,"./script/Monster_Bullet_normal":16,"./script/Screen":17,"./script/Thing":18,"./script/Wall":19,"./script/Wheel":20}],2:[function(require,module,exports){
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

        _this.m = 0.1;
        return _this;
    }

    _createClass(Beings, [{
        key: "root_reset",
        value: function root_reset() {
            Laya.stage.addChild(this);
            this.pivot(this.width / 2, this.height / 2);
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
                urls.push("res\\atlas\\" + str + i + ".png");
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

        _this.first_waiting = 1;
        _this.second_waiting = 2;
        /*
        this.loadImage("res\\guns\\gun0.png")
        Laya.stage.addChild(this);
        this.size(64,32);
        this.w=64;
        this.h=32;
        this.pos(Laya.Browser.clientWidth/2,Laya.Browser.clientHeight/2);*/
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
        _this.loadImage("./orz.jpg");
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
            this.HP = 300;
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

        _this.size(32, 48);

        Laya.Animation.createFrames(_this.getURLs("hero\\up", 4), "hero_up");
        Laya.Animation.createFrames(_this.getURLs("hero\\down", 4), "hero_down");
        Laya.Animation.createFrames(_this.getURLs("hero\\left", 4), "hero_left");
        Laya.Animation.createFrames(_this.getURLs("hero\\right", 4), "hero_right");
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
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

            // Shooting delay
            if (the_screen.getShoot()) // shoot button clicked
                {
                    this.shoot_power += 1;
                } else if (this.shoot_power != 0) {
                this.shoot_power += 1;
            }
            if (this.shoot_power >= this.main_gun.first_waiting) {
                this.main_gun.shoot();
                this.shoot_power = -this.main_gun.second_waiting;
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
            // console.log(this.mapX,this.mapY);
            /*
                    if(this.direction_x>=0)
                    {
                        this.main_gun.scaleX=1;
                        let arg=90-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
                        this.main_gun.rotation=arg;
                    }
                    else 
                    {
                        this.main_gun.scaleX=-1;
                        let arg=270-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
                        this.main_gun.rotation=arg;
                    }*/
            //--------- shoot control part end ---------//
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
            //this.ani.visible=false;

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

            if (Math.abs(dx) > 1E-6) {
                fx = 1 / dx;
            }
            if (Math.abs(dy) > 1E-6) {
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
        _this.size(_this.r * 2, _this.r * 2);
        _this.graphics.drawCircle(_this.r, _this.r, _this.r, "#FFFF00");
        _this.graphics.drawCircle(0, 0, _this.r, "#FFFF00");
        //this.pivot(this.r, this.r);
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
			this.tiledMap.createMap("res\\tiledmaps\\00.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
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
			this.atk.alpha = 0.8;

			window.the_Hero = Laya.Pool.getItemByClass("Hero", _hero2.default);
			the_Hero.root_reset();

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
			// test
			Laya.timer.frameLoop(1, this, this.onFrame);
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
			var ans = this.tiledMap._jsonData.tilesets[0].tiles[a - 1].properties[0].value;
			return ans;
		}
	}]);

	return Screen;
}(Laya.Sprite //screen
);

exports.default = Screen;

},{"./DragPoint":4,"./Goblin":6,"./Gunner":9,"./Wheel":20,"./hero":21}],18:[function(require,module,exports){
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

},{"./Beings":2}],19:[function(require,module,exports){
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

},{"./Beings":2}],20:[function(require,module,exports){
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

},{"./DragPoint":4}],21:[function(require,module,exports){
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

        _this.size(32, 48);

        Laya.Animation.createFrames(_this.getURLs("hero\\up", 4), "hero_up");
        Laya.Animation.createFrames(_this.getURLs("hero\\down", 4), "hero_down");
        Laya.Animation.createFrames(_this.getURLs("hero\\left", 4), "hero_left");
        Laya.Animation.createFrames(_this.getURLs("hero\\right", 4), "hero_right");
        _this.ani = new Laya.Animation();
        _this.ani.interval = 100;
        _this.ani.pivot(_this.width / 2, _this.height / 2);
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

            // Shooting delay
            if (the_screen.getShoot()) // shoot button clicked
                {
                    this.shoot_power += 1;
                } else if (this.shoot_power != 0) {
                this.shoot_power += 1;
            }
            if (this.shoot_power >= this.main_gun.first_waiting) {
                this.main_gun.shoot();
                this.shoot_power = -this.main_gun.second_waiting;
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
            // console.log(this.mapX,this.mapY);
            /*
                    if(this.direction_x>=0)
                    {
                        this.main_gun.scaleX=1;
                        let arg=90-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
                        this.main_gun.rotation=arg;
                    }
                    else 
                    {
                        this.main_gun.scaleX=-1;
                        let arg=270-Math.atan2(this.direction_x,this.direction_y)/Math.PI*180;
                        this.main_gun.rotation=arg;
                    }*/
            //--------- shoot control part end ---------//
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
            //this.ani.visible=false;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2Rvd25sb2Fkcy9MYXlhQWlySURFX2JldGEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4uanMiLCJzcmMvc2NyaXB0L0JlaW5ncy5qcyIsInNyYy9zY3JpcHQvQnVsbGV0LmpzIiwic3JjL3NjcmlwdC9EcmFnUG9pbnQuanMiLCJzcmMvc2NyaXB0L0dhdGUuanMiLCJzcmMvc2NyaXB0L0dvYmxpbi5qcyIsInNyYy9zY3JpcHQvR3VuLmpzIiwic3JjL3NjcmlwdC9HdW5fbm9ybWFsLmpzIiwic3JjL3NjcmlwdC9HdW5uZXIuanMiLCJzcmMvc2NyaXB0L0hlcm8uanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0LmpzIiwic3JjL3NjcmlwdC9IZXJvX0J1bGxldF9ub3JtYWwuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXIuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0LmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlLmpzIiwic3JjL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9ub3JtYWwuanMiLCJzcmMvc2NyaXB0L1NjcmVlbi5qcyIsInNyYy9zY3JpcHQvVGhpbmcuanMiLCJzcmMvc2NyaXB0L1dhbGwuanMiLCJzcmMvc2NyaXB0L1doZWVsLmpzIiwic3JjL3NjcmlwdC9oZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFDQyxVQUFVLEtBQUssT0FEaEI7QUFBQSxJQUVDLFFBQVEsS0FBSyxLQUZkO0FBQUEsSUFHQyxRQUFRLEtB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QUFJSCxhQUxELE1BTUk7QUFDQSx1QkFBTztBQUNILHdCQUFJLENBREQ7QUFFSCx3QkFBSTtBQUZELGlCQUFQO0FBSUg7QUFDSjs7O2lDQUVRLEssRUFBTTtBQUNYLGdCQUFHLEtBQUssS0FBTCxJQUFjLEtBQWpCLEVBQXVCO0FBQ25CLHFCQUFLLEtBQUwsSUFBYyxLQUFkO0FBQ0gsYUFGRCxNQUdJO0FBQ0EscUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSx5QkFBUyxLQUFLLEtBQWQ7QUFDQSxxQkFBSyxFQUFMLElBQVcsS0FBWDtBQUNIO0FBQ0o7OzsrQkFFSztBQUNGLGlCQUFLLEdBQUwsQ0FBUyxPQUFULEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxHQUE1QjtBQUNIOzs7dUNBRWE7QUFDVixpQkFBSyxFQUFMLEdBQVUsS0FBSyxNQUFmO0FBQ0EsaUJBQUssS0FBTCxHQUFhLEtBQUssU0FBbEI7QUFDQSxpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLEdBQXpCOztBQUVBLGlCQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsS0FBSyxDQUFsQixFQUFvQixLQUFLLENBQXpCOztBQUVBLGlCQUFLLEdBQUwsQ0FBUyxLQUFULEdBQWUsQ0FBZjtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsQ0FBZCxFQUFnQixJQUFoQixFQUFxQixZQUFyQjtBQUNBOztBQUVBLGlCQUFLLFFBQUwsR0FBZ0IsSUFBSSxLQUFLLElBQUwsQ0FBVSxjQUFkLENBQTZCLFlBQTdCLEVBQTJDLG9CQUEzQyxDQUFoQjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxVQUFkO0FBQ0EsaUJBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLGlCQUFLLE9BQUwsR0FBYSxPQUFiO0FBQ0g7Ozs7RUE1STZCLGdCOztrQkFBYixJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7vy8vIOWfuuehgOeahOexu1xyXG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9CdWxsZXRcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9zY3JpcHQvSGVyb1wiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcclxuaW1wb3J0IFRoaW5nIGZyb20gXCIuL3NjcmlwdC9UaGluZ1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvSGVyb19CdWxsZXRcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vc2NyaXB0L0dhdGVcIlxyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi9zY3JpcHQvV2FsbFwiXHJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXHJcbmltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vc2NyaXB0L0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxyXG5cclxuLy8g5omp5YWF55qE57G7XHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9zY3JpcHQvR29ibGluXCJcclxuXHJcbmNvbnN0XHJcblx0QnJvd3NlciA9IExheWEuQnJvd3NlcixcclxuXHRXZWJHTCA9IExheWEuV2ViR0wsXHJcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxyXG5cdFN0YXQgPSBMYXlhLlN0YXQsXHJcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuXHJcbi8v5Yid5aeL5YyW5byV5pOOXHJcbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuLy/mqKrlsY/muLjmiI9cclxuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG4vL+etieavlOS+i+e8qeaUvlxyXG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XHJcblxyXG4vL+iDjOaZr+minOiJslxyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcclxuXHJcbi8vIHNldCB0aGUgU2NyZWVuXHJcbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcclxubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcclxuXHJcbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHJcblN0YXQuc2hvdygpO1xyXG5cclxud2luZG93LnRoZV9zY3JlZW4gPSBuZXcgU2NyZWVuKHcsIGgpO1xyXG5cclxuLy8g6KeS6Imy5a655ZmoXHJcbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcclxud2luZG93LkJ1bGxldF9saXN0ID0gW107XHJcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcclxud2luZG93LlRoaW5nX2xpc3QgPSBbXTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudFxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm0gPSAwLjE7XHJcbiAgICB9XHJcblxyXG4gICAgcm9vdF9yZXNldCgpe1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5waXZvdCh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLzIpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyb290X3Jlc2V0IVwiKVxyXG5cclxuICAgICAgICB0aGlzLmJyYW5jaF9yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwX2RhdGUoKXtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLm1hcFggLSB0aGVfSGVyby5tYXBYICsgTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzI7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5tYXBZIC0gdGhlX0hlcm8ubWFwWSArIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMjtcclxuXHJcbiAgICAgICAgaWYodGhpcy5IUCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWRfYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3Zlcih0aGlzLlR5cGUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmRlYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfaGFybSh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVpbmdzIGFjdGlvblwiKVxyXG4gICAgfVxyXG5cclxuICAgIGRsKGR4LCBkeSl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3RfZGwodGhlX29iamVjdCl7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGVfb2JqZWN0LmR4ICogdGhlX29iamVjdC5keCArIHRoZV9vYmplY3QuZHkgKiB0aGVfb2JqZWN0LmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfZGlzdGFuY2UoYW5vdGhlcil7XHJcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5tYXBYIC0gYW5vdGhlci5tYXBYO1xyXG4gICAgICAgIGxldCBkeSA9IHRoaXMubWFwWSAtIGFub3RoZXIubWFwWTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kbChkeCwgZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF92ZWN0b3Jfdih2X21heCwgdGhlX3Z4LCB0aGVfdnkpe1xyXG4gICAgICAgIGxldCB0aGVfdiA9IHRoaXMuZGwodGhlX3Z4LCB0aGVfdnkpO1xyXG4gICAgICAgIGlmKHRoZV92ID4gMUUtNiAmJiB2X21heCA+IDFFLTYpe1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogdGhlX3Z4ICogdl9tYXgvdGhlX3YsXHJcbiAgICAgICAgICAgICAgICB2eTogdGhlX3Z5ICogdl9tYXgvdGhlX3ZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICB2eDogMCxcclxuICAgICAgICAgICAgICAgIHZ5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VVJMcyhzdHIsbilcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJscz1bXTtcclxuICAgICAgICBmb3IodmFyIGkgPTA7aTxuO2krPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goXCJyZXNcXFxcYXRsYXNcXFxcXCIrc3RyK2krXCIucG5nXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmxzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERpcihkeCxkeSxsYXN0KXtcclxuICAgICAgICBpZihkeD4wKXJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgaWYoLWR4PjApcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWNoYWJsZShuZXdfbWFwWCwgbmV3X21hcFkpe1xyXG4gICAgICAgIGxldCBwb2ludF9zZXQgPSBbXTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZICsgdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCwgeTogbmV3X21hcFkgKyB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggLSB0aGlzLndpZHRoLzIsIHk6IG5ld19tYXBZfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWSAtIHRoaXMuaGVpZ2h0LzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFgsIHk6IG5ld19tYXBZIC0gdGhpcy5oZWlnaHQvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMud2lkdGgvMiwgeTogbmV3X21hcFkgLSB0aGlzLmhlaWdodC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYICsgdGhpcy53aWR0aC8yLCB5OiBuZXdfbWFwWX0pO1xyXG5cclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IHRoZV9wb2ludCBvZiBwb2ludF9zZXQpe1xyXG4gICAgICAgICAgICBvayAmPSB0aGVfc2NyZWVuLmdldFBhc3ModGhlX3BvaW50LngsIHRoZV9wb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVfYnlfZHhfZHkoZHgsIGR5KXtcclxuICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCwgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwWCArPSBkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFggKyBkeCAvIDIsIHRoaXMubWFwWSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gZHggLyAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyBkeSAvIDIpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBZICs9IGR5IC8gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgd2hpbGUoTWF0aC5hYnMoZHgpID4gMC4zIHx8IE1hdGguYWJzKGR5KSA+IDAuMyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uXCIpXHJcbiAgICAgICAgICAgIC8vIHRyeTogbW92ZSB4XHJcbiAgICAgICAgICAgIGlmKGR4ID4gMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIDAuMywgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWCArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZHggPCAtMC4xKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCAtIDAuMywgdGhpcy5tYXBZKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwWCAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdHJ5OiBtb3ZlIHlcclxuICAgICAgICAgICAgaWYoZHkgPiAwLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgKyAwLjMpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeSAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBZICs9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkeSA8IC0wLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYLCB0aGlzLm1hcFkgLSAwLjMpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeSArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBZIC09IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gMTtcclxuICAgICAgICB0aGlzLnZ5ID0gMTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcblxyXG4gICAgICAgIHRoaXMubSA9IDAuMDE7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHdpbGxfZGllID0gdGhpcy5oaXRfd2FsbCh0aGlzLnZ4LCB0aGlzLnZ5KTtcclxuXHJcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh0aGlzLnZ4LCB0aGlzLnZ5KVxyXG5cclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZXhwbG9zaW9uKGF0dGFja19saXN0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih3aWxsX2RpZSl7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVmb3JlOiBcIitCdWxsZXRfbGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyOiBcIitCdWxsZXRfbGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMgc2hvdWxkIHJldHVybiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBlbGVtZW50cyB0byBiZSBhdHRhY2tcclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cGxvc2lvbihhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgLy8gZXhwbG9zaW9uICFcclxuICAgICAgICBpZihhdHRhY2tfbGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5IUCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgYXR0YWNrX2xpc3Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGF0dGFja1wiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQgMTIzIVwiKVxyXG4gICAgICAgIEJ1bGxldF9saXN0LnB1c2godGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgaGl0X3dhbGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gIXRoaXMucmVhY2hhYmxlKHRoaXMubWFwWCArIGR4LCB0aGlzLm1hcFkgKyBkeSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMucG9zKHgseSk7XHJcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XHJcblx0XHR0aGlzLnI9cjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0fVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5piv5ZCm5Y675b6A5LiL5LiA5bGC77yfXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvYmxpbiBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHb2JsaW5cIjtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDQwMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDQwMDtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjQsMC40KTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcclxuICAgIH1cclxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1biBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxMDtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcclxuICAgIH1cclxuICAgIFxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bl9ub3JtYWwgZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gMTtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMjtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwicmVzXFxcXGd1bnNcXFxcZ3VuMC5wbmdcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSg2NCwzMik7XHJcbiAgICAgICAgdGhpcy53PTY0O1xyXG4gICAgICAgIHRoaXMuaD0zMjtcclxuICAgICAgICB0aGlzLnBvcyhMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMixMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIpOyovXHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMucGl2b3QoOCwxNik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiXHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bm5lciBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHdW5uZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDEwMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDEwMDtcclxuICAgICAgICB0aGlzLnJhbmdlID0gMTAgKiA0MDtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMztcclxuICAgICAgICBcclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9vcnouanBnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNraWxsKCl7XHJcbiAgICAgICAgbGV0IG5ld19idWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIiwgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsKTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuICAgICAgICBuZXdfYnVsbGV0LmluaXQodGhpcyk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb3QhXCIpXHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSAzMDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XHJcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBtb3ZlXHJcbiAgICAgICAgdGhpcy52X21heCA9IDU7XHJcblxyXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxyXG4gICAgICAgIHRoaXMuSFBfbWF4ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuSFAgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcclxuICAgICAgICB0aGlzLmFybW90ID0gMTA7XHJcblxyXG4gICAgICAgIC8vIHNob290XHJcbiAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuc2l6ZSgzMiw0OCk7XHJcblxyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXHVwXCIsNCksXCJoZXJvX3VwXCIpO1xyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXGRvd25cIiw0KSxcImhlcm9fZG93blwiKTtcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxsZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxccmlnaHRcIiw0KSxcImhlcm9fcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucGl2b3QodGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKS55O1xyXG4gICAgICAgIGxldCB2PXRoaXMuZGwodngsdnkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9ieV9keF9keSh2eCAqIHRoaXMudl9tYXgsIHZ5ICogdGhpcy52X21heCk7XHJcblxyXG4gICAgICAgIC8vIFNob290aW5nIGRlbGF5XHJcbiAgICAgICAgaWYodGhlX3NjcmVlbi5nZXRTaG9vdCgpKSAgIC8vIHNob290IGJ1dHRvbiBjbGlja2VkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zaG9vdF9wb3dlciAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID49IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpcj10aGlzLmdldERpcih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3ksdGhpcy5wcmVfZGlyKTtcclxuICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcclxuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19cIitkaXIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWFwWCx0aGlzLm1hcFkpO1xyXG4vKlxyXG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uX3g+PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTkwLU1hdGguYXRhbjIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95KS9NYXRoLlBJKjE4MDtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5yb3RhdGlvbj1hcmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgbGV0IGFyZz0yNzAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9Ki9cclxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICB0aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5hbmkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcclxuICAgICAgICB0aGlzLmFybW9yID0gdGhpcy5hcm1vcl9tYXg7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYW5pLmluZGV4PTE7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpO1xyXG4gICAgICAgIC8vdGhpcy5hbmkudmlzaWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcclxuICAgICAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgdGhlX3dhbGwgb2YgV2FsbF9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5cclxuICAgICAgICB0aGlzLnIgPSAyMDtcclxuICAgICAgICB0aGlzLnNpemUodGhpcy5yKjIsdGhpcy5yKjIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMuciwgdGhpcy5yLCB0aGlzLnIsIFwiI0ZGRkYwMFwiKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJvX0J1bGxldF9ub3JtYWwgYXR0YWNrXCIpO1xyXG5cclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNTA7XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRpb249LU1hdGguYXRhbjIodGhlX0hlcm8uZGlyZWN0aW9uX3gsdGhlX0hlcm8uZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCA1LCAwLCAwKV07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xyXG5cclxuICAgICAgICB0aGlzLnNob290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB0aGlzLmdldF9oZXJvX29yaWVudGF0aW9uKCkuZHg7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keTtcclxuXHJcbiAgICAgICAgdGhpcy53YW5kZXJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RpbmcgY29udHJvbFxyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfcG93ZXIgPCAxMDAwKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA+PSB0aGlzLnNraWxsX2Nvc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3JjZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGZ4ID0gMDtcclxuICAgICAgICBsZXQgZnkgPSAwO1xyXG5cclxuICAgICAgICBpZihNYXRoLmFicyhkeCkgPiAxRS02KXtcclxuICAgICAgICAgICAgZnggPSAxIC8gZHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKGR5KSA+IDFFLTYpe1xyXG4gICAgICAgICAgICBmeSA9IDEgLyBkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZ4OiBmeCwgXHJcbiAgICAgICAgICAgIGZ5OiBmeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgd2FuZGVyaW5nKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coTW9uc3Rlcl9saXN0Lmxlbmd0aClcclxuICAgICAgICBsZXQgdiA9IHt2eDogMCwgdnk6IDB9O1xyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rlcil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA+IHRoaXMucmFuZ2UgLyAxLjUpe1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoaXMuZGlyZWN0aW9uX3gsIHRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9IZXJvKSA8IHRoaXMucmFuZ2UgLyAyKXtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCAtdGhpcy5kaXJlY3Rpb25feCwgLXRoaXMuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9yY2VfYXZnID0ge1xyXG4gICAgICAgICAgICBmeDogMCxcclxuICAgICAgICAgICAgZnk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcyAhPT0gdGhlX21vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGYgPSB0aGlzLmZvcmNlKHRoZV9tb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGZvcmNlX2F2Zy5meCArPSBmLmZ4O1xyXG4gICAgICAgICAgICAgICAgZm9yY2VfYXZnLmZ5ICs9IGYuZnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1vbnN0ZXJfbGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgZm9yY2VfYXZnLmZ4IC89IChNb25zdGVyX2xpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGZvcmNlX2F2Zy5meSAvPSAoTW9uc3Rlcl9saXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHYudnggKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0sIHYudnkgKyBmb3JjZV9hdmcuZnggLyB0aGlzLm0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgTW9uc3Rlcl9saXN0LnNwbGljZShNb25zdGVyX2xpc3QuaW5kZXhPZih0aGlzKSwgMSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9yZXNldCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnJhbmNoX3Jlc2V0IVwiKVxyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5wdXNoKHRoaXMpXHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hlcm9fb3JpZW50YXRpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkeDogdGhlX0hlcm8ubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgZHk6IHRoZV9IZXJvLm1hcFkgLSB0aGlzLm1hcFlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcclxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSBbXTtcclxuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfd2FsbCkpe1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrX2xpc3QucHVzaCh0aGVfd2FsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV9IZXJvKSl7XHJcbiAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX0hlcm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhdHRhY2soZWxlbWVudCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25zdGVyX0J1bGxldCBhdHRhY2tcIik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQobGF1bmNoZXIpe1xyXG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIGxhdW5jaGVyLmRpcmVjdGlvbl94LCBsYXVuY2hlci5kaXJlY3Rpb25feSk7XHJcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2ZWN0b3Jfdi52eTtcclxuICAgICAgICB0aGlzLm1hcFggPSBsYXVuY2hlci5tYXBYO1xyXG4gICAgICAgIHRoaXMubWFwWSA9IGxhdW5jaGVyLm1hcFk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vTW9uc3Rlcl9CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlcl9CdWxsZXRfaHVnZSBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfaHVnZVwiO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDQwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25zdGVyX0J1bGxldF9odWdlIGF0dGFja1wiKTtcclxuICAgICAgICBcclxuICAgICAgICBlbmVteS5nZXRfaGFybSgyMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSA0MDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuSFAgPSBcIiwgdGhpcy5IUCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLnIgPSAyMDtcclxuICAgICAgICB0aGlzLnNpemUodGhpcy5yKjIsdGhpcy5yKjIpXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMuciwgdGhpcy5yLCB0aGlzLnIsIFwiI0ZGRkYwMFwiKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yLCBcIiNGRkZGMDBcIik7XHJcbiAgICAgICAgLy90aGlzLnBpdm90KHRoaXMuciwgdGhpcy5yKTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgMTAsIDAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgMjA7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVuZW15KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25zdGVyX0J1bGxldF9ub3JtYWwgYXR0YWNrXCIpO1xyXG5cclxuICAgICAgICBlbmVteS5nZXRfaGFybSgxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpIHtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9EcmFnUG9pbnRcIlxyXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9oZXJvXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9Hb2JsaW5cIlxyXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JlZW4gZXh0ZW5kcyBMYXlhLlNwcml0ZSAgLy9zY3JlZW5cclxue1xyXG5cdGNvbnN0cnVjdG9yKHcsIGgpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0dGhpcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcblx0XHR0aGlzLmhlaWdodCA9IGg7XHJcblxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuXHRcdHRoaXMuc2l6ZSh3LCBoKTtcclxuXHRcdHRoaXMucG9zKDAsIDApO1xyXG5cdFx0dGhpcy5sb2FkTWFwKCk7XHJcblx0fVxyXG5cclxuXHRsb2FkTWFwKCkge1xyXG5cdFx0Y29uc3RcclxuXHRcdFx0VGlsZWRNYXAgPSBMYXlhLlRpbGVkTWFwLFxyXG5cdFx0XHRSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZSxcclxuXHRcdFx0SGFuZGxlciA9IExheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50LFxyXG5cdFx0XHRCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5cdFx0dGhpcy50aWxlZE1hcCA9IG5ldyBUaWxlZE1hcCgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXNcXFxcdGlsZWRtYXBzXFxcXDAwLmpzb25cIiwgbmV3IFJlY3RhbmdsZSgwLCAwLCBCcm93c2VyLndpZHRoLCBCcm93c2VyLmhlaWdodCksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWRNYXApKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJva1wiKVxyXG5cdFx0Y29uc3QgRXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX09VVCwgdGhpcywgdGhpcy5vbk1vdXNlVVApO1xyXG5cclxuXHRcdHRoaXMud2hsID0gbmV3IFdoZWVsKHRoaXMud2lkdGggLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUsIHRydWUpO1xyXG5cdFx0dGhpcy5hdGsgPSBuZXcgV2hlZWwodGhpcy53aWR0aCAqIDMgLyA0LCB0aGlzLmhlaWdodCAqIDMgLyA0LCB0aGlzLndpZHRoIC8gMTUpO1xyXG5cdFx0dGhpcy5hdGsuYWxwaGEgPSAwLjg7XHJcblxyXG5cdFx0d2luZG93LnRoZV9IZXJvID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiSGVyb1wiLCBIZXJvKTtcclxuXHRcdHRoZV9IZXJvLnJvb3RfcmVzZXQoKTtcclxuXHJcblx0XHRsZXQgbW9uc3Rlcl90ZXN0MSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkd1bm5lclwiLCBHdW5uZXIpO1xyXG5cdFx0bW9uc3Rlcl90ZXN0MS5yb290X3Jlc2V0KCk7XHJcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFggPSA1MDA7XHJcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFkgPSA1MDA7XHJcblxyXG5cdFx0bGV0IG1vbnN0ZXJfdGVzdDIgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJHdW5uZXJcIiwgR3VubmVyKTtcclxuXHRcdG1vbnN0ZXJfdGVzdDIucm9vdF9yZXNldCgpO1xyXG5cdFx0bW9uc3Rlcl90ZXN0Mi5tYXBYID0gNDAwO1xyXG5cdFx0bW9uc3Rlcl90ZXN0Mi5tYXBZID0gNTAwO1xyXG5cclxuXHRcdGxldCBtb25zdGVyX3Rlc3QzID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiR3VubmVyXCIsIEd1bm5lcik7XHJcblx0XHRtb25zdGVyX3Rlc3QzLnJvb3RfcmVzZXQoKTtcclxuXHRcdG1vbnN0ZXJfdGVzdDMubWFwWCA9IDUwMDtcclxuXHRcdG1vbnN0ZXJfdGVzdDMubWFwWSA9IDQwMDtcclxuXHRcdC8vIHRlc3RcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMub25GcmFtZSk7XHJcblx0fVxyXG5cclxuXHRvbkZyYW1lKCkge1xyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcclxuXHRcdFx0dGhlX2J1bGxldC51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3QpIHtcclxuXHRcdFx0dGhlX3dhbGwudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcclxuXHRcdFx0dGhlX3RoaW5nLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XHJcblx0XHR0aGVfSGVyby5wb3MoTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodCAvIDIpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYIC0gTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoIC8gMiwgdGhlX0hlcm8ubWFwWSAtIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgLyAyLCBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgsIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0fVxyXG5cclxuXHRvbk1vdXNlRG93bihlKSB7XHJcblx0XHRpZiAoKHRoaXMud2hsLnggLSBlLnN0YWdlWCkgKiAodGhpcy53aGwueCAtIGUuc3RhZ2VYKSArICh0aGlzLndobC55IC0gZS5zdGFnZVkpICogKHRoaXMud2hsLnkgLSBlLnN0YWdlWSkgPD0gdGhpcy53aGwuciAqIHRoaXMud2hsLnIpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgodGhpcy5hdGsueCAtIGUuc3RhZ2VYKSAqICh0aGlzLmF0ay54IC0gZS5zdGFnZVgpICsgKHRoaXMuYXRrLnkgLSBlLnN0YWdlWSkgKiAodGhpcy5hdGsueSAtIGUuc3RhZ2VZKSA8PSB0aGlzLmF0ay5yICogdGhpcy5hdGsucikge1xyXG5cdFx0XHR0aGlzLmF0ay5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b25Nb3VzZVVwKGUpIHtcclxuXHRcdGlmICh0aGlzLndobC5JRCA9PSBlLnRvdWNoSWQpIHtcclxuXHRcdFx0dGhpcy53aGwub25TdG9wRHJhZygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5hdGsuSUQgPT0gZS50b3VjaElkKSB7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b25Nb3VzZU1vdmUoZSkge1xyXG5cdFx0aWYgKHRoaXMud2hsLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuYXRrLklEID09IGUudG91Y2hJZCkge1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsIGUuc3RhZ2VZKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlbG9zaXR5KCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogKHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54KS90aGlzLndobC5yLFxyXG5cdFx0XHR5OiAodGhpcy53aGwuc3AueSAtIHRoaXMud2hsLnkpL3RoaXMud2hsLnJcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRnZXRTaG9vdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmF0ay5JRCAhPT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldFBhc3MobWFwWCwgbWFwWSkge1xyXG5cdFx0Y29uc3QgYSA9IHRoaXMudGlsZWRNYXAuZ2V0TGF5ZXJCeUluZGV4KDApLmdldFRpbGVEYXRhKE1hdGguZmxvb3IobWFwWCAvIDMyKSwgIE1hdGguZmxvb3IobWFwWSAvIDMyKSk7XHJcblx0XHRsZXQgYW5zID0gdGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYSAtIDFdLnByb3BlcnRpZXNbMF0udmFsdWU7XHJcblx0XHRyZXR1cm4gYW5zXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIGlmKHBsYXllcl9pc19uZWFyYnkoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3NlbnRlbmNlKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2xpY2tfdGhlX3RoaW5nKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VfaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVfc2VudGVuY2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuICAgICAgICBUaGluZ19saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3NlbnRlbmNlKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICBnYW1lLnNlbnRlbmNlID0gdGhpcy5zZW50ZW5jZTtcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVfc2VudGVuY2UoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGdhbWUuc2VudGVuY2UgPSBcIlwiO1xyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyX2lzX25lYXJieSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja190aGVfdGhpbmcoKXtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKGdhbWUuYnV0dG9uX2NsaWNrZWQpe1xyXG4gICAgICAgICAgICBnYW1lLmJ1dHRvbl9jbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcclxuICAgICAgICBUaGluZ19saXN0LnB1c2godGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5sZWFmX3Jlc2V0KClcclxuICAgIH1cclxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGwgZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeDIsIHkxLCB5Mil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIldhbGxcIjtcclxuXHJcbiAgICAgICAgdGhpcy54MSA9IHgxO1xyXG4gICAgICAgIHRoaXMueDIgPSB4MjtcclxuICAgICAgICB0aGlzLnkxID0geTE7XHJcbiAgICAgICAgdGhpcy55MiA9IHkyO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIHRoaXMuSFAgPSAzMDtcclxuICAgIH1cclxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZWVsIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdGNvbnN0cnVjdG9yKHgseSxyLGhhc1NwKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXHJcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcclxuXHRcdHRoaXMucGl2b3QocixyKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZShyLHIscixcIiNGRkZGRkZcIik7XHJcblx0XHR0aGlzLnBvcyh4LHkpO1xyXG5cdFx0dGhpcy5yPXI7XHJcbiAgICAgICAgdGhpcy5JRD1udWxsO1xyXG4gICAgICAgIHRoaXMuYWxwaGE9MC40O1xyXG5cdFx0dGhpcy5tb3VzZVRocm91Z2g9dHJ1ZTtcclxuXHRcdHRoaXMuaGFzU3A9aGFzU3A7XHJcblx0XHRpZih0aGlzLmhhc1NwKVxyXG5cdFx0XHR0aGlzLnNwPW5ldyBEcmFnUG9pbnQodGhpcy54LHRoaXMueSx0aGlzLnIvNSk7XHJcblx0fVxyXG5cclxuXHRvblN0YXJ0RHJhZyhlKXtcclxuXHRcdHRoaXMuSUQ9ZS50b3VjaElkO1xyXG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdH1cclxuXHJcblx0b25TdG9wRHJhZygpXHJcblx0e1xyXG5cdFx0dGhpcy5JRD1udWxsO1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcclxuXHR9XHJcblxyXG5cdG1vdmVUbyh4LHkpXHJcblx0e1xyXG5cdFx0aWYodGhpcy5oYXNTcClcclxuXHRcdHtcclxuXHRcdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0XHRsZXQgZHk9eS10aGlzLnk7XHJcblxyXG5cdFx0XHRsZXQgUj1NYXRoLnNxcnQoZHgqZHgrZHkqZHkpO1xyXG5cdFx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRcdGxldCBkeTI9Uj50aGlzLnI/IGR5KnRoaXMuci9SOiBkeTtcclxuXHRcdFx0dGhpcy5zcC5wb3ModGhpcy54K2R4Mix0aGlzLnkrZHkyKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDEwO1xyXG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5zaXplKDMyLDQ4KTtcclxuXHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxcdXBcIiw0KSxcImhlcm9fdXBcIik7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxcZG93blwiLDQpLFwiaGVyb19kb3duXCIpO1xyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXGxlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxyaWdodFwiLDQpLFwiaGVyb19yaWdodFwiKTtcclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmludGVydmFsPTEwMDtcclxuICAgICAgICB0aGlzLmFuaS5waXZvdCh0aGlzLndpZHRoLzIsdGhpcy5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXHJcbiAgICAgICAgbGV0IHZ4ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLng7XHJcbiAgICAgICAgbGV0IHZ5ID0gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpLnk7XHJcbiAgICAgICAgbGV0IHY9dGhpcy5kbCh2eCx2eSk7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHZ4ICogdGhpcy52X21heCwgdnkgKiB0aGlzLnZfbWF4KTtcclxuXHJcbiAgICAgICAgLy8gU2hvb3RpbmcgZGVsYXlcclxuICAgICAgICBpZih0aGVfc2NyZWVuLmdldFNob290KCkpICAgLy8gc2hvb3QgYnV0dG9uIGNsaWNrZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnNob290X3Bvd2VyICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPj0gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5PYmplY3RfZGwobmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKSA+IDFFLTYgKXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHZ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tYXBYLHRoaXMubWFwWSk7XHJcbi8qXHJcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb25feD49MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgIGxldCBhcmc9OTAtTWF0aC5hdGFuMih0aGlzLmRpcmVjdGlvbl94LHRoaXMuZGlyZWN0aW9uX3kpL01hdGguUEkqMTgwO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5fZ3VuLnJvdGF0aW9uPWFyZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4uc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICBsZXQgYXJnPTI3MC1NYXRoLmF0YW4yKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSkvTWF0aC5QSSoxODA7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbl9ndW4ucm90YXRpb249YXJnO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gdGhpcy5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIHRoaXMuYW5pLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSB0aGlzLmFybW9yX21heDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hbmkuaW5kZXg9MTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIik7XHJcbiAgICAgICAgLy90aGlzLmFuaS52aXNpYmxlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLm1haW5fZ3VuID0gbmV3IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcygnR3VuX25vcm1hbCcsIEd1bl9ub3JtYWwpO1xyXG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG59Il19
