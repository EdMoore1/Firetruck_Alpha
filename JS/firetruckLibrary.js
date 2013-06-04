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
    this.target = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.moveSpeed = 20;

    /*FireTruck.prototype.Move = function() {
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
    }; */

    FireTruck.prototype.Move = function() {
        //Don't move if the truck is stopped
        if(this.Stopped)return;

        //If at destination
        if(this.Pos == this.Path[this.target]){
            //If end of the path
            if(this.target == this.Path.length-1) {
                this.Stopped = true;
            }
            
            this.target++;
            this.xOffset = 0;
            this.yOffset = 0;
        }else{
            var lineOffset = GameCanvas.canvasWidth/GameCanvas.blockSize;

            //Move closer to the target
            this.xOffset += ((Math.floor(this.Path[this.target]%lineOffset) - Math.floor(this.Pos%lineOffset))/GameCanvas.FPS)*this.moveSpeed;
            this.yOffset += ((Math.floor(this.Path[this.target]/lineOffset) - Math.floor(this.Pos/lineOffset))/GameCanvas.FPS)*this.moveSpeed;

            //If aligned to the target, set that as the position
            if( Math.round(Math.abs(this.yOffset)) == lineOffset ||
                Math.round(Math.abs(this.xOffset)) == GameCanvas.blockSize ) {
                this.Pos = this.Path[this.target];
                // this.target++;
                // this.xOffset = 0;
                // this.yOffset = 0;
                this.Move();
                // console.log('newTarget:'+this.Pos);
            }

            // console.log('[Pos, Target, Path[Target], Path.Length] = (' + this.Pos +','+ this.target +',' + this.Path[this.target] +','+ this.Path.length+')');

            // console.log(this.xOffset +','+ this.yOffset);
        }
    }

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
        this.target = 0;

        //Start at current position (if not already)
        this.Path = Array();
        if(newPath[0] != this.Pos)
            this.Path.push(this.Pos);

        //Push the rest of the array
        for ( i in newPath )
            this.Path.push(newPath[i]);

        this.Stopped = false;
    };


    FireTruck.prototype.Repaint = function(canvas) {
        var x = Math.floor( (this.Pos*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
        var y = ( Math.floor((this.Pos*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

        canvas.drawImage(this.img, Math.floor(x+this.xOffset), Math.floor(y+this.yOffset), GameCanvas.blockSize, GameCanvas.blockSize * (this.img.height / this.img.width));

        // canvas.fillStyle = this.color;
        // canvas.fillRect(x, y, GameCanvas.blockSize, GameCanvas.blockSize);
    };
}