function gameCanvas(){
	//CONFIG Settings
	gameCanvas.canvasWidth = 700;
	gameCanvas.canvasHeight = 700;
	gameCanvas.blockSize = 10;
	var c = document.getElementById("game");
	var canvas = c.getContext("2d");

	//Core Variables
	this.grid = Array( (gameCanvas.canvasHeight/gameCanvas.blockSize)*
					   (gameCanvas.canvasWidth/gameCanvas.blockSize) );

	gameCanvas.prototype.restart = function() {
		for(var i = 0; i < this.grid.length; i++)
			this.grid[i] = new grass(i);
	}

	gameCanvas.prototype.repaint = function() {
		for(var i = 0; i < this.grid.length; i++)
			this.grid[i].repaint(canvas);
	}
	
}