System.register("chunks:///_virtual/Bottle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, tween, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a2b9boNVmNPr7WM8laSFoUc", "Bottle", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BottleState = exports('BottleState', /*#__PURE__*/function (BottleState) {
        BottleState[BottleState["IDLE"] = 0] = "IDLE";
        BottleState[BottleState["FLYING"] = 1] = "FLYING";
        BottleState[BottleState["LANDED"] = 2] = "LANDED";
        return BottleState;
      }({}));
      var Bottle = exports('Bottle', (_dec = ccclass('Bottle'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Bottle, _Component);
        function Bottle() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._state = BottleState.IDLE;
          return _this;
        }
        var _proto = Bottle.prototype;
        _proto.onLoad = function onLoad() {
          this._state = BottleState.IDLE;
        };
        _proto.getState = function getState() {
          return this._state;
        };
        _proto.flyTo = function flyTo(target, duration, rotationDeg, arcHeight, onComplete) {
          var _this2 = this;
          if (this._state === BottleState.FLYING) return;
          this._state = BottleState.FLYING;
          var start = this.node.position.clone();
          var mid = new Vec3((start.x + target.x) / 2, Math.max(start.y, target.y) + arcHeight, 0);
          var progress = {
            t: 0
          };
          tween(progress).to(duration, {
            t: 1
          }, {
            onUpdate: function onUpdate() {
              var t = progress.t;
              var x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * target.x;
              var y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * target.y;
              _this2.node.setPosition(x, y, 0);
            }
          }).call(function () {
            _this2.node.setPosition(target);
            _this2._state = BottleState.LANDED;
            onComplete();
          }).start();
          tween(this.node).to(duration, {
            angle: this.node.angle + rotationDeg
          }).start();
        };
        return Bottle;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PowerBarController.ts', './Bottle.ts', './StabilityUI.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Prefab, Label, resources, JsonAsset, instantiate, UITransform, Vec3, tween, Component, PowerBarController, GradeType, Bottle, StabilityUI;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Label = module.Label;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      PowerBarController = module.PowerBarController;
      GradeType = module.GradeType;
    }, function (module) {
      Bottle = module.Bottle;
    }, function (module) {
      StabilityUI = module.StabilityUI;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "6819evjpIxCY6LcK38SHLDV", "GameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property({
        type: PowerBarController,
        tooltip: '蓄力条控制器'
      }), _dec3 = property({
        type: StabilityUI,
        tooltip: '稳定值 UI'
      }), _dec4 = property({
        type: Node,
        tooltip: '瓶塔容器（叠好的瓶子放这里）'
      }), _dec5 = property({
        type: Prefab,
        tooltip: '瓶子预制体'
      }), _dec6 = property({
        type: Label,
        tooltip: 'Label_Number（数字，不含"瓶数："文字）'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);
        function GameManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "powerBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "stabilityUI", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "towerContainer", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottlePrefab", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heightLabel", _descriptor5, _assertThisInitialized(_this));
          _this._config = null;
          _this._bottleCount = 0;
          _this._isThrowing = false;
          _this._currentBottle = null;
          _this._bottleHeight = 60;
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.start = function start() {
          this._loadConfig();
        };
        _proto._loadConfig = function _loadConfig() {
          var _this2 = this;
          resources.load('Config/GameConfig', JsonAsset, function (err, asset) {
            if (err) {
              console.warn('GameConfig.json 加载失败:', err.message);
              return;
            }
            _this2._config = asset.json;
            _this2._initGame();
          });
        };
        _proto._initGame = function _initGame() {
          if (!this._config) return;

          // 从预制体读取瓶子高度
          if (this.bottlePrefab) {
            var temp = instantiate(this.bottlePrefab);
            var ui = temp.getComponent(UITransform);
            if (ui) this._bottleHeight = ui.height;
            temp.destroy();
          }
          if (this.stabilityUI) this.stabilityUI.init(this._config.stability.initial);
          if (this.powerBar) this.powerBar.node.on('power-charged', this.onPowerCharged, this);
          this._bottleCount = 0;
          this._spawnBottle();
          this._refreshHeightLabel();
        }

        // ==================== 蓄力回调 ====================
        ;

        _proto.onPowerCharged = function onPowerCharged(value, grade) {
          var _this3 = this;
          if (this._isThrowing || !this._config || !this._currentBottle) return;
          this._isThrowing = true;
          var speedMult = this._getStageSpeed();
          var duration = this._config.bottle.throwDuration / speedMult;
          var offsetX = this._calcOffset(grade);
          var isMiss = grade === GradeType.MISS;

          // TowerContainer 转成 GameManager 本地坐标（瓶子的父空间）
          var towerLocal = this.towerContainer ? new Vec3(this.towerContainer.position.x - this.node.position.x, this.towerContainer.position.y - this.node.position.y, 0) : Vec3.ZERO.clone();
          var bottle = this._currentBottle.getComponent(Bottle);
          if (!bottle) {
            this._isThrowing = false;
            return;
          }
          var arcHeight = 150;
          var target;
          if (isMiss) {
            // ===== Miss =====
            var bottleY = this._currentBottle.position.y;
            var towerTopY = towerLocal.y + this._bottleCount * this._bottleHeight;
            var isRight = offsetX > 0;
            if (isRight) {
              // 右偏移（蓄力 65~100）→ 飞越塔顶，掉到左侧屏外
              arcHeight = 200 + value * 5;
              var overTower = towerTopY - bottleY;
              if (overTower > 0) arcHeight += overTower;
              arcHeight = Math.max(arcHeight, towerTopY - bottleY + 100, 200);
              target = new Vec3(towerLocal.x - (100 + Math.random() * 100), this._config.bottle.fallY, 0);
            } else {
              // 左偏移（蓄力 0~35）→ 飞到塔附近高度，再掉下去
              var ratio = Math.min(value / 35, 1);
              var peakY = bottleY + (towerTopY - bottleY - 10) * ratio;
              arcHeight = Math.max(20, peakY - bottleY);
              target = new Vec3(towerLocal.x - (80 + Math.random() * 100), peakY, 0);
            }
          } else {
            // ===== Perfect / Good =====
            target = new Vec3(towerLocal.x + offsetX, towerLocal.y + this._bottleCount * this._bottleHeight, 0);
          }
          var adjustedDuration = Math.max(duration * (1 - value / 100 * 0.4), 0.3);
          bottle.flyTo(target, adjustedDuration, this._config.bottle.rotationDegrees, arcHeight, function () {
            return _this3._onBottleLanded(grade);
          });
        };
        _proto._onBottleLanded = function _onBottleLanded(grade) {
          var _this$_config$stabili,
            _this4 = this;
          if (!this._config) return;
          var costKey = grade;
          var cost = (_this$_config$stabili = this._config.stability.cost[costKey]) != null ? _this$_config$stabili : 0;
          if (this.stabilityUI) {
            var remain = this.stabilityUI.reduce(cost);
            if (remain <= 0) console.log('稳定值归零');
          }
          if (grade === GradeType.MISS) {
            if (this._currentBottle) {
              if (this._currentBottle.position.y > this._config.bottle.fallY + 30) {
                // 还在屏幕上 → 先掉到屏外再销毁
                var dropX = this._currentBottle.position.x;
                tween(this._currentBottle).to(0.4, {
                  position: new Vec3(dropX, this._config.bottle.fallY, 0)
                }).call(function () {
                  _this4._currentBottle.destroy();
                  _this4._currentBottle = null;
                  _this4._refreshHeightLabel();
                  _this4._spawnBottle();
                  _this4._isThrowing = false;
                }).start();
                return;
              }
              this._currentBottle.destroy();
              this._currentBottle = null;
            }
          } else {
            // 瓶子已经落在正确的世界位置，只需换父节点
            if (this._currentBottle && this.towerContainer) {
              this._currentBottle.parent = this.towerContainer;
              // Cocos Creator 自动保持世界位置不变，所以本地坐标自动算对
            }

            this._bottleCount++;
            this._currentBottle = null;
          }
          this._refreshHeightLabel();
          this._spawnBottle();
          this._isThrowing = false;
        }

        // ==================== 工具 ====================
        ;

        _proto._calcOffset = function _calcOffset(grade) {
          if (!this._config) return 0;
          switch (grade) {
            case GradeType.PERFECT:
              return 0;
            case GradeType.GOOD:
              return (Math.random() * 2 - 1) * this._config.bottle.goodOffset;
            case GradeType.MISS:
              var off = this._config.bottle.missOffset;
              return (Math.random() > 0.5 ? 1 : -1) * (off + Math.random() * 50);
            default:
              return 0;
          }
        };
        _proto._getStageSpeed = function _getStageSpeed() {
          if (!this._config) return 1;
          for (var _iterator = _createForOfIteratorHelperLoose(this._config.stages), _step; !(_step = _iterator()).done;) {
            var s = _step.value;
            if (this._bottleCount < s.maxBottles) return s.speedMult;
          }
          return 1;
        };
        _proto._spawnBottle = function _spawnBottle() {
          if (!this._config || !this.bottlePrefab) return;
          var node = instantiate(this.bottlePrefab);
          node.parent = this.node;
          node.setPosition(this._config.bottle.startPos.x, this._config.bottle.startPos.y, 0);
          node.angle = 0;
          this._currentBottle = node;
          if (!node.getComponent(Bottle)) node.addComponent(Bottle);
        };
        _proto._refreshHeightLabel = function _refreshHeightLabel() {
          if (this.heightLabel) this.heightLabel.string = "" + this._bottleCount;
        };
        return GameManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "powerBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stabilityUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "towerContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bottlePrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "heightLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Bottle.ts', './GameManager.ts', './StabilityUI.ts', './PauseButton.ts', './PowerBarController.ts', './RestartGame.ts', './ResumeButton.ts', './SceneSwitchButton.ts', './StabilityMonitor.ts', './ValueSlot.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PauseButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Node, Button, AudioSource, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      Node = module.Node;
      Button = module.Button;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "fdd1cFkAW9NwpQhxBJ8Fdwb", "PauseButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var PauseButton = exports('PauseButton', (_dec = ccclass('PauseButton'), _dec2 = menu('Button/PauseButton'), _dec3 = property({
        type: AudioClip
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PauseButton, _Component);
        function PauseButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "clickAudio", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameLayer", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pausePanel", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = PauseButton.prototype;
        _proto.start = function start() {
          if (this.pausePanel) {
            this.pausePanel.active = false;
          }
          var btn = this.getComponent(Button);
          if (btn) {
            btn.node.on(Button.EventType.CLICK, this.onPause, this);
          }
        };
        _proto.onPause = function onPause() {
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          if (this.gameLayer) {
            this.gameLayer.active = false;
          }
          director.getScheduler().setTimeScale(0);
          if (this.pausePanel) {
            this.pausePanel.active = true;
          }
        };
        return PauseButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickAudio", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pausePanel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PowerBarController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, CCInteger, CCFloat, Node, Label, UITransform, Vec2, input, EventMouse, resources, JsonAsset, Sprite, Color, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      CCFloat = module.CCFloat;
      Node = module.Node;
      Label = module.Label;
      UITransform = module.UITransform;
      Vec2 = module.Vec2;
      input = module.input;
      EventMouse = module.EventMouse;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
      Sprite = module.Sprite;
      Color = module.Color;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;
      cclegacy._RF.push({}, "17655ZKjfBKOb3ErnCw2gkc", "PowerBarController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GradeType = exports('GradeType', /*#__PURE__*/function (GradeType) {
        GradeType["PERFECT"] = "Perfect";
        GradeType["GOOD"] = "Good";
        GradeType["MISS"] = "Miss";
        return GradeType;
      }({}));
      var PowerBarController = exports('PowerBarController', (_dec = ccclass('PowerBarController'), _dec2 = property({
        type: CCInteger,
        min: 0,
        max: 100,
        tooltip: 'Perfect 最小蓄力值'
      }), _dec3 = property({
        type: CCInteger,
        min: 0,
        max: 100,
        tooltip: 'Perfect 最大蓄力值'
      }), _dec4 = property({
        type: CCInteger,
        min: 0,
        max: 100,
        tooltip: 'Good 最小蓄力值'
      }), _dec5 = property({
        type: CCInteger,
        min: 0,
        max: 100,
        tooltip: 'Good 最大蓄力值'
      }), _dec6 = property({
        type: CCFloat,
        tooltip: '蓄力指针移动速度(值/秒)'
      }), _dec7 = property({
        tooltip: '是否从 JSON 加载配置'
      }), _dec8 = property({
        type: Node,
        tooltip: '蓄力条容器（色块/指针/填充条都放它下面）'
      }), _dec9 = property({
        type: Node,
        tooltip: '指针节点（必须是 BarContainer 的子节点）'
      }), _dec10 = property({
        type: Node,
        tooltip: '填充条节点（必须是 BarContainer 的子节点）'
      }), _dec11 = property({
        type: Label,
        tooltip: '当前等级文本'
      }), _dec12 = property({
        type: Node,
        tooltip: 'MissLeft'
      }), _dec13 = property({
        type: Node,
        tooltip: 'GoodLeft'
      }), _dec14 = property({
        type: Node,
        tooltip: 'Perfect'
      }), _dec15 = property({
        type: Node,
        tooltip: 'GoodRight'
      }), _dec16 = property({
        type: Node,
        tooltip: 'MissRight'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PowerBarController, _Component);
        function PowerBarController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // ==================== 等级阈值配置 ====================
          _initializerDefineProperty(_this, "perfectMin", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "perfectMax", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goodMin", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goodMax", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speed", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "useConfigFile", _descriptor6, _assertThisInitialized(_this));
          // ==================== UI 节点引用 ====================
          _initializerDefineProperty(_this, "barContainer", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pointer", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fillBar", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gradeLabel", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zoneMissLeft", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zoneGoodLeft", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zonePerfect", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zoneGoodRight", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zoneMissRight", _descriptor15, _assertThisInitialized(_this));
          // ==================== 内部状态 ====================
          _this._currentValue = 0;
          _this._direction = 1;
          _this._isCharging = false;
          _this._barWidth = 200;
          return _this;
        }
        var _proto = PowerBarController.prototype;
        _proto.onLoad = function onLoad() {
          this._readBarWidth();

          // 蓄力条左边缘在 BarContainer 本地坐标中的 X
          // BarContainer 默认 anchor(0.5,0.5)，所以左边缘 = -barWidth/2
          if (this.fillBar) {
            var t = this.fillBar.getComponent(UITransform);
            if (t) {
              t.anchorPoint = new Vec2(0, 0.5);
            }
          }

          // 注册鼠标事件（使用字符串类型避免枚举兼容问题）
          input.on('mouse-down', this.onMouseDown, this);
          input.on('mouse-up', this.onMouseUp, this);
        };
        _proto.onDestroy = function onDestroy() {
          input.off('mouse-down', this.onMouseDown, this);
          input.off('mouse-up', this.onMouseUp, this);
        };
        _proto.start = function start() {
          var _this2 = this;
          var done = function done() {
            _this2._setupZones();
            _this2._updatePointerPosition();
            _this2._updateGradeDisplay();
          };
          if (this.useConfigFile) {
            this._loadConfig(done);
          } else {
            done();
          }
        };
        _proto.update = function update(dt) {
          if (!this._isCharging) return;
          this._currentValue += this.speed * dt * this._direction;
          if (this._currentValue >= 100) {
            this._currentValue = 100;
            this._direction = -1;
          } else if (this._currentValue <= 0) {
            this._currentValue = 0;
            this._direction = 1;
          }
          this._updatePointerPosition();
          this._updateGradeDisplay();
        }

        // ==================== 鼠标事件 ====================
        ;

        _proto.onMouseDown = function onMouseDown(evt) {
          if (evt.getButton() === EventMouse.BUTTON_LEFT) {
            console.log('鼠标按下，开始蓄力');
            this.startCharging();
          }
        };
        _proto.onMouseUp = function onMouseUp(evt) {
          if (evt.getButton() === EventMouse.BUTTON_LEFT) {
            console.log('鼠标松开，停止蓄力');
            this.stopCharging();
          }
        }

        // ==================== JSON 配置加载 ====================
        ;

        _proto._loadConfig = function _loadConfig(cb) {
          var _this3 = this;
          resources.load('Config/PowerBarConfig', JsonAsset, function (err, asset) {
            if (err) {
              console.warn("\u52A0\u8F7D PowerBarConfig.json \u5931\u8D25: " + err.message);
              cb();
              return;
            }
            var cfg = asset.json;
            if (cfg.zones) {
              for (var _iterator = _createForOfIteratorHelperLoose(cfg.zones), _step; !(_step = _iterator()).done;) {
                var z = _step.value;
                switch (z.name) {
                  case 'GoodLeft':
                    _this3.goodMin = z.min;
                    break;
                  case 'GoodRight':
                    _this3.goodMax = z.max;
                    break;
                  case 'Perfect':
                    _this3.perfectMin = z.min;
                    _this3.perfectMax = z.max;
                    break;
                }
              }
            }
            if (cfg.speed) _this3.speed = cfg.speed;
            console.log('PowerBar 配置已从 JSON 加载');
            cb();
          });
        }

        // ==================== 色块布局 ====================
        ;

        _proto._readBarWidth = function _readBarWidth() {
          if (this.barContainer) {
            var t = this.barContainer.getComponent(UITransform);
            if (t) {
              this._barWidth = t.width;
            }
          }
        };
        _proto._setupZones = function _setupZones() {
          if (!this.barContainer) {
            return;
          }
          this._readBarWidth();
          var t = this.barContainer.getComponent(UITransform);
          if (!t) {
            return;
          }
          var totalWidth = t.width;
          var height = t.height;
          var defs = [{
            node: this.zoneMissLeft,
            min: 0,
            max: this.goodMin,
            color: [255, 80, 80]
          }, {
            node: this.zoneGoodLeft,
            min: this.goodMin,
            max: this.perfectMin,
            color: [255, 255, 100]
          }, {
            node: this.zonePerfect,
            min: this.perfectMin,
            max: this.perfectMax,
            color: [100, 255, 100]
          }, {
            node: this.zoneGoodRight,
            min: this.perfectMax,
            max: this.goodMax,
            color: [255, 255, 100]
          }, {
            node: this.zoneMissRight,
            min: this.goodMax,
            max: 100,
            color: [255, 80, 80]
          }];
          for (var _i = 0, _defs = defs; _i < _defs.length; _i++) {
            var d = _defs[_i];
            if (!d.node) {
              continue;
            }
            var sp = d.node.getComponent(Sprite);
            if (sp) {
              sp.color = new Color(d.color[0], d.color[1], d.color[2]);
            }
            var ut = d.node.getComponent(UITransform);
            if (ut) {
              ut.width = (d.max - d.min) / 100 * totalWidth;
              ut.height = height;
            }
            var center = (d.min + d.max) / 2;
            d.node.setPosition(new Vec3(center / 100 * totalWidth - totalWidth / 2, 0, 0));
          }
        }

        // ==================== 公开方法 ====================
        ;

        _proto.startCharging = function startCharging() {
          this._isCharging = true;
          this._currentValue = 0;
          this._direction = 1;
        };
        _proto.stopCharging = function stopCharging() {
          if (!this._isCharging) return this._currentValue;
          this._isCharging = false;
          var grade = this.getGrade();
          console.log("\u84C4\u529B\u503C: " + this._currentValue.toFixed(1) + ", \u7B49\u7EA7: " + grade);
          this.node.emit('power-charged', this._currentValue, grade);
          return this._currentValue;
        };
        _proto.getGrade = function getGrade() {
          if (this._currentValue >= this.perfectMin && this._currentValue <= this.perfectMax) {
            return GradeType.PERFECT;
          } else if (this._currentValue >= this.goodMin && this._currentValue <= this.goodMax) {
            return GradeType.GOOD;
          } else {
            return GradeType.MISS;
          }
        };
        _proto.getCurrentValue = function getCurrentValue() {
          return this._currentValue;
        };
        _proto.isCharging = function isCharging() {
          return this._isCharging;
        };
        _proto.refreshZones = function refreshZones() {
          this._setupZones();
        }

        // ==================== 内部更新 ====================
        ;

        _proto._updatePointerPosition = function _updatePointerPosition() {
          if (!this.barContainer) return;
          // 指针位置
          if (this.pointer) {
            var x = this._currentValue / 100 * this._barWidth - this._barWidth / 2;
            this.pointer.setPosition(new Vec3(x, 0, 0));
          }
          // 填充条宽度（左边缘固定在 -barWidth/2）
          if (this.fillBar) {
            var t = this.fillBar.getComponent(UITransform);
            if (t) {
              t.width = this._currentValue / 100 * this._barWidth;
            }
            this.fillBar.setPosition(new Vec3(-this._barWidth / 2, 0, 0));
          }
        };
        _proto._updateGradeDisplay = function _updateGradeDisplay() {
          if (this.gradeLabel) {
            var grade = this.getGrade();
            this.gradeLabel.string = grade;
            switch (grade) {
              case GradeType.PERFECT:
                this.gradeLabel.color = Color.GREEN;
                break;
              case GradeType.GOOD:
                this.gradeLabel.color = Color.YELLOW;
                break;
              case GradeType.MISS:
                this.gradeLabel.color = Color.RED;
                break;
            }
          }
        };
        return PowerBarController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "perfectMin", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 45;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "perfectMax", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 55;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "goodMin", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 35;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "goodMax", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 65;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 80;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "useConfigFile", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "barContainer", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pointer", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fillBar", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "gradeLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "zoneMissLeft", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "zoneGoodLeft", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "zonePerfect", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "zoneGoodRight", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "zoneMissRight", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RestartGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Button, AudioSource, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      Button = module.Button;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "76ca0mcDWVP/YzlrsjwCAyQ", "RestartGame", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var RestartGame = exports('RestartGame', (_dec = ccclass('RestartGame'), _dec2 = menu('Button/RestartGame'), _dec3 = property({
        type: AudioClip
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RestartGame, _Component);
        function RestartGame() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "clickAudio", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sceneName", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = RestartGame.prototype;
        _proto.start = function start() {
          var btn = this.getComponent(Button);
          if (btn) {
            btn.node.on(Button.EventType.CLICK, this.onClick, this);
          }
        };
        _proto.onClick = function onClick() {
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          if (this.sceneName) {
            director.loadScene(this.sceneName);
          }
        };
        return RestartGame;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickAudio", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sceneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResumeButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Node, Button, AudioSource, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      Node = module.Node;
      Button = module.Button;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "566d22oS6lJjrpqXni7S8VS", "ResumeButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ResumeButton = exports('ResumeButton', (_dec = ccclass('ResumeButton'), _dec2 = menu('Button/ResumeButton'), _dec3 = property({
        type: AudioClip
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResumeButton, _Component);
        function ResumeButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "clickAudio", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameLayer", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pausePanel", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ResumeButton.prototype;
        _proto.start = function start() {
          var btn = this.getComponent(Button);
          if (btn) {
            btn.node.on(Button.EventType.CLICK, this.onResume, this);
          }
        };
        _proto.onResume = function onResume() {
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          director.getScheduler().setTimeScale(1);
          if (this.gameLayer) {
            this.gameLayer.active = true;
          }
          if (this.pausePanel) {
            this.pausePanel.active = false;
          }
        };
        return ResumeButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickAudio", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pausePanel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SceneSwitchButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, AudioClip, Button, AudioSource, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      AudioClip = module.AudioClip;
      Button = module.Button;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "17618l8zopHa5j+NwDoPyip", "SceneSwitchButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var SceneSwitchButton = exports('SceneSwitchButton', (_dec = ccclass('SceneSwitchButton'), _dec2 = menu('Button/SceneSwitchButton'), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: AudioClip
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SceneSwitchButton, _Component);
        function SceneSwitchButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "sceneName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "targetNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "clickAudio", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SceneSwitchButton.prototype;
        _proto.start = function start() {
          var btn = this.getComponent(Button);
          if (btn) {
            btn.node.on(Button.EventType.CLICK, this.onClick, this);
          }
        };
        _proto.onClick = function onClick() {
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          if (this.sceneName) {
            director.loadScene(this.sceneName);
          }
        };
        return SceneSwitchButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sceneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clickAudio", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StabilityMonitor.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "a3389887ndCLZePhUOX3rpZ", "StabilityMonitor", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var StabilityMonitor = exports('StabilityMonitor', (_dec = ccclass('StabilityMonitor'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StabilityMonitor, _Component);
        function StabilityMonitor() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "stabilityLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameOverNode", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = StabilityMonitor.prototype;
        _proto.start = function start() {
          if (this.gameOverNode) {
            this.gameOverNode.active = false;
          }
        };
        _proto.update = function update() {
          if (!this.stabilityLabel || !this.gameOverNode) return;
          var label = this.stabilityLabel.getComponent(Label);
          if (!label) return;
          this.gameOverNode.active = label.string === '0';
        };
        return StabilityMonitor;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stabilityLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameOverNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StabilityUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, ProgressBar, CCInteger, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
      CCInteger = module.CCInteger;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "abdddd/RQhLL5NlXeHDE2Un", "StabilityUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var StabilityUI = exports('StabilityUI', (_dec = ccclass('StabilityUI'), _dec2 = property({
        type: Label,
        tooltip: '稳定值数字文本'
      }), _dec3 = property({
        type: ProgressBar,
        tooltip: '稳定值进度条（可选）'
      }), _dec4 = property({
        type: CCInteger,
        min: 0,
        max: 100
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StabilityUI, _Component);
        function StabilityUI() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "valueLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "progressBar", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_current", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = StabilityUI.prototype;
        _proto.onLoad = function onLoad() {
          if (!this.progressBar) {
            this.progressBar = this.getComponent(ProgressBar);
          }
        };
        /** 初始化 / 重置 */
        _proto.init = function init(value) {
          this._current = value;
          this._refresh();
        }

        /** 扣减稳定值（返回扣减后的值） */;
        _proto.reduce = function reduce(amount) {
          this._current = Math.max(0, this._current - amount);
          this._refresh();
          return this._current;
        }

        /** 增加稳定值 */;
        _proto.add = function add(amount) {
          this._current = Math.min(100, this._current + amount);
          this._refresh();
          return this._current;
        };
        _proto._refresh = function _refresh() {
          if (this.valueLabel) {
            this.valueLabel.string = "" + this._current;
          }
          if (this.progressBar) {
            this.progressBar.progress = this._current / 100;
          }
        };
        _createClass(StabilityUI, [{
          key: "value",
          get: function get() {
            return this._current;
          }
        }]);
        return StabilityUI;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "valueLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_current", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ValueSlot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, UITransform, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "7daacO+r6RCeroE8A+p/tsk", "ValueSlot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ValueSlot = exports('ValueSlot', (_dec = ccclass('ValueSlot'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ValueSlot, _Component);
        function ValueSlot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "textLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "valueNode", _descriptor3, _assertThisInitialized(_this));
          _this._valueLabel = null;
          return _this;
        }
        var _proto = ValueSlot.prototype;
        _proto.onLoad = function onLoad() {
          if (!this.valueNode) {
            var _this$textLabel$color, _this$textLabel, _this$textLabel$horiz, _this$textLabel2;
            this.valueNode = new Node('Value');
            this.valueNode.addComponent(UITransform);
            this._valueLabel = this.valueNode.addComponent(Label);
            this._valueLabel.fontSize = 36;
            this._valueLabel.color = (_this$textLabel$color = (_this$textLabel = this.textLabel) == null ? void 0 : _this$textLabel.color) != null ? _this$textLabel$color : this._valueLabel.color;
            this._valueLabel.horizontalAlign = (_this$textLabel$horiz = (_this$textLabel2 = this.textLabel) == null ? void 0 : _this$textLabel2.horizontalAlign) != null ? _this$textLabel$horiz : Label.HorizontalAlign.LEFT;
            this._valueLabel.verticalAlign = Label.VerticalAlign.CENTER;
            this.node.addChild(this.valueNode);
          } else {
            this._valueLabel = this.valueNode.getComponent(Label);
          }
          this.refresh();
        };
        _proto.start = function start() {
          var _this$textLabel$node$, _this$textLabel3;
          var pos = (_this$textLabel$node$ = (_this$textLabel3 = this.textLabel) == null ? void 0 : _this$textLabel3.node.position) != null ? _this$textLabel$node$ : Vec3.ZERO;
          this.valueNode.setPosition(pos.x, pos.y - 60, pos.z);
          this.refresh();
        };
        _proto.refresh = function refresh() {
          if (this._valueLabel) {
            this._valueLabel.string = String(this.value);
          }
        };
        _proto.setValue = function setValue(v) {
          this.value = v;
          this.refresh();
        };
        return ValueSlot;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "textLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "valueNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});