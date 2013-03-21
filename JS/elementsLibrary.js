
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];



function building(position, height, flammable, time) {
	this.ID = position;
	this.height = height;
	this.flammable = flammable;
	this.time = time;
	this.sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	this.onFire = false;
	this.timeLeft = time;
	this.health = 30;
	this.color = "rgb(157,157,147)";		//Building
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	this.height = function() { return height; }
	this.spray = function() { timeLeft--; health--; }
	this.update  = function()
	{
		if(this.onFire && this.health == 0)
		{
			//change sprite to burnt down
			this.color = "rgb(77,74,74)"

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
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, gameCanvas.blockSize, gameCanvas.blockSize);	
	}
}



function grass(position) {
	this.ID = position;
	this.flammable = 1;
	this.sprite = SPRITE_GRASS_ARRAY[Math.floor(Math.random() * SPRITE_GRASS_ARRAY.length)];
	this.onFire = false;
	this.color = "rgb(1,142,14);";
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	this.update = function() {
		//Evaluate if to catch on fire

	}

	grass.prototype.repaint = function (canvas) {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, gameCanvas.blockSize, gameCanvas.blockSize);
	}
}