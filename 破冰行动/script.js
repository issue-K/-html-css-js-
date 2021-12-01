class GameObject{
    constructor(){
        gameobj.push( this );
    }
    start(){}
    update(){}
    render(){}
}

class GameMap extends GameObject{
    constructor( ctx ){
        super();
        this.ctx = ctx;
    }
    update(){
        this.render();
    }
    render(){
        this.ctx.fillStyle="#F0F0F0";
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}

class Ball extends GameObject{
    constructor(ctx,ice_borders){
        super();
        this.ice_borders = ice_borders;
        this.ctx = ctx;
        this.radius = 10;
        this.speed = 3;
        this.vx = 1;
        this.vy = 1;
        this.x = ctx.canvas.width/2;
        this.y = ctx.canvas.height/2;
        gameobj.push( this );
    }
    update(){
        this.x += this.vx*this.speed;
        this.y += this.vy*this.speed;

        //判断是否在边界位置
        if( this.x+this.radius>this.ctx.canvas.width)
            this.x = this.ctx.canvas.width - this.radius, this.vx *= -1;
        if( this.x-this.radius<0 )
            this.x = this.radius, this.vx *= -1;
        if( this.y+this.radius>this.ctx.canvas.height )
            this.y = this.ctx.canvas.height - this.radius, this.vy *= -1;
        if( this.y-this.radius<0 )
            this.y = this.radius, this.vy *= -1;
        //判断是否和某个冰板相撞
        this.knock();
        this.render();
    }
    knock(){
        for(let i=0;i<this.ice_borders.length;i++){
            if( this.ice_borders[i].life === "dead" )   continue;
            if( this.x+this.radius>=this.ice_borders[i].x
                 && this.x-this.radius<=this.ice_borders[i].x+this.ice_borders[i].width
                 && this.y+this.radius>=this.ice_borders[i].y
                 && this.y-this.radius<=this.ice_borders[i].y+this.ice_borders[i].height ){
            //  let dis_up = Math.abs( this.y-this.ice_borders[i].y );
             // let dis_down = Math.abs( this.y-this.ice_borders[i].y-this.ice_borders[i].height );
              //if( dis_up<dis_down )//距离上面的距离更小,说明是从上面下来的
              this.vy *= -1; //this.vx *= -1;
              if( this.ice_borders[i].life!="player" )//只要这个木板不是玩家
                this.ice_borders[i].life = "dead";
              break;
           }
        }
    }
    render(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        this.ctx.fill();
    }
}

class ice_border extends GameObject{
    constructor(ctx,x,y,width,height,status){
        super();
        this.ctx = ctx;
        this.x = x, this.y = y;
        this.vx = 0;
        this.width = width, this.height = height;
        this.life = status;
    }
    update(){
        if( this.life === "dead" ) return;
        let outer = this;
        if( this.life === "player" ){
            this.x += this.vx;
            if( this.x<0 )
                this.x = 0;
            //this.x = Math.max( outer.x, 0 );
           // console.log( this.x );
           if( this.x>this.ctx.width-this.width )
                this.x = this.ctx.width-this.width;
           // this.x = Math.min( outer.x, outer.ctx.width-outer.width );
            //console.log( this.x );
        }
        this.render();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.fillStyle="#0095DD";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

/************************************初始化*****************************////
let rules_div = $(".rules-div");
let rules_btn = $("#rules-btn");
let close_btn = $("#close-btn");
let ctx = $("#canvas").get(0).getContext("2d");
let gameobj = [];
let ice_borders = new Array();

let gamemap = new GameMap( ctx );

let row = 6, col = 8, socre_height = 60;//score_height表示分数占用的高度
//800 600
for( let i = 0; i<row; i++){
    var width = 80, height = 25;
    var x_space = ( ctx.canvas.width-col*width )/(col+1);
    var y_space = ( ctx.canvas.width/3-col*height )/(row+1);
    for( let j = 0;j<col;j++ ){
        let x = j*( width+x_space )+x_space;
        let y = i*( height+y_space )+y_space+socre_height;
        ice_borders.push( new ice_border(ctx,x,y,width,height,"alive") );
    }
}
width *= 1.5;
let player = new ice_border( ctx,ctx.canvas.width/2-width/2,ctx.canvas.height-height*1.2,width,height,"player" );
ice_borders.push( player );
let ball = new Ball( ctx,ice_borders );

rules_div.hide();
add_listening();

function add_listening(){
    rules_btn.click( function(){
        rules_div.show();
        rules_btn.hide();
    });
    close_btn.click( function(){
       rules_div.hide();
       rules_btn.show();
    });
    $(window).keydown( function(e){//按下方向键时设置速度
        if (e.key === 'Right' || e.key === 'ArrowRight'){
            player.vx = 8;
        }
        if (e.key === 'Left' || e.key === 'ArrowLeft'){
            player.vx = -8;
        }
    })
    $(window).keyup( function(e){//按下方向键时设置速度
        if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
            player.vx = 0;
        }
    })


    function gameupd(){
        for(let i=0;i<gameobj.length;i++)
            gameobj[i].update();
        requestAnimationFrame( gameupd );
    }
    gameupd();
}
