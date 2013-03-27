function GameCanvas(){
	//CONFIG Settings
	GameCanvas.canvasWidth = 700;
	GameCanvas.canvasHeight = 700;
	//GameCanvas.blockSize = 35;
	GameCanvas.blockSize = 25;
	var c = document.getElementById("game");
	var canvas = c.getContext("2d");

	//Core Variables
	var grid = Array( (GameCanvas.canvasHeight/GameCanvas.blockSize)*
					   	 (GameCanvas.canvasWidth/GameCanvas.blockSize) );

	GameCanvas.prototype.restart = function() {
		for(var i = 0; i < grid.length; i++)
			if( Math.floor((Math.random()*10)+1) == 1)
				grid[i] = new Building(i, 1, 1, 30);
			else if( Math.floor((Math.random()*4)+1) == 1 )
				grid[i] = new Road(i);
			else
				grid[i] = new Grass(i);


		//Put the firestation in the top left corner
		grid[0] = new FireStation(0);
		grid[1] = new EmptyBlock(1);
		grid[GameCanvas.canvasWidth/GameCanvas.blockSize] = new EmptyBlock(i);
		grid[GameCanvas.canvasWidth/GameCanvas.blockSize+1] = new EmptyBlock(i);
	}

	GameCanvas.prototype.repaint = function() {
		for(var i = 0; i < grid.length; i++)
			grid[i].repaint(canvas);
	}

	GameCanvas.prototype.burn = function() {
		grid[Math.floor(Math.random() * grid.length)].burn();
	}

	c.addEventListener("click", function(e){
		var x = e.pageX - c.offsetLeft;
		var y = e.pageY - c.offsetTop;

		var posX = Math.floor(x/GameCanvas.blockSize);
		var posY = Math.floor(y/GameCanvas.blockSize);

		var index = (posY)*(GameCanvas.canvasHeight/GameCanvas.blockSize) + (posX);


		if(grid[index].solid) {
			//Error and disable all highlighted tiles
			for(var i = 0; i < grid.length; i++)
				grid[i].unHighlight();
		}else{
			//Highlight the correct tile
			grid[index].highlight();
			grid[index].repaint(canvas);
		}



		console.log('Clicked at [' + x + ',' + y +']->[' + posX + ',' + posY + ']->[' + index + ']' );
	}, false);
}