function FireTruck(Path) {
	this.Path = Path;
	this.Stopped = false;
    this.Gas = 100;
    this.Water = 100;
    this.sprite = "sprites/fireTruck01.gif";
    this.color = 'rgb(0,0,0)';
    this.Pos = Path[0];

    FireTruck.prototype.Move = function() {
        var found = false;

        //Don't move if you don't need to
        if(this.Stopped) return;
        
        //Find where we are
        for(var i in this.Path) {

            if(this.Path[i] == this.Pos && !found) {
                found = true;
            }else if(found) {
                this.Pos = this.Path[i];
                return;
            }else{ }
        }

        if(found == true) this.Stopped = true;
    };

    FireTruck.prototype.last = function() {

        if(this.Pos == this.Path)
            return null;
        if(this.Stopped == true)
            return this.Pos;

        for(var i in this.Path) {
            if(this.Path[i] == this.Pos)
                return this.Path[i-1];
        }
    };


    FireTruck.prototype.Repaint = function(canvas) {
        var x = Math.floor( (this.Pos*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
        var y = ( Math.floor((this.Pos*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );


        canvas.fillStyle = this.color;
        canvas.fillRect(x, y, GameCanvas.blockSize, GameCanvas.blockSize);
    };
}