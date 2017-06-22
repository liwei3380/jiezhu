(function(ns){

var DropObj = ns.DropObj = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        DropObj.superclass.constructor.call(this, properties);
        this.init(properties);
        this.stageWidth = properties.stageWidth
        this.stageHeight = properties.stageHeight
    },
    stageWidth: 0,
    stageHeight: 0,
    width: 0,
    height: 0,

    init: function(properties){
        
        var obj = new Hilo.Bitmap({
            image: properties.image,
            rect: [20, 0, 74, 30]
        });
        this.width = 74;
        this.height = 30;
        this.x = this.RandomNumBoth(50,this.stageWidth-this.width);
        this.y = this.RandomNumBoth(50,100);

        this.addChild(obj);
        
    },
    startDrop: function(){
        this.tween = Hilo.Tween.to(this, {y:this.stageHeight - this.height}, {duration:2000, loop:false, ease:Hilo.Ease.Cubic.EaseIn});
    },
    checkCollision: function(obj){
        if(obj.hitTestObject(this, true)){
            this.y = this.RandomNumBoth(50,100);
            this.x = this.RandomNumBoth(50,this.stageWidth-this.width);
            Hilo.Tween.remove(this.tween)
            return true;
        }
        return false;
    },
    RandomNumBoth: function(Min,Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
    }
});

})(window.game);