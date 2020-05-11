var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var out = document.getElementById("out");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var player = new Player(300,380,80,15);
var ball = new Ball(200,200,5,Math.floor(Math.random()*4+4),Math.floor(Math.random()*4+4),"black");
var bricks;
var dKeyDown = false;
var aKeyDown = false;
var gameOver = false;
var winner = false;

loadMap();

function Brick(x,y,width,height,color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

function Ball(x,y,r,dx,dy,color){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
}

function Player(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.moveSpeedLimit = 10;
	this.accel = 0.75;
	this.decel = 0.75;
	this.xVel = 0;
	this.yVel = 0;
	this.color = "green";
}

function start(){
	checkKeyboardStatus();
	checkPlayer_BoundsCollision();
	checkBall_PlayerCollision();
	checkBall_BoundsCollision();
	checkBall_BrickCollision();
	clear();
	renderPlayer();
	moveBall();
	renderBall();
	renderBricks();
	checkWinner();
	if(gameOver === false){
		requestAnimationFrame(start);
	} else {
		out.innerHTML = "Koniec Gry";
		if(winner){
            out.innerHTML += ", BRAWO WYGRAŁEŚ!";
            
		}
		out.innerHTML += "<br>";
        out.innerHTML += "Możesz rozpocząć grę jeszcze raz :)";
        ctx.font = "22px Arial";
        ctx.fillStyle = "coral";
        ctx.textAlign = "center";
	}
		
}

function moveBall(){
	ball.x = ball.x+ball.dx;
	ball.y = ball.y+ball.dy;
}

document.onkeydown = function(e){
	if(e.keyCode === 65){
		aKeyDown = true;
	}
	if(e.keyCode === 68){
		dKeyDown = true;
	}
}

document.onkeyup = function(e){
	if(e.keyCode === 65){
		aKeyDown = false;
	}
	if(e.keyCode === 68){
		dKeyDown = false;
	}
}

function checkBall_BrickCollision(){
	var ax1 = ball.x-ball.r;
	var ay1 = ball.y-ball.r;
	var ax2 = ball.x+ball.r;
	var ay2 = ball.y+ball.r;
	var bx1;
	var bx2;
	var bx2;
	var by2;
	for(var i = 0; i < bricks.length; i++){
		bx1 = bricks[i].x;
		by1 = bricks[i].y;
		bx2 = bricks[i].x+bricks[i].width;
		by2 = bricks[i].y+bricks[i].height;
		if(!(ax2 <= bx1 || bx2 <= ax1 || ay2 <= by1 || by2 <= ay1)){
			prevX = ball.x - ball.dx - ball.r;
			prevY = ball.y - ball.dy - ball.r;
			if((prevX > bx2 || prevX < bx1) && prevY >= by1 && prevY <= by2){
				ball.dx = -ball.dx;	
			} else {
				ball.dy = -ball.dy;
			}
			bricks.splice(i,1);
			return;
		}
	}
}

function checkBall_BoundsCollision(){
	var x = ball.x - ball.r;
	var y = ball.y - ball.r;
	var size = ball.r*2;
	var x2 = x + size;
	var y2 = y + size;
	if(x < 0){
		ball.x = 0 + ball.r;
		ball.dx = -ball.dx;
	} else if(x + size > canvas.width){
		ball.x = canvas.width - ball.r;
		ball.dx = -ball.dx;
	}
	if(ball.y < 0){
		ball.y = 0 + ball.r;
		ball.dy = -ball.dy
	} else if(ball.y + ball.r > canvas.height){
		gameOver = true;
		winner = false;
	}
}

function loadMap(){
	bricks = [
		
		new Brick(101,50,50,10,"red"),
		new Brick(254,50,50,10,"red"),
		new Brick(101,61,50,10,"gold"),
		new Brick(254,61,50,10,"gold"),
		new Brick(101,72,50,10,"red"),
		new Brick(254,72,50,10,"red"),
		new Brick(101,83,50,10,"gold"),
		new Brick(254,83,50,10,"gold"),
		new Brick(101,94,50,10,"red"),
		new Brick(254,94,50,10,"red"),
		new Brick(101,105,50,10,"gold"),
		new Brick(254,105,50,10,"gold"),
		new Brick(305,105,50,10,"gold")
	];
}