function FireTruck(Path) {
	this.Path = Path;
	this.Stopped = false;
    this.Gas = 100;
    this.Water = 100;
    this.sprite = "sprites/fireTruck01.gif";
    this.color = 'rgb(0,0,0)';
    this.Pos = Path[0];




    FireTruck.prototype.Move = function() {
        //Declarations
        var found = false

        //Don't move if you don't need to
        if(this.Stopped) return;
        
        //Find where we are
        for(var i in this.Path) {
            if(this.Path[i] == this.Pos)
                found = true;
            else if(found) {
                this.Pos = this.Path[i];
                found = false;
            }
        }

        //If couldn't move to the next tile (No next tile)
        if(found) Stopped = true;
    };



    FireTruck.prototype.Spray = function() {
        //Find the target
        var sur = GetDirectSurroundings(Pos);

        console.log(sur);

        //TODO: Change the icon to show where it's spraying

        //Decrease the timer for the target

    };

    FireTruck.prototype.Last = function() {

        if(this.Pos == this.Path)
            return null;

        for(var i in this.Path) {
            if(this.Path[i] == this.Pos)
                return this.Path[i-1];
        }
    }


    FireTruck.prototype.Repaint = function(canvas) {
        var x = Math.floor( (this.Pos*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
        var y = ( Math.floor((this.Pos*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );


        canvas.fillStyle = this.color;
        canvas.fillRect(x, y, GameCanvas.blockSize, GameCanvas.blockSize);
    };
}