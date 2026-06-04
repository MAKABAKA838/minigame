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

System.register("chunks:///_virtual/BottleLandEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, resources, Texture2D, SpriteFrame, Node, Sprite, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "a6d31GwgUFGmq4DQ+7SzMTj", "BottleLandEffect", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var BottleLandEffect = exports('BottleLandEffect', (_dec = ccclass('BottleLandEffect'), _dec2 = menu('Effects/BottleLandEffect'), _dec3 = property({
        tooltip: 'Perfect 序列帧文件夹路径（如 images/Perfect）'
      }), _dec4 = property({
        tooltip: 'Good 序列帧文件夹路径（如 images/Good）'
      }), _dec5 = property({
        tooltip: 'Miss 序列帧文件夹路径（如 images/Miss）'
      }), _dec6 = property({
        tooltip: '播放帧率'
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BottleLandEffect, _Component);
        function BottleLandEffect() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "perfectPath", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goodPath", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "missPath", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fps", _descriptor4, _assertThisInitialized(_this));
          _this._cache = new Map();
          _this._loading = new Map();
          return _this;
        }
        var _proto = BottleLandEffect.prototype;
        _proto.play = function play(grade, bottle, onFinish) {
          var _this2 = this;
          var path = this._getPath(grade);
          if (!path) {
            onFinish();
            return;
          }
          var cached = this._cache.get(path);
          if (cached) {
            this._playFrames(cached, bottle, onFinish);
            return;
          }
          if (this._loading.get(path)) {
            this.scheduleOnce(function () {
              return _this2.play(grade, bottle, onFinish);
            }, 0.1);
            return;
          }
          this._loading.set(path, true);
          resources.loadDir(path, Texture2D, function (err, textures) {
            _this2._loading.set(path, false);
            if (err || !textures || textures.length === 0) {
              console.warn("\u52A0\u8F7D\u5E8F\u5217\u5E27\u5931\u8D25: " + path, err == null ? void 0 : err.message);
              onFinish();
              return;
            }
            textures.sort(function (a, b) {
              var na = _this2._extractNum(a.name);
              var nb = _this2._extractNum(b.name);
              return na - nb;
            });
            var frames = textures.map(function (t) {
              var sf = new SpriteFrame();
              sf.texture = t;
              return sf;
            });
            _this2._cache.set(path, frames);
            _this2._playFrames(frames, bottle, onFinish);
          });
        };
        _proto._playFrames = function _playFrames(frames, bottle, onFinish) {
          var fx = new Node('LandFX');
          fx.parent = bottle.parent;
          fx.worldPosition = bottle.worldPosition;
          var sprite = fx.addComponent(Sprite);
          sprite.spriteFrame = frames[0];
          var index = 1;
          var interval = 1 / this.fps;
          this.schedule(function () {
            sprite.spriteFrame = frames[index];
            index++;
            if (index >= frames.length) {
              fx.destroy();
              onFinish();
            }
          }, interval, frames.length - 1);
        };
        _proto._extractNum = function _extractNum(name) {
          var m = name.match(/\d+/);
          return m ? parseInt(m[0], 10) : 0;
        };
        _proto._getPath = function _getPath(grade) {
          switch (grade) {
            case 'Perfect':
              return this.perfectPath;
            case 'Good':
              return this.goodPath;
            case 'Miss':
              return this.missPath;
            default:
              return '';
          }
        };
        return BottleLandEffect;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "perfectPath", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "goodPath", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "missPath", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fps", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 12;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, resources, SpriteFrame, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a865aO72RNAVZAebD58hiyq", "EffectController", undefined);
      var ccclass = _decorator.ccclass;
      var EffectController = exports('EffectController', (_dec = ccclass('EffectController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectController, _Component);
        function EffectController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._sprite = null;
          _this._frames = [];
          _this._index = 0;
          _this._elapsed = 0;
          _this._duration = 0.5;
          _this._onEnd = null;
          return _this;
        }
        var _proto = EffectController.prototype;
        _proto.onLoad = function onLoad() {
          this._sprite = this.getComponent(Sprite);
          this.node.active = false;
        };
        _proto.play = function play(grade, duration, onEnd) {
          var _this2 = this;
          if (duration === void 0) {
            duration = 0.5;
          }
          this._frames = [];
          this._index = 0;
          this._elapsed = 0;
          this._duration = duration;
          this._onEnd = onEnd;
          var dir = grade === 'Perfect' ? 'Effect/perfect' : grade === 'Good' ? 'Effect/good' : 'Effect/miss';
          console.error("[EFFECT] \u52A0\u8F7D\u5E8F\u5217\u5E27: " + dir);
          resources.loadDir(dir, SpriteFrame, function (err, frames) {
            if (err) {
              console.warn('加载动效帧失败:', err);
              return;
            }
            console.error("[EFFECT] \u52A0\u8F7D\u6210\u529F: " + frames.length + " \u5E27");
            _this2._frames = frames;
            _this2.node.active = true;
            _this2._showFrame(0);
          });
        };
        _proto.update = function update(dt) {
          if (this._frames.length === 0) return;
          this._elapsed += dt;
          var seg = this._duration / this._frames.length;
          var idx = Math.min(Math.floor(this._elapsed / seg), this._frames.length - 1);
          if (idx !== this._index) {
            this._index = idx;
            this._showFrame(idx);
          }
          if (this._elapsed >= this._duration) {
            this._frames = [];
            this.node.active = false;
            if (this._onEnd) {
              this._onEnd();
              this._onEnd = null;
            }
          }
        };
        _proto._showFrame = function _showFrame(idx) {
          if (this._sprite && idx < this._frames.length) {
            this._sprite.spriteFrame = this._frames[idx];
          }
        };
        return EffectController;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PowerBarController.ts', './Bottle.ts', './StabilityUI.ts', './HandController.ts', './EffectController.ts', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Prefab, Label, Camera, AudioClip, resources, JsonAsset, instantiate, UITransform, AudioSource, Vec3, tween, Component, PowerBarController, GradeType, Bottle, StabilityUI, HandController, EffectController, GamePause;
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
      Camera = module.Camera;
      AudioClip = module.AudioClip;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      AudioSource = module.AudioSource;
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
    }, function (module) {
      HandController = module.HandController;
    }, function (module) {
      EffectController = module.EffectController;
    }, function (module) {
      GamePause = module.GamePause;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19;
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
      }), _dec7 = property({
        type: HandController,
        tooltip: '手臂控制器'
      }), _dec8 = property({
        type: Camera,
        tooltip: '主摄像机（从场景拖入）'
      }), _dec9 = property({
        tooltip: '从第几瓶开始，TowerContainer 每叠一瓶下移一个瓶高'
      }), _dec10 = property({
        tooltip: '从第几瓶开始，每叠一瓶销毁最老的瓶子'
      }), _dec11 = property({
        type: Node,
        tooltip: '背景图节点（Canvas 下的 Bg）'
      }), _dec12 = property({
        type: AudioClip,
        tooltip: '扔瓶音效'
      }), _dec13 = property({
        type: AudioClip,
        tooltip: 'Perfect 音效'
      }), _dec14 = property({
        type: AudioClip,
        tooltip: 'Good 音效'
      }), _dec15 = property({
        type: AudioClip,
        tooltip: 'Miss 音效'
      }), _dec16 = property({
        type: AudioClip,
        tooltip: '背景音乐'
      }), _dec17 = property({
        type: Node,
        tooltip: '抛瓶动效节点（EffectController）'
      }), _dec18 = property({
        tooltip: '触发强制 Perfect 模式所需的连续 Perfect 次数（默认 5）'
      }), _dec19 = property({
        tooltip: '强制 Perfect 模式持续时间（秒，默认 3）'
      }), _dec20 = property({
        type: Node,
        tooltip: '强制 Perfect 模式提示节点（激活/隐藏）'
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
          _initializerDefineProperty(_this, "handController", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mainCamera", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "startMoveBottleCount", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "startDestroyBottleCount", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgNode", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sfxThrow", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sfxPerfect", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sfxGood", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sfxMiss", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgm", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "effectNode", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "forcePerfectStreak", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "forcePerfectDuration", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "forcePerfectIndicator", _descriptor19, _assertThisInitialized(_this));
          _this._config = null;
          _this._bottleCount = 0;
          _this._isThrowing = false;
          _this._currentBottle = null;
          _this._bottleHeight = 60;
          _this._initialTowerLocalY = 0;
          _this._bgInitialY = 0;
          _this._bgMinY = -99999;
          _this._consecutivePerfects = 0;
          _this._isForcePerfectMode = false;
          _this._forcePerfectTimer = 0;
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.start = function start() {
          GamePause.reset();
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
            if (ui) this._bottleHeight = ui.height || 60;
            temp.destroy();
          }
          console.error("[INIT] _bottleHeight = " + this._bottleHeight);
          console.error("[INIT] TowerContainer world(Y)=" + (this.towerContainer ? this.towerContainer.worldPosition.y : '?') + " GameManager world(Y)=" + this.node.worldPosition.y);
          if (this.stabilityUI) this.stabilityUI.init(this._config.stability.initial);
          if (this.powerBar) {
            this.powerBar.node.on('power-charged', this.onPowerCharged, this);
            this._randomizePerfectZone();
          }
          this._bottleCount = 0;
          this._consecutivePerfects = 0;
          this._isForcePerfectMode = false;
          this._forcePerfectTimer = 0;
          this._initialTowerLocalY = this.towerContainer ? this.towerContainer.position.y - this.node.position.y : 0;

          // 记录背景初始 Y，计算可下移的最小 Y
          if (this.bgNode) {
            this._bgInitialY = this.bgNode.position.y;
            var bgTf = this.bgNode.getComponent(UITransform);
            var bgHeight = bgTf ? bgTf.height : 0;
            var scaleY = this.bgNode.scale.y;

            // 向上遍历找 Canvas 节点获取屏幕高度
            var screenHeight = 1334;
            var walk = this.bgNode.parent;
            while (walk) {
              var ut = walk.getComponent(UITransform);
              if (ut) {
                screenHeight = ut.height;
                break;
              }
              walk = walk.parent;
            }
            var maxDown = Math.max(0, bgHeight * scaleY - screenHeight);
            this._bgMinY = this._bgInitialY - maxDown;
            console.error("[INIT] bgInitialY=" + this._bgInitialY + " bgHeight=" + bgHeight + " scaleY=" + scaleY + " screenHeight=" + screenHeight + " maxDown=" + maxDown + " bgMinY=" + this._bgMinY);
          }
          this._spawnBottle();
          this._refreshHeightLabel();

          // 开始背景音乐
          if (this.bgm) {
            var as = this.node.getComponent(AudioSource);
            if (as) {
              as.clip = this.bgm;
              as.loop = true;
              as.play();
            }
          }
        }

        // ==================== 蓄力回调 ====================
        ;

        _proto.onPowerCharged = function onPowerCharged(value, grade) {
          var _this3 = this;
          if (this._isThrowing || !this._config || !this._currentBottle) return;
          var effectiveGrade = this._isForcePerfectMode ? GradeType.PERFECT : grade;
          this._isThrowing = true;
          if (this.powerBar) this.powerBar.setCanCharge(false);
          var speedMult = this._getStageSpeed();
          var duration = this._config.bottle.throwDuration / speedMult;
          var offsetX = this._calcOffset(effectiveGrade);
          var isMiss = effectiveGrade === GradeType.MISS;

          // TowerContainer 转成 GameManager 本地坐标
          var towerLocal = this.towerContainer ? new Vec3(this.towerContainer.position.x - this.node.position.x, this.towerContainer.position.y - this.node.position.y, 0) : Vec3.ZERO.clone();

          // 瓶子起点（世界坐标 → GameManager 本地坐标）
          var bottleWorldPos = this._currentBottle.worldPosition.clone();
          var gmWorldPos = this.node.worldPosition.clone();
          var bottleLocalY = bottleWorldPos.y - gmWorldPos.y;
          var bottle = this._currentBottle.getComponent(Bottle);
          if (!bottle) {
            this._isThrowing = false;
            return;
          }
          var arcHeight = 150;
          var target;
          if (isMiss) {
            var towerTopY = towerLocal.y + this._bottleCount * this._bottleHeight;
            var isRight = offsetX > 0;
            if (isRight) {
              arcHeight = 200 + value * 5;
              var overTower = towerTopY - bottleLocalY;
              if (overTower > 0) arcHeight += overTower;
              arcHeight = Math.max(arcHeight, towerTopY - bottleLocalY + 100, 200);
              target = new Vec3(towerLocal.x - (100 + Math.random() * 100), this._config.bottle.fallY, 0);
            } else {
              var ratio = Math.min(value / 35, 1);
              var peakY = bottleLocalY + (towerTopY - bottleLocalY - 10) * ratio;
              arcHeight = Math.max(20, peakY - bottleLocalY);
              target = new Vec3(towerLocal.x - (80 + Math.random() * 100), peakY, 0);
            }
          } else {
            // 用初始 towerLocalY（容器下移前的值），确保每个瓶子落在不同的 y 位置
            target = new Vec3(towerLocal.x + offsetX, this._initialTowerLocalY + this._bottleCount * this._bottleHeight, 0);
            console.error("[TARGET] towerLocal=(" + towerLocal.x + "," + towerLocal.y + ") initial=" + this._initialTowerLocalY + " count=" + this._bottleCount + " h=" + this._bottleHeight + " targetGM=(" + target.x + "," + target.y + ") targetWorldY=" + (this.node.worldPosition.y + target.y));
          }
          var adjustedDuration = Math.max(duration * (1 - value / 100 * 0.4), 0.3);

          // 投掷音效
          var as = this.node.getComponent(AudioSource);
          if (this.sfxThrow && as) as.playOneShot(this.sfxThrow, 1);

          // === 有手臂 → 先挥手动画，脱手后飞出去 ===
          if (this.handController) {
            this.handController.playThrow(function () {
              // 脱手：从手掌分离，设到 GameManager 下
              _this3._currentBottle.parent = _this3.node;
              _this3._currentBottle.angle = 0;
              // 同步位置（换父节点后 Cocos Creator 自动保持世界位置）
              bottle.flyTo(target, adjustedDuration, _this3._config.bottle.rotationDegrees, arcHeight, function () {
                return _this3._onBottleLanded(effectiveGrade);
              });
            });
          } else {
            // 无手臂 → 直接飞
            bottle.flyTo(target, adjustedDuration, this._config.bottle.rotationDegrees, arcHeight, function () {
              return _this3._onBottleLanded(effectiveGrade);
            });
          }
        };
        _proto._onBottleLanded = function _onBottleLanded(grade) {
          var _sfxMap,
            _this$_config$stabili,
            _this4 = this;
          if (!this._config) return;

          // 结果音效
          var as = this.node.getComponent(AudioSource);
          var sfxMap = (_sfxMap = {}, _sfxMap[GradeType.PERFECT] = this.sfxPerfect, _sfxMap[GradeType.GOOD] = this.sfxGood, _sfxMap[GradeType.MISS] = this.sfxMiss, _sfxMap);
          var clip = sfxMap[grade];
          if (clip && as) as.playOneShot(clip, 1);

          // 播放抛瓶动效
          if (this.effectNode) {
            var ec = this.effectNode.getComponent(EffectController);
            if (ec) ec.play(grade);
          }
          var costKey = grade;
          var cost = (_this$_config$stabili = this._config.stability.cost[costKey]) != null ? _this$_config$stabili : 0;
          if (this.stabilityUI) {
            var remain = this.stabilityUI.reduce(cost);
            if (remain <= 0) console.log('稳定值归零');
          }

          // 连续 Perfect 追踪
          if (grade === GradeType.PERFECT) {
            this._consecutivePerfects++;
            if (this.powerBar) {
              this.powerBar.setSpeedByStreak(this._consecutivePerfects);
            }
            if (this._consecutivePerfects >= this.forcePerfectStreak && !this._isForcePerfectMode) {
              this._activateForcePerfectMode();
            }
          } else if (!this._isForcePerfectMode) {
            this._consecutivePerfects = 0;
            if (this.powerBar) {
              this.powerBar.resetSpeed();
            }
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
                  _this4._randomizePerfectZone();
                  _this4._spawnBottle();
                  if (_this4.powerBar) _this4.powerBar.setCanCharge(true);
                  _this4._isThrowing = false;
                  _this4.node.emit('throw-result', grade, _this4._bottleCount);
                }).start();
                return;
              }
              this._currentBottle.destroy();
              this._currentBottle = null;
            }
            // 继续到下方统一执行 _spawnBottle / _randomizePerfectZone
          } else {
            // 瓶子已经落在正确的世界位置，只需换父节点
            if (this._currentBottle && this.towerContainer) {
              this._currentBottle.parent = this.towerContainer;
              // Cocos Creator 自动保持世界位置不变，所以本地坐标自动算对
            }

            this._bottleCount++;
            this._adjustTowerForHeight();
            this._currentBottle = null;
          }
          this._refreshHeightLabel();
          this._randomizePerfectZone();
          this._spawnBottle();
          if (this.powerBar) this.powerBar.setCanCharge(true);
          this._isThrowing = false;

          // 抛瓶结果事件，供其他模块引用
          this.node.emit('throw-result', grade, this._bottleCount);
        }

        // ==================== Perfect 区间随机化 ====================
        ;

        _proto._randomizePerfectZone = function _randomizePerfectZone() {
          if (!this._config || !this.powerBar) return;
          var r = this._config.perfectRandomRange;
          if (!r) return;

          // 1. 随机 Perfect 宽度（5~20）
          var pw = r.perfectWidthMin + Math.random() * (r.perfectWidthMax - r.perfectWidthMin);
          var perfectWidth = Math.round(pw);

          // 2. 随机 Good 起始位置（0 ~ 100-goodTotalWidth），Good+Perfect 整体移动
          var maxGoodMin = 100 - r.goodTotalWidth;
          var goodMin = Math.round(Math.random() * maxGoodMin);
          var goodMax = goodMin + r.goodTotalWidth;
          var goodCenter = goodMin + r.goodTotalWidth / 2;

          // 3. Perfect 居中于 Good（先定最小值，再加宽度确保一致性）
          var halfPW = perfectWidth / 2;
          var perfectMin = Math.round(goodCenter - halfPW);
          var perfectMax = perfectMin + perfectWidth;
          // 边界保护
          if (perfectMin < goodMin) {
            perfectMin = goodMin;
            perfectMax = perfectMin + perfectWidth;
          }
          if (perfectMax > goodMax) {
            perfectMax = goodMax;
            perfectMin = perfectMax - perfectWidth;
          }

          // 4. 更新 PowerBar
          this.powerBar.goodMin = goodMin;
          this.powerBar.goodMax = goodMax;
          this.powerBar.perfectMin = perfectMin;
          this.powerBar.perfectMax = perfectMax;
          this.powerBar.refreshZones();
        }

        // ==================== 瓶塔自适应 ====================
        ;

        _proto._adjustTowerForHeight = function _adjustTowerForHeight() {
          if (!this.towerContainer) return;

          // 从 startMoveBottleCount 开始，每叠一瓶，容器下移一个瓶高，使塔顶保持固定
          if (this._bottleCount >= this.startMoveBottleCount) {
            this.towerContainer.setPosition(this.towerContainer.position.x, this.towerContainer.position.y - this._bottleHeight, 0);

            // 背景同步下移，但不能低于 _bgMinY
            if (this.bgNode && this._bgMinY > -99999) {
              var desiredBgY = this.bgNode.position.y - this._bottleHeight;
              var clampedBgY = Math.max(desiredBgY, this._bgMinY);
              this.bgNode.setPosition(this.bgNode.position.x, clampedBgY, 0);
              console.error("[ADJUST] bg desired=" + desiredBgY + " clamped=" + clampedBgY + " minY=" + this._bgMinY);
            }
          }

          // 从 startDestroyBottleCount 开始，每叠一瓶销毁最老的瓶子
          if (this._bottleCount >= this.startDestroyBottleCount) {
            var oldest = this.towerContainer.children[0];
            if (oldest) oldest.destroy();
          }
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
          node.angle = 0;
          if (this.handController) {
            // 瓶子生成在手掌中心
            node.parent = this.handController.getSpawnPoint();
            node.setPosition(Vec3.ZERO);
          } else {
            node.parent = this.node;
            node.setPosition(this._config.bottle.startPos.x, this._config.bottle.startPos.y, 0);
          }
          this._currentBottle = node;
          if (!node.getComponent(Bottle)) node.addComponent(Bottle);
        };
        _proto._refreshHeightLabel = function _refreshHeightLabel() {
          if (this.heightLabel) this.heightLabel.string = "" + this._bottleCount;
        };
        _proto.update = function update(dt) {
          if (this._isForcePerfectMode) {
            this._forcePerfectTimer -= dt;
            if (this._forcePerfectTimer <= 0) {
              this._isForcePerfectMode = false;
              this._forcePerfectTimer = 0;
              if (this.forcePerfectIndicator) {
                this.forcePerfectIndicator.active = false;
              }
              if (this.powerBar) {
                this.powerBar.setForcedGrade(null);
              }
            }
          }
        };
        _proto._activateForcePerfectMode = function _activateForcePerfectMode() {
          this._isForcePerfectMode = true;
          this._forcePerfectTimer = this.forcePerfectDuration;
          this._consecutivePerfects = 0;
          if (this.forcePerfectIndicator) {
            this.forcePerfectIndicator.active = true;
          }
          if (this.powerBar) {
            this.powerBar.setForcedGrade(GradeType.PERFECT);
            this.powerBar.resetSpeed();
          }
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
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handController", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startMoveBottleCount", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 7;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startDestroyBottleCount", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 9;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "bgNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfxThrow", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "sfxPerfect", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "sfxGood", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "sfxMiss", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "bgm", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "effectNode", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "forcePerfectStreak", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "forcePerfectDuration", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "forcePerfectIndicator", [_dec20], {
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

System.register("chunks:///_virtual/GamePause.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, director, isValid;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      isValid = module.isValid;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3fefcoAJZ1Gn6qCPc+NfYCH", "GamePause", undefined);

      /** 仅暂停游戏层逻辑，不影响暂停菜单上的按钮。 */
      var GamePause = exports('GamePause', /*#__PURE__*/function () {
        function GamePause() {}
        GamePause.pause = function pause(gameRoot) {
          if (GamePause._paused) return;
          GamePause._paused = true;
          GamePause._gameRoot = gameRoot;
          if (gameRoot) {
            director.getScheduler().pauseTarget(gameRoot);
          }
        };
        GamePause.resume = function resume(gameRoot) {
          if (!GamePause._paused) return;
          GamePause._paused = false;
          var root = gameRoot != null ? gameRoot : GamePause._gameRoot;
          if (root && isValid(root)) {
            director.getScheduler().resumeTarget(root);
          }
          GamePause._gameRoot = null;
        }

        /** 离开场景或重新进入游戏时调用，避免静态暂停状态残留。 */;
        GamePause.reset = function reset() {
          if (GamePause._gameRoot && isValid(GamePause._gameRoot)) {
            director.getScheduler().resumeTarget(GamePause._gameRoot);
          }
          GamePause._paused = false;
          GamePause._gameRoot = null;
        };
        _createClass(GamePause, null, [{
          key: "isPaused",
          get: function get() {
            return GamePause._paused;
          }
        }]);
        return GamePause;
      }());
      GamePause._paused = false;
      GamePause._gameRoot = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HandController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, tween, Component;
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
      Sprite = module.Sprite;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "df44a4Y8DpH9KhZHVmZUFka", "HandController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var HandController = exports('HandController', (_dec = ccclass('HandController'), _dec2 = property({
        type: Node,
        tooltip: '手臂旋转根节点（ArmHolder）'
      }), _dec3 = property({
        type: Node,
        tooltip: '瓶子生成点（放在手掌位置）'
      }), _dec4 = property({
        type: Sprite,
        tooltip: '手臂 Sprite 组件'
      }), _dec5 = property({
        type: Sprite,
        tooltip: '拇指 Sprite 组件'
      }), _dec6 = property({
        tooltip: '待机角度'
      }), _dec7 = property({
        tooltip: '后摆角度（负=向后）'
      }), _dec8 = property({
        tooltip: '投出角度（脱手瞬间）'
      }), _dec9 = property({
        tooltip: '跟随角度'
      }), _dec10 = property({
        tooltip: '动画总时长（秒）'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HandController, _Component);
        function HandController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "armHolder", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spawnPoint", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "armSprite", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "thumbSprite", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "idleAngle", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "windupAngle", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "releaseAngle", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "followAngle", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "animDuration", _descriptor9, _assertThisInitialized(_this));
          _this._isAnimating = false;
          return _this;
        }
        var _proto = HandController.prototype;
        _proto.getSpawnPoint = function getSpawnPoint() {
          return this.spawnPoint;
        };
        _proto.isAnimating = function isAnimating() {
          return this._isAnimating;
        }

        /** 播放投掷动画，onRelease 在脱手瞬间回调 */;
        _proto.playThrow = function playThrow(onRelease) {
          var _this2 = this;
          if (this._isAnimating || !this.armHolder) return;
          this._isAnimating = true;
          var dur = this.animDuration;
          var tWindup = dur * 0.3;
          var tThrow = dur * 0.35;
          var tFollow = dur * 0.2;
          var tReturn = dur * 0.15;
          tween(this.armHolder).to(tWindup, {
            angle: this.windupAngle
          }, {
            easing: 'quad-in'
          }).to(tThrow, {
            angle: this.releaseAngle
          }, {
            easing: 'quad-out'
          }).call(function () {
            onRelease();
          }).to(tFollow, {
            angle: this.followAngle
          }, {
            easing: 'quad-out'
          }).to(tReturn, {
            angle: this.idleAngle
          }, {
            easing: 'sine-out'
          }).call(function () {
            _this2._isAnimating = false;
          }).start();
        }

        /** 切换皮肤 */;
        _proto.setSkin = function setSkin(armFrame, thumbFrame) {
          if (this.armSprite && armFrame) this.armSprite.spriteFrame = armFrame;
          if (this.thumbSprite && thumbFrame) this.thumbSprite.spriteFrame = thumbFrame;
        }

        /** 立即复位 */;
        _proto.reset = function reset() {
          this.armHolder.angle = this.idleAngle;
          this._isAnimating = false;
        };
        return HandController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "armHolder", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spawnPoint", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "armSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "thumbSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "idleAngle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "windupAngle", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -45;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "releaseAngle", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 70;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "followAngle", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "animDuration", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.4;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ImageSwapButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, director, Component, GamePause;
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
      Sprite = module.Sprite;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      GamePause = module.GamePause;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "578f8rbMH5A3bhK2m8AeH0j", "ImageSwapButton", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ImageSwapButton = exports('ImageSwapButton', (_dec = ccclass('ImageSwapButton'), _dec2 = menu('Button/ImageSwapButton'), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ImageSwapButton, _Component);
        function ImageSwapButton() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "sceneName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "delay", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ImageSwapButton.prototype;
        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_START, this.onPress, this);
          this.node.on(Node.EventType.TOUCH_END, this.onRelease, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onRelease, this);
          this.node.on(Node.EventType.MOUSE_DOWN, this.onPress, this);
          this.node.on(Node.EventType.MOUSE_UP, this.onRelease, this);
        };
        _proto.onPress = function onPress() {
          var sprite = this.getComponent(Sprite);
          if (sprite) sprite.enabled = false;
        };
        _proto.onRelease = function onRelease() {
          var _this2 = this;
          var sprite = this.getComponent(Sprite);
          if (sprite) sprite.enabled = true;
          if (this.sceneName) {
            GamePause.reset();
            this.scheduleOnce(function () {
              return director.loadScene(_this2.sceneName);
            }, this.delay);
          }
        };
        return ImageSwapButton;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sceneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BottleLandEffect.ts', './EffectController.ts', './Bottle.ts', './GameManager.ts', './GamePause.ts', './HandController.ts', './StabilityUI.ts', './ImageSwapButton.ts', './PauseButton.ts', './PowerBarController.ts', './RestartGame.ts', './ResumeButton.ts', './SceneSwitchButton.ts', './StabilityMonitor.ts', './ValueSlot.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/PauseButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Node, Button, AudioSource, Component, GamePause;
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
      Component = module.Component;
    }, function (module) {
      GamePause = module.GamePause;
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
          if (GamePause.isPaused) return;
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          GamePause.pause(this.gameLayer);
          if (this.gameLayer) {
            this.gameLayer.active = false;
          }
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

System.register("chunks:///_virtual/PowerBarController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, CCInteger, CCFloat, Node, Label, input, EventMouse, UITransform, Vec3, Color, Component, GamePause;
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
      input = module.input;
      EventMouse = module.EventMouse;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      GamePause = module.GamePause;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;
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
        type: Node,
        tooltip: '蓄力条容器（UI_power_bar 的父节点）'
      }), _dec8 = property({
        type: Node,
        tooltip: '蓄力指针（UI_power_pointer）'
      }), _dec9 = property({
        type: Node,
        tooltip: 'Perfect 大星（starPerfect）'
      }), _dec10 = property({
        type: Node,
        tooltip: 'Good 左侧小星 1'
      }), _dec11 = property({
        type: Node,
        tooltip: 'Good 左侧小星 2'
      }), _dec12 = property({
        type: Node,
        tooltip: 'Good 右侧小星 1'
      }), _dec13 = property({
        type: Node,
        tooltip: 'Good 右侧小星 2'
      }), _dec14 = property({
        type: Label,
        tooltip: '当前等级文本'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PowerBarController, _Component);
        function PowerBarController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "perfectMin", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "perfectMax", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goodMin", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "goodMax", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "speed", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "barContainer", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pointer", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "starPerfect", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "starGoodL1", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "starGoodL2", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "starGoodR1", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "starGoodR2", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gradeLabel", _descriptor13, _assertThisInitialized(_this));
          _this._currentValue = 0;
          _this._direction = 1;
          _this._isCharging = false;
          _this._barWidth = 200;
          _this._canCharge = true;
          _this._starOffsets = [];
          _this._baseSpeed = 80;
          _this._forcedGrade = null;
          return _this;
        }
        var _proto = PowerBarController.prototype;
        _proto.onLoad = function onLoad() {
          this._readBarWidth();
          input.on('mouse-down', this.onMouseDown, this);
          input.on('mouse-up', this.onMouseUp, this);
        };
        _proto.onDestroy = function onDestroy() {
          input.off('mouse-down', this.onMouseDown, this);
          input.off('mouse-up', this.onMouseUp, this);
        };
        _proto.start = function start() {
          this._baseSpeed = this.speed;
          // 记录各星星相对于 Perfect 大星的初始偏移
          this._starOffsets = [];
          if (this.starPerfect) {
            var cx = this.starPerfect.position.x;
            for (var _i = 0, _arr = [this.starGoodL1, this.starGoodL2, this.starGoodR1, this.starGoodR2, this.starPerfect]; _i < _arr.length; _i++) {
              var n = _arr[_i];
              if (n) this._starOffsets.push({
                node: n,
                ox: n.position.x - cx
              });
            }
          }
          this._setupZones();
          this._updatePointerPosition();
          this._updateGradeDisplay();
        };
        _proto.update = function update(dt) {
          if (GamePause.isPaused) {
            this._isCharging = false;
            return;
          }
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
          if (GamePause.isPaused) return;
          if (evt.getButton() === EventMouse.BUTTON_LEFT) {
            if (!this._canCharge) return;
            this.startCharging();
          }
        };
        _proto.setCanCharge = function setCanCharge(v) {
          this._canCharge = v;
        };
        _proto.onMouseUp = function onMouseUp(evt) {
          if (GamePause.isPaused) return;
          if (evt.getButton() === EventMouse.BUTTON_LEFT) {
            this.stopCharging();
          }
        }

        // ==================== 星星布局 ====================
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
          if (!this.barContainer) return;
          this._readBarWidth();

          // Perfect 区间中心在蓄力条上的 X 位置
          var perfectCenter = (this.perfectMin + this.perfectMax) / 2;
          var centerX = perfectCenter / 100 * this._barWidth - this._barWidth / 2;

          // 星星组整体移动，每颗星保持相对偏移
          for (var _iterator = _createForOfIteratorHelperLoose(this._starOffsets), _step; !(_step = _iterator()).done;) {
            var s = _step.value;
            s.node.setPosition(new Vec3(centerX + s.ox, s.node.position.y, 0));
          }

          // 根据 Good 范围决定小星星数量（三等分）
          // GoodTotal = 30 - PerfectWidth，范围 10~25
          var perfectWidth = this.perfectMax - this.perfectMin;
          var goodTotal = 30 - perfectWidth;
          var showL1 = goodTotal > 20;
          var showL2 = goodTotal > 15;
          var showR1 = goodTotal > 15;
          var showR2 = goodTotal > 20;
          if (this.starGoodL1) this.starGoodL1.active = showL1;
          if (this.starGoodL2) this.starGoodL2.active = showL2;
          if (this.starGoodR1) this.starGoodR1.active = showR1;
          if (this.starGoodR2) this.starGoodR2.active = showR2;
        }

        // ==================== 公开方法 ====================
        ;

        _proto.startCharging = function startCharging() {
          if (GamePause.isPaused) return;
          this._isCharging = true;
          this._currentValue = 0;
          this._direction = 1;
        };
        _proto.stopCharging = function stopCharging() {
          if (!this._isCharging) return this._currentValue;
          this._isCharging = false;
          var grade = this.getGrade();
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
          if (this.pointer) {
            var x = this._currentValue / 100 * this._barWidth - this._barWidth / 2;
            this.pointer.setPosition(new Vec3(x, 0, 0));
          }
        };
        _proto._updateGradeDisplay = function _updateGradeDisplay() {
          if (this.gradeLabel) {
            var _this$_forcedGrade;
            var grade = (_this$_forcedGrade = this._forcedGrade) != null ? _this$_forcedGrade : this.getGrade();
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
        _proto.setSpeedByStreak = function setSpeedByStreak(streak) {
          this.speed = Math.min(this._baseSpeed * (1 + streak * 0.1), this._baseSpeed * 3);
        };
        _proto.resetSpeed = function resetSpeed() {
          this.speed = this._baseSpeed;
        };
        _proto.setForcedGrade = function setForcedGrade(grade) {
          this._forcedGrade = grade;
          this._updateGradeDisplay();
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
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "barContainer", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pointer", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "starPerfect", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "starGoodL1", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "starGoodL2", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "starGoodR1", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "starGoodR2", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "gradeLabel", [_dec14], {
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

System.register("chunks:///_virtual/RestartGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Button, AudioSource, director, Component, GamePause;
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
    }, function (module) {
      GamePause = module.GamePause;
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
          GamePause.reset();
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

System.register("chunks:///_virtual/ResumeButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Node, Button, AudioSource, Component, GamePause;
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
      Component = module.Component;
    }, function (module) {
      GamePause = module.GamePause;
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
          if (!GamePause.isPaused) return;
          if (this.clickAudio) {
            var _this$node$getParent;
            var audioSource = this.getComponent(AudioSource) || ((_this$node$getParent = this.node.getParent()) == null ? void 0 : _this$node$getParent.getComponent(AudioSource));
            audioSource == null || audioSource.playOneShot(this.clickAudio);
          }
          if (this.pausePanel) {
            this.pausePanel.active = false;
          }
          if (this.gameLayer) {
            this.gameLayer.active = true;
          }
          GamePause.resume(this.gameLayer);
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

System.register("chunks:///_virtual/SceneSwitchButton.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GamePause.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, AudioClip, Button, AudioSource, director, Component, GamePause;
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
    }, function (module) {
      GamePause = module.GamePause;
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
            GamePause.reset();
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