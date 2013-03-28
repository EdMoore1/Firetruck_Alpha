function GameCanvas(){
	//CONFIG Settings
	GameCanvas.canvasWidth = 1024;
	GameCanvas.canvasHeight = 640;
	GameCanvas.blockSize = 32;			//Should be one of 1, 2, 4, 8, 16, 32, 64, 128
	var c = document.getElementById("game");
	var canvas = c.getContext("2d");

	//Core Variables
	var grid = Array( (GameCanvas.canvasHeight/GameCanvas.blockSize)*
					   	 (GameCanvas.canvasWidth/GameCanvas.blockSize) );

	var dragging = false;

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

	GameCanvas.prototype.repaint = function() { GameCanvas.repaint(); }

	GameCanvas.repaint = function() {
		for(var i = 0; i < grid.length; i++)
			grid[i].repaint(canvas);
	}

	GameCanvas.prototype.burn = function() {
		grid[Math.floor(Math.random() * grid.length)].burn();
	}

	c.addEventListener("mousedown", function(e){
		var index = CalculateIndex(e.pageX, e.pageY);

		dragging = true;

		if(!grid[index].solid) {
			grid[index].highlight();
			grid[index].repaint(canvas);
		}
	}, false);

	c.addEventListener("mouseup", function(e) {
		dragging = false;

		GameCanvas.UnhightlightAll();
	}, false);


	c.addEventListener("mousemove", function(e) {

		if(dragging) {
			var index = CalculateIndex(e.pageX, e.pageY);

			if(!grid[index].solid) {
				grid[index].highlight();
				grid[index].repaint(canvas);
			}
		}
	});

	var CalculateIndex = function(pageX, pageY) {
		var x = pageX - c.offsetLeft;
		var y = pageY - c.offsetTop;

		var posX = Math.floor(x/GameCanvas.blockSize);
		var posY = Math.floor(y/GameCanvas.blockSize);

		return (posY)*(GameCanvas.canvasWidth/GameCanvas.blockSize) + (posX);
	}

	GameCanvas.UnhightlightAll = function() {
		for(var i = 0; i < grid.length; i++)
			grid[i].unHighlight();
		GameCanvas.repaint();
	}
}