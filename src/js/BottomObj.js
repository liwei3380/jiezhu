(function(ns){

var BottomObj = ns.BottomObj = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        BottomObj.superclass.constructor.call(this, properties);
        this.init(properties);
        this.stageWidth = properties.stageWidth
        this.startY = properties.startY 
    },

    stageWidth: 0, 
    startY: 0, 
    width: 0,
    height: 0,

    init: function(properties){
        
        var obj = new Hilo.Bitmap({
            image: properties.image,
            rect: [0, 0, 148, 60]
        });
        this.width = 148;
        this.height = 60;
        this.x = 0;
        this.y = this.startY - this.height - 100;

        this.addChild(obj);
        // this.tween = Hilo.Tween.to(this, {x:this.stageWidth - this.width}, {duration:500, loop: true, reverse:true})
    },
    stopBottomObj: function(){

        this.tween.stop()
        Hilo.Tween.remove(this.tween)
    }
});

})(window.game);