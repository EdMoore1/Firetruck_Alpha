//Sprites
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];
var SPRITE_FIRESTATION_ARRAY = ["sprites/firstStation001.gif"];
var SPRITE_GASSTATION_ARRAY = ["sprites/gasStation001.gif"];

//Colors
var ColorBuilding = "rgb(25,184,212)";
var ColorGasStation = "rgb(251,184,41)";
var ColorGrass = "rgb(1,142,14)";
var ColorRubble = "rgb(77,74,74)";
var ColorFireStation = "rgb(213,25,25)";
var ColorRoad = "rgb(157,157,147)";
var ColorHighlighted = 'rgb(61,255,73)';
var ColorHighlighted = 'rgb(255,255,51)';
var ColorFire = 'rgb(255,102,000)';

//CONFIG
var TimeScalar = 30;


function Element(position) {
	this.ID = position;
	this.height = 1;
	this.flammable = 0;
	this.time = this.flammable*this.hight*TimeScalar;
	this.sprite;
	this.onFire = false;
	this.timeLeft = this.time;
	this.health = 30;
	this.color;
	this.originalColor = this.color;
	this.solid = true;
	this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
	this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );
	this.type;
	this.highlighted = false;

	this.update = function(spray) {
		if(this.onFire && this.health == 0) {
			this.color = ColorRubble;		//change sprite to burnt down
			this.flammable = true;			//change flammable to 0
			this.onFire = false;			//change onFire to 0
			this.height = 0;				//change height to 0
		}
		else if(this.onFire && this.timeLeft == 0)
		{
			this.onFire = false;			//change sprite to not on fire
			this.sprite = BuildingColor;	//change onFire to 0
		}
		if(this.onFire) this.health--;
	}
}
	Element.prototype.burn = function () { this.color = ColorFire; this.onFire = true; }
	Element.prototype.highlight = function () { this.highlighted = true; }
	Element.prototype.unHighlight = function () { this.color = this.originalColor; this.highlighted = false; }
	Element.prototype.repaint = function(canvas) {	
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);	
	}



function Building(position) {
	Building.prototype = new Element(position);
}

function Grass(position) {
	Grass.prototype = new Element(position);
}

function FireStation(position) {
	
}
// FireStation.prototype = new Element();

function EmptyBlock(position) {
	Building.prototype = new Element(position);
}

function Road(position) {
	Road.prototype = new Element(position);
}


function GasStation(position, height) {
    GasStation.prototype = new Element(position);
}