//Sprites
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];

//Colors
var ColorBuilding = "rgb(157,157,147)";
var ColorGrass = "rgb(1,142,14)";
var ColorRubble = "rgb(77,74,74)";
var ColorFire = "rgb(213,25,25)";



function building(position, height, flammable, time) {
	this.ID = position;
	this.height = height;
	this.flammable = flammable;
	this.time = time;
	this.sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	this.onFire = false;
	this.timeLeft = time;
	this.health = 30;
	this.color = ColorBuilding;
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	this.height = function() { return height; }
	this.spray = function()
	{
		if(this.onFire)
		{
			this.timeLeft--;
			this.health--; 
		}
	}
	this.update  = function()
	{
		if(this.onFire && this.health == 0)
		{
			//change sprite to burnt down
			this.color = ColorRubble;

			//change flammable to 0
			this.flammable = true;

			//change onFire to 0
			this.onFire = false;

			//change height to 0
			this.height = 0;
		}
		else if(this.onFire && this.timeLeft == 0)
		{
			//change sprite to not on fire
			this.onFire = false;

			//change onFire to 0
			this.sprite = BuildingColor;
		}
	}

	building.prototype.burn = function () { this.color = ColorFire; this.onFire = true; }

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
	this.color = ColorGrass;
	this.x = Math.floor( (position*gameCanvas.blockSize)%(gameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*gameCanvas.blockSize)/(gameCanvas.canvasWidth))*gameCanvas.blockSize );

	this.update = function() {
		//Evaluate if to catch on fire

	}

	grass.prototype.burn = function () { this.color = ColorFire; this.onFire = true; }

	grass.prototype.repaint = function (canvas) {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, gameCanvas.blockSize, gameCanvas.blockSize);
	}
}