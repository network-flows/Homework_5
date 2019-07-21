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
        _this.mapX = 0;
        _this.mapY = 0;

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

            this.mapX += this.vx;
            this.mapY += this.vy;

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

                this.mapX += vx * v_scale;
                this.mapY += vy * v_scale;
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

            this.mapX += this.vx;
            this.mapY += this.vy;
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

			window.the_Hero = Laya.Pool.getItemByClass("Hero", _hero2.default);
			the_Hero.root_reset();

			// test
			Laya.timer.frameLoop(1, this, this.onFrame);

			var monster_test1 = new _Gunner2.default();
			monster_test1.root_reset();
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

			console.log(Bullet_list.length);

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

                this.mapX += vx * v_scale;
                this.mapY += vy * v_scale;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2FwcHMvTGF5YUJveC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9zY3JpcHQvQmVpbmdzLmpzIiwic3JjL3NjcmlwdC9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0RyYWdQb2ludC5qcyIsInNyYy9zY3JpcHQvR2F0ZS5qcyIsInNyYy9zY3JpcHQvR29ibGluLmpzIiwic3JjL3NjcmlwdC9HdW4uanMiLCJzcmMvc2NyaXB0L0d1bl9ub3JtYWwuanMiLCJzcmMvc2NyaXB0L0d1bm5lci5qcyIsInNyYy9zY3JpcHQvSGVyby5qcyIsInNyYy9zY3JpcHQvSGVyb19CdWxsZXQuanMiLCJzcmMvc2NyaXB0L0hlcm9fQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlci5qcyIsInNyYy9zY3JpcHQvTW9uc3Rlcl9CdWxsZXQuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X2h1Z2UuanMiLCJzcmMvc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbC5qcyIsInNyYy9zY3JpcHQvU2NyZWVuLmpzIiwic3JjL3NjcmlwdC9UaGluZy5qcyIsInNyYy9zY3JpcHQvV2FsbC5qcyIsInNyYy9zY3JpcHQvV2hlZWwuanMiLCJzcmMvc2NyaXB0L2hlcm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUNDLFVBQVUsS0FBSyxPQURoQjtBQUFBLElBRUMsUUFBUSxLQUFLLEtBRmQ7QUFBQSxJQUdDLFFBQVEsS0FBSyxLQUhkO0FBQUEs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QixFQUF5QixLQUFLLFFBQTlCLENBQTVDO0FBQ0g7Ozs7RUFwSzZCLGdCOztrQkFBYixJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7vy8vIOWfuuehgOeahOexu1xuaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9zY3JpcHQvQmVpbmdzXCJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vc2NyaXB0L0J1bGxldFwiXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9zY3JpcHQvSGVyb1wiXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9zY3JpcHQvTW9uc3RlclwiXG5pbXBvcnQgVGhpbmcgZnJvbSBcIi4vc2NyaXB0L1RoaW5nXCJcbmltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9zY3JpcHQvSGVyb19CdWxsZXRcIlxuaW1wb3J0IE1vbnN0ZXJfQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldFwiXG5pbXBvcnQgR2F0ZSBmcm9tIFwiLi9zY3JpcHQvR2F0ZVwiXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi9zY3JpcHQvV2FsbFwiXG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL3NjcmlwdC9TY3JlZW5cIlxuaW1wb3J0IERyYWdQb2ludCBmcm9tIFwiLi9zY3JpcHQvRHJhZ1BvaW50XCJcbmltcG9ydCBXaGVlbCBmcm9tIFwiLi9zY3JpcHQvV2hlZWxcIlxuXG4vLyDmianlhYXnmoTnsbtcbmltcG9ydCBNb25zdGVyX0J1bGxldF9odWdlIGZyb20gXCIuL3NjcmlwdC9Nb25zdGVyX0J1bGxldF9odWdlXCJcbmltcG9ydCBNb25zdGVyX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vc2NyaXB0L01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL3NjcmlwdC9Hb2JsaW5cIlxuXG5jb25zdFxuXHRCcm93c2VyID0gTGF5YS5Ccm93c2VyLFxuXHRXZWJHTCA9IExheWEuV2ViR0wsXG5cdFN0YWdlID0gTGF5YS5TdGFnZSxcblx0U3RhdCA9IExheWEuU3RhdCxcblx0SGFuZGxlciA9IExheWEuSGFuZGxlcjtcblxuLy/liJ3lp4vljJblvJXmk45cbkxheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xuXG4vL+aoquWxj+a4uOaIj1xuTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XG5cbi8v562J5q+U5L6L57yp5pS+XG5MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX1NIT1dBTEw7XG5cbi8v6IOM5pmv6aKc6ImyXG5MYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiMyMzI2MjhcIjtcblxuLy8gc2V0IHRoZSBTY3JlZW5cbmxldCB3ID0gQnJvd3Nlci5jbGllbnRXaWR0aDtcbmxldCBoID0gQnJvd3Nlci5jbGllbnRIZWlnaHQ7XG5cbkxheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xuTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XG5cblN0YXQuc2hvdygpO1xuXG53aW5kb3cudGhlX3NjcmVlbiA9IG5ldyBTY3JlZW4odywgaCk7XG5cbi8vIOinkuiJsuWuueWZqFxud2luZG93Lk1vbnN0ZXJfbGlzdCA9IFtdO1xud2luZG93LkJ1bGxldF9saXN0ID0gW107XG53aW5kb3cuV2FsbF9saXN0ID0gW107XG53aW5kb3cuVGhpbmdfbGlzdCA9IFtdOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaW5ncyBleHRlbmRzIExheWEuU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuSFAgPSAxO1xuICAgICAgICB0aGlzLm1hcFggPSAwO1xuICAgICAgICB0aGlzLm1hcFkgPSAwO1xuXG4gICAgICAgIC8vIGNvbGxpc2lvbiBzeXN0ZW1cbiAgICAgICAgdGhpcy5UeXBlID0gXCJCZWluZ3NcIjtcbiAgICAgICAgdGhpcy53ID0gNTA7XG4gICAgICAgIHRoaXMuaCA9IDUwO1xuXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSAxO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gMTtcbiAgICB9XG5cbiAgICByb290X3Jlc2V0KCl7XG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG4gICAgICAgIHRoaXMucGl2b3QodGhpcy53IC8gMiwgdGhpcy5oIC8yKVxuICAgICAgICBjb25zb2xlLmxvZyhcInJvb3RfcmVzZXQhXCIpXG5cbiAgICAgICAgdGhpcy5icmFuY2hfcmVzZXQoKTtcbiAgICB9XG5cbiAgICB1cF9kYXRlKCl7XG4gICAgICAgIHRoaXMueCA9IHRoaXMubWFwWCAtIHRoZV9IZXJvLm1hcFggKyBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGgvMjtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5tYXBZIC0gdGhlX0hlcm8ubWFwWSArIExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMjtcblxuICAgICAgICBpZih0aGlzLkhQIDwgMSl7XG4gICAgICAgICAgICB0aGlzLmRlYWRfYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVhZF9hY3Rpb24oKXtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIExheWEuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuVHlwZSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5kZWFkKCk7XG4gICAgfVxuXG4gICAgZ2V0X2hhcm0odmFsdWUpe1xuICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xuICAgIH1cblxuICAgIGRlYWQoKXtcblxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJlaW5ncyBhY3Rpb25cIilcbiAgICB9XG5cbiAgICBkbChkeCwgZHkpe1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqZHkpO1xuICAgIH1cblxuICAgIE9iamVjdF9kbCh0aGVfb2JqZWN0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGVfb2JqZWN0LmR4ICogdGhlX29iamVjdC5keCArIHRoZV9vYmplY3QuZHkgKiB0aGVfb2JqZWN0LmR5KTtcbiAgICB9XG5cbiAgICBnZXRfZGlzdGFuY2UoYW5vdGhlcil7XG4gICAgICAgIGxldCBkeCA9IHRoaXMubWFwWCAtIGFub3RoZXIubWFwWDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5tYXBZIC0gYW5vdGhlci5tYXBZO1xuICAgICAgICByZXR1cm4gdGhpcy5kbChkeCwgZHkpO1xuICAgIH1cblxuICAgIGdldF92ZWN0b3Jfdih2X21heCwgdGhlX3Z4LCB0aGVfdnkpe1xuICAgICAgICBsZXQgdGhlX3YgPSB0aGlzLmRsKHRoZV92eCwgdGhlX3Z5KTtcbiAgICAgICAgaWYodGhlX3YgPiAxRS02ICYmIHZfbWF4ID4gMUUtNil7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgdng6IHRoZV92eCAqIHZfbWF4L3RoZV92LFxuICAgICAgICAgICAgICAgIHZ5OiB0aGVfdnkgKiB2X21heC90aGVfdlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgdng6IDAsXG4gICAgICAgICAgICAgICAgdnk6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFVSTHMoc3RyLG4pXG4gICAge1xuICAgICAgICBsZXQgdXJscz1bXTtcbiAgICAgICAgZm9yKHZhciBpID0wO2k8bjtpKz0xKVxuICAgICAgICB7XG4gICAgICAgICAgICB1cmxzLnB1c2goXCJyZXNcXFxcYXRsYXNcXFxcXCIrc3RyK2krXCIucG5nXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybHM7XG4gICAgfVxuXG4gICAgZ2V0RGlyKGR4LGR5LGxhc3Qpe1xuICAgICAgICBpZihkeD5keSYmZHg+LWR5KXJldHVybiBcInJpZ2h0XCI7XG4gICAgICAgIGlmKC1keD5keSYmLWR4Pi1keSlyZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgIGlmKGR5PmR4JiZkeT4tZHgpcmV0dXJuIFwiZG93blwiO1xuICAgICAgICBpZigtZHk+ZHgmJi1keT4tZHgpcmV0dXJuIFwidXBcIjtcbiAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3MuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnZ4ID0gMTtcbiAgICAgICAgdGhpcy52eSA9IDE7XG4gICAgICAgIHRoaXMudl9tYXggPSAxMDtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgdGhpcy5IUCAtPSAxO1xuXG4gICAgICAgIHRoaXMubWFwWCArPSB0aGlzLnZ4O1xuICAgICAgICB0aGlzLm1hcFkgKz0gdGhpcy52eTtcblxuICAgICAgICBsZXQgYXR0YWNrX2xpc3QgPSB0aGlzLmdldF9hdHRhY2tfbGlzdCgpO1xuICAgICAgICB0aGlzLmV4cGxvc2lvbihhdHRhY2tfbGlzdCk7XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImJlZm9yZTogXCIrQnVsbGV0X2xpc3QubGVuZ3RoKTtcbiAgICAgICAgQnVsbGV0X2xpc3Quc3BsaWNlKEJ1bGxldF9saXN0LmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyOiBcIitCdWxsZXRfbGlzdC5sZW5ndGgpO1xuICAgIH1cblxuICAgIC8vIHRoaXMgc2hvdWxkIHJldHVybiBhIGxpc3QgdGhhdCBjb250YWluIHRoZSBlbGVtZW50cyB0byBiZSBhdHRhY2tcbiAgICBnZXRfYXR0YWNrX2xpc3QoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZXhwbG9zaW9uKGF0dGFja19saXN0KXtcbiAgICAgICAgLy8gZXhwbG9zaW9uICFcbiAgICAgICAgaWYoYXR0YWNrX2xpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB0aGlzLkhQID0gLTE7XG4gICAgICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgYXR0YWNrX2xpc3Qpe1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNrKGVsZW1lbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCBhdHRhY2tcIik7XG5cbiAgICB9XG5cbiAgICBicmFuY2hfcmVzZXQoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQgMTIzIVwiKVxuICAgICAgICBCdWxsZXRfbGlzdC5wdXNoKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYnJhbmNoX0hlcm9fb3JfTW9uc3Rlcl9yZXNldCgpXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ1BvaW50IGV4dGVuZHMgTGF5YS5TcHJpdGUgIC8vbm8gZXZlbnRzXG57XG5cdGNvbnN0cnVjdG9yKHgseSxyKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0XHRjb25zdCBcblx0XHRcdFNwcml0ZSA9IExheWEuU3ByaXRlLFxuXHRcdFx0RXZlbnQgPSBMYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG5cdFx0XG5cdFx0dGhpcy5zaXplKDIqciwyKnIpO1xuXHRcdHRoaXMucGl2b3QocixyKTtcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdDaXJjbGUocixyLHIsXCIjRkZGRjAwXCIpO1xuICAgICAgICB0aGlzLnBvcyh4LHkpO1xuICAgICAgICB0aGlzLmFscGhhPTAuMjtcblx0XHR0aGlzLnI9cjtcblx0XHR0aGlzLm1vdXNlVGhyb3VnaD10cnVlO1xuXHR9XG59IiwiaW1wb3J0IFRoaW5nIGZyb20gXCIuL1RoaW5nXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2F0ZSBleHRlbmRzIFRoaW5ne1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZW50ZW5jZSA9IFwi5piv5ZCm5Y675b6A5LiL5LiA5bGC77yfXCI7XG4gICAgfVxuXG4gICAgdXNlX2l0KCl7XG4gICAgICAgIC8vIGdvIHRvIG5leHQgZmxvb3JcblxuICAgIH1cbn1cbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2JsaW4gZXh0ZW5kcyBNb25zdGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR29ibGluXCI7XG5cbiAgICAgICAgdGhpcy53ID0gNDAwO1xuICAgICAgICB0aGlzLmggPSA0MDA7XG5cbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCIuL29yei5qcGdcIikuc2NhbGUoMC40LDAuNCk7XG4gICAgfVxuXG4gICAgc2tpbGwoKXtcblxuICAgIH1cblxuICAgIGxlYWZfcmVzZXQoKXtcblxuICAgICAgICB0aGlzLkhQID0gMjA7XG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcclxuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1biBleHRlbmRzIEJlaW5nc3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpcnN0X3dhaXRpbmcgPSAxMDtcclxuICAgICAgICB0aGlzLnNlY29uZF93YWl0aW5nID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldCA9IEhlcm9fQnVsbGV0X25vcm1hbDtcclxuICAgICAgICB0aGlzLmJ1bGxldF90eXBlID0gXCJIZXJvX0J1bGxldF9ub3JtYWxcIlxyXG4gICAgfVxyXG5cclxuICAgIGFjdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVhZCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdCgpe1xyXG4gICAgICAgIGxldCBuZXdfYnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHRoaXMuYnVsbGV0X3R5cGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBuZXdfYnVsbGV0LnJvb3RfcmVzZXQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcclxuICAgIH1cclxuICAgIFxyXG4gICAgYnJhbmNoX3Jlc2V0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXHJcblxyXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxyXG5pbXBvcnQgSGVyb19CdWxsZXRfbm9ybWFsIGZyb20gXCIuL0hlcm9fQnVsbGV0X25vcm1hbFwiXHJcbmltcG9ydCBHdW4gZnJvbSBcIi4vR3VuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bl9ub3JtYWwgZXh0ZW5kcyBHdW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdF93YWl0aW5nID0gNTA7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRfd2FpdGluZyA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5idWxsZXQgPSBIZXJvX0J1bGxldF9ub3JtYWw7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfdHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGVhZl9yZXNldCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIlxyXG5pbXBvcnQgTW9uc3Rlcl9CdWxsZXRfbm9ybWFsIGZyb20gXCIuL01vbnN0ZXJfQnVsbGV0X25vcm1hbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5uZXIgZXh0ZW5kcyBNb25zdGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9IFwiR3VubmVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMudyA9IDQwMDtcclxuICAgICAgICB0aGlzLmggPSA0MDA7XHJcblxyXG4gICAgICAgIC8vIHNldCBwaWN0dXJlXHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoXCIuL29yei5qcGdcIikuc2NhbGUoMC40LDAuNCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwoKXtcclxuICAgICAgICBsZXQgbmV3X2J1bGxldCA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbFwiLCBNb25zdGVyX0J1bGxldF9ub3JtYWwpO1xyXG4gICAgICAgIG5ld19idWxsZXQucm9vdF9yZXNldCgpO1xyXG4gICAgICAgIG5ld19idWxsZXQuaW5pdCh0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdCFcIilcclxuICAgIH1cclxuXHJcbiAgICBsZWFmX3Jlc2V0KCl7XHJcblxyXG4gICAgICAgIHRoaXMuSFAgPSAzMDA7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xuaW1wb3J0IEhlcm9fQnVsbGV0X25vcm1hbCBmcm9tIFwiLi9IZXJvX0J1bGxldF9ub3JtYWxcIjtcbmltcG9ydCBHdW5fbm9ybWFsIGZyb20gXCIuL0d1bl9ub3JtYWxcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBtb3ZlXG4gICAgICAgIHRoaXMudl9tYXggPSA1O1xuXG4gICAgICAgIC8vIEhQIGFuZCBhcm1vclxuICAgICAgICB0aGlzLkhQX21heCA9IDEwMDtcbiAgICAgICAgdGhpcy5IUCA9IDEwMDtcbiAgICAgICAgdGhpcy5hcm1vcl9tYXggPSAxMDtcbiAgICAgICAgdGhpcy5hcm1vdCA9IDEwO1xuXG4gICAgICAgIC8vIHNob290XG4gICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgPSAxMDAwO1xuICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLncgPSAzMjtcbiAgICAgICAgdGhpcy5oID0gNDg7XG5cbiAgICAgICAgdGhpcy5tYWluX2d1biA9IG5ldyBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoJ0d1bl9ub3JtYWwnLCBHdW5fbm9ybWFsKTtcbiAgICAgICAgdGhpcy5tYWluX2d1bi5yb290X3Jlc2V0KCk7XG4gICAgICAgIHRoaXMuYWx0ZXJuYXRlX2d1biA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Mb2FkZWQoKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkISEhXCIpXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5hbmkpO1xuICAgICAgICB0aGlzLmFuaS5pbnRlcnZhbD0xMDA7XG4gICAgICAgIHRoaXMuYW5pLnBvcyh0aGlzLngsdGhpcy55KVxuICAgICAgICB0aGlzLmFuaS5pbmRleD0xO1xuXG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXHVwXCIsNCksXCJoZXJvX3VwXCIpO1xuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxkb3duXCIsNCksXCJoZXJvX2Rvd25cIik7XG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXGxlZnRcIiw0KSxcImhlcm9fbGVmdFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxccmlnaHRcIiw0KSxcImhlcm9fcmlnaHRcIik7XG4gICAgICAgIHRoaXMuYW5pLnBsYXkoMCx0cnVlLFwiaGVyb19yaWdodFwiKTtcbiAgICAgICAgdGhpcy5wcmVfZGlyPVwicmlnaHRcIlxuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgbGV0IHZ4ID0gdGhpcy5nZXRWKCkueDtcbiAgICAgICAgbGV0IHZ5ID0gdGhpcy5nZXRWKCkueTtcblxuICAgICAgICB2eCAvPSAxMDtcbiAgICAgICAgdnkgLz0gMTA7XG5cbiAgICAgICAgLy8gbW92ZW1lbnQgY29tbWFuZCBkZXRlY3RlZFxuICAgICAgICBsZXQgdiA9IE1hdGguc3FydCh2eCAqIHZ4ICsgdnkgKiB2eSk7XG4gICAgICAgIGlmICh2ID4gMUUtNil7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB2IDw9IHZfbWF4XG4gICAgICAgICAgICBsZXQgdl9zY2FsZSA9dGhpcy52X21heCAvIHY7XG4gICAgICAgICAgICBpZih2X3NjYWxlID4gMSl7XG4gICAgICAgICAgICAgICAgdl9zY2FsZSA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWFwWCArPSB2eCAqIHZfc2NhbGU7XG4gICAgICAgICAgICB0aGlzLm1hcFkgKz0gdnkgKiB2X3NjYWxlO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tIG1vdmVtZW50IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cblxuICAgICAgICAvLy0tLS0tLS0tLSBzaG9vdCBjb250cm9sIHBhcnQgLS0tLS0tLS0tLy9cbiAgICAgICAgXG4gICAgICAgIC8vIFNob290aW5nIGRlbGF5XG4gICAgICAgIGlmKHRoaXMuc2hvb3QoKSAmJiB0aGlzLnNob290X3Bvd2VyID49IDAgJiYgIXRoaXMuc2hvb3Rfd2FpdGluZyl7XG4gICAgICAgICAgICB0aGlzLnNob290X3dhaXRpbmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zaG9vdF93YWl0aW5nKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPiB0aGlzLm1haW5fZ3VuLmZpcnN0X3dhaXRpbmcpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfZXZlbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gLXRoaXMubWFpbl9ndW4uc2Vjb25kX3dhaXRpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYodGhpcy5zaG9vdF9wb3dlciA8IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RfcG93ZXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmllbnRhdGlvblxuICAgICAgICBsZXQgbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uID0gdGhpcy5nZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCk7XG4gICAgICAgIGlmKHRoaXMuT2JqZWN0X2RsKG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbikgPiAxRS02ICl7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uLmR4O1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feSA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHYgPiAxRS02KXtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3ggPSB2eDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSB2eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXI9dGhpcy5nZXREaXIodGhpcy5kaXJlY3Rpb25feCx0aGlzLmRpcmVjdGlvbl95LHRoaXMucHJlX2Rpcik7XG4gICAgICAgIGlmKGRpciE9dGhpcy5wcmVfZGlyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fXCIrZGlyKTtcbiAgICAgICAgICAgIHRoaXMucHJlX2Rpcj1kaXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IGVuZCAtLS0tLS0tLS0vL1xuICAgIH1cblxuICAgIGdldFYoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0VmVsb3NpdHkoKTtcbiAgICB9XG5cbiAgICBzaG9vdCgpe1xuICAgICAgICByZXR1cm4gdGhlX3NjcmVlbi5nZXRTaG9vdCgpO1xuICAgIH1cblxuICAgIGdldF9uZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24oKXtcbiAgICAgICAgbGV0IG1pbl9kaXN0YW5jZSA9IDFFNjtcbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3RlciA9IG51bGw7XG4gICAgICAgIGZvcihsZXQgdGhlX21vbnN0ZXIgb2YgTW9uc3Rlcl9saXN0KXtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKSA8IG1pbl9kaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgbWluX2Rpc3RhbmNlID0gdGhpcy5nZXRfZGlzdGFuY2UodGhlX21vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIG5lYXJlc3RfbW9uc3RlciA9IHRoZV9tb25zdGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBleGlzdCBtb25zdGVyXG4gICAgICAgIGlmKG5lYXJlc3RfbW9uc3RlciAhPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICAgICAgZHg6IG5lYXJlc3RfbW9uc3Rlci5tYXBYIC0gdGhpcy5tYXBYLFxuICAgICAgICAgICAgICAgIGR5OiBuZWFyZXN0X21vbnN0ZXIubWFwWSAtIHRoaXMubWFwWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkeDogMCxcbiAgICAgICAgICAgICAgICBkeTogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3RfZXZlbnQoKXtcbiAgICAgICAgdGhpcy5tYWluX2d1bi5zaG9vdCgpO1xuICAgIH1cblxuICAgIGdldF9oYXJtKHZhbHVlKXtcbiAgICAgICAgaWYodGhpcy5hcm1vciA+PSB2YWx1ZSl7XG4gICAgICAgICAgICB0aGlzLmFybW9yIC09IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmFybW9yID0gMDtcbiAgICAgICAgICAgIHZhbHVlIC09IHRoaXMuYXJtb3I7XG4gICAgICAgICAgICB0aGlzLkhQIC09IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVhZCgpe1xuXG4gICAgfVxuXG4gICAgYnJhbmNoX3Jlc2V0KCl7XG4gICAgICAgIHRoaXMuSFAgPSB0aGlzLkhQX21heDtcbiAgICAgICAgdGhpcy5hcm1vciA9IHRoaXMuYXJtb3JfbWF4O1xuXG4gICAgICAgIHRoaXMuYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYW5pLmxvYWRBdGxhcyhcInJlcy8vYXRsYXMvL2hlcm8uYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX21vbnN0ZXIpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrX2xpc3Q7XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBicmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KCl7XG4gICAgICAgIGxldCB2ZWN0b3JfdiA9IHRoaXMuZ2V0X3ZlY3Rvcl92KHRoaXMudl9tYXgsIHRoZV9IZXJvLmRpcmVjdGlvbl94LCB0aGVfSGVyby5kaXJlY3Rpb25feSk7XG4gICAgICAgIHRoaXMudnggPSB2ZWN0b3Jfdi52eDtcbiAgICAgICAgdGhpcy52eSA9IHZlY3Rvcl92LnZ5O1xuICAgICAgICB0aGlzLm1hcFggPSB0aGVfSGVyby5tYXBYO1xuICAgICAgICB0aGlzLm1hcFkgPSB0aGVfSGVyby5tYXBZO1xuXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBIZXJvX0J1bGxldCBmcm9tIFwiLi9IZXJvX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9fQnVsbGV0X25vcm1hbCBleHRlbmRzIEhlcm9fQnVsbGV0IHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52X21heCA9IDU7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5cbiAgICAgICAgLy8gc2V0IHBpY3R1cmVcbiAgICAgICAgdGhpcy5yID0gMjA7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnIsIFwiI0ZGRkYwMFwiKTtcbiAgICAgICAgLy90aGlzLnBpdm90KHRoaXMuciwgdGhpcy5yKTtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0gW25ldyBMYXlhLkdsb3dGaWx0ZXIoXCIjRkZGRkZGXCIsIDEwLCAwLCAwKV07XG4gICAgfVxuXG4gICAgYXR0YWNrYWJsZSh0aGVfZW5lbXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9lbmVteSkgPCA0MDtcbiAgICB9XG5cbiAgICBhdHRhY2soZW5lbXkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXJvX0J1bGxldF9ub3JtYWwgYXR0YWNrXCIpO1xuXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcbiAgICB9XG5cbiAgICBsZWFmX3Jlc2V0KCkge1xuICAgICAgICB0aGlzLkhQID0gNTA7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBCZWluZ3N7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNraWxsX3Bvd2VyID0gMTAwMDtcbiAgICAgICAgdGhpcy5za2lsbF9jb3N0ID0gMzYwO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR4O1xuICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdGhpcy5nZXRfaGVyb19vcmllbnRhdGlvbigpLmR5O1xuXG4gICAgICAgIHRoaXMud2FuZGVyaW5nKCk7XG5cbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA8IDEwMDApe1xuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5za2lsbF9wb3dlciA+PSB0aGlzLnNraWxsX2Nvc3Qpe1xuICAgICAgICAgICAgdGhpcy5za2lsbF9wb3dlciA9IDA7XG4gICAgICAgICAgICB0aGlzLnNraWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YW5kZXJpbmcoKXtcbiAgICAgICAgdGhpcy52eCA9IDE7XG4gICAgICAgIHRoaXMudnkgPSAxO1xuXG4gICAgICAgIHRoaXMubWFwWCArPSB0aGlzLnZ4O1xuICAgICAgICB0aGlzLm1hcFkgKz0gdGhpcy52eTtcbiAgICB9XG4gICAgXG4gICAgZGVhZCgpe1xuICAgICAgICBNb25zdGVyX2xpc3Quc3BsaWNlKE1vbnN0ZXJfbGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcblxuICAgIH1cblxuICAgIGJyYW5jaF9yZXNldCgpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImJyYW5jaF9yZXNldCFcIilcbiAgICAgICAgTW9uc3Rlcl9saXN0LnB1c2godGhpcylcblxuICAgICAgICB0aGlzLmxlYWZfcmVzZXQoKVxuICAgIH1cblxuICAgIGdldF9oZXJvX29yaWVudGF0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkeDogdGhlX0hlcm8ubWFwWCAtIHRoaXMubWFwWCxcbiAgICAgICAgICAgIGR5OiB0aGVfSGVyby5tYXBZIC0gdGhpcy5tYXBZXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0IGV4dGVuZHMgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICB9XG4gICAgXG4gICAgZ2V0X2F0dGFja19saXN0KCl7XG4gICAgICAgIGxldCBhdHRhY2tfbGlzdCA9IFtdO1xuICAgICAgICBmb3IobGV0IHRoZV93YWxsIG9mIFdhbGxfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX3dhbGwpKXtcbiAgICAgICAgICAgICAgICBhdHRhY2tfbGlzdC5wdXNoKHRoZV93YWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmF0dGFja2FibGUodGhlX0hlcm8pKXtcbiAgICAgICAgICAgIGF0dGFja19saXN0LnB1c2godGhlX0hlcm8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tfbGlzdDtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBhdHRhY2soZWxlbWVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTW9uc3Rlcl9CdWxsZXQgYXR0YWNrXCIpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBicmFuY2hfSGVyb19vcl9Nb25zdGVyX3Jlc2V0KCl7XG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXG5cbiAgICB9XG5cbiAgICBpbml0KGxhdW5jaGVyKXtcbiAgICAgICAgbGV0IHZlY3Rvcl92ID0gdGhpcy5nZXRfdmVjdG9yX3YodGhpcy52X21heCwgbGF1bmNoZXIuZGlyZWN0aW9uX3gsIGxhdW5jaGVyLmRpcmVjdGlvbl95KTtcbiAgICAgICAgdGhpcy52eCA9IHZlY3Rvcl92LnZ4O1xuICAgICAgICB0aGlzLnZ5ID0gdmVjdG9yX3Yudnk7XG4gICAgICAgIHRoaXMubWFwWCA9IGxhdW5jaGVyLm1hcFg7XG4gICAgICAgIHRoaXMubWFwWSA9IGxhdW5jaGVyLm1hcFk7XG4gICAgfVxufSIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X2h1Z2UgZXh0ZW5kcyBNb25zdGVyX0J1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLlR5cGUgPSBcIk1vbnN0ZXJfQnVsbGV0X2h1Z2VcIjtcblxuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9kaXN0YW5jZSh0aGVfZW5lbXkpIDwgNDA7XG4gICAgfVxuXG4gICAgYXR0YWNrKGVuZW15KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJNb25zdGVyX0J1bGxldF9odWdlIGF0dGFja1wiKTtcbiAgICAgICAgXG4gICAgICAgIGVuZW15LmdldF9oYXJtKDIwKTtcbiAgICB9XG5cbiAgICBsZWFmX3Jlc2V0KCl7XG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuICAgIH1cbn1cbiIsImltcG9ydCBNb25zdGVyX0J1bGxldCBmcm9tIFwiLi9Nb25zdGVyX0J1bGxldFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJfQnVsbGV0X25vcm1hbCBleHRlbmRzIE1vbnN0ZXJfQnVsbGV0IHtcbiAgICBjb25zdHJ1Y3Rvcih2eCwgdnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5UeXBlID0gXCJNb25zdGVyX0J1bGxldF9ub3JtYWxcIjtcblxuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcblxuICAgICAgICAvLyBzZXQgcGljdHVyZVxuICAgICAgICB0aGlzLnIgPSAyMDtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuciwgXCIjRkZGRjAwXCIpO1xuICAgICAgICAvL3RoaXMucGl2b3QodGhpcy5yLCB0aGlzLnIpO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbbmV3IExheWEuR2xvd0ZpbHRlcihcIiNGRkZGRkZcIiwgMTAsIDAsIDApXTtcbiAgICB9XG5cbiAgICBhdHRhY2thYmxlKHRoZV9lbmVteSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRfZGlzdGFuY2UodGhlX2VuZW15KSA8IDIwO1xuICAgIH1cblxuICAgIGF0dGFjayhlbmVteSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1vbnN0ZXJfQnVsbGV0X25vcm1hbCBhdHRhY2tcIik7XG5cbiAgICAgICAgZW5lbXkuZ2V0X2hhcm0oMTApO1xuICAgIH1cblxuICAgIGxlYWZfcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuSFAgPSA0MDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLkhQID0gXCIsIHRoaXMuSFApO1xuICAgIH1cbn0iLCJpbXBvcnQgRHJhZ1BvaW50IGZyb20gXCIuL0RyYWdQb2ludFwiXG5pbXBvcnQgV2hlZWwgZnJvbSBcIi4vV2hlZWxcIlxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vaGVyb1wiXG5pbXBvcnQgR29ibGluIGZyb20gXCIuL0dvYmxpblwiXG5pbXBvcnQgR3VubmVyIGZyb20gXCIuL0d1bm5lclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlbiBleHRlbmRzIExheWEuU3ByaXRlICAvL3NjcmVlblxue1xuXHRjb25zdHJ1Y3Rvcih3LGgpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdGNvbnN0IFxuXHRcdFx0U3ByaXRlID0gTGF5YS5TcHJpdGUsXG5cdFx0XHRFdmVudCA9IExheWEuRXZlbnQ7XG5cdFx0dGhpcy53PXc7XG5cdFx0dGhpcy5oPWg7XG5cblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdHRoaXMuc2l6ZSh3LGgpO1xuXHRcdHRoaXMucG9zKDAsMCk7XG5cdFx0dGhpcy5sb2FkTWFwKCk7XG5cdH1cblxuXHRsb2FkTWFwKClcblx0e1xuXHRcdGNvbnN0IFxuXHRcdFx0VGlsZWRNYXA9TGF5YS5UaWxlZE1hcCxcblx0XHRcdFJlY3RhbmdsZT1MYXlhLlJlY3RhbmdsZSxcblx0XHRcdEhhbmRsZXI9TGF5YS5IYW5kbGVyLFxuXHRcdFx0RXZlbnQ9TGF5YS5FdmVudCxcblx0XHRcdEJyb3dzZXI9TGF5YS5Ccm93c2VyO1xuXHRcdHRoaXMudGlsZWRNYXA9bmV3IFRpbGVkTWFwKCk7XG5cdFx0dGhpcy50aWxlZE1hcC5jcmVhdGVNYXAoXCJyZXNcXFxcdGlsZWRtYXBzXFxcXHRlc3QuanNvblwiLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIEJyb3dzZXIud2lkdGgsIEJyb3dzZXIuaGVpZ2h0KSxIYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWRNYXApKTtcblx0fVxuXG5cdG9uTG9hZGVkTWFwKClcblx0e1xuXHRcdGNvbnNvbGUubG9nKFwib2tcIilcblx0XHRjb25zdCBFdmVudD1MYXlhLkV2ZW50O1xuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLm9uTW91c2VVcCk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLHRoaXMsdGhpcy5vbk1vdXNlTW92ZSk7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm9uTW91c2VVUCk7XG5cblx0XHR0aGlzLndobD1uZXcgV2hlZWwodGhpcy53LzQsdGhpcy5oKjMvNCx0aGlzLncvMTUpO1xuICAgICAgICB0aGlzLmF0az1uZXcgV2hlZWwodGhpcy53KjMvNCx0aGlzLmgqMy80LHRoaXMudy8xNSk7XG5cdFx0dGhpcy5hdGsuYWxwaGE9MC44O1xuXG5cdFx0d2luZG93LnRoZV9IZXJvID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiSGVyb1wiLCBIZXJvKTtcblx0XHR0aGVfSGVyby5yb290X3Jlc2V0KCk7XG5cblx0XHQvLyB0ZXN0XG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkZyYW1lKTtcblxuXHRcdGxldCBtb25zdGVyX3Rlc3QxID0gbmV3IEd1bm5lcigpO1xuXHRcdG1vbnN0ZXJfdGVzdDEucm9vdF9yZXNldCgpO1xuXHRcdG1vbnN0ZXJfdGVzdDEubWFwWCA9IDEwMDtcblx0XHRtb25zdGVyX3Rlc3QxLm1hcFkgPSAxMDA7XG5cdH1cblxuXHRvbkZyYW1lKCkge1xuXHRcdGZvciAobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCkge1xuXHRcdFx0dGhlX21vbnN0ZXIudXBfZGF0ZSgpO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0aGVfYnVsbGV0IG9mIEJ1bGxldF9saXN0KSB7XG5cdFx0XHR0aGVfYnVsbGV0LnVwX2RhdGUoKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdGhlX3dhbGwgb2YgV2FsbF9saXN0KSB7XG5cdFx0XHR0aGVfd2FsbC51cF9kYXRlKCk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHRoZV90aGluZyBvZiBUaGluZ19saXN0KSB7XG5cdFx0XHR0aGVfdGhpbmcudXBfZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKEJ1bGxldF9saXN0Lmxlbmd0aClcblx0XHRcblx0XHR0aGVfSGVyby51cF9kYXRlKCk7XG5cdFx0dGhlX0hlcm8ucG9zKExheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQvMik7XG5cdFx0dGhpcy50aWxlZE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGVfSGVyby5tYXBYLUxheWEuQnJvd3Nlci5jbGllbnRXaWR0aC8yLHRoZV9IZXJvLm1hcFktTGF5YS5Ccm93c2VyLmNsaWVudEhlaWdodC8yLExheWEuQnJvd3Nlci5jbGllbnRXaWR0aCxMYXlhLkJyb3dzZXIuY2xpZW50SGVpZ2h0KVxuXHR9XG5cblx0b25Nb3VzZURvd24oZSl7XG5cdFx0aWYoKHRoaXMud2hsLngtZS5zdGFnZVgpKih0aGlzLndobC54LWUuc3RhZ2VYKSsodGhpcy53aGwueS1lLnN0YWdlWSkqKHRoaXMud2hsLnktZS5zdGFnZVkpPD10aGlzLndobC5yKnRoaXMud2hsLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy53aGwub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoKHRoaXMuYXRrLngtZS5zdGFnZVgpKih0aGlzLmF0ay54LWUuc3RhZ2VYKSsodGhpcy5hdGsueS1lLnN0YWdlWSkqKHRoaXMuYXRrLnktZS5zdGFnZVkpPD10aGlzLmF0ay5yKnRoaXMuYXRrLnIpXG5cdFx0e1xuXHRcdFx0dGhpcy5hdGsub25TdGFydERyYWcoZSk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VVcChlKVxuXHR7XG5cdFx0aWYodGhpcy53aGwuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLndobC5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5vblN0b3BEcmFnKCk7XG5cdFx0fVxuXHR9XG5cdG9uTW91c2VNb3ZlKGUpXG5cdHtcblx0XHRpZih0aGlzLndobC5JRD09ZS50b3VjaElkKVxuXHRcdHtcblx0XHRcdHRoaXMud2hsLm1vdmVUbyhlLnN0YWdlWCxlLnN0YWdlWSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5hdGsuSUQ9PWUudG91Y2hJZClcblx0XHR7XG5cdFx0XHR0aGlzLmF0ay5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHRcdH1cblx0fVxuXG5cdGdldFZlbG9zaXR5KClcblx0e1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeCA6IHRoaXMud2hsLnNwLnggLSB0aGlzLndobC54LFxuICAgICAgICAgICAgeSA6IHRoaXMud2hsLnNwLnkgLSB0aGlzLndobC55XG4gICAgICAgIH07XG5cdH1cblxuXHRnZXRTaG9vdCgpXG5cdHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXRrLklEICE9PSBudWxsO1xuXHR9XG59XG4iLCJpbXBvcnQgQmVpbmdzIGZyb20gXCIuL0JlaW5nc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRoaW5nIGV4dGVuZHMgQmVpbmdze1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VudGVuY2UgPSBcIui/mOayoeacieiuvue9ruWPpeWtkO+8gVwiO1xuICAgIH1cblxuICAgIGFjdGlvbigpe1xuICAgICAgICBpZihwbGF5ZXJfaXNfbmVhcmJ5KCkpe1xuICAgICAgICAgICAgdGhpcy5zZXRfc2VudGVuY2UoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuY2xpY2tfdGhlX3RoaW5nKCkpe1xuICAgICAgICAgICAgICAgIHRoaXMudXNlX2l0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaGlkZV9zZW50ZW5jZSgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFkKCl7XG4gICAgICAgIFRoaW5nX2xpc3Quc3BsaWNlKEJ1bGxldF9saXN0LmluZGV4T2YodGhpcykpO1xuXG4gICAgfVxuXG4gICAgc2V0X3NlbnRlbmNlKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGdhbWUuc2VudGVuY2UgPSB0aGlzLnNlbnRlbmNlO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIGhpZGVfc2VudGVuY2UoKXtcbiAgICAgICAgLypcbiAgICAgICAgZ2FtZS5zZW50ZW5jZSA9IFwiXCI7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcGxheWVyX2lzX25lYXJieSgpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xpY2tfdGhlX3RoaW5nKCl7XG4gICAgICAgIC8qXG4gICAgICAgIGlmKGdhbWUuYnV0dG9uX2NsaWNrZWQpe1xuICAgICAgICAgICAgZ2FtZS5idXR0b25fY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuICAgIHVzZV9pdCgpe1xuXG4gICAgfVxuXG5cbiAgICBicmFuY2hfcmVzZXQoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJicmFuY2hfcmVzZXQhXCIpXG4gICAgICAgIFRoaW5nX2xpc3QucHVzaCh0aGlzKVxuXG4gICAgICAgIHRoaXMubGVhZl9yZXNldCgpXG4gICAgfVxufSIsImltcG9ydCBCZWluZ3MgZnJvbSBcIi4vQmVpbmdzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeDIsIHkxLCB5Mil7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuVHlwZSA9IFwiV2FsbFwiO1xuXG4gICAgICAgIHRoaXMueDEgPSB4MTtcbiAgICAgICAgdGhpcy54MiA9IHgyO1xuICAgICAgICB0aGlzLnkxID0geTE7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcblxuICAgIH1cblxuICAgIGRlYWQoKXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbGVhZl9yZXNldCgpe1xuICAgICAgICB0aGlzLkhQID0gMzA7XG4gICAgfVxufSIsImltcG9ydCBEcmFnUG9pbnQgZnJvbSBcIi4vRHJhZ1BvaW50XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlZWwgZXh0ZW5kcyBMYXlhLlNwcml0ZVxue1xuXHRjb25zdHJ1Y3Rvcih4LHkscilcblx0e1xuXHRcdHN1cGVyKCk7XG5cdFx0Y29uc3QgXG5cdFx0XHRTcHJpdGUgPSBMYXlhLlNwcml0ZSxcblx0XHRcdEV2ZW50ID0gTGF5YS5FdmVudDtcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xuXHRcdFxuXHRcdHRoaXMuc2l6ZSgyKnIsMipyKTtcblx0XHR0aGlzLnBpdm90KHIscik7XG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHIscixyLFwiI0ZGRkZGRlwiKTtcblx0XHR0aGlzLnBvcyh4LHkpO1xuXHRcdHRoaXMucj1yO1xuICAgICAgICB0aGlzLklEPW51bGw7XG4gICAgICAgIHRoaXMuYWxwaGE9MC4yO1xuXHRcdHRoaXMubW91c2VUaHJvdWdoPXRydWU7XG5cdFx0dGhpcy5zZXR1cCgpO1xuXHR9XG5cblx0c2V0dXAoKVxuXHR7XG5cdFx0dGhpcy5zcD1uZXcgRHJhZ1BvaW50KHRoaXMueCx0aGlzLnksdGhpcy5yLzUpO1xuXHR9XG5cblx0b25TdGFydERyYWcoZSl7XG5cdFx0dGhpcy5JRD1lLnRvdWNoSWQ7XG5cdFx0dGhpcy5tb3ZlVG8oZS5zdGFnZVgsZS5zdGFnZVkpO1xuXHR9XG5cblx0b25TdG9wRHJhZygpXG5cdHtcblx0XHR0aGlzLklEPW51bGw7XG5cdFx0dGhpcy5zcC5wb3ModGhpcy54LHRoaXMueSlcblx0fVxuXG5cdG1vdmVUbyh4LHkpXG5cdHtcblx0XHQvL3RoaXMuc3AucG9zKHgseSlcblx0XHRsZXQgZHg9eC10aGlzLng7XG5cdFx0bGV0IGR5PXktdGhpcy55O1xuXG5cdFx0bGV0IFI9TWF0aC5zcXJ0KGR4KmR4K2R5KmR5KTtcblx0XHRsZXQgZHgyPVI+dGhpcy5yPyBkeCp0aGlzLnIvUjogZHg7XG5cdFx0bGV0IGR5Mj1SPnRoaXMucj8gZHkqdGhpcy5yL1I6IGR5O1xuXHRcdHRoaXMuc3AucG9zKHRoaXMueCtkeDIsdGhpcy55K2R5Milcblx0fVxufVxuIiwiaW1wb3J0IEJlaW5ncyBmcm9tIFwiLi9CZWluZ3NcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcbmltcG9ydCBIZXJvX0J1bGxldF9ub3JtYWwgZnJvbSBcIi4vSGVyb19CdWxsZXRfbm9ybWFsXCI7XG5pbXBvcnQgR3VuX25vcm1hbCBmcm9tIFwiLi9HdW5fbm9ybWFsXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJlaW5nc3tcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gbW92ZVxuICAgICAgICB0aGlzLnZfbWF4ID0gNTtcblxuICAgICAgICAvLyBIUCBhbmQgYXJtb3JcbiAgICAgICAgdGhpcy5IUF9tYXggPSAxMDA7XG4gICAgICAgIHRoaXMuSFAgPSAxMDA7XG4gICAgICAgIHRoaXMuYXJtb3JfbWF4ID0gMTA7XG4gICAgICAgIHRoaXMuYXJtb3QgPSAxMDtcblxuICAgICAgICAvLyBzaG9vdFxuICAgICAgICB0aGlzLnNob290X3Bvd2VyID0gMTAwMDtcbiAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy53ID0gMzI7XG4gICAgICAgIHRoaXMuaCA9IDQ4O1xuXG4gICAgICAgIHRoaXMubWFpbl9ndW4gPSBuZXcgTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKCdHdW5fbm9ybWFsJywgR3VuX25vcm1hbCk7XG4gICAgICAgIHRoaXMubWFpbl9ndW4ucm9vdF9yZXNldCgpO1xuICAgICAgICB0aGlzLmFsdGVybmF0ZV9ndW4gPSBudWxsO1xuICAgIH1cblxuICAgIG9uTG9hZGVkKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCEhIVwiKVxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuYW5pKTtcbiAgICAgICAgdGhpcy5hbmkuaW50ZXJ2YWw9MTAwO1xuICAgICAgICB0aGlzLmFuaS5wb3ModGhpcy54LHRoaXMueSlcbiAgICAgICAgdGhpcy5hbmkuaW5kZXg9MTtcblxuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFx1cFwiLDQpLFwiaGVyb191cFwiKTtcbiAgICAgICAgTGF5YS5BbmltYXRpb24uY3JlYXRlRnJhbWVzKHRoaXMuZ2V0VVJMcyhcImhlcm9cXFxcZG93blwiLDQpLFwiaGVyb19kb3duXCIpO1xuICAgICAgICBMYXlhLkFuaW1hdGlvbi5jcmVhdGVGcmFtZXModGhpcy5nZXRVUkxzKFwiaGVyb1xcXFxsZWZ0XCIsNCksXCJoZXJvX2xlZnRcIik7XG4gICAgICAgIExheWEuQW5pbWF0aW9uLmNyZWF0ZUZyYW1lcyh0aGlzLmdldFVSTHMoXCJoZXJvXFxcXHJpZ2h0XCIsNCksXCJoZXJvX3JpZ2h0XCIpO1xuICAgICAgICB0aGlzLmFuaS5wbGF5KDAsdHJ1ZSxcImhlcm9fcmlnaHRcIik7XG4gICAgICAgIHRoaXMucHJlX2Rpcj1cInJpZ2h0XCJcbiAgICB9XG5cbiAgICBhY3Rpb24oKXtcbiAgICAgICAgLy8tLS0tLS0tLS0gbW92ZW1lbnQgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIGxldCB2eCA9IHRoaXMuZ2V0VigpLng7XG4gICAgICAgIGxldCB2eSA9IHRoaXMuZ2V0VigpLnk7XG5cbiAgICAgICAgdnggLz0gMTA7XG4gICAgICAgIHZ5IC89IDEwO1xuXG4gICAgICAgIC8vIG1vdmVtZW50IGNvbW1hbmQgZGV0ZWN0ZWRcbiAgICAgICAgbGV0IHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuICAgICAgICBpZiAodiA+IDFFLTYpe1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdiA8PSB2X21heFxuICAgICAgICAgICAgbGV0IHZfc2NhbGUgPXRoaXMudl9tYXggLyB2O1xuICAgICAgICAgICAgaWYodl9zY2FsZSA+IDEpe1xuICAgICAgICAgICAgICAgIHZfc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcFggKz0gdnggKiB2X3NjYWxlO1xuICAgICAgICAgICAgdGhpcy5tYXBZICs9IHZ5ICogdl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLSBtb3ZlbWVudCBjb250cm9sIHBhcnQgZW5kIC0tLS0tLS0tLS8vXG5cbiAgICAgICAgLy8tLS0tLS0tLS0gc2hvb3QgY29udHJvbCBwYXJ0IC0tLS0tLS0tLS8vXG4gICAgICAgIFxuICAgICAgICAvLyBTaG9vdGluZyBkZWxheVxuICAgICAgICBpZih0aGlzLnNob290KCkgJiYgdGhpcy5zaG9vdF9wb3dlciA+PSAwICYmICF0aGlzLnNob290X3dhaXRpbmcpe1xuICAgICAgICAgICAgdGhpcy5zaG9vdF93YWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuc2hvb3Rfd2FpdGluZyl7XG4gICAgICAgICAgICBpZih0aGlzLnNob290X3Bvd2VyID4gdGhpcy5tYWluX2d1bi5maXJzdF93YWl0aW5nKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X2V2ZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdF9wb3dlciA9IC10aGlzLm1haW5fZ3VuLnNlY29uZF93YWl0aW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3Rfd2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvb3RfcG93ZXIgPCAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290X3Bvd2VyICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgb3JpZW50YXRpb25cbiAgICAgICAgbGV0IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbiA9IHRoaXMuZ2V0X25lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbigpO1xuICAgICAgICBpZih0aGlzLk9iamVjdF9kbChuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24pID4gMUUtNiApe1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25feCA9IG5lYXJlc3RfbW9uc3Rlcl9vcmllbnRhdGlvbi5keDtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uX3kgPSBuZWFyZXN0X21vbnN0ZXJfb3JpZW50YXRpb24uZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih2ID4gMUUtNil7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl94ID0gdng7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbl95ID0gdnk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyPXRoaXMuZ2V0RGlyKHRoaXMuZGlyZWN0aW9uX3gsdGhpcy5kaXJlY3Rpb25feSx0aGlzLnByZV9kaXIpO1xuICAgICAgICBpZihkaXIhPXRoaXMucHJlX2RpcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hbmkucGxheSgwLHRydWUsXCJoZXJvX1wiK2Rpcik7XG4gICAgICAgICAgICB0aGlzLnByZV9kaXI9ZGlyO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tIHNob290IGNvbnRyb2wgcGFydCBlbmQgLS0tLS0tLS0tLy9cbiAgICB9XG5cbiAgICBnZXRWKCl7XG4gICAgICAgIHJldHVybiB0aGVfc2NyZWVuLmdldFZlbG9zaXR5KCk7XG4gICAgfVxuXG4gICAgc2hvb3QoKXtcbiAgICAgICAgcmV0dXJuIHRoZV9zY3JlZW4uZ2V0U2hvb3QoKTtcbiAgICB9XG5cbiAgICBnZXRfbmVhcmVzdF9tb25zdGVyX29yaWVudGF0aW9uKCl7XG4gICAgICAgIGxldCBtaW5fZGlzdGFuY2UgPSAxRTY7XG4gICAgICAgIGxldCBuZWFyZXN0X21vbnN0ZXIgPSBudWxsO1xuICAgICAgICBmb3IobGV0IHRoZV9tb25zdGVyIG9mIE1vbnN0ZXJfbGlzdCl7XG4gICAgICAgICAgICBpZih0aGlzLmdldF9kaXN0YW5jZSh0aGVfbW9uc3RlcikgPCBtaW5fZGlzdGFuY2Upe1xuICAgICAgICAgICAgICAgIG1pbl9kaXN0YW5jZSA9IHRoaXMuZ2V0X2Rpc3RhbmNlKHRoZV9tb25zdGVyKTtcbiAgICAgICAgICAgICAgICBuZWFyZXN0X21vbnN0ZXIgPSB0aGVfbW9uc3RlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gZXhpc3QgbW9uc3RlclxuICAgICAgICBpZihuZWFyZXN0X21vbnN0ZXIgIT09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgICAgIGR4OiBuZWFyZXN0X21vbnN0ZXIubWFwWCAtIHRoaXMubWFwWCxcbiAgICAgICAgICAgICAgICBkeTogbmVhcmVzdF9tb25zdGVyLm1hcFkgLSB0aGlzLm1hcFlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHg6IDAsXG4gICAgICAgICAgICAgICAgZHk6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob290X2V2ZW50KCl7XG4gICAgICAgIHRoaXMubWFpbl9ndW4uc2hvb3QoKTtcbiAgICB9XG5cbiAgICBnZXRfaGFybSh2YWx1ZSl7XG4gICAgICAgIGlmKHRoaXMuYXJtb3IgPj0gdmFsdWUpe1xuICAgICAgICAgICAgdGhpcy5hcm1vciAtPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5hcm1vciA9IDA7XG4gICAgICAgICAgICB2YWx1ZSAtPSB0aGlzLmFybW9yO1xuICAgICAgICAgICAgdGhpcy5IUCAtPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWQoKXtcblxuICAgIH1cblxuICAgIGJyYW5jaF9yZXNldCgpe1xuICAgICAgICB0aGlzLkhQID0gdGhpcy5IUF9tYXg7XG4gICAgICAgIHRoaXMuYXJtb3IgPSB0aGlzLmFybW9yX21heDtcblxuICAgICAgICB0aGlzLmFuaSA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLmFuaS5sb2FkQXRsYXMoXCJyZXMvL2F0bGFzLy9oZXJvLmF0bGFzXCIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcbiAgICB9XG59Il19
