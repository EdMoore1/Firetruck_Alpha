function gameCanvas(){
	//CONFIG Settings
	this.canvasWidth = 700;
	this.canvasHeight = 700;
	this.blockSize = 10;
	var c = document.getElementById("game");
	this.canvas = c.getContext("2d");

	//Core Variables
	this.grid = Array( (this.canvasHeight/this.blockSize)*(this.canvasWidth/this.blockSize) );

	gameCanvas.prototype.Restart = function() {
		for(var i = 0; i < this.grid.length; i++)
			this.grid[i] = new grass(i);
	}

	gameCanvas.prototype.repaint = function() {

	}

	console.log(this.grid.length);

}