function GameCanvas(){
	//CONFIG Settings
	GameCanvas.canvasWidth = 700;
	GameCanvas.canvasHeight = 700;
	//GameCanvas.blockSize = 35;
	GameCanvas.blockSize = 25;
	var c = document.getElementById("game");
	var canvas = c.getContext("2d");

	//Core Variables
	this.grid = Array( (GameCanvas.canvasHeight/GameCanvas.blockSize)*
					   	 (GameCanvas.canvasWidth/GameCanvas.blockSize) );

	GameCanvas.prototype.restart = function() {
		for(var i = 0; i < this.grid.length; i++)
			if( Math.floor((Math.random()*10)+1) == 1)
				this.grid[i] = new Building(i, 1, 1, 30);
			else if( Math.floor((Math.random()*4)+1) == 1 )
				this.grid[i] = new Road(i);
			else
				this.grid[i] = new Grass(i);


		//Put the firestation in the top left corner
		this.grid[0] = new FireStation(0);
		this.grid[1] = new EmptyBlock(1);
		this.grid[GameCanvas.canvasWidth/GameCanvas.blockSize] = new EmptyBlock(i);
		this.grid[GameCanvas.canvasWidth/GameCanvas.blockSize+1] = new EmptyBlock(i);
	}

	GameCanvas.prototype.repaint = function() {
		for(var i = 0; i < this.grid.length; i++)
			this.grid[i].repaint(canvas);
	}

	GameCanvas.prototype.burn = function() {
		this.grid[Math.floor(Math.random() * this.grid.length)].burn();
	}


	c.addEventListener("click", function(e){
		var x = e.pageX;
		var y = e.pageY;

		x = Math.floor(e.pageX/GameCanvas.blockSize);
		// y = Math.floor(e.pageY/GameCanvas.blockSize);


		console.log('Clicked at [' + e.pageX + ',' + e.pageY +']->[' + x + ',' + y + ']' );
		}, false);
}