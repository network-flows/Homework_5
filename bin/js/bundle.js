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
        _this.w = 50;
        _this.h = 50;

        _this.direction_x = 1;
        _this.direction_y = 1;
        return _this;
    }

    _createClass(Beings, [{
        key: "root_reset",
        value: function root_reset() {
            Laya.stage.addChild(this);
            this.pivot(this.w / 2, this.h / 2);
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
            if (dx > dy && dx > -dy) return "right";
            if (-dx > dy && -dx > -dy) return "left";
            if (dy > dx && dy > -dx) return "down";
            if (-dy > dx && -dy > -dx) return "up";
            return last;
        }
    }, {
        key: "reachable",
        value: function reachable(new_mapX, new_mapY) {
            var point_set = [];
            point_set.push({ x: new_mapX + this.w / 2, y: new_mapY + this.h / 2 });
            point_set.push({ x: new_mapX, y: new_mapY + this.h / 2 });
            point_set.push({ x: new_mapX - this.w / 2, y: new_mapY + this.h / 2 });
            point_set.push({ x: new_mapX - this.w / 2, y: new_mapY });
            point_set.push({ x: new_mapX - this.w / 2, y: new_mapY - this.h / 2 });
            point_set.push({ x: new_mapX, y: new_mapY - this.h / 2 });
            point_set.push({ x: new_mapX + this.w / 2, y: new_mapY - this.h / 2 });
            point_set.push({ x: new_mapX + this.w / 2, y: new_mapY });

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
            while (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
                console.log("...");
                // try: move x
                if (dx > 0.1) {
                    if (this.reachable(this.mapX + 0.3, this.mapY)) {
                        dx -= 0.3;
                        this.mapX += 0.3;
                    } else {
                        dx = 0;
                    }
                }

                if (dx < -0.1) {
                    if (this.reachable(this.mapX - 0.3, this.mapY)) {
                        dx += 0.3;
                        this.mapX -= 0.3;
                    } else {
                        dx = 0;
                    }
                }

                // try: move y
                if (dy > 0.1) {
                    if (this.reachable(this.mapX, this.mapY + 0.3)) {
                        dy -= 0.3;
                        this.mapY += 0.3;
                    } else {
                        dy = 0;
                    }
                }

                if (dy < -0.1) {
                    if (this.reachable(this.mapX, this.mapY - 0.3)) {
                        dy += 0.3;
                        this.mapY -= 0.3;
                    } else {
                        dy = 0;
                    }
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
        return _this;
    }

    _createClass(Bullet, [{
        key: "action",
        value: function action() {
            this.HP -= 1;

            this.move_by_dx_dy(this.vx, this.vy);

            var attack_list = this.get_attack_list();
            this.explosion(attack_list);
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

        _this.w = 400;
        _this.h = 400;

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

        _this.first_waiting = 50;
        _this.second_waiting = 100;

        _this.bullet = _Hero_Bullet_normal2.default;
        _this.bullet_type = "Hero_Bullet_normal";
        return _this;
    }

    _createClass(Gun_normal, [{
        key: "leaf_reset",
        value: function leaf_reset() {}
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

        _this.w = 400;
        _this.h = 400;

        // set picture
        _this.loadImage("./orz.jpg").scale(0.4, 0.4);
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
        _this.shoot_power = 1000;
        _this.shoot_waiting = false;

        _this.w = 32;
        _this.h = 48;

        _this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
        _this.main_gun.root_reset();
        _this.alternate_gun = null;
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

            Laya.Animation.createFrames(this.getURLs("hero\\up", 4), "hero_up");
            Laya.Animation.createFrames(this.getURLs("hero\\down", 4), "hero_down");
            Laya.Animation.createFrames(this.getURLs("hero\\left", 4), "hero_left");
            Laya.Animation.createFrames(this.getURLs("hero\\right", 4), "hero_right");
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

                this.move_by_dx_dy(vx * v_scale, vy * v_scale);
            }
            //--------- movement control part end ---------//

            //--------- shoot control part ---------//

            // Shooting delay
            if (this.shoot() && this.shoot_power >= 0 && !this.shoot_waiting) {
                this.shoot_waiting = true;
            }

            if (this.shoot_waiting) {
                if (this.shoot_power > this.main_gun.first_waiting) {
                    this.shoot_event();
                    this.shoot_power = -this.main_gun.second_waiting;
                    this.shoot_waiting = false;
                } else {
                    this.shoot_power += 1;
                }
            } else {
                if (this.shoot_power < 0) {
                    this.shoot_power += 1;
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
            this.main_gun.shoot();
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
        value: function dead() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;

            this.ani = new Laya.Animation();
            this.ani.loadAtlas("res//atlas//hero.atlas", Laya.Handler.create(this, this.onLoaded));
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

        // set picture
        _this.r = 20;
        _this.graphics.drawCircle(0, 0, _this.r, "#FFFF00");
        //this.pivot(this.r, this.r);
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
        return _this;
    }

    _createClass(Monster, [{
        key: "action",
        value: function action() {
            this.direction_x = this.get_hero_orientation().dx;
            this.direction_y = this.get_hero_orientation().dy;

            this.wandering();

            if (this.skill_power < 1000) {
                this.skill_power += 1;
            }

            if (this.skill_power >= this.skill_cost) {
                this.skill_power = 0;
                this.skill();
            }
        }
    }, {
        key: "wandering",
        value: function wandering() {
            this.vx = 1;
            this.vy = 1;

            this.move_by_dx_dy(this.vx, this.vy);
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
			this.tiledMap.createMap("res\\tiledmaps\\map0.json", new Rectangle(0, 0, Browser.width, Browser.height), Handler.create(this, this.onLoadedMap));
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

			window.the_Hero = Laya.Pool.getItemByClass("Hero", _hero2.default);
			the_Hero.root_reset();

			// test
			Laya.timer.frameLoop(1, this, this.onFrame);

			var monster_test1 = new _Gunner2.default();
			monster_test1.root_reset();
			monster_test1.mapX = 500;
			monster_test1.mapY = 500;

			this.layer_pass = this.tiledMap.getLayerByName("pass");
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
	}, {
		key: "getPass",
		value: function getPass(mapX, mapY) {
			var X = Math.floor(mapX / 32);
			var Y = Math.floor(mapY / 32);
			var layer = this.tiledMap.getLayerByIndex(0);
			var a = layer.getTileData(X, Y);

			var ans = this.tiledMap._jsonData.tilesets[0].tiles[a - 1].properties[0].value;
			console.log(ans);
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
        _this.shoot_power = 1000;
        _this.shoot_waiting = false;

        _this.w = 32;
        _this.h = 48;

        _this.main_gun = new Laya.Pool.getItemByClass('Gun_normal', _Gun_normal2.default);
        _this.main_gun.root_reset();
        _this.alternate_gun = null;
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

            Laya.Animation.createFrames(this.getURLs("hero\\up", 4), "hero_up");
            Laya.Animation.createFrames(this.getURLs("hero\\down", 4), "hero_down");
            Laya.Animation.createFrames(this.getURLs("hero\\left", 4), "hero_left");
            Laya.Animation.createFrames(this.getURLs("hero\\right", 4), "hero_right");
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

                this.move_by_dx_dy(vx * v_scale, vy * v_scale);
            }
            //--------- movement control part end ---------//

            //--------- shoot control part ---------//

            // Shooting delay
            if (this.shoot() && this.shoot_power >= 0 && !this.shoot_waiting) {
                this.shoot_waiting = true;
            }

            if (this.shoot_waiting) {
                if (this.shoot_power > this.main_gun.first_waiting) {
                    this.shoot_event();
                    this.shoot_power = -this.main_gun.second_waiting;
                    this.shoot_waiting = false;
                } else {
                    this.shoot_power += 1;
                }
            } else {
                if (this.shoot_power < 0) {
                    this.shoot_power += 1;
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
            this.main_gun.shoot();
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
        value: function dead() {}
    }, {
        key: "branch_reset",
        value: function branch_reset() {
            this.HP = this.HP_max;
            this.armor = this.armor_max;

            this.ani = new Laya.Animation();
            this.ani.loadAtlas("res//atlas//hero.atlas", Laya.Handler.create(this, this.onLoaded));
        }
    }]);

    return Hero;
}(_Beings3.default);

exports.default = Hero;

},{"./Beings":2,"./Bullet":3,"./Gun_normal":8,"./Hero_Bullet_normal":12,"./Monster":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9HdW4uanMiLCJzcmMvc2NyaXB0L0d1bl9ub3JtYWwuanMiLCJzcmMvc2NyaXB0L0d1bm5lci5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9UaGluZy5qcyIsInNyYy9zY3JpcHQvV2FsbC5qcyIsInNyYy9zY3JpcHQvV2hlZWwuanMiLCJzcmMvc2NyaXB0L2hlcm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUNDLFVBQVUsS0FBSyxPQURoQjtBQUFBLElBRUMsUUFBUSxLQUFLLEtBRmQ7QUFBQSxJQUdDLFFBQVEsS0FBSyxLQUhkO0FBQUEsSUFJQyxPQUFPLEtBQUssSUFKYjtBQUFBLElBS0MsVUFBVSxLQUFLLE9BTGhCOztBQU9BOzs7QUFaQTtBQWRDO0FBMkJELEtBQUssSUFBTCxDQUFVLFFBQVEsV0FBbEIsRUFBK0IsUUFBUSxZQUF2QyxFQUFxRCxLQUFyRDs7QUFFQTtBQUNBLEtBQUssS0FBTCxDQUFXLFVBQVgsR0FBd0IsWUFBeEI7O0FBRUE7QUFDQSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLE1BQU0sYUFBN0I7O0FBRUE7QUFDQSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLFNBQXJCOztBQUVBO0FBQ0EsSUFBSSxJQUFJLFFBQVEsV0FBaEI7QUFDQSxJQUFJLElBQUksUUFBUSxZQUFoQjs7QUFFQSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLE1BQU0sWUFBMUI7QUFDQSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLE1BQU0sWUFBMUI7O0FBRUEsS0FBSyxJQUFMOztBQUVBLE9BQU8sVUFBUCxHQUFvQixJQUFJLGdCQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBcEI7O0FBRUE7QUFDQSxPQUFPLFlBQVAsR0FBc0IsRUFBdEI7QUFDQSxPQUFPLFdBQVAsR0FBcUIsRUFBckI7QUFDQSxPQUFPLFNBQVAsR0FBbUIsRUFBbkI7QUFDQSxPQUFPLFVBQVAsR0FBb0IsRUFBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDckRxQixNOzs7QUFDakIsc0JBQWE7QUFBQTs7QUFBQTs7QUFHVCxjQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsY0FBSyxJQUFMLEdBQVksR0FBWjtBQUNBLGNBQUssSUFBTCxHQUFZLEdBQVo7O0FBRUE7QUFDQSxjQUFLLElBQUwsR0FBWSxRQUFaO0FBQ0EsY0FBSyxDQUFMLEdBQVMsRUFBVDtBQUNBLGNBQUssQ0FBTCxHQUFTLEVBQVQ7O0FBRUEsY0FBSyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLENBQW5CO0FBYlM7QUFjWjs7OztxQ0FFVztBQUNSLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLElBQXBCO0FBQ0EsaUJBQUssS0FBTCxDQUFXLEtBQUssQ0FBTCxHQUFTLENBQXBCLEVBQXVCLEtBQUssQ0FBTCxHQUFRLENBQS9CO0FBQ0Esb0JBQVEsR0FBUixDQUFZLGFBQVo7O0FBRUEsaUJBQUssWUFBTDtBQUNIOzs7a0NBRVE7QUFDTCxpQkFBSyxDQUFMLEdBQVMsS0FBSyxJQUFMLEdBQVksU0FBUyxJQUFyQixHQUE0QixLQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQXlCLENBQTlEO0FBQ0EsaUJBQUssQ0FBTCxHQUFTLEtBQUssSUFBTCxHQUFZLFNBQVMsSUFBckIsR0FBNEIsS0FBSyxPQUFMLENBQWEsWUFBYixHQUEwQixDQUEvRDs7QUFFQSxnQkFBRyxLQUFLLEVBQUwsR0FBVSxDQUFiLEVBQWU7QUFDWCxxQkFBSyxXQUFMO0FBQ0gsYUFGRCxNQUdJO0FBQ0EscUJBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxxQkFBSyxNQUFMO0FBQ0g7QUFDSjs7O3NDQUVZO0FBQ1QsaUJBQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixJQUF2QjtBQUNBLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEtBQUssSUFBdkIsRUFBNkIsSUFBN0I7O0FBRUEsaUJBQUssSUFBTDtBQUNIOzs7aUNBRVEsSyxFQUFNO0FBQ1gsaUJBQUssRUFBTCxJQUFXLEtBQVg7QUFDSDs7OytCQUVLLENBRUw7OztpQ0FFTztBQUNKLG9CQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7OzsyQkFFRSxFLEVBQUksRSxFQUFHO0FBQ04sbUJBQU8sS0FBSyxJQUFMLENBQVUsS0FBSyxFQUFMLEdBQVUsS0FBSSxFQUF4QixDQUFQO0FBQ0g7OztrQ0FFUyxVLEVBQVc7QUFDakIsbUJBQU8sS0FBSyxJQUFMLENBQVUsV0FBVyxFQUFYLEdBQWdCLFdBQVcsRUFBM0IsR0FBZ0MsV0FBVyxFQUFYLEdBQWdCLFdBQVcsRUFBckUsQ0FBUDtBQUNIOzs7cUNBRVksTyxFQUFRO0FBQ2pCLGdCQUFJLEtBQUssS0FBSyxJQUFMLEdBQVksUUFBUSxJQUE3QjtBQUNBLGdCQUFJLEtBQUssS0FBSyxJQUFMLEdBQVksUUFBUSxJQUE3QjtBQUNBLG1CQUFPLEtBQUssRUFBTCxDQUFRLEVBQVIsRUFBWSxFQUFaLENBQVA7QUFDSDs7O3FDQUVZLEssRUFBTyxNLEVBQVEsTSxFQUFPO0FBQy9CLGdCQUFJLFFBQVEsS0FBSyxFQUFMLENBQVEsTUFBUixFQUFnQixNQUFoQixDQUFaO0FBQ0EsZ0JBQUcsUUFBUSxJQUFSLElBQWdCLFFBQVEsSUFBM0IsRUFBZ0M7QUFDNUIsdUJBQU07QUFDRix3QkFBSSxTQUFTLEtBQVQsR0FBZSxLQURqQjtBQUVGLHdCQUFJLFNBQVMsS0FBVCxHQUFlO0FBRmpCLGlCQUFOO0FBSUgsYUFMRCxNQU1JO0FBQ0EsdUJBQU07QUFDRix3QkFBSSxDQURGO0FBRUYsd0JBQUk7QUFGRixpQkFBTjtBQUlIO0FBQ0o7OztnQ0FFTyxHLEVBQUksQyxFQUNaO0FBQ0ksZ0JBQUksT0FBSyxFQUFUO0FBQ0EsaUJBQUksSUFBSSxJQUFHLENBQVgsRUFBYSxJQUFFLENBQWYsRUFBaUIsS0FBRyxDQUFwQixFQUNBO0FBQ0kscUJBQUssSUFBTCxDQUFVLGlCQUFlLEdBQWYsR0FBbUIsQ0FBbkIsR0FBcUIsTUFBL0I7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7OytCQUVNLEUsRUFBRyxFLEVBQUcsSSxFQUFLO0FBQ2QsZ0JBQUcsS0FBRyxFQUFILElBQU8sS0FBRyxDQUFDLEVBQWQsRUFBaUIsT0FBTyxPQUFQO0FBQ2pCLGdCQUFHLENBQUMsRUFBRCxHQUFJLEVBQUosSUFBUSxDQUFDLEVBQUQsR0FBSSxDQUFDLEVBQWhCLEVBQW1CLE9BQU8sTUFBUDtBQUNuQixnQkFBRyxLQUFHLEVBQUgsSUFBTyxLQUFHLENBQUMsRUFBZCxFQUFpQixPQUFPLE1BQVA7QUFDakIsZ0JBQUcsQ0FBQyxFQUFELEdBQUksRUFBSixJQUFRLENBQUMsRUFBRCxHQUFJLENBQUMsRUFBaEIsRUFBbUIsT0FBTyxJQUFQO0FBQ25CLG1CQUFPLElBQVA7QUFDSDs7O2tDQUVTLFEsRUFBVSxRLEVBQVM7QUFDekIsZ0JBQUksWUFBWSxFQUFoQjtBQUNBLHNCQUFVLElBQVYsQ0FBZSxFQUFDLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUF0QixFQUF5QixHQUFHLFdBQVcsS0FBSyxDQUFMLEdBQU8sQ0FBOUMsRUFBZjtBQUNBLHNCQUFVLElBQVYsQ0FBZSxFQUFDLEdBQUcsUUFBSixFQUFjLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUFuQyxFQUFmO0FBQ0Esc0JBQVUsSUFBVixDQUFlLEVBQUMsR0FBRyxXQUFXLEtBQUssQ0FBTCxHQUFPLENBQXRCLEVBQXlCLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUE5QyxFQUFmO0FBQ0Esc0JBQVUsSUFBVixDQUFlLEVBQUMsR0FBRyxXQUFXLEtBQUssQ0FBTCxHQUFPLENBQXRCLEVBQXlCLEdBQUcsUUFBNUIsRUFBZjtBQUNBLHNCQUFVLElBQVYsQ0FBZSxFQUFDLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUF0QixFQUF5QixHQUFHLFdBQVcsS0FBSyxDQUFMLEdBQU8sQ0FBOUMsRUFBZjtBQUNBLHNCQUFVLElBQVYsQ0FBZSxFQUFDLEdBQUcsUUFBSixFQUFjLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUFuQyxFQUFmO0FBQ0Esc0JBQVUsSUFBVixDQUFlLEVBQUMsR0FBRyxXQUFXLEtBQUssQ0FBTCxHQUFPLENBQXRCLEVBQXlCLEdBQUcsV0FBVyxLQUFLLENBQUwsR0FBTyxDQUE5QyxFQUFmO0FBQ0Esc0JBQVUsSUFBVixDQUFlLEVBQUMsR0FBRyxXQUFXLEtBQUssQ0FBTCxHQUFPLENBQXRCLEVBQXlCLEdBQUcsUUFBNUIsRUFBZjs7QUFFQSxnQkFBSSxLQUFLLElBQVQ7O0FBWHlCO0FBQUE7QUFBQTs7QUFBQTtBQWF6QixxQ0FBcUIsU0FBckIsOEhBQStCO0FBQUEsd0JBQXZCLFNBQXVCOztBQUMzQiwwQkFBTSxXQUFXLE9BQVgsQ0FBbUIsVUFBVSxDQUE3QixFQUFnQyxVQUFVLENBQTFDLENBQU47QUFDSDtBQWZ3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWdCekIsbUJBQU8sRUFBUDtBQUNIOzs7c0NBRWEsRSxFQUFJLEUsRUFBRztBQUNqQixtQkFBTSxLQUFLLEdBQUwsQ0FBUyxFQUFULElBQWUsR0FBZixJQUFzQixLQUFLLEdBQUwsQ0FBUyxFQUFULElBQWUsR0FBM0MsRUFBK0M7QUFDM0Msd0JBQVEsR0FBUixDQUFZLEtBQVo7QUFDQTtBQUNBLG9CQUFHLEtBQUssR0FBUixFQUFZO0FBQ1Isd0JBQUcsS0FBSyxTQUFMLENBQWUsS0FBSyxJQUFMLEdBQVksR0FBM0IsRUFBZ0MsS0FBSyxJQUFyQyxDQUFILEVBQThDO0FBQzFDLDhCQUFNLEdBQU47QUFDQSw2QkFBSyxJQUFMLElBQWEsR0FBYjtBQUNILHFCQUhELE1BSUk7QUFDQSw2QkFBSyxDQUFMO0FBQ0g7QUFDSjs7QUFFRCxvQkFBRyxLQUFLLENBQUMsR0FBVCxFQUFhO0FBQ1Qsd0JBQUcsS0FBSyxTQUFMLENBQWUsS0FBSyxJQUFMLEdBQVksR0FBM0IsRUFBZ0MsS0FBSyxJQUFyQyxDQUFILEVBQThDO0FBQzFDLDhCQUFNLEdBQU47QUFDQSw2QkFBSyxJQUFMLElBQWEsR0FBYjtBQUNILHFCQUhELE1BSUk7QUFDQSw2QkFBSyxDQUFMO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLG9CQUFHLEtBQUssR0FBUixFQUFZO0FBQ1Isd0JBQUcsS0FBSyxTQUFMLENBQWUsS0FBSyxJQUFwQixFQUEwQixLQUFLLElBQUwsR0FBWSxHQUF0QyxDQUFILEVBQThDO0FBQzFDLDhCQUFNLEdBQU47QUFDQSw2QkFBSyxJQUFMLElBQWEsR0FBYjtBQUNILHFCQUhELE1BSUk7QUFDQSw2QkFBSyxDQUFMO0FBQ0g7QUFDSjs7QUFFRCxvQkFBRyxLQUFLLENBQUMsR0FBVCxFQUFhO0FBQ1Qsd0JBQUcsS0FBSyxTQUFMLENBQWUsS0FBSyxJQUFwQixFQUEwQixLQUFLLElBQUwsR0FBWSxHQUF0QyxDQUFILEVBQThDO0FBQzFDLDhCQUFNLEdBQU47QUFDQSw2QkFBSyxJQUFMLElBQWEsR0FBYjtBQUNILHFCQUhELE1BSUk7QUFDQSw2QkFBSyxDQUFMO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7Ozs7RUExSytCLEtBQUssTTs7a0JBQXBCLE07Ozs7Ozs7Ozs7O0FDQXJCOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ2pCLHNCQUFhO0FBQUE7O0FBQUE7O0FBR1QsY0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLGNBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxjQUFLLEtBQUwsR0FBYSxFQUFiO0FBTFM7QUFNWjs7OztpQ0FFTztBQUNKLGlCQUFLLEVBQUwsSUFBVyxDQUFYOztBQUVBLGlCQUFLLGFBQUwsQ0FBbUIsS0FBSyxFQUF4QixFQUE0QixLQUFLLEVBQWpDOztBQUVBLGdCQUFJLGNBQWMsS0FBSyxlQUFMLEVBQWxCO0FBQ0EsaUJBQUssU0FBTCxDQUFlLFdBQWY7QUFDSDs7OytCQUVLO0FBQ0Ysb0JBQVEsR0FBUixDQUFZLGFBQVcsWUFBWSxNQUFuQztBQUNBLHdCQUFZLE1BQVosQ0FBbUIsWUFBWSxPQUFaLENBQW9CLElBQXBCLENBQW5CLEVBQThDLENBQTlDO0FBQ0Esb0JBQVEsR0FBUixDQUFZLFlBQVUsWUFBWSxNQUFsQztBQUNIOztBQUVEOzs7OzBDQUNpQixDQUVoQjs7O2tDQUVTLFcsRUFBWTtBQUNsQjtBQUNBLGdCQUFHLFlBQVksTUFBWixHQUFxQixDQUF4QixFQUEwQjtBQUN0QixxQkFBSyxFQUFMLEdBQVUsQ0FBQyxDQUFYO0FBRHNCO0FBQUE7QUFBQTs7QUFBQTtBQUV0Qix5Q0FBbUIsV0FBbkIsOEhBQStCO0FBQUEsNEJBQXZCLE9BQXVCOztBQUMzQiw2QkFBSyxNQUFMLENBQVksT0FBWjtBQUNIO0FBSnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLekI7QUFDSjs7OytCQUVNLE8sRUFBUTtBQUNYLG9CQUFRLEdBQVIsQ0FBWSxlQUFaO0FBRUg7Ozt1Q0FFYTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLHdCQUFZLElBQVosQ0FBaUIsSUFBakI7O0FBRUEsaUJBQUssNEJBQUw7QUFDSDs7OztFQWpEK0IsZ0I7O2tCQUFmLE07Ozs7Ozs7Ozs7Ozs7OztJQ0ZBLFM7OztBQUVwQixvQkFBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUNBO0FBQUE7O0FBQUE7O0FBRUMsTUFDQyxTQUFTLEtBQUssTUFEZjtBQUFBLE1BRUMsUUFBUSxLQUFLLEtBRmQ7QUFHQSxPQUFLLEtBQUwsQ0FBVyxRQUFYOztBQUVBLFFBQUssSUFBTCxDQUFVLElBQUUsQ0FBWixFQUFjLElBQUUsQ0FBaEI7QUFDQSxRQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYjtBQUNBLFFBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsU0FBL0I7QUFDTSxRQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVcsQ0FBWDtBQUNBLFFBQUssS0FBTCxHQUFXLEdBQVg7QUFDTixRQUFLLENBQUwsR0FBTyxDQUFQO0FBQ0EsUUFBSyxZQUFMLEdBQWtCLElBQWxCO0FBYkQ7QUFjQzs7O0VBakJxQyxLQUFLLE0sQ0FBUTs7O2tCQUEvQixTOzs7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7O0lBRXFCLEk7OztBQUNqQixvQkFBYTtBQUFBOztBQUFBOztBQUdULGNBQUssUUFBTCxHQUFnQixVQUFoQjtBQUhTO0FBSVo7Ozs7aUNBRU87QUFDSjs7QUFFSDs7OztFQVY2QixlOztrQkFBYixJOzs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7Ozs7O0lBRXFCLE07OztBQUNqQixzQkFBYTtBQUFBOztBQUFBOztBQUVULGNBQUssSUFBTCxHQUFZLFFBQVo7O0FBRUEsY0FBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLGNBQUssQ0FBTCxHQUFTLEdBQVQ7O0FBRUE7QUFDQSxjQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQTRCLEtBQTVCLENBQWtDLEdBQWxDLEVBQXNDLEdBQXRDO0FBUlM7QUFTWjs7OztnQ0FFTSxDQUVOOzs7cUNBRVc7O0FBRVIsaUJBQUssRUFBTCxHQUFVLEVBQVY7QUFDSDs7OztFQW5CK0IsaUI7O2tCQUFmLE07Ozs7Ozs7Ozs7O0FDRnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQixHOzs7QUFDakIsbUJBQWE7QUFBQTs7QUFBQTs7QUFFVCxjQUFLLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxjQUFLLGNBQUwsR0FBc0IsR0FBdEI7O0FBRUEsY0FBSyxNQUFMLEdBQWMsNEJBQWQ7QUFDQSxjQUFLLFdBQUwsR0FBbUIsb0JBQW5CO0FBTlM7QUFPWjs7OztpQ0FFTyxDQUVQOzs7K0JBRUssQ0FFTDs7O2dDQUVNO0FBQ0gsZ0JBQUksYUFBYSxLQUFLLElBQUwsQ0FBVSxjQUFWLENBQXlCLEtBQUssV0FBOUIsRUFBMkMsS0FBSyxNQUFoRCxDQUFqQjtBQUNBLHVCQUFXLFVBQVg7O0FBRUEsb0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSDs7O3VDQUVhO0FBQ1Ysb0JBQVEsR0FBUixDQUFZLGVBQVo7O0FBRUEsaUJBQUssVUFBTDtBQUNIOzs7O0VBN0I0QixnQjs7a0JBQVosRzs7Ozs7Ozs7Ozs7QUNKckI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsVTs7O0FBQ2pCLDBCQUFhO0FBQUE7O0FBQUE7O0FBRVQsY0FBSyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsY0FBSyxjQUFMLEdBQXNCLEdBQXRCOztBQUVBLGNBQUssTUFBTCxHQUFjLDRCQUFkO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLG9CQUFuQjtBQU5TO0FBT1o7Ozs7cUNBRVcsQ0FFWDs7OztFQVptQyxhOztrQkFBbkIsVTs7Ozs7Ozs7Ozs7QUNKckI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCLE07OztBQUNqQixzQkFBYTtBQUFBOztBQUFBOztBQUVULGNBQUssSUFBTCxHQUFZLFFBQVo7O0FBRUEsY0FBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLGNBQUssQ0FBTCxHQUFTLEdBQVQ7O0FBRUE7QUFDQSxjQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQTRCLEtBQTVCLENBQWtDLEdBQWxDLEVBQXNDLEdBQXRDO0FBUlM7QUFTWjs7OztnQ0FFTTtBQUNILGdCQUFJLGFBQWEsS0FBSyxJQUFMLENBQVUsY0FBVixDQUF5Qix1QkFBekIsRUFBa0QsK0JBQWxELENBQWpCO0FBQ0EsdUJBQVcsVUFBWDtBQUNBLHVCQUFXLElBQVgsQ0FBZ0IsSUFBaEI7O0FBRUEsb0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSDs7O3FDQUVXOztBQUVSLGlCQUFLLEVBQUwsR0FBVSxHQUFWO0FBQ0g7Ozs7RUF2QitCLGlCOztrQkFBZixNOzs7Ozs7Ozs7OztBQ0hyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsSTs7O0FBQ2pCLG9CQUFhO0FBQUE7O0FBR1Q7QUFIUzs7QUFJVCxjQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBO0FBQ0EsY0FBSyxNQUFMLEdBQWMsR0FBZDtBQUNBLGNBQUssRUFBTCxHQUFVLEdBQVY7QUFDQSxjQUFLLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxjQUFLLEtBQUwsR0FBYSxFQUFiOztBQUVBO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsY0FBSyxhQUFMLEdBQXFCLEtBQXJCOztBQUVBLGNBQUssQ0FBTCxHQUFTLEVBQVQ7QUFDQSxjQUFLLENBQUwsR0FBUyxFQUFUOztBQUVBLGNBQUssUUFBTCxHQUFnQixJQUFJLEtBQUssSUFBTCxDQUFVLGNBQWQsQ0FBNkIsWUFBN0IsRUFBMkMsb0JBQTNDLENBQWhCO0FBQ0EsY0FBSyxRQUFMLENBQWMsVUFBZDtBQUNBLGNBQUssYUFBTCxHQUFxQixJQUFyQjtBQXJCUztBQXNCWjs7OzttQ0FHRDtBQUNJLG9CQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBSyxHQUF6QjtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxRQUFULEdBQWtCLEdBQWxCO0FBQ0EsaUJBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxLQUFLLENBQWxCLEVBQW9CLEtBQUssQ0FBekI7QUFDQSxpQkFBSyxHQUFMLENBQVMsS0FBVCxHQUFlLENBQWY7O0FBRUEsaUJBQUssU0FBTCxDQUFlLFlBQWYsQ0FBNEIsS0FBSyxPQUFMLENBQWEsVUFBYixFQUF3QixDQUF4QixDQUE1QixFQUF1RCxTQUF2RDtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxZQUFmLENBQTRCLEtBQUssT0FBTCxDQUFhLFlBQWIsRUFBMEIsQ0FBMUIsQ0FBNUIsRUFBeUQsV0FBekQ7QUFDQSxpQkFBSyxTQUFMLENBQWUsWUFBZixDQUE0QixLQUFLLE9BQUwsQ0FBYSxZQUFiLEVBQTBCLENBQTFCLENBQTVCLEVBQXlELFdBQXpEO0FBQ0EsaUJBQUssU0FBTCxDQUFlLFlBQWYsQ0FBNEIsS0FBSyxPQUFMLENBQWEsYUFBYixFQUEyQixDQUEzQixDQUE1QixFQUEwRCxZQUExRDtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsQ0FBZCxFQUFnQixJQUFoQixFQUFxQixZQUFyQjtBQUNBLGlCQUFLLE9BQUwsR0FBYSxPQUFiO0FBQ0g7OztpQ0FFTztBQUNKO0FBQ0EsZ0JBQUksS0FBSyxLQUFLLElBQUwsR0FBWSxDQUFyQjtBQUNBLGdCQUFJLEtBQUssS0FBSyxJQUFMLEdBQVksQ0FBckI7O0FBRUEsa0JBQU0sRUFBTjtBQUNBLGtCQUFNLEVBQU47O0FBRUE7QUFDQSxnQkFBSSxJQUFJLEtBQUssSUFBTCxDQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBekIsQ0FBUjtBQUNBLGdCQUFJLElBQUksSUFBUixFQUFhO0FBQ1Q7QUFDQSxvQkFBSSxVQUFTLEtBQUssS0FBTCxHQUFhLENBQTFCO0FBQ0Esb0JBQUcsVUFBVSxDQUFiLEVBQWU7QUFDWCw4QkFBVSxDQUFWO0FBQ0g7O0FBRUQscUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQXhCLEVBQWlDLEtBQUssT0FBdEM7QUFDSDtBQUNEOztBQUVBOztBQUVBO0FBQ0EsZ0JBQUcsS0FBSyxLQUFMLE1BQWdCLEtBQUssV0FBTCxJQUFvQixDQUFwQyxJQUF5QyxDQUFDLEtBQUssYUFBbEQsRUFBZ0U7QUFDNUQscUJBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNIOztBQUVELGdCQUFHLEtBQUssYUFBUixFQUFzQjtBQUNsQixvQkFBRyxLQUFLLFdBQUwsR0FBbUIsS0FBSyxRQUFMLENBQWMsYUFBcEMsRUFBa0Q7QUFDOUMseUJBQUssV0FBTDtBQUNBLHlCQUFLLFdBQUwsR0FBbUIsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxjQUFsQztBQUNBLHlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDSCxpQkFKRCxNQUtJO0FBQ0EseUJBQUssV0FBTCxJQUFvQixDQUFwQjtBQUNIO0FBQ0osYUFURCxNQVVJO0FBQ0Esb0JBQUcsS0FBSyxXQUFMLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3BCLHlCQUFLLFdBQUwsSUFBb0IsQ0FBcEI7QUFDSDtBQUNKOztBQUVEO0FBQ0EsZ0JBQUksOEJBQThCLEtBQUssK0JBQUwsRUFBbEM7QUFDQSxnQkFBRyxLQUFLLFNBQUwsQ0FBZSwyQkFBZixJQUE4QyxJQUFqRCxFQUF1RDtBQUNuRCxxQkFBSyxXQUFMLEdBQW1CLDRCQUE0QixFQUEvQztBQUNBLHFCQUFLLFdBQUwsR0FBbUIsNEJBQTRCLEVBQS9DO0FBQ0gsYUFIRCxNQUlLLElBQUcsSUFBSSxJQUFQLEVBQVk7QUFDYixxQkFBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EscUJBQUssV0FBTCxHQUFtQixFQUFuQjtBQUNIOztBQUVELGdCQUFJLE1BQUksS0FBSyxNQUFMLENBQVksS0FBSyxXQUFqQixFQUE2QixLQUFLLFdBQWxDLEVBQThDLEtBQUssT0FBbkQsQ0FBUjtBQUNBLGdCQUFHLE9BQUssS0FBSyxPQUFiLEVBQ0E7QUFDSSxxQkFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLENBQWQsRUFBZ0IsSUFBaEIsRUFBcUIsVUFBUSxHQUE3QjtBQUNBLHFCQUFLLE9BQUwsR0FBYSxHQUFiO0FBQ0g7QUFDRDtBQUNIOzs7K0JBRUs7QUFDRixtQkFBTyxXQUFXLFdBQVgsRUFBUDtBQUNIOzs7Z0NBRU07QUFDSCxtQkFBTyxXQUFXLFFBQVgsRUFBUDtBQUNIOzs7MERBRWdDO0FBQzdCLGdCQUFJLGVBQWUsR0FBbkI7QUFDQSxnQkFBSSxrQkFBa0IsSUFBdEI7QUFGNkI7QUFBQTtBQUFBOztBQUFBO0FBRzdCLHFDQUF1QixZQUF2Qiw4SEFBb0M7QUFBQSx3QkFBNUIsV0FBNEI7O0FBQ2hDLHdCQUFHLEtBQUssWUFBTCxDQUFrQixXQUFsQixJQUFpQyxZQUFwQyxFQUFpRDtBQUM3Qyx1Q0FBZSxLQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBZjtBQUNBLDBDQUFrQixXQUFsQjtBQUNIO0FBQ0o7O0FBRUQ7QUFWNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXN0IsZ0JBQUcsb0JBQW9CLElBQXZCLEVBQTRCO0FBQ3hCLHVCQUFNO0FBQ0Ysd0JBQUksZ0JBQWdCLElBQWhCLEdBQXVCLEtBQUssSUFEOUI7QUFFRix3QkFBSSxnQkFBZ0IsSUFBaEIsR0FBdUIsS0FBSztBQUY5QixpQkFBTjtBQUlILGFBTEQsTUFNSTtBQUNBLHVCQUFPO0FBQ0gsd0JBQUksQ0FERDtBQUVILHdCQUFJO0FBRkQsaUJBQVA7QUFJSDtBQUNKOzs7c0NBRVk7QUFDVCxpQkFBSyxRQUFMLENBQWMsS0FBZDtBQUNIOzs7aUNBRVEsSyxFQUFNO0FBQ1gsZ0JBQUcsS0FBSyxLQUFMLElBQWMsS0FBakIsRUFBdUI7QUFDbkIscUJBQUssS0FBTCxJQUFjLEtBQWQ7QUFDSCxhQUZELE1BR0k7QUFDQSxxQkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLHlCQUFTLEtBQUssS0FBZDtBQUNBLHFCQUFLLEVBQUwsSUFBVyxLQUFYO0FBQ0g7QUFDSjs7OytCQUVLLENBRUw7Ozt1Q0FFYTtBQUNWLGlCQUFLLEVBQUwsR0FBVSxLQUFLLE1BQWY7QUFDQSxpQkFBSyxLQUFMLEdBQWEsS0FBSyxTQUFsQjs7QUFFQSxpQkFBSyxHQUFMLEdBQVcsSUFBSSxLQUFLLFNBQVQsRUFBWDtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLHdCQUFuQixFQUE0QyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLEVBQXlCLEtBQUssUUFBOUIsQ0FBNUM7QUFDSDs7OztFQW5LNkIsZ0I7O2tCQUFiLEk7Ozs7Ozs7Ozs7O0FDTnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixXOzs7QUFDakIsMkJBQWE7QUFBQTs7QUFBQTtBQUVaOzs7OzBDQUVnQjtBQUNiLGdCQUFJLGNBQWMsRUFBbEI7QUFEYTtBQUFBO0FBQUE7O0FBQUE7QUFFYixxQ0FBdUIsWUFBdkIsOEhBQW9DO0FBQUEsd0JBQTVCLFdBQTRCOztBQUNoQyx3QkFBRyxLQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBSCxFQUFnQztBQUM1QixvQ0FBWSxJQUFaLENBQWlCLFdBQWpCO0FBQ0g7QUFDSjtBQU5ZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBT2Isc0NBQW9CLFNBQXBCLG1JQUE4QjtBQUFBLHdCQUF0QixRQUFzQjs7QUFDMUIsd0JBQUcsS0FBSyxVQUFMLENBQWdCLFFBQWhCLENBQUgsRUFBNkI7QUFDekIsb0NBQVksSUFBWixDQUFpQixRQUFqQjtBQUNIO0FBQ0o7QUFYWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVliLG1CQUFPLFdBQVA7QUFDSDs7O21DQUVVLFMsRUFBVSxDQUVwQjs7O3VEQUU2QjtBQUMxQixnQkFBSSxXQUFXLEtBQUssWUFBTCxDQUFrQixLQUFLLEtBQXZCLEVBQThCLFNBQVMsV0FBdkMsRUFBb0QsU0FBUyxXQUE3RCxDQUFmO0FBQ0EsaUJBQUssRUFBTCxHQUFVLFNBQVMsRUFBbkI7QUFDQSxpQkFBSyxFQUFMLEdBQVUsU0FBUyxFQUFuQjtBQUNBLGlCQUFLLElBQUwsR0FBWSxTQUFTLElBQXJCO0FBQ0EsaUJBQUssSUFBTCxHQUFZLFNBQVMsSUFBckI7O0FBRUEsaUJBQUssVUFBTDtBQUNIOzs7O0VBaENvQyxnQjs7a0JBQXBCLFc7Ozs7Ozs7Ozs7O0FDSHJCOzs7Ozs7Ozs7Ozs7SUFFcUIsa0I7OztBQUNqQixnQ0FBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CO0FBQUE7O0FBQUE7O0FBRWhCLGNBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxjQUFLLElBQUwsR0FBWSxvQkFBWjs7QUFFQTtBQUNBLGNBQUssQ0FBTCxHQUFTLEVBQVQ7QUFDQSxjQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLE1BQUssQ0FBcEMsRUFBdUMsU0FBdkM7QUFDQTtBQUNBLGNBQUssT0FBTCxHQUFlLENBQUMsSUFBSSxLQUFLLFVBQVQsQ0FBb0IsU0FBcEIsRUFBK0IsRUFBL0IsRUFBbUMsQ0FBbkMsRUFBc0MsQ0FBdEMsQ0FBRCxDQUFmO0FBVGdCO0FBVW5COzs7O21DQUVVLFMsRUFBVztBQUNsQixtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsSUFBK0IsRUFBdEM7QUFDSDs7OytCQUVNLEssRUFBTztBQUNWLG9CQUFRLEdBQVIsQ0FBWSwyQkFBWjs7QUFFQSxrQkFBTSxRQUFOLENBQWUsRUFBZjtBQUNIOzs7cUNBRVk7QUFDVCxpQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUVIOzs7O0VBMUIyQyxxQjs7a0JBQTNCLGtCOzs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7Ozs7O0lBRXFCLE87OztBQUNqQix1QkFBYTtBQUFBOztBQUFBOztBQUdULGNBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLGNBQUssVUFBTCxHQUFrQixHQUFsQjtBQUpTO0FBS1o7Ozs7aUNBRU87QUFDSixpQkFBSyxXQUFMLEdBQW1CLEtBQUssb0JBQUwsR0FBNEIsRUFBL0M7QUFDQSxpQkFBSyxXQUFMLEdBQW1CLEtBQUssb0JBQUwsR0FBNEIsRUFBL0M7O0FBRUEsaUJBQUssU0FBTDs7QUFFQSxnQkFBRyxLQUFLLFdBQUwsR0FBbUIsSUFBdEIsRUFBMkI7QUFDdkIscUJBQUssV0FBTCxJQUFvQixDQUFwQjtBQUNIOztBQUVELGdCQUFHLEtBQUssV0FBTCxJQUFvQixLQUFLLFVBQTVCLEVBQXVDO0FBQ25DLHFCQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxxQkFBSyxLQUFMO0FBQ0g7QUFDSjs7O29DQUVVO0FBQ1AsaUJBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxpQkFBSyxFQUFMLEdBQVUsQ0FBVjs7QUFFQSxpQkFBSyxhQUFMLENBQW1CLEtBQUssRUFBeEIsRUFBNEIsS0FBSyxFQUFqQztBQUNIOzs7K0JBRUs7QUFDRix5QkFBYSxNQUFiLENBQW9CLGFBQWEsT0FBYixDQUFxQixJQUFyQixDQUFwQixFQUFnRCxDQUFoRDtBQUVIOzs7dUNBRWE7QUFDVixvQkFBUSxHQUFSLENBQVksZUFBWjtBQUNBLHlCQUFhLElBQWIsQ0FBa0IsSUFBbEI7O0FBRUEsaUJBQUssVUFBTDtBQUNIOzs7K0NBRXFCO0FBQ2xCLG1CQUFPO0FBQ0gsb0JBQUksU0FBUyxJQUFULEdBQWdCLEtBQUssSUFEdEI7QUFFSCxvQkFBSSxTQUFTLElBQVQsR0FBZ0IsS0FBSztBQUZ0QixhQUFQO0FBSUg7Ozs7RUFoRGdDLGdCOztrQkFBaEIsTzs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7Ozs7OztJQUVxQixjOzs7QUFDakIsOEJBQWE7QUFBQTs7QUFBQTtBQUdaOzs7OzBDQUVnQjtBQUNiLGdCQUFJLGNBQWMsRUFBbEI7QUFEYTtBQUFBO0FBQUE7O0FBQUE7QUFFYixxQ0FBb0IsU0FBcEIsOEhBQThCO0FBQUEsd0JBQXRCLFFBQXNCOztBQUMxQix3QkFBRyxLQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBSCxFQUE2QjtBQUN6QixvQ0FBWSxJQUFaLENBQWlCLFFBQWpCO0FBQ0g7QUFDSjtBQU5ZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT2IsZ0JBQUcsS0FBSyxVQUFMLENBQWdCLFFBQWhCLENBQUgsRUFBNkI7QUFDekIsNEJBQVksSUFBWixDQUFpQixRQUFqQjtBQUNIO0FBQ0QsbUJBQU8sV0FBUDtBQUNIOzs7bUNBRVUsUyxFQUFVLENBRXBCOzs7K0JBRU0sTyxFQUFRO0FBQ1gsb0JBQVEsR0FBUixDQUFZLHVCQUFaO0FBRUg7Ozt1REFFNkI7QUFDMUIsaUJBQUssVUFBTDtBQUVIOzs7NkJBRUksUSxFQUFTO0FBQ1YsZ0JBQUksV0FBVyxLQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixTQUFTLFdBQXZDLEVBQW9ELFNBQVMsV0FBN0QsQ0FBZjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxTQUFTLEVBQW5CO0FBQ0EsaUJBQUssRUFBTCxHQUFVLFNBQVMsRUFBbkI7QUFDQSxpQkFBSyxJQUFMLEdBQVksU0FBUyxJQUFyQjtBQUNBLGlCQUFLLElBQUwsR0FBWSxTQUFTLElBQXJCO0FBQ0g7Ozs7RUF2Q3VDLGdCOztrQkFBdkIsYzs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7Ozs7OztJQUVxQixtQjs7O0FBQ2pCLGlDQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBbUI7QUFBQTs7QUFBQTs7QUFFZixjQUFLLElBQUwsR0FBWSxxQkFBWjs7QUFFQSxjQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0EsY0FBSyxFQUFMLEdBQVUsRUFBVjtBQUxlO0FBTWxCOzs7O21DQUVVLFMsRUFBVTtBQUNqQixtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsSUFBK0IsRUFBdEM7QUFDSDs7OytCQUVNLEssRUFBTTtBQUNULG9CQUFRLEdBQVIsQ0FBWSw0QkFBWjs7QUFFQSxrQkFBTSxRQUFOLENBQWUsRUFBZjtBQUNIOzs7cUNBRVc7QUFDUixpQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNBLG9CQUFRLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLEtBQUssRUFBL0I7QUFDSDs7OztFQXRCNEMsd0I7O2tCQUE1QixtQjs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7Ozs7OztJQUVxQixxQjs7O0FBQ2pCLG1DQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0I7QUFBQTs7QUFBQTs7QUFFaEIsY0FBSyxJQUFMLEdBQVksdUJBQVo7O0FBRUEsY0FBSyxFQUFMLEdBQVUsRUFBVjtBQUNBLGNBQUssRUFBTCxHQUFVLEVBQVY7O0FBRUE7QUFDQSxjQUFLLENBQUwsR0FBUyxFQUFUO0FBQ0EsY0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixNQUFLLENBQXBDLEVBQXVDLFNBQXZDO0FBQ0E7QUFDQSxjQUFLLE9BQUwsR0FBZSxDQUFDLElBQUksS0FBSyxVQUFULENBQW9CLFNBQXBCLEVBQStCLEVBQS9CLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBQUQsQ0FBZjtBQVhnQjtBQVluQjs7OzttQ0FFVSxTLEVBQVc7QUFDbEIsbUJBQU8sS0FBSyxZQUFMLENBQWtCLFNBQWxCLElBQStCLEVBQXRDO0FBQ0g7OzsrQkFFTSxLLEVBQU87QUFDVixvQkFBUSxHQUFSLENBQVksOEJBQVo7O0FBRUEsa0JBQU0sUUFBTixDQUFlLEVBQWY7QUFDSDs7O3FDQUVZO0FBQ1QsaUJBQUssRUFBTCxHQUFVLEVBQVY7QUFDQSxvQkFBUSxHQUFSLENBQVksWUFBWixFQUEwQixLQUFLLEVBQS9CO0FBQ0g7Ozs7RUE1QjhDLHdCOztrQkFBOUIscUI7Ozs7Ozs7Ozs7O0FDRnJCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixNOzs7QUFFcEIsaUJBQVksQ0FBWixFQUFjLENBQWQsRUFDQTtBQUFBOztBQUFBOztBQUVDLE1BQ0MsU0FBUyxLQUFLLE1BRGY7QUFBQSxNQUVDLFFBQVEsS0FBSyxLQUZkO0FBR0EsUUFBSyxDQUFMLEdBQU8sQ0FBUDtBQUNBLFFBQUssQ0FBTCxHQUFPLENBQVA7O0FBRUEsT0FBSyxLQUFMLENBQVcsUUFBWDtBQUNBLFFBQUssSUFBTCxDQUFVLENBQVYsRUFBWSxDQUFaO0FBQ0EsUUFBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLENBQVg7QUFDQSxRQUFLLE9BQUw7QUFYRDtBQVlDOzs7OzRCQUdEO0FBQ0MsT0FDQyxXQUFTLEtBQUssUUFEZjtBQUFBLE9BRUMsWUFBVSxLQUFLLFNBRmhCO0FBQUEsT0FHQyxVQUFRLEtBQUssT0FIZDtBQUFBLE9BSUMsUUFBTSxLQUFLLEtBSlo7QUFBQSxPQUtDLFVBQVEsS0FBSyxPQUxkO0FBTUEsUUFBSyxRQUFMLEdBQWMsSUFBSSxRQUFKLEVBQWQ7QUFDQSxRQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLDJCQUF4QixFQUFxRCxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLFFBQVEsS0FBNUIsRUFBbUMsUUFBUSxNQUEzQyxDQUFyRCxFQUF3RyxRQUFRLE1BQVIsQ0FBZSxJQUFmLEVBQW9CLEtBQUssV0FBekIsQ0FBeEc7QUFDQTs7O2dDQUdEO0FBQ0MsV0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLE9BQU0sUUFBTSxLQUFLLEtBQWpCO0FBQ0EsUUFBSyxLQUFMLENBQVcsRUFBWCxDQUFjLE1BQU0sUUFBcEIsRUFBNkIsSUFBN0IsRUFBa0MsS0FBSyxTQUF2QztBQUNBLFFBQUssS0FBTCxDQUFXLEVBQVgsQ0FBYyxNQUFNLFVBQXBCLEVBQStCLElBQS9CLEVBQW9DLEtBQUssV0FBekM7QUFDQSxRQUFLLEtBQUwsQ0FBVyxFQUFYLENBQWMsTUFBTSxVQUFwQixFQUErQixJQUEvQixFQUFvQyxLQUFLLFdBQXpDO0FBQ0EsUUFBSyxLQUFMLENBQVcsRUFBWCxDQUFjLE1BQU0sU0FBcEIsRUFBOEIsSUFBOUIsRUFBbUMsS0FBSyxTQUF4Qzs7QUFFQSxRQUFLLEdBQUwsR0FBUyxJQUFJLGVBQUosQ0FBVSxLQUFLLENBQUwsR0FBTyxDQUFqQixFQUFtQixLQUFLLENBQUwsR0FBTyxDQUFQLEdBQVMsQ0FBNUIsRUFBOEIsS0FBSyxDQUFMLEdBQU8sRUFBckMsQ0FBVDtBQUNNLFFBQUssR0FBTCxHQUFTLElBQUksZUFBSixDQUFVLEtBQUssQ0FBTCxHQUFPLENBQVAsR0FBUyxDQUFuQixFQUFxQixLQUFLLENBQUwsR0FBTyxDQUFQLEdBQVMsQ0FBOUIsRUFBZ0MsS0FBSyxDQUFMLEdBQU8sRUFBdkMsQ0FBVDtBQUNOLFFBQUssR0FBTCxDQUFTLEtBQVQsR0FBZSxHQUFmOztBQUVBLFVBQU8sUUFBUCxHQUFrQixLQUFLLElBQUwsQ0FBVSxjQUFWLENBQXlCLE1BQXpCLEVBQWlDLGNBQWpDLENBQWxCO0FBQ0EsWUFBUyxVQUFUOztBQUVBO0FBQ0EsUUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixDQUFyQixFQUF3QixJQUF4QixFQUE4QixLQUFLLE9BQW5DOztBQUVBLE9BQUksZ0JBQWdCLElBQUksZ0JBQUosRUFBcEI7QUFDQSxpQkFBYyxVQUFkO0FBQ0EsaUJBQWMsSUFBZCxHQUFxQixHQUFyQjtBQUNBLGlCQUFjLElBQWQsR0FBcUIsR0FBckI7O0FBRUEsUUFBSyxVQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLGNBQWQsQ0FBNkIsTUFBN0IsQ0FBaEI7QUFDQTs7OzRCQUVTO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ1QseUJBQXdCLFlBQXhCLDhIQUFzQztBQUFBLFNBQTdCLFdBQTZCOztBQUNyQyxpQkFBWSxPQUFaO0FBQ0E7QUFIUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUlULDBCQUF1QixXQUF2QixtSUFBb0M7QUFBQSxTQUEzQixVQUEyQjs7QUFDbkMsZ0JBQVcsT0FBWDtBQUNBO0FBTlE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFPVCwwQkFBcUIsU0FBckIsbUlBQWdDO0FBQUEsU0FBdkIsUUFBdUI7O0FBQy9CLGNBQVMsT0FBVDtBQUNBO0FBVFE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFVVCwwQkFBc0IsVUFBdEIsbUlBQWtDO0FBQUEsU0FBekIsU0FBeUI7O0FBQ2pDLGVBQVUsT0FBVjtBQUNBO0FBWlE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjVCxZQUFTLE9BQVQ7QUFDQSxZQUFTLEdBQVQsQ0FBYSxLQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQXlCLENBQXRDLEVBQXdDLEtBQUssT0FBTCxDQUFhLFlBQWIsR0FBMEIsQ0FBbEU7QUFDQSxRQUFLLFFBQUwsQ0FBYyxjQUFkLENBQTZCLFNBQVMsSUFBVCxHQUFjLEtBQUssT0FBTCxDQUFhLFdBQWIsR0FBeUIsQ0FBcEUsRUFBc0UsU0FBUyxJQUFULEdBQWMsS0FBSyxPQUFMLENBQWEsWUFBYixHQUEwQixDQUE5RyxFQUFnSCxLQUFLLE9BQUwsQ0FBYSxXQUE3SCxFQUF5SSxLQUFLLE9BQUwsQ0FBYSxZQUF0SjtBQUNBOzs7OEJBRVcsQyxFQUFFO0FBQ2IsT0FBRyxDQUFDLEtBQUssR0FBTCxDQUFTLENBQVQsR0FBVyxFQUFFLE1BQWQsS0FBdUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxHQUFXLEVBQUUsTUFBcEMsSUFBNEMsQ0FBQyxLQUFLLEdBQUwsQ0FBUyxDQUFULEdBQVcsRUFBRSxNQUFkLEtBQXVCLEtBQUssR0FBTCxDQUFTLENBQVQsR0FBVyxFQUFFLE1BQXBDLENBQTVDLElBQXlGLEtBQUssR0FBTCxDQUFTLENBQVQsR0FBVyxLQUFLLEdBQUwsQ0FBUyxDQUFoSCxFQUNBO0FBQ0MsU0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixDQUFyQjtBQUNBLElBSEQsTUFJSyxJQUFHLENBQUMsS0FBSyxHQUFMLENBQVMsQ0FBVCxHQUFXLEVBQUUsTUFBZCxLQUF1QixLQUFLLEdBQUwsQ0FBUyxDQUFULEdBQVcsRUFBRSxNQUFwQyxJQUE0QyxDQUFDLEtBQUssR0FBTCxDQUFTLENBQVQsR0FBVyxFQUFFLE1BQWQsS0FBdUIsS0FBSyxHQUFMLENBQVMsQ0FBVCxHQUFXLEVBQUUsTUFBcEMsQ0FBNUMsSUFBeUYsS0FBSyxHQUFMLENBQVMsQ0FBVCxHQUFXLEtBQUssR0FBTCxDQUFTLENBQWhILEVBQ0w7QUFDQyxTQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLENBQXJCO0FBQ0E7QUFDRDs7OzRCQUNTLEMsRUFDVjtBQUNDLE9BQUcsS0FBSyxHQUFMLENBQVMsRUFBVCxJQUFhLEVBQUUsT0FBbEIsRUFDQTtBQUNDLFNBQUssR0FBTCxDQUFTLFVBQVQ7QUFDQSxJQUhELE1BSUssSUFBRyxLQUFLLEdBQUwsQ0FBUyxFQUFULElBQWEsRUFBRSxPQUFsQixFQUNMO0FBQ0MsU0FBSyxHQUFMLENBQVMsVUFBVDtBQUNBO0FBQ0Q7Ozs4QkFDVyxDLEVBQ1o7QUFDQyxPQUFHLEtBQUssR0FBTCxDQUFTLEVBQVQsSUFBYSxFQUFFLE9BQWxCLEVBQ0E7QUFDQyxTQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEVBQUUsTUFBbEIsRUFBeUIsRUFBRSxNQUEzQjtBQUNBLElBSEQsTUFJSyxJQUFHLEtBQUssR0FBTCxDQUFTLEVBQVQsSUFBYSxFQUFFLE9BQWxCLEVBQ0w7QUFDQyxTQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLEVBQUUsTUFBbEIsRUFBeUIsRUFBRSxNQUEzQjtBQUNBO0FBQ0Q7OztnQ0FHRDtBQUNPLFVBQU87QUFDSCxPQUFJLEtBQUssR0FBTCxDQUFTLEVBQVQsQ0FBWSxDQUFaLEdBQWdCLEtBQUssR0FBTCxDQUFTLENBRDFCO0FBRUgsT0FBSSxLQUFLLEdBQUwsQ0FBUyxFQUFULENBQVksQ0FBWixHQUFnQixLQUFLLEdBQUwsQ0FBUztBQUYxQixJQUFQO0FBSU47Ozs2QkFHRDtBQUNPLFVBQU8sS0FBSyxHQUFMLENBQVMsRUFBVCxLQUFnQixJQUF2QjtBQUNOOzs7MEJBRU8sSSxFQUFLLEksRUFDYjtBQUNDLE9BQU0sSUFBRSxLQUFLLEtBQUwsQ0FBVyxPQUFLLEVBQWhCLENBQVI7QUFDQSxPQUFNLElBQUUsS0FBSyxLQUFMLENBQVcsT0FBSyxFQUFoQixDQUFSO0FBQ0EsT0FBTSxRQUFNLEtBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsQ0FBOUIsQ0FBWjtBQUNBLE9BQU0sSUFBRSxNQUFNLFdBQU4sQ0FBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsQ0FBUjs7QUFFQSxPQUFJLE1BQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixRQUF4QixDQUFpQyxDQUFqQyxFQUFvQyxLQUFwQyxDQUEwQyxJQUFFLENBQTVDLEVBQStDLFVBQS9DLENBQTBELENBQTFELEVBQTZELEtBQXJFO0FBQ0EsV0FBUSxHQUFSLENBQVksR0FBWjtBQUNBLFVBQU8sR0FBUDtBQUNBOzs7O0VBbklrQyxLQUFLLE0sQ0FBUTs7O2tCQUE1QixNOzs7Ozs7Ozs7OztBQ05yQjs7Ozs7Ozs7Ozs7O0lBRXFCLEs7OztBQUNqQixxQkFBYTtBQUFBOztBQUFBOztBQUVULGNBQUssUUFBTCxHQUFnQixVQUFoQjtBQUZTO0FBR1o7Ozs7aUNBRU87QUFDSixnQkFBRyxrQkFBSCxFQUFzQjtBQUNsQixxQkFBSyxZQUFMO0FBQ0Esb0JBQUcsS0FBSyxlQUFMLEVBQUgsRUFBMEI7QUFDdEIseUJBQUssTUFBTDtBQUNIO0FBQ0osYUFMRCxNQU1JO0FBQ0EscUJBQUssYUFBTDtBQUVIO0FBQ0o7OzsrQkFFSztBQUNGLHVCQUFXLE1BQVgsQ0FBa0IsWUFBWSxPQUFaLENBQW9CLElBQXBCLENBQWxCO0FBRUg7Ozt1Q0FFYTtBQUNWOzs7QUFHSDs7O3dDQUVjO0FBQ1g7OztBQUdIOzs7MkNBRWlCO0FBQ2QsbUJBQU8sS0FBUDtBQUNIOzs7MENBRWdCO0FBQ2I7Ozs7Ozs7OztBQVNIOzs7aUNBRU8sQ0FFUDs7O3VDQUdhO0FBQ1Ysb0JBQVEsR0FBUixDQUFZLGVBQVo7QUFDQSx1QkFBVyxJQUFYLENBQWdCLElBQWhCOztBQUVBLGlCQUFLLFVBQUw7QUFDSDs7OztFQTlEOEIsZ0I7O2tCQUFkLEs7Ozs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7Ozs7SUFFcUIsSTs7O0FBQ2pCLGtCQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBMkI7QUFBQTs7QUFBQTs7QUFFdkIsY0FBSyxJQUFMLEdBQVksTUFBWjs7QUFFQSxjQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0EsY0FBSyxFQUFMLEdBQVUsRUFBVjtBQUNBLGNBQUssRUFBTCxHQUFVLEVBQVY7QUFDQSxjQUFLLEVBQUwsR0FBVSxFQUFWO0FBUHVCO0FBUTFCOzs7O2lDQUVPLENBRVA7OzsrQkFFSyxDQUVMOzs7cUNBRVc7QUFDUixpQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNIOzs7O0VBckI2QixnQjs7a0JBQWIsSTs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7Ozs7OztJQUVxQixLOzs7QUFFcEIsZ0JBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFDQTtBQUFBOztBQUFBOztBQUVDLE1BQ0MsU0FBUyxLQUFLLE1BRGY7QUFBQSxNQUVDLFFBQVEsS0FBSyxLQUZkO0FBR0EsT0FBSyxLQUFMLENBQVcsUUFBWDs7QUFFQSxRQUFLLElBQUwsQ0FBVSxJQUFFLENBQVosRUFBYyxJQUFFLENBQWhCO0FBQ0EsUUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWI7QUFDQSxRQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLFNBQS9CO0FBQ0EsUUFBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLENBQVg7QUFDQSxRQUFLLENBQUwsR0FBTyxDQUFQO0FBQ00sUUFBSyxFQUFMLEdBQVEsSUFBUjtBQUNBLFFBQUssS0FBTCxHQUFXLEdBQVg7QUFDTixRQUFLLFlBQUwsR0FBa0IsSUFBbEI7QUFDQSxRQUFLLEtBQUw7QUFmRDtBQWdCQzs7OzswQkFHRDtBQUNDLFFBQUssRUFBTCxHQUFRLElBQUksbUJBQUosQ0FBYyxLQUFLLENBQW5CLEVBQXFCLEtBQUssQ0FBMUIsRUFBNEIsS0FBSyxDQUFMLEdBQU8sQ0FBbkMsQ0FBUjtBQUNBOzs7OEJBRVcsQyxFQUFFO0FBQ2IsUUFBSyxFQUFMLEdBQVEsRUFBRSxPQUFWO0FBQ0EsUUFBSyxNQUFMLENBQVksRUFBRSxNQUFkLEVBQXFCLEVBQUUsTUFBdkI7QUFDQTs7OytCQUdEO0FBQ0MsUUFBSyxFQUFMLEdBQVEsSUFBUjtBQUNBLFFBQUssRUFBTCxDQUFRLEdBQVIsQ0FBWSxLQUFLLENBQWpCLEVBQW1CLEtBQUssQ0FBeEI7QUFDQTs7O3lCQUVNLEMsRUFBRSxDLEVBQ1Q7QUFDQztBQUNBLE9BQUksS0FBRyxJQUFFLEtBQUssQ0FBZDtBQUNBLE9BQUksS0FBRyxJQUFFLEtBQUssQ0FBZDs7QUFFQSxPQUFJLElBQUUsS0FBSyxJQUFMLENBQVUsS0FBRyxFQUFILEdBQU0sS0FBRyxFQUFuQixDQUFOO0FBQ0EsT0FBSSxNQUFJLElBQUUsS0FBSyxDQUFQLEdBQVUsS0FBRyxLQUFLLENBQVIsR0FBVSxDQUFwQixHQUF1QixFQUEvQjtBQUNBLE9BQUksTUFBSSxJQUFFLEtBQUssQ0FBUCxHQUFVLEtBQUcsS0FBSyxDQUFSLEdBQVUsQ0FBcEIsR0FBdUIsRUFBL0I7QUFDQSxRQUFLLEVBQUwsQ0FBUSxHQUFSLENBQVksS0FBSyxDQUFMLEdBQU8sR0FBbkIsRUFBdUIsS0FBSyxDQUFMLEdBQU8sR0FBOUI7QUFDQTs7OztFQS9DaUMsS0FBSyxNOztrQkFBbkIsSzs7Ozs7Ozs7Ozs7QUNGckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCLEk7OztBQUNqQixvQkFBYTtBQUFBOztBQUdUO0FBSFM7O0FBSVQsY0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQTtBQUNBLGNBQUssTUFBTCxHQUFjLEdBQWQ7QUFDQSxjQUFLLEVBQUwsR0FBVSxHQUFWO0FBQ0EsY0FBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsY0FBSyxLQUFMLEdBQWEsRUFBYjs7QUFFQTtBQUNBLGNBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNBLGNBQUssYUFBTCxHQUFxQixLQUFyQjs7QUFFQSxjQUFLLENBQUwsR0FBUyxFQUFUO0FBQ0EsY0FBSyxDQUFMLEdBQVMsRUFBVDs7QUFFQSxjQUFLLFFBQUwsR0FBZ0IsSUFBSSxLQUFLLElBQUwsQ0FBVSxjQUFkLENBQTZCLFlBQTdCLEVBQTJDLG9CQUEzQyxDQUFoQjtBQUNBLGNBQUssUUFBTCxDQUFjLFVBQWQ7QUFDQSxjQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFyQlM7QUFzQlo7Ozs7bUNBR0Q7QUFDSSxvQkFBUSxHQUFSLENBQVksU0FBWjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQUssR0FBekI7QUFDQSxpQkFBSyxHQUFMLENBQVMsUUFBVCxHQUFrQixHQUFsQjtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsS0FBSyxDQUFsQixFQUFvQixLQUFLLENBQXpCO0FBQ0EsaUJBQUssR0FBTCxDQUFTLEtBQVQsR0FBZSxDQUFmOztBQUVBLGlCQUFLLFNBQUwsQ0FBZSxZQUFmLENBQTRCLEtBQUssT0FBTCxDQUFhLFVBQWIsRUFBd0IsQ0FBeEIsQ0FBNUIsRUFBdUQsU0FBdkQ7QUFDQSxpQkFBSyxTQUFMLENBQWUsWUFBZixDQUE0QixLQUFLLE9BQUwsQ0FBYSxZQUFiLEVBQTBCLENBQTFCLENBQTVCLEVBQXlELFdBQXpEO0FBQ0EsaUJBQUssU0FBTCxDQUFlLFlBQWYsQ0FBNEIsS0FBSyxPQUFMLENBQWEsWUFBYixFQUEwQixDQUExQixDQUE1QixFQUF5RCxXQUF6RDtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxZQUFmLENBQTRCLEtBQUssT0FBTCxDQUFhLGFBQWIsRUFBMkIsQ0FBM0IsQ0FBNUIsRUFBMEQsWUFBMUQ7QUFDQSxpQkFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLENBQWQsRUFBZ0IsSUFBaEIsRUFBcUIsWUFBckI7QUFDQSxpQkFBSyxPQUFMLEdBQWEsT0FBYjtBQUNIOzs7aUNBRU87QUFDSjtBQUNBLGdCQUFJLEtBQUssS0FBSyxJQUFMLEdBQVksQ0FBckI7QUFDQSxnQkFBSSxLQUFLLEtBQUssSUFBTCxHQUFZLENBQXJCOztBQUVBLGtCQUFNLEVBQU47QUFDQSxrQkFBTSxFQUFOOztBQUVBO0FBQ0EsZ0JBQUksSUFBSSxLQUFLLElBQUwsQ0FBVSxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQXpCLENBQVI7QUFDQSxnQkFBSSxJQUFJLElBQVIsRUFBYTtBQUNUO0FBQ0Esb0JBQUksVUFBUyxLQUFLLEtBQUwsR0FBYSxDQUExQjtBQUNBLG9CQUFHLFVBQVUsQ0FBYixFQUFlO0FBQ1gsOEJBQVUsQ0FBVjtBQUNIOztBQUVELHFCQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUF4QixFQUFpQyxLQUFLLE9BQXRDO0FBQ0g7QUFDRDs7QUFFQTs7QUFFQTtBQUNBLGdCQUFHLEtBQUssS0FBTCxNQUFnQixLQUFLLFdBQUwsSUFBb0IsQ0FBcEMsSUFBeUMsQ0FBQyxLQUFLLGFBQWxELEVBQWdFO0FBQzVELHFCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDSDs7QUFFRCxnQkFBRyxLQUFLLGFBQVIsRUFBc0I7QUFDbEIsb0JBQUcsS0FBSyxXQUFMLEdBQW1CLEtBQUssUUFBTCxDQUFjLGFBQXBDLEVBQWtEO0FBQzlDLHlCQUFLLFdBQUw7QUFDQSx5QkFBSyxXQUFMLEdBQW1CLENBQUMsS0FBSyxRQUFMLENBQWMsY0FBbEM7QUFDQSx5QkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0gsaUJBSkQsTUFLSTtBQUNBLHlCQUFLLFdBQUwsSUFBb0IsQ0FBcEI7QUFDSDtBQUNKLGFBVEQsTUFVSTtBQUNBLG9CQUFHLEtBQUssV0FBTCxHQUFtQixDQUF0QixFQUF3QjtBQUNwQix5QkFBSyxXQUFMLElBQW9CLENBQXBCO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLGdCQUFJLDhCQUE4QixLQUFLLCtCQUFMLEVBQWxDO0FBQ0EsZ0JBQUcsS0FBSyxTQUFMLENBQWUsMkJBQWYsSUFBOEMsSUFBakQsRUFBdUQ7QUFDbkQscUJBQUssV0FBTCxHQUFtQiw0QkFBNEIsRUFBL0M7QUFDQSxxQkFBSyxXQUFMLEdBQW1CLDRCQUE0QixFQUEvQztBQUNILGFBSEQsTUFJSyxJQUFHLElBQUksSUFBUCxFQUFZO0FBQ2IscUJBQUssV0FBTCxHQUFtQixFQUFuQjtBQUNBLHFCQUFLLFdBQUwsR0FBbUIsRUFBbkI7QUFDSDs7QUFFRCxnQkFBSSxNQUFJLEtBQUssTUFBTCxDQUFZLEtBQUssV0FBakIsRUFBNkIsS0FBSyxXQUFsQyxFQUE4QyxLQUFLLE9BQW5ELENBQVI7QUFDQSxnQkFBRyxPQUFLLEtBQUssT0FBYixFQUNBO0FBQ0kscUJBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxDQUFkLEVBQWdCLElBQWhCLEVBQXFCLFVBQVEsR0FBN0I7QUFDQSxxQkFBSyxPQUFMLEdBQWEsR0FBYjtBQUNIO0FBQ0Q7QUFDSDs7OytCQUVLO0FBQ0YsbUJBQU8sV0FBVyxXQUFYLEVBQVA7QUFDSDs7O2dDQUVNO0FBQ0gsbUJBQU8sV0FBVyxRQUFYLEVBQVA7QUFDSDs7OzBEQUVnQztBQUM3QixnQkFBSSxlQUFlLEdBQW5CO0FBQ0EsZ0JBQUksa0JBQWtCLElBQXRCO0FBRjZCO0FBQUE7QUFBQTs7QUFBQTtBQUc3QixxQ0FBdUIsWUFBdkIsOEhBQW9DO0FBQUEsd0JBQTVCLFdBQTRCOztBQUNoQyx3QkFBRyxLQUFLLFlBQUwsQ0FBa0IsV0FBbEIsSUFBaUMsWUFBcEMsRUFBaUQ7QUFDN0MsdUNBQWUsS0FBSyxZQUFMLENBQWtCLFdBQWxCLENBQWY7QUFDQSwwQ0FBa0IsV0FBbEI7QUFDSDtBQUNKOztBQUVEO0FBVjZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVzdCLGdCQUFHLG9CQUFvQixJQUF2QixFQUE0QjtBQUN4Qix1QkFBTTtBQUNGLHdCQUFJLGdCQUFnQixJQUFoQixHQUF1QixLQUFLLElBRDlCO0FBRUYsd0JBQUksZ0JBQWdCLElBQWhCLEdBQXVCLEtBQUs7QUFGOUIsaUJBQU47QUFJSCxhQUxELE1BTUk7QUFDQSx1QkFBTztBQUNILHdCQUFJLENBREQ7QUFFSCx3QkFBSTtBQUZELGlCQUFQO0FBSUg7QUFDSjs7O3NDQUVZO0FBQ1QsaUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7O2lDQUVRLEssRUFBTTtBQUNYLGdCQUFHLEtBQUssS0FBTCxJQUFjLEtBQWpCLEVBQXVCO0FBQ25CLHFCQUFLLEtBQUwsSUFBYyxLQUFkO0FBQ0gsYUFGRCxNQUdJO0FBQ0EscUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSx5QkFBUyxLQUFLLEtBQWQ7QUFDQSxxQkFBSyxFQUFMLElBQVcsS0FBWDtBQUNIO0FBQ0o7OzsrQkFFSyxDQUVMOzs7dUNBRWE7QUFDVixpQkFBSyxFQUFMLEdBQVUsS0FBSyxNQUFmO0FBQ0EsaUJBQUssS0FBTCxHQUFhLEtBQUssU0FBbEI7O0FBRUEsaUJBQUssR0FBTCxHQUFXLElBQUksS0FBSyxTQUFULEVBQVg7QUFDQSxpQkFBSyxHQUFMLENBQVMsU0FBVCxDQUFtQix3QkFBbkIsRUFBNEMsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixFQUF5QixLQUFLLFFBQTlCLENBQTVDO0FBQ0g7Ozs7RUFuSzZCLGdCOztrQkFBYixJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7vy8vIOWfuuehgOeahOexu1xyXG5pbXBvcnQgQmVpbmdzIGZyb20gXCIuL3NjcmlwdC9CZWluZ3NcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9CdWxsZXRcIlxyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9zY3JpcHQvSGVyb1wiXHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyXCJcclxuaW1wb3J0IFRoaW5nIGZyb20gXCIuL3NjcmlwdC9UaGluZ1wiXHJcbmltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvSGVyb19CdWxsZXRcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXQgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0XCJcclxuaW1wb3J0IEdhdGUgZnJvbSBcIi4vc2NyaXB0L0dhdGVcIlxyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi9zY3JpcHQvV2FsbFwiXHJcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vc2NyaXB0L1NjcmVlblwiXHJcbmltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vc2NyaXB0L0RyYWdQb2ludFwiXHJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxyXG5cclxuLy8g5omp5YWF55qE57G7XHJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcclxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9zY3JpcHQvTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCJcclxuaW1wb3J0IEdvYmxpbiBmcm9tIFwiLi9zY3JpcHQvR29ibGluXCJcclxuXHJcbmNvbnN0XHJcblx0QnJvd3NlciA9IExheWEuQnJvd3NlcixcclxuXHRXZWJHTCA9IExheWEuV2ViR0wsXHJcblx0U3RhZ2UgPSBMYXlhLlN0YWdlLFxyXG5cdFN0YXQgPSBMYXlhLlN0YXQsXHJcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuXHJcbi8v5Yid5aeL5YyW5byV5pOOXHJcbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG5cclxuLy/mqKrlsY/muLjmiI9cclxuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG4vL+etieavlOS+i+e8qeaUvlxyXG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XHJcblxyXG4vL+iDjOaZr+minOiJslxyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcclxuXHJcbi8vIHNldCB0aGUgU2NyZWVuXHJcbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcclxubGV0IGggPSBCcm93c2VyLmNsaWVudEhlaWdodDtcclxuXHJcbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG5MYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuXHJcblN0YXQuc2hvdygpO1xyXG5cclxud2luZG93LnRoZV9zY3JlZW4gPSBuZXcgU2NyZWVuKHcsIGgpO1xyXG5cclxuLy8g6KeS6Imy5a655ZmoXHJcbndpbmRvdy5Nb25zdGVyX2xpc3QgPSBbXTtcclxud2luZG93LkJ1bGxldF9saXN0ID0gW107XHJcbndpbmRvdy5XYWxsX2xpc3QgPSBbXTtcclxud2luZG93LlRoaW5nX2xpc3QgPSBbXTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCZWluZ3MgZXh0ZW5kcyBMYXlhLlNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAxO1xyXG4gICAgICAgIHRoaXMubWFwWCA9IDEwMDtcclxuICAgICAgICB0aGlzLm1hcFkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkJlaW5nc1wiO1xyXG4gICAgICAgIHRoaXMudyA9IDUwO1xyXG4gICAgICAgIHRoaXMuaCA9IDUwO1xyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gMTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICByb290X3Jlc2V0KCl7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnBpdm90KHRoaXMudyAvIDIsIHRoaXMuaCAvMilcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJvb3RfcmVzZXQhXCIpXHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX3Jlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBfZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLm1hcFkgLSB0aGVfSGVyby5tYXBZICsgTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yO1xyXG5cclxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhZF9hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZF9hY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVhZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCZWluZ3MgYWN0aW9uXCIpXHJcbiAgICB9XHJcblxyXG4gICAgZGwoZHgsIGR5KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoZV9vYmplY3QuZHggKiB0aGVfb2JqZWN0LmR4ICsgdGhlX29iamVjdC5keSAqIHRoZV9vYmplY3QuZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9kaXN0YW5jZShhbm90aGVyKXtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLm1hcFggLSBhbm90aGVyLm1hcFg7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRsKGR4LCBkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X3ZlY3Rvcl92KHZfbWF4LCB0aGVfdngsIHRoZV92eSl7XHJcbiAgICAgICAgbGV0IHRoZV92ID0gdGhpcy5kbCh0aGVfdngsIHRoZV92eSk7XHJcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiB0aGVfdnggKiB2X21heC90aGVfdixcclxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIHZ4OiAwLFxyXG4gICAgICAgICAgICAgICAgdnk6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVUkxzKHN0cixuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzPVtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDtpPG47aSs9MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChcInJlc1xcXFxhdGxhc1xcXFxcIitzdHIraStcIi5wbmdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlyKGR4LGR5LGxhc3Qpe1xyXG4gICAgICAgIGlmKGR4PmR5JiZkeD4tZHkpcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICBpZigtZHg+ZHkmJi1keD4tZHkpcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIGlmKGR5PmR4JiZkeT4tZHgpcmV0dXJuIFwiZG93blwiO1xyXG4gICAgICAgIGlmKC1keT5keCYmLWR5Pi1keClyZXR1cm4gXCJ1cFwiO1xyXG4gICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWNoYWJsZShuZXdfbWFwWCwgbmV3X21hcFkpe1xyXG4gICAgICAgIGxldCBwb2ludF9zZXQgPSBbXTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLncvMiwgeTogbmV3X21hcFkgKyB0aGlzLmgvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCwgeTogbmV3X21hcFkgKyB0aGlzLmgvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCAtIHRoaXMudy8yLCB5OiBuZXdfbWFwWSArIHRoaXMuaC8yfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53LzIsIHk6IG5ld19tYXBZfSk7XHJcbiAgICAgICAgcG9pbnRfc2V0LnB1c2goe3g6IG5ld19tYXBYIC0gdGhpcy53LzIsIHk6IG5ld19tYXBZIC0gdGhpcy5oLzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFgsIHk6IG5ld19tYXBZIC0gdGhpcy5oLzJ9KTtcclxuICAgICAgICBwb2ludF9zZXQucHVzaCh7eDogbmV3X21hcFggKyB0aGlzLncvMiwgeTogbmV3X21hcFkgLSB0aGlzLmgvMn0pO1xyXG4gICAgICAgIHBvaW50X3NldC5wdXNoKHt4OiBuZXdfbWFwWCArIHRoaXMudy8yLCB5OiBuZXdfbWFwWX0pO1xyXG5cclxuICAgICAgICBsZXQgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IobGV0IHRoZV9wb2ludCBvZiBwb2ludF9zZXQpe1xyXG4gICAgICAgICAgICBvayAmPSB0aGVfc2NyZWVuLmdldFBhc3ModGhlX3BvaW50LngsIHRoZV9wb2ludC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVfYnlfZHhfZHkoZHgsIGR5KXtcclxuICAgICAgICB3aGlsZShNYXRoLmFicyhkeCkgPiAwLjMgfHwgTWF0aC5hYnMoZHkpID4gMC4zKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIuLi5cIilcclxuICAgICAgICAgICAgLy8gdHJ5OiBtb3ZlIHhcclxuICAgICAgICAgICAgaWYoZHggPiAwLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYICsgMC4zLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeCAtPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBYICs9IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkeCA8IC0wLjEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFjaGFibGUodGhpcy5tYXBYIC0gMC4zLCB0aGlzLm1hcFkpKXtcclxuICAgICAgICAgICAgICAgICAgICBkeCArPSAwLjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBYIC09IDAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB0cnk6IG1vdmUgeVxyXG4gICAgICAgICAgICBpZihkeSA+IDAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSArIDAuMykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR5IC09IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFkgKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGR5IDwgLTAuMSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWNoYWJsZSh0aGlzLm1hcFgsIHRoaXMubWFwWSAtIDAuMykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGR5ICs9IDAuMztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFkgLT0gMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkeSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnZ4ID0gMTtcclxuICAgICAgICB0aGlzLnZ5ID0gMTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodGhpcy52eCwgdGhpcy52eSlcclxuXHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gdGhpcy5nZXRfYXR0YWNrX2xpc3QoKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVmb3JlOiBcIitCdWxsZXRfbGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIEJ1bGxldF9saXN0LnNwbGljZShCdWxsZXRfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyOiBcIitCdWxsZXRfbGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMgc2hvdWxkIHJldHVybiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBlbGVtZW50cyB0byBiZSBhdHRhY2tcclxuICAgIGdldF9hdHRhY2tfbGlzdCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cGxvc2lvbihhdHRhY2tfbGlzdCl7XHJcbiAgICAgICAgLy8gZXhwbG9zaW9uICFcclxuICAgICAgICBpZihhdHRhY2tfbGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5IUCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgYXR0YWNrX2xpc3Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0IGF0dGFja1wiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQgMTIzIVwiKVxyXG4gICAgICAgIEJ1bGxldF9saXN0LnB1c2godGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIHRoaXMucG9zKHgseSk7XHJcbiAgICAgICAgdGhpcy5hbHBoYT0wLjI7XHJcblx0XHR0aGlzLnI9cjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0fVxyXG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhdGUgZXh0ZW5kcyBUaGluZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5piv5ZCm5Y675b6A5LiL5LiA5bGC77yfXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlX2l0KCl7XHJcbiAgICAgICAgLy8gZ28gdG8gbmV4dCBmbG9vclxyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvYmxpbiBleHRlbmRzIE1vbnN0ZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJHb2JsaW5cIjtcclxuXHJcbiAgICAgICAgdGhpcy53ID0gNDAwO1xyXG4gICAgICAgIHRoaXMuaCA9IDQwMDtcclxuXHJcbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vb3J6LmpwZ1wiKS5zY2FsZSgwLjQsMC40KTtcclxuICAgIH1cclxuXHJcbiAgICBza2lsbCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAyMDtcclxuICAgIH1cclxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1biBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxMDtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcclxuICAgIH1cclxuICAgIFxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bl9ub3JtYWwgZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gNTA7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5uZXIgZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VubmVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMudyA9IDQwMDtcclxuICAgICAgICB0aGlzLmggPSA0MDA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCIuL29yei5qcGdcIikuc2NhbGUoMC40LDAuNCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiLCBNb25zdGVyX0J1bGxldF9ub3JtYWwpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAzMDA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcclxuaW1wb3J0IEd1bl9ub3JtYWwgZnJvbSBcIi4vR3VuX25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vdmVcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuXHJcbiAgICAgICAgLy8gSFAgYW5kIGFybW9yXHJcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcclxuICAgICAgICB0aGlzLmFybW9yX21heCA9IDEwO1xyXG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcclxuXHJcbiAgICAgICAgLy8gc2hvb3RcclxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMTAwMDtcclxuICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy53ID0gMzI7XHJcbiAgICAgICAgdGhpcy5oID0gNDg7XHJcblxyXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5hbHRlcm5hdGVfZ3VuID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkISEhXCIpXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmFuaSk7XHJcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xyXG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxyXG4gICAgICAgIHRoaXMuYW5pLmluZGV4PTE7XHJcblxyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXHVwXCIsNCksXCJoZXJvX3VwXCIpO1xyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXGRvd25cIiw0KSxcImhlcm9fZG93blwiKTtcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxsZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxccmlnaHRcIiw0KSxcImhlcm9fcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX3JpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cclxuICAgICAgICBsZXQgdnggPSB0aGlzLmdldFYoKS54O1xyXG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XHJcblxyXG4gICAgICAgIHZ4IC89IDEwO1xyXG4gICAgICAgIHZ5IC89IDEwO1xyXG5cclxuICAgICAgICAvLyBtb3ZlbWVudCBjb21tYW5kIGRldGVjdGVkXHJcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xyXG4gICAgICAgIGlmICh2ID4gMUUtNil7XHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHYgPD0gdl9tYXhcclxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xyXG4gICAgICAgICAgICBpZih2X3NjYWxlID4gMSl7XHJcbiAgICAgICAgICAgICAgICB2X3NjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2J5X2R4X2R5KHZ4ICogdl9zY2FsZSwgdnkgKiB2X3NjYWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNob290aW5nIGRlbGF5XHJcbiAgICAgICAgaWYodGhpcy5zaG9vdCgpICYmIHRoaXMuc2hvb3RfcG93ZXIgPj0gMCAmJiAhdGhpcy5zaG9vdF93YWl0aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rfd2FpdGluZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPiB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9ldmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyIDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxyXG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24gPSB0aGlzLmdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IHZ4O1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xyXG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XHJcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuICAgIH1cclxuXHJcbiAgICBnZXRWKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFNob290KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpe1xyXG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbmVhcmVzdF9tb25zdGVyID0gdGhlX21vbnN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcclxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZHg6IDAsXHJcbiAgICAgICAgICAgICAgICBkeTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob290X2V2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldF9oYXJtKHZhbHVlKXtcclxuICAgICAgICBpZih0aGlzLmFybW9yID49IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XHJcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XHJcbiAgICAgICAgICAgIHRoaXMuSFAgLT0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5IUCA9IHRoaXMuSFBfbWF4O1xyXG4gICAgICAgIHRoaXMuYXJtb3IgPSB0aGlzLmFybW9yX21heDtcclxuXHJcbiAgICAgICAgdGhpcy5hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLmFuaS5sb2FkQXRsYXMoXCJyZXMvL2F0bGFzLy9oZXJvLmF0bGFzXCIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCB0aGVfbW9uc3RlciBvZiBNb25zdGVyX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcclxuICAgICAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX21vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgdGhlX3dhbGwgb2YgV2FsbF9saXN0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2thYmxlKHRoZV93YWxsKSl7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCB0aGVfSGVyby5kaXJlY3Rpb25feCwgdGhlX0hlcm8uZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gdGhlX0hlcm8ubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSGVyb19CdWxsZXQgZnJvbSBcIi4vSGVyb19CdWxsZXRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb19CdWxsZXRfbm9ybWFsIGV4dGVuZHMgSGVyb19CdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IodngsIHZ5KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIkhlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5cclxuICAgICAgICAvLyBzZXQgcGljdHVyZVxyXG4gICAgICAgIHRoaXMuciA9IDIwO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiI0ZGRkYwMFwiKTtcclxuICAgICAgICAvL3RoaXMucGl2b3QodGhpcy5yLCB0aGlzLnIpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IFtuZXcgTGF5YS5HbG93RmlsdGVyKFwiI0ZGRkZGRlwiLCAxMCwgMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlcm9fQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XHJcblxyXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuSFAgPSA1MDtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB0aGlzLmdldF9oZXJvX29yaWVudGF0aW9uKCkuZHg7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IHRoaXMuZ2V0X2hlcm9fb3JpZW50YXRpb24oKS5keTtcclxuXHJcbiAgICAgICAgdGhpcy53YW5kZXJpbmcoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3Bvd2VyICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnNraWxsX3Bvd2VyID49IHRoaXMuc2tpbGxfY29zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcG93ZXIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhbmRlcmluZygpe1xyXG4gICAgICAgIHRoaXMudnggPSAxO1xyXG4gICAgICAgIHRoaXMudnkgPSAxO1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodGhpcy52eCwgdGhpcy52eSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIE1vbnN0ZXJfbGlzdC5zcGxpY2UoTW9uc3Rlcl9saXN0LmluZGV4T2YodGhpcyksIDEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcclxuICAgICAgICBNb25zdGVyX2xpc3QucHVzaCh0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldF9oZXJvX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZHg6IHRoZV9IZXJvLm1hcFggLSB0aGlzLm1hcFgsXHJcbiAgICAgICAgICAgIGR5OiB0aGVfSGVyby5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XHJcbiAgICAgICAgbGV0IGF0dGFja19saXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3Qpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcclxuICAgICAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX3dhbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrYWJsZSh0aGVfSGVybykpe1xyXG4gICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9IZXJvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dGFja19saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja2FibGUodGhlX2VuZW15KXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXQgYXR0YWNrXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJyYW5jaF9IZXJvX29yX01vbnN0ZXJfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KGxhdW5jaGVyKXtcclxuICAgICAgICBsZXQgdmVjdG9yX3YgPSB0aGlzLmdldF92ZWN0b3Jfdih0aGlzLnZfbWF4LCBsYXVuY2hlci5kaXJlY3Rpb25feCwgbGF1bmNoZXIuZGlyZWN0aW9uX3kpO1xyXG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XHJcbiAgICAgICAgdGhpcy5tYXBYID0gbGF1bmNoZXIubWFwWDtcclxuICAgICAgICB0aGlzLm1hcFkgPSBsYXVuY2hlci5tYXBZO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcclxuICAgIGNvbnN0cnVjdG9yKHZ4LCB2eSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2h1Z2VcIjtcclxuXHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcclxuICAgIH1cclxuXHJcbiAgICBhdHRhY2soZW5lbXkpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfaHVnZSBhdHRhY2tcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMjApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gNDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyX0J1bGxldF9ub3JtYWwgZXh0ZW5kcyBNb25zdGVyX0J1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsXCI7XHJcblxyXG4gICAgICAgIHRoaXMudnggPSB2eDtcclxuICAgICAgICB0aGlzLnZ5ID0gdnk7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5yID0gMjA7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xyXG4gICAgICAgIC8vdGhpcy5waXZvdCh0aGlzLnIsIHRoaXMucik7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGF0dGFjayhlbmVteSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGF0dGFja1wiKTtcclxuXHJcbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMTApO1xyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5IUCA9IDQwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5IUCA9IFwiLCB0aGlzLkhQKTtcclxuICAgIH1cclxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcclxuaW1wb3J0IFdoZWVsIGZyb20gXCIuL1doZWVsXCJcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vaGVyb1wiXHJcbmltcG9ydCBHb2JsaW4gZnJvbSBcIi4vR29ibGluXCJcclxuaW1wb3J0IEd1bm5lciBmcm9tIFwiLi9HdW5uZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuIGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vc2NyZWVuXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih3LGgpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGNvbnN0IFxyXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcclxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xyXG5cdFx0dGhpcy53PXc7XHJcblx0XHR0aGlzLmg9aDtcclxuXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0dGhpcy5zaXplKHcsaCk7XHJcblx0XHR0aGlzLnBvcygwLDApO1xyXG5cdFx0dGhpcy5sb2FkTWFwKCk7XHJcblx0fVxyXG5cclxuXHRsb2FkTWFwKClcclxuXHR7XHJcblx0XHRjb25zdCBcclxuXHRcdFx0VGlsZWRNYXA9TGF5YS5UaWxlZE1hcCxcclxuXHRcdFx0UmVjdGFuZ2xlPUxheWEuUmVjdGFuZ2xlLFxyXG5cdFx0XHRIYW5kbGVyPUxheWEuSGFuZGxlcixcclxuXHRcdFx0RXZlbnQ9TGF5YS5FdmVudCxcclxuXHRcdFx0QnJvd3Nlcj1MYXlhLkJyb3dzZXI7XHJcblx0XHR0aGlzLnRpbGVkTWFwPW5ldyBUaWxlZE1hcCgpO1xyXG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXNcXFxcdGlsZWRtYXBzXFxcXG1hcDAuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSxIYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWRNYXApKTtcclxuXHR9XHJcblxyXG5cdG9uTG9hZGVkTWFwKClcclxuXHR7XHJcblx0XHRjb25zb2xlLmxvZyhcIm9rXCIpXHJcblx0XHRjb25zdCBFdmVudD1MYXlhLkV2ZW50O1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX09VVCx0aGlzLHRoaXMub25Nb3VzZVVQKTtcclxuXHJcblx0XHR0aGlzLndobD1uZXcgV2hlZWwodGhpcy53LzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xyXG4gICAgICAgIHRoaXMuYXRrPW5ldyBXaGVlbCh0aGlzLncqMy80LHRoaXMuaCozLzQsdGhpcy53LzE1KTtcclxuXHRcdHRoaXMuYXRrLmFscGhhPTAuODtcclxuXHJcblx0XHR3aW5kb3cudGhlX0hlcm8gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJIZXJvXCIsIEhlcm8pO1xyXG5cdFx0dGhlX0hlcm8ucm9vdF9yZXNldCgpO1xyXG5cclxuXHRcdC8vIHRlc3RcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMub25GcmFtZSk7XHJcblxyXG5cdFx0bGV0IG1vbnN0ZXJfdGVzdDEgPSBuZXcgR3VubmVyKCk7XHJcblx0XHRtb25zdGVyX3Rlc3QxLnJvb3RfcmVzZXQoKTtcclxuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWCA9IDUwMDtcclxuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWSA9IDUwMDtcclxuXHJcblx0XHR0aGlzLmxheWVyX3Bhc3M9dGhpcy50aWxlZE1hcC5nZXRMYXllckJ5TmFtZShcInBhc3NcIik7XHJcblx0fVxyXG5cclxuXHRvbkZyYW1lKCkge1xyXG5cdFx0Zm9yIChsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KSB7XHJcblx0XHRcdHRoZV9tb25zdGVyLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHRoZV9idWxsZXQgb2YgQnVsbGV0X2xpc3QpIHtcclxuXHRcdFx0dGhlX2J1bGxldC51cF9kYXRlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCB0aGVfd2FsbCBvZiBXYWxsX2xpc3QpIHtcclxuXHRcdFx0dGhlX3dhbGwudXBfZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgdGhlX3RoaW5nIG9mIFRoaW5nX2xpc3QpIHtcclxuXHRcdFx0dGhlX3RoaW5nLnVwX2RhdGUoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhlX0hlcm8udXBfZGF0ZSgpO1xyXG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMik7XHJcblx0XHR0aGlzLnRpbGVkTWFwLmNoYW5nZVZpZXdQb3J0KHRoZV9IZXJvLm1hcFgtTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLzIsdGhlX0hlcm8ubWFwWS1MYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0LzIsTGF5YS5Ccm93c2VyLmNsaWVudFdpZHRoLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQpXHJcblx0fVxyXG5cclxuXHRvbk1vdXNlRG93bihlKXtcclxuXHRcdGlmKCh0aGlzLndobC54LWUuc3RhZ2VYKSoodGhpcy53aGwueC1lLnN0YWdlWCkrKHRoaXMud2hsLnktZS5zdGFnZVkpKih0aGlzLndobC55LWUuc3RhZ2VZKTw9dGhpcy53aGwucip0aGlzLndobC5yKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLndobC5vblN0YXJ0RHJhZyhlKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoKHRoaXMuYXRrLngtZS5zdGFnZVgpKih0aGlzLmF0ay54LWUuc3RhZ2VYKSsodGhpcy5hdGsueS1lLnN0YWdlWSkqKHRoaXMuYXRrLnktZS5zdGFnZVkpPD10aGlzLmF0ay5yKnRoaXMuYXRrLnIpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RhcnREcmFnKGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRvbk1vdXNlVXAoZSlcclxuXHR7XHJcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLndobC5vblN0b3BEcmFnKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKHRoaXMuYXRrLklEPT1lLnRvdWNoSWQpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuYXRrLm9uU3RvcERyYWcoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b25Nb3VzZU1vdmUoZSlcclxuXHR7XHJcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLndobC5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLmF0ay5JRD09ZS50b3VjaElkKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0VmVsb3NpdHkoKVxyXG5cdHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4IDogdGhpcy53aGwuc3AueCAtIHRoaXMud2hsLngsXHJcbiAgICAgICAgICAgIHkgOiB0aGlzLndobC5zcC55IC0gdGhpcy53aGwueVxyXG4gICAgICAgIH07XHJcblx0fVxyXG5cclxuXHRnZXRTaG9vdCgpXHJcblx0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0ay5JRCAhPT0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldFBhc3MobWFwWCxtYXBZKVxyXG5cdHtcclxuXHRcdGNvbnN0IFg9TWF0aC5mbG9vcihtYXBYLzMyKTtcclxuXHRcdGNvbnN0IFk9TWF0aC5mbG9vcihtYXBZLzMyKTtcclxuXHRcdGNvbnN0IGxheWVyPXRoaXMudGlsZWRNYXAuZ2V0TGF5ZXJCeUluZGV4KDApO1xyXG5cdFx0Y29uc3QgYT1sYXllci5nZXRUaWxlRGF0YShYLFkpO1xyXG5cclxuXHRcdGxldCBhbnM9dGhpcy50aWxlZE1hcC5fanNvbkRhdGEudGlsZXNldHNbMF0udGlsZXNbYS0xXS5wcm9wZXJ0aWVzWzBdLnZhbHVlO1xyXG5cdFx0Y29uc29sZS5sb2coYW5zKVxyXG5cdFx0cmV0dXJuIGFuc1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaGluZyBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlID0gXCLov5jmsqHmnInorr7nva7lj6XlrZDvvIFcIjtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuICAgICAgICBpZihwbGF5ZXJfaXNfbmVhcmJ5KCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNldF9zZW50ZW5jZSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNsaWNrX3RoZV90aGluZygpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlX2l0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5oaWRlX3NlbnRlbmNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWFkKCl7XHJcbiAgICAgICAgVGhpbmdfbGlzdC5zcGxpY2UoQnVsbGV0X2xpc3QuaW5kZXhPZih0aGlzKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9zZW50ZW5jZSgpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZ2FtZS5zZW50ZW5jZSA9IHRoaXMuc2VudGVuY2U7XHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuXHJcbiAgICBoaWRlX3NlbnRlbmNlKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICBnYW1lLnNlbnRlbmNlID0gXCJcIjtcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXllcl9pc19uZWFyYnkoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tfdGhlX3RoaW5nKCl7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihnYW1lLmJ1dHRvbl9jbGlja2VkKXtcclxuICAgICAgICAgICAgZ2FtZS5idXR0b25fY2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIHVzZV9pdCgpe1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXHJcbiAgICAgICAgVGhpbmdfbGlzdC5wdXNoKHRoaXMpXHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsIGV4dGVuZHMgQmVpbmdze1xyXG4gICAgY29uc3RydWN0b3IoeDEsIHgyLCB5MSwgeTIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5UeXBlID0gXCJXYWxsXCI7XHJcblxyXG4gICAgICAgIHRoaXMueDEgPSB4MTtcclxuICAgICAgICB0aGlzLngyID0geDI7XHJcbiAgICAgICAgdGhpcy55MSA9IHkxO1xyXG4gICAgICAgIHRoaXMueTIgPSB5MjtcclxuICAgIH1cclxuXHJcbiAgICBhY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxlYWZfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gMzA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVlbCBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuXHRjb25zdHJ1Y3Rvcih4LHkscilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3QgXHJcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxyXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNpemUoMipyLDIqcik7XHJcblx0XHR0aGlzLnBpdm90KHIscik7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRkZGXCIpO1xyXG5cdFx0dGhpcy5wb3MoeCx5KTtcclxuXHRcdHRoaXMucj1yO1xyXG4gICAgICAgIHRoaXMuSUQ9bnVsbDtcclxuICAgICAgICB0aGlzLmFscGhhPTAuMjtcclxuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XHJcblx0XHR0aGlzLnNldHVwKCk7XHJcblx0fVxyXG5cclxuXHRzZXR1cCgpXHJcblx0e1xyXG5cdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xyXG5cdH1cclxuXHJcblx0b25TdGFydERyYWcoZSl7XHJcblx0XHR0aGlzLklEPWUudG91Y2hJZDtcclxuXHRcdHRoaXMubW92ZVRvKGUuc3RhZ2VYLGUuc3RhZ2VZKTtcclxuXHR9XHJcblxyXG5cdG9uU3RvcERyYWcoKVxyXG5cdHtcclxuXHRcdHRoaXMuSUQ9bnVsbDtcclxuXHRcdHRoaXMuc3AucG9zKHRoaXMueCx0aGlzLnkpXHJcblx0fVxyXG5cclxuXHRtb3ZlVG8oeCx5KVxyXG5cdHtcclxuXHRcdC8vdGhpcy5zcC5wb3MoeCx5KVxyXG5cdFx0bGV0IGR4PXgtdGhpcy54O1xyXG5cdFx0bGV0IGR5PXktdGhpcy55O1xyXG5cclxuXHRcdGxldCBSPU1hdGguc3FydChkeCpkeCtkeSpkeSk7XHJcblx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XHJcblx0XHRsZXQgZHkyPVI+dGhpcy5yPyBkeSp0aGlzLnIvUjogZHk7XHJcblx0XHR0aGlzLnNwLnBvcyh0aGlzLngrZHgyLHRoaXMueStkeTIpXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiO1xyXG5pbXBvcnQgR3VuX25vcm1hbCBmcm9tIFwiLi9HdW5fbm9ybWFsXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCZWluZ3N7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbW92ZVxyXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xyXG5cclxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcclxuICAgICAgICB0aGlzLkhQX21heCA9IDEwMDtcclxuICAgICAgICB0aGlzLkhQID0gMTAwO1xyXG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gMTA7XHJcbiAgICAgICAgdGhpcy5hcm1vdCA9IDEwO1xyXG5cclxuICAgICAgICAvLyBzaG9vdFxyXG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3Rfd2FpdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLncgPSAzMjtcclxuICAgICAgICB0aGlzLmggPSA0ODtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnJvb3RfcmVzZXQoKTtcclxuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQhISFcIilcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKTtcclxuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XHJcbiAgICAgICAgdGhpcy5hbmkucG9zKHRoaXMueCx0aGlzLnkpXHJcbiAgICAgICAgdGhpcy5hbmkuaW5kZXg9MTtcclxuXHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxcdXBcIiw0KSxcImhlcm9fdXBcIik7XHJcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxcZG93blwiLDQpLFwiaGVyb19kb3duXCIpO1xyXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXGxlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcclxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxyaWdodFwiLDQpLFwiaGVyb19yaWdodFwiKTtcclxuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCAtLS0tLS0tLS0vL1xyXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XHJcbiAgICAgICAgbGV0IHZ5ID0gdGhpcy5nZXRWKCkueTtcclxuXHJcbiAgICAgICAgdnggLz0gMTA7XHJcbiAgICAgICAgdnkgLz0gMTA7XHJcblxyXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcclxuICAgICAgICBsZXQgdiA9IE1hdGguc3FydCh2eCAqIHZ4ICsgdnkgKiB2eSk7XHJcbiAgICAgICAgaWYgKHYgPiAxRS02KXtcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxyXG4gICAgICAgICAgICBsZXQgdl9zY2FsZSA9dGhpcy52X21heCAvIHY7XHJcbiAgICAgICAgICAgIGlmKHZfc2NhbGUgPiAxKXtcclxuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vdmVfYnlfZHhfZHkodnggKiB2X3NjYWxlLCB2eSAqIHZfc2NhbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2hvb3RpbmcgZGVsYXlcclxuICAgICAgICBpZih0aGlzLnNob290KCkgJiYgdGhpcy5zaG9vdF9wb3dlciA+PSAwICYmICF0aGlzLnNob290X3dhaXRpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5zaG9vdF93YWl0aW5nKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA+IHRoaXMubWFpbl9ndW4uZmlyc3Rfd2FpdGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG9yaWVudGF0aW9uXHJcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHg7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodiA+IDFFLTYpe1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XHJcbiAgICAgICAgaWYoZGlyIT10aGlzLnByZV9kaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVfZGlyPWRpcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xyXG4gICAgfVxyXG5cclxuICAgIGdldFYoKXtcclxuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRWZWxvc2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob290KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0U2hvb3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcclxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyID0gbnVsbDtcclxuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdGFuY2UgPSB0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXHJcbiAgICAgICAgaWYobmVhcmVzdF9tb25zdGVyICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxyXG4gICAgICAgICAgICAgICAgZHk6IG5lYXJlc3RfbW9uc3Rlci5tYXBZIC0gdGhpcy5tYXBZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkeDogMCxcclxuICAgICAgICAgICAgICAgIGR5OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RfZXZlbnQoKXtcclxuICAgICAgICB0aGlzLm1haW5fZ3VuLnNob290KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xyXG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcclxuICAgICAgICAgICAgdmFsdWUgLT0gdGhpcy5hcm1vcjtcclxuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBicmFuY2hfcmVzZXQoKXtcclxuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XHJcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xyXG5cclxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYW5pLmxvYWRBdGxhcyhcInJlcy8vYXRsYXMvL2hlcm8uYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG59Il19
