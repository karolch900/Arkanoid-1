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