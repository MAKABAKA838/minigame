System.register("chunks:///_virtual/main",["./StartGame.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/StartGame.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){var t,e,o,i,r,a,s,l,c,d,C,u;return{setters:[function(n){t=n.inheritsLoose},function(n){e=n.cclegacy,o=n._decorator,i=n.UITransform,r=n.Node,a=n.Vec3,s=n.Label,l=n.Color,c=n.Sprite,d=n.Button,C=n.director,u=n.Component}],execute:function(){var p;e._RF.push({},"f26a9mq2olDRp9vjZEGpZ4X","StartGame",void 0);var g=o.ccclass;o.property,n("StartGame",g("StartGame")(p=function(n){function e(){return n.apply(this,arguments)||this}t(e,n);var o=e.prototype;return o.onLoad=function(){this.setDesignResolution(),this.createBackground(),this.createTitle(),this.createStartButton(),this.createSettingsButton()},o.setDesignResolution=function(){var n=this.node.getComponent(i);n&&n.setContentSize(720,1280)},o.createBackground=function(){var n=new r("Bg");n.addComponent(i).setContentSize(720,1280),n.setPosition(new a(0,0,0)),n.setParent(this.node)},o.createTitle=function(){var n=new r("Title");n.addComponent(i).setContentSize(500,120);var t=n.addComponent(s);t.string="我的游戏",t.fontSize=64,t.color=new l(255,255,255,255),t.enableBold=!0,t.horizontalAlign=s.HorizontalAlign.CENTER,t.verticalAlign=s.VerticalAlign.CENTER,n.setPosition(new a(0,300,0)),n.setParent(this.node)},o.createStartButton=function(){var n=this,t=new r("StartBtn");t.addComponent(i).setContentSize(320,90),t.addComponent(c).color=new l(46,204,113,255);var e=new r("Label");e.addComponent(i).setContentSize(320,90);var o=e.addComponent(s);o.string="开始游戏",o.fontSize=40,o.color=new l(255,255,255,255),o.enableBold=!0,o.horizontalAlign=s.HorizontalAlign.CENTER,o.verticalAlign=s.VerticalAlign.CENTER,e.setParent(t);var u=t.addComponent(d);u.transition=d.Transition.COLOR,u.normalColor=new l(46,204,113,255),u.pressedColor=new l(39,174,96,255),u.hoverColor=new l(46,204,113,255),t.setPosition(new a(0,80,0)),t.setParent(this.node),t.on(d.EventType.CLICK,(function(){u.interactable=!1,n.scheduleOnce((function(){C.loadScene("GameScene")}),.5)}))},o.createSettingsButton=function(){var n=new r("SettingsBtn");n.addComponent(i).setContentSize(320,90),n.addComponent(c).color=new l(52,152,219,255);var t=new r("Label");t.addComponent(i).setContentSize(320,90);var e=t.addComponent(s);e.string="设置",e.fontSize=40,e.color=new l(255,255,255,255),e.enableBold=!0,e.horizontalAlign=s.HorizontalAlign.CENTER,e.verticalAlign=s.VerticalAlign.CENTER,t.setParent(n);var o=n.addComponent(d);o.transition=d.Transition.COLOR,o.normalColor=new l(52,152,219,255),o.pressedColor=new l(41,128,185,255),o.hoverColor=new l(52,152,219,255),n.setPosition(new a(0,-60,0)),n.setParent(this.node),n.on(d.EventType.CLICK,(function(){console.log("设置按钮点击")}))},e}(u))||p);e._RF.pop()}}}));

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