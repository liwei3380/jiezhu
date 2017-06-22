var game = window.game = {

    width:0,
    height:0,
    scale:0,
    state:'ready',
    score: 0,

    init: function(dom,callback){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage(dom);
            this.callback = callback;
            this.score = 0;
            this.state = 'ready';
        }.bind(this));
        this.asset.load();
    },
    initStage: function(dom){
        this.width = dom.clientWidth * 2;
        this.height = dom.clientHeight * 2 - 100;
        this.scale = 0.5;

        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        dom.appendChild(this.stage.canvas);

        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_END, true);
        this.stage.on(Hilo.event.POINTER_END, this.onUserInput.bind(this));

            //舞台更新
        this.stage.onUpdate = this.onUpdate.bind(this);

        this.initGround();
        this.initBottomObj();
        this.initDropObj();
        this.initDropBackground();
    },
    initBottomObj: function(){
        console.log('initbototm')
        this.bottomobj = new game.BottomObj({
            id: 'bottomobj',
            image: this.asset.bottomobj,
            stageWidth: this.width * 2 * this.scale,
            startY: this.height * 2 * this.scale,
        }).addTo(this.stage);
        Hilo.Tween.to(this.bottomobj, {x:this.width - this.bottomobj.width}, {duration:2000, loop: true, reverse:true, ease:Hilo.Ease.Quad.EaseInOut})
    },
    initDropObj: function(){
        this.dropobj = new game.DropObj({
            id: 'dropobj',
            image: this.asset.bottomobj,
            stageWidth: this.width * 2 * this.scale,
            stageHeight: this.height * 2 * this.scale,
        }).addTo(this.stage);
    },
    initDropBackground: function(){
        this.dropbackground = new Hilo.Bitmap({
            image:this.asset.ground,
            rect:[0, 100, this.width * 2 * this.scale, this.height * 2 * this.scale]
        }).addTo(this.stage,this.dropobj.depth - 1);
    },
    onUserInput: function(e){
        if(this.state == 'ready'){
            this.state = 'drop';
            this.dropobj.startDrop();
        }
    },
    initGround: function(){
        //地面
        this.ground = new Hilo.Bitmap({
            id: 'ground',
            image: this.asset.ground
        }).addTo(this.stage);

        //设置地面的y轴坐标
        this.ground.y = this.height - 100;

    },
    onUpdate: function(delta){
        if(this.state === 'over'){
            return;
        }

        //碰撞检测
        if(this.dropobj.checkCollision(this.bottomobj)){
            this.state = 'ready'
            this.score += 1
            this.callback({
                type: 'score',
                score: this.score
            })
        }
        //碰撞检测
        if(this.dropobj.checkCollision(this.ground)){
            this.state = 'over'
            //this.bottomobj.stopBottomObj()
            this.callback({
                type: 'state',
                state: 'over'})
        }
    }
};

export default game;
