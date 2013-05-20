function FireTruck(Path) {
	this.Path = Path;
	this.Stopped = false;
    this.Gas = 100;
    this.Water = 100;
    this.sprite = "sprites/fireTruck01.gif";
    this.color = 'rgb(0,0,0)';
    this.Pos = Path[0];
    this.img = new Image();
    this.img.src = "images/sprites/firetruck.png";

    FireTruck.prototype.Move = function() {
        var found = false;
        var next = -1;

        //Don't move if you don't need to
        if(this.Stopped) return;
        
        //Find where we are
        for(var i in this.Path) {

            if(this.Path[i] == this.Pos && !found) {
                found = true;
            }else if(found) {
                next = this.Path[i];

                if(GameCanvas.onFire(next))
                    this.Stopped = true;
                else
                    this.Pos = next;
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

    FireTruck.prototype.setPath = function(newPath) {
        var i;

        //Start at current position
        this.Path = Array();
        this.Path.push(this.Pos);

        //Push the rest of the array
        for ( i in newPath )
            this.Path.push(newPath[i]);

        this.Stopped = false;
    };


    FireTruck.prototype.Repaint = function(canvas) {
        var x = Math.floor( (this.Pos*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
        var y = ( Math.floor((this.Pos*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

        canvas.drawImage(this.img, x, y, GameCanvas.blockSize, GameCanvas.blockSize * (this.img.height / this.img.width));

        // canvas.fillStyle = this.color;
        // canvas.fillRect(x, y, GameCanvas.blockSize, GameCanvas.blockSize);
    };
}