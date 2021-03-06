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
var Debugging = false;
var fire1 = new Image();
fire1.src = "images/sprites/fire-1.png";
var fire2 = new Image();
fire2.src = "images/sprites/fire-2.png";
var rubble = new Image();
rubble.src = "images/sprites/rubble.png";


function Element(position) {
	this.ID = null;
	this.height = null;
	this.flammable = null;
	this.time = null;
	this.sprite = null;
	this.onFire = null;
	this.timeLeft = null;
	this.health = null;
	this.totalHealth = null
	this.originalColor = null;
	this.x = null;
	this.y = null;
	this.type = null;
	this.highlighted = null;
	this.img;
	this.cost;
	this.alt;
	this.sizeScale = 1;

	this.init = function(position) {
		this.img = new Image();
		this.typeInit();

		this.ID = position;
		this.time = Math.ceil(this.flammable*(this.height+1)*TimeScalar);
		this.onFire = false;
		this.timeLeft = this.time;
		this.health = this.totalHealth;
		this.x = Math.floor( (position*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
		this.y = ( Math.floor((position*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );
		this.highlighted = false;
		this.sprite = "";
		if(this.img.src == "")
			this.img.src = "images/sprites/" + this.className +".png";
		this.cost = this.cost * Math.floor(Math.random() * 1.50 + 0.75);
		this.alt = 0;

		return this;
	}

	this.typeInit = function() { }

	this.update = function(spray) {
		if(this.onFire && this.health <= 0) {
			this.flammable = 0;					//change flammable to 0
			this.onFire = false;				//change onFire to 0
			this.height = 1;					//change height to 1 ( so trucks cannot drive over it )
		}
		else if(this.onFire && this.timeLeft <= 0)
		{
			this.onFire = false;				//change sprite to not on fire
		}
		if(this.onFire) this.health--;
	}

	this.sprayed = function () {
		this.timeLeft--;
	}
}
Element.prototype.burn = function () { 
	if(this.flammable > 0) {
		this.onFire = true;
	}
}
Element.prototype.highlight = function () { this.highlighted = true; }
Element.prototype.unHighlight = function () { this.highlighted = false; }
Element.prototype.repaint = function(canvas) {

	// var temp = new Image();

	//Debugging
	if( Debugging ) {
		canvas.fillStyle = "rgb(0,0,0);";
		canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);
		
		canvas.drawImage(this.img, this.x+1, this.y+1, GameCanvas.blockSize-2, (GameCanvas.blockSize-2) * (this.img.height / this.img.width));

		if(this.onFire) {
			canvas.drawImage(fire, this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize * (this.img.height / this.img.width));
		}

		if(this.highlighted) {
			canvas.fillStyle = ColorHighlighted;
			canvas.globalAlpha=0.5;
			canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);
			canvas.globalAlpha=1.0;
		}

		canvas.fillStyle = "rgb(255,255,255);";
		canvas.font="10px Arial";
		canvas.fillText(this.health,this.x,this.y+9);
	}else {
		if(this.health == 0)
			canvas.drawImage(rubble, this.x, this.y, GameCanvas.blockSize*this.sizeScale, GameCanvas.blockSize*this.sizeScale * (this.img.height / this.img.width));
		else {
        	canvas.drawImage(this.img, this.x, this.y, GameCanvas.blockSize*this.sizeScale, GameCanvas.blockSize*this.sizeScale * (this.img.height / this.img.width));

	        if(this.onFire) {
				// temp.src = "images/sprites/fire.png";
				if(this.alt > GameCanvas.FPS/2)
					canvas.drawImage(fire1, this.x, this.y, GameCanvas.blockSize*this.sizeScale, GameCanvas.blockSize*this.sizeScale * (this.img.height / this.img.width));
				else
					canvas.drawImage(fire2, this.x, this.y, GameCanvas.blockSize*this.sizeScale, GameCanvas.blockSize*this.sizeScale * (this.img.height / this.img.width));
				this.alt++;
				this.alt %= 30;
			}

			if(this.highlighted) {
				canvas.fillStyle = ColorHighlighted;
				canvas.globalAlpha=0.5;
				canvas.fillRect(this.x, this.y, GameCanvas.blockSize, GameCanvas.blockSize);
				canvas.globalAlpha=1.0;
			}
		}
	}
}


// New Elements
function Building() {
	this.typeInit = function() {
		this.className = "building";
		this.height = Math.floor(Math.random() * 10) + 1;
		this.flammable = Math.random() * 0.010 + 0.005;
		this.cost = 50000 * this.height;
		this.totalHealth = this.height * 30;

		var numSprites = 4;

		this.img.src = "images/sprites/" + this.className + '_' + Math.floor(Math.random() * numSprites) +".png";
	}
}

function Grass() {
	this.typeInit = function() {
		this.className = "grass";
		this.height = 0;
		this.flammable = Math.random() * 0.005 + 0.0002;
		this.cost = 30;
		this.totalHealth = 30;
	}
}
function FireStation() {
	this.typeInit = function() {
		this.className = "firestation";
		this.height = 2;
		this.flammable = 0;
		this.cost = 0;
		this.totalHealth = 1;
		this.sizeScale = 2;
	}
}
function InvisBlock() {
	this.typeInit = function() {
		this.className = "firestation";
		this.height = 1;
		this.flammable = 0;
		this.cost = 0;
		this.totalHealth = 1;
		this.sizeScale = 1;
	}
	this.repaint = function (canvas) {}
}

function Road() {
	this.typeInit = function() {
		this.className = "road";
		this.height = 0;
		this.flammable = 0;
		this.cost = 0;
		this.totalHealth = 1;
	}

	this.setDir = function(direction) {
		this.sprite = direction;
		this.img.src = "images/sprites/" + this.className +"_"+ this.sprite +".png";
	}
}
function GasStation() {
	this.typeInit = function() {
		this.className = "gasstation";
		this.height = 2;
		this.flammable = 0.50;
		this.cost = 75000;
		this.totalHealth = 30;
	}
}

function Tree() {
	this.typeInit = function() {
		this.className = "tree";
		this.height = Math.floor(Math.random()*4) + 1;
		this.flammable = Math.random() * 0.005 + 0.0001;
		this.cost = 50;
		this.totalHealth = 60;
	}
}

function River() {
	this.typeInit = function() {
		this.className = "river";
		this.height = 1;
		this.flammable = 0;
		this.cost = 0;
		this.totalHealth = 1;
	}

	this.setDir = function(direction) {
		this.sprite = direction;
		this.img.src = "images/sprites/" + this.className +"_"+ this.sprite +".png";
	}
}

function RiverBridge() {
	this.typeInit = function() {
		this.className = "river";
		this.height = 0;
		this.flammable = 0;
		this.cost = 0;
		this.totalHealth = 1;
	}

	this.setDir = function(direction) {
		this.sprite = "b_" + direction;
		this.img.src = "images/sprites/" + this.className +"_"+ this.sprite +".png";
	}
}

// Inherit from Super
Building.prototype = new Element();
Grass.prototype = new Element();
FireStation.prototype = new Element();
Road.prototype = new Element();
GasStation.prototype = new Element();
Tree.prototype = new Element();
River.prototype = new Element();
RiverBridge.prototype = new Element();
InvisBlock.prototype = new Element();