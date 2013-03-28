//Sprites
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];
var SPRITE_FIRESTATION_ARRAY = ["sprites/firstStation001.gif"];

//Colors
var ColorBuilding = "rgb(25,184,212)";
var ColorGrass = "rgb(1,142,14)";
var ColorRubble = "rgb(77,74,74)";
var ColorFireStation = "rgb(213,25,25)";
var ColorRoad = "rgb(157,157,147)";
var ColorHighlighted = 'rgb(61,255,73)';



function Building(position, height, flammable, time) {
	this.ID = position;
	this.height = height;
	this.flammable = flammable;
	this.time = time;
	this.sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	this.onFire = false;
	this.timeLeft = time;
	this.health = 30;
	this.color = ColorBuilding;
	this.solid = true;
	this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

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

	Building.prototype.burn = function () { this.color = ColorFire; this.onFire = true; }
	Building.prototype.unHighlight = function () { this.color = ColorBuilding; }
	Building.prototype.repaint = function(canvas) {	
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);	
	}
}



function Grass(position) {
	this.ID = position;
	this.flammable = 1;
	this.sprite = SPRITE_GRASS_ARRAY[Math.floor(Math.random() * SPRITE_GRASS_ARRAY.length)];
	this.onFire = false;
	this.color = ColorGrass;
	this.solid = false;
	this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

	this.update = function() {
		//Evaluate if to catch on fire

	}

	Grass.prototype.burn = function () { this.color = ColorFire; this.onFire = true; }
	Grass.prototype.highlight = function () { this.color = ColorHighlighted; }
	Grass.prototype.unHighlight = function() { this.color = ColorGrass; }
	Grass.prototype.repaint = function (canvas) {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);
	}
}

function FireStation(position) {
	this.ID = position;
	this.flammable = 1;
	this.sprite = SPRITE_FIRESTATION_ARRAY[Math.floor(Math.random() * SPRITE_FIRESTATION_ARRAY.length)];
	this.onFire = false;
	this.solid = true;
	this.color = ColorFireStation;
	this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

	FireStation.prototype.repaint = function (canvas) {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize*2, GameCanvas.blockSize*2);
	}

	FireStation.prototype.unHighlight = function () { this.color = ColorFireStation; }
}

function EmptyBlock(position) {
	this.ID = position;
	this.flammable = 0;
	this.spite = "";
	this.onFire = false;
	this.solid = true;


	EmptyBlock.prototype.repaint = function( canvas ) { /* Do Nothing */ };
	EmptyBlock.prototype.unHighlight = function() { /* Do Nothing */ }
}

function Road(position) {
	this.ID = position;
	this.flammable = 0;
	this.color = ColorRoad;
	this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );
	this.onFire = false;
	this.solid = false;
	this.highlighted = false;

	//Calculate the correct sprite to use



	Road.prototype.repaint = function ( canvas ) { 
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);
	}

	Road.prototype.highlight = function () { this.color = ColorHighlighted; }
	Road.prototype.unHighlight = function () { this.color = ColorRoad; }
}