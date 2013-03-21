
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];



function building(position, height, flammable, time) {
	var ID = Math.floor(Math.random()*10000);
	var height = height;
	var flammable = flammable;
	var time = time;
	var sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	var onFire = false;
	var timeLeft = time;
	var health = 30;
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	this.height = function() { return height; }
	this.spray = function() { timeLeft--; health--; }
	this.update  = function()
	{
		if(onFire && health == 0)
		{
			//change sprite to burnt down
			//change flammable to 0
			//change onfire to 0
			//change height to 0
		}
		else if(this.onFire && this.timeLeft == 0)
		{
			//change sprite to not on fire
			//change onFire to 0
		}
	}

	building.prototype.repaint = function(canvas) {	
		canvas.fillStyle = "rgb(157,157,147)";
		canvas.fillRect(this.x, this.y, gameCanvas.blockSize, gameCanvas.blockSize);	
	}
}

function grass(position) {
	var ID = Math.floor(Math.random()*10000);
	var flammable = 1;
	var sprite = SPRITE_GRASS_ARRAY[Math.floor(Math.random() * SPRITE_GRASS_ARRAY.length)];
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	grass.prototype.repaint = function (canvas) {
		canvas.fillStyle = "rgb(1,142,14)";
		canvas.fillRect(this.x, this.y, gameCanvas.blockSize, gameCanvas.blockSize);
	}
}