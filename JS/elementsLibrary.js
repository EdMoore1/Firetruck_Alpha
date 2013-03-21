
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];
var SPRITE_GRASS_ARRAY = ["sprites/grass001.gif"];



function building(height, flammable, time) {
	this.ID = Math.floor(Math.random()*10000);
	this.height = height;
	this.flammable = flammable;
	this.time = time;
	this.sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	this.onFire = false;
	this.timeLeft = time;
	this.health = 30;

	building.prototype.height = function() { return this.height; }
	building.prototype.spray = function() { this.timeLeft--; this.health--; }
	building.prototype.update  = function()
	{
		if(this.onFire && this.health == 0)
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
}

function grass(position) {
	this.ID = Math.floor(Math.random()*10000);
	this.flammable = 1;
	this.sprite = SPRITE_GRASS_ARRAY[Math.floor(Math.random() * SPRITE_GRASS_ARRAY.length)];


	grass.prototype.repaint(canvas){
		canvas.fillStyle = "rgb(200,0,0)";
		canvas.fillRect(10, 10, 10, 10);
	}
}