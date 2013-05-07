//Sprites
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];
var SPRITE_FIRESTATION_ARRAY = ["sprites/firstStation001.gif"];
var SPRITE_GASSTATION_ARRAY = ["sprites/gasStation001.gif"];

//Colors
var ColorWater = "rgb(25,184,212)";
var ColorBuilding = "rgb(95,158,160)";
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
var Debugging = true;


function Element(position) {
	this.ID = null;
	this.height = null;
	this.flammable = null;
	this.time = null;
	this.sprite = null;
	this.onFire = null;
	this.timeLeft = null;
	this.health = null;
	this.color = null;
	this.originalColor = null;
	this.x = null;
	this.y = null;
	this.type = null;
	this.highlighted = null;

	this.init = function(position) {
		this.typeInit();

		this.ID = position;
		this.time = Math.ceil(this.flammable*(this.height+1)*TimeScalar);
		this.onFire = false;
		this.timeLeft = this.time;
		this.health = 60;
		this.originalColor = this.color;
		this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
		this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );
		this.highlighted = false;

		return this;
	}

	this.typeInit = function() { }

	this.update = function(spray) {
		if(this.onFire && this.health <= 0) {
			this.color = ColorRubble;			//change sprite to burnt down
			this.flammable = 0;					//change flammable to 0
			this.onFire = false;				//change onFire to 0
			this.height = 1;					//change height to 1 ( so trucks cannot drive over it )
		}
		else if(this.onFire && this.timeLeft <= 0)
		{
			this.onFire = false;				//change sprite to not on fire
			this.color = this.originalColor;	//change onFire to 0
		}
		if(this.onFire) this.health--;
	}

	this.sprayed = function () {
		this.timeLeft--;
	}
}
Element.prototype.burn = function () { 
	if(this.flammable > 0) {
		this.color = ColorFire;
		this.onFire = true;
	}
}
Element.prototype.highlight = function () { this.highlighted = true; this.color = ColorHighlighted; }
Element.prototype.unHighlight = function () { this.color = this.originalColor; this.highlighted = false; }
Element.prototype.repaint = function(canvas) {
	// canvas.fillStyle = this.color;
	// canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);	




	//Debugging
	canvas.fillStyle = "rgb(0,0,0);";
	canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);	
	
	canvas.fillStyle = this.color;
	canvas.fillRect(this.x+1, this.y+1, GameCanvas.blockSize-2, GameCanvas.blockSize-2);

	canvas.fillStyle = "rgb(0,0,0);";
	canvas.font="10px Arial";
	canvas.fillText(this.ID,this.x,this.y+9);
}


// New Elements
function Building() {
	this.typeInit = function() {
		this.className = "building";
		this.color = ColorBuilding;
		this.height = Math.floor(Math.random() * 10) + 1;
		this.flammable = Math.random() * 0.010 + 0.005;
		this.sprite = "";
	}
}

function Grass() {
	this.typeInit = function() {
		this.className = "grass";
		this.color = ColorGrass;
		this.height = 0;
		this.flammable = Math.random() * 0.005 + 0.0001;
		this.sprite = "";
	}
}
function FireStation() {
	this.typeInit = function() {
		this.className = "firestation";
		this.color = ColorFireStation;
		this.height = 2;
		this.flammable = 0;
		this.sprite = "";
	}
}
function Road() {
	this.typeInit = function() {
		this.className = "road";
		this.color = ColorRoad;
		this.height = 0;
		this.flammable = 0;
		this.sprite = "";
	}
}
function GasStation() {
	this.typeInit = function() {
		this.className = "gasstation";
		this.color = ColorGasStation;
		this.height = 2;
		this.flammable = 0.50;
		this.sprite = "";
	}
}

// Inherit from Super
Building.prototype = new Element();
Grass.prototype = new Element();
FireStation.prototype = new Element();
Road.prototype = new Element();
GasStation.prototype = new Element();
