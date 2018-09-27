var can = document.getElementById("canvas");
var ctx = can.getContext("2d");


can.height = 720 ;
can.width = 1024;

var keysDown = {
    LEFT : false,
    RIGHT : false,
    UP : false
}




var dir = {
    LEFT : 0,
    RIGHT : 1
}

var ticks = {
    IDLE : 175,
    REST : 100
}

var sprite = {
    IDLE : {start : 65, total:2},
    JUMP : {start : 76, total:4}
}
function Player(x,y){
    this.x = x;
    this.y = y;
    this.direction =dir.RIGHT;
    this.dx = 0;
    this.dy = 0;
    this.ax = 0.8;
    this.ay = 1;
    this.height = 50;
    this.width = 37;
    this.onGround;
    this.frame = sprite.IDLE.start;
    this.frameCount = 0;
    this.image = new Image();
    this.image.src = 'adventurer_spt.png';
    this.lastTick = new Date().getTime()
    ; 
    this.draw = function(){
        if((new Date().getTime() - this.lastTick) >= ticks.IDLE){
            this.lastTick = new Date().getTime();
            this.frame = sprite.IDLE.start + (++this.frameCount)% sprite.IDLE.total;
        }
        var sX = adv.frames[this.frame].frame.x;
        var sY = adv.frames[this.frame].frame.y;
        var sHeight = adv.frames[this.frame].frame.h;
        var sWidth = adv.frames[this.frame].frame.w;
        this.height = sHeight*1.5;
        this.width = sWidth*1.5;
        ctx.save();
        if(this.direction === dir.LEFT){
            ctx.scale(-1,1);
            ctx.drawImage(this.image,sX,sY,sWidth,sHeight,-this.x - sWidth,this.y,this.width,this.height);
        }else{
            ctx.scale(1,1);
            ctx.drawImage(this.image,sX,sY,sWidth,sHeight,this.x,this.y,this.width,this.height);
        }
        ctx.restore();   
    }

    this.updateAnim = function(){
        
        this.draw();
    }


    this.update = function(){
        
        if(keysDown.UP && this.onGround){
            this.onGround = false;
            this.dy = -13;
        }
        if(keysDown.LEFT){
            this.direction = dir.LEFT;
            this.dx = -5;
        }
        if(keysDown.RIGHT){
            this.direction = dir.RIGHT;
            this.dx = 5;
        }
        this.dx = this.dx * this.ax;
        this.dy = this.dy + this.ay;
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if(this.y >= can.height - this.height){
            this.y = can.height - this.height;
            this.dy = 0;
            this.onGround = true;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > can.width - this.width){
            this.x = can.width - this.width;
        }

        // this.draw();
    }
}

var player = new Player(can.width/2,can.height/2);

window.addEventListener("keydown",function(ev){
    if(ev.keyCode === 38){
        keysDown.UP = true;
    }
    if(ev.keyCode === 37){
        keysDown.LEFT = true;
    }
    if(ev.keyCode === 39){
        keysDown.RIGHT = true;
    }
})
window.addEventListener("keyup",function(ev){
    if(ev.keyCode === 38){
        keysDown.UP = false;
    }
    if(ev.keyCode === 37){
        keysDown.LEFT = false;
    }
    if(ev.keyCode === 39){
        keysDown.RIGHT = false;
    }
})


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,can.width,can.height);
    player.update();
    player.updateAnim();
}
setTimeout(() => {
    animate();
}, 30);
