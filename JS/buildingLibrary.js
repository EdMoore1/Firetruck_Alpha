
var SPRITE_BUILDING_ARRAY = ["sprites/building001.gif"];



function building(height, flammable, time) {
	this.ID = Math.floor(Math.random()*10000);
	this.height = height;
	this.flammable = flammable;
	this.time = time;
	this.sprite = SPRITE_BUILDING_ARRAY[Math.floor(Math.random() * SPRITE_BUILDING_ARRAY.length)];
	this.onFire = false;
	this.timeLeft = time;
	this.health = 30;

	building.Prototype.height = function() { return this.height; }
	building.Prototype.spray = function() { this.timeLeft--; this.health--; }
	building.Prototype.update  = function()
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

