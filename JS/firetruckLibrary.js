var trucksImg = Array();
var sprayImg = Array();
var trucksRef = ["h0_0", "h0_1", "v0_0", "v0_1", "h1_0", "h1_1", "v1_0", "v1_1"];
var sprayRef = [6,7,8,11,12,15,16,17];

for(var i in trucksRef) {
    trucksImg[i] = new Image();
    trucksImg[i].src = "images/sprites/truck_"+ trucksRef[i] +".png";
}

for(var i in sprayRef) {
    sprayImg[sprayRef[i]] = new Image();
    sprayImg[sprayRef[i]].src = "images/sprites/spray_"+sprayRef[i]+".png";
}

function FireTruck(Path) {
	this.Path = Path;
	this.Stopped = false;
    this.Gas = 100;
    this.Water = 100;
    this.sprite = "sprites/fireTruck01.gif";
    this.color = 'rgb(0,0,0)';
    this.Pos = Path[0];
    // this.img = new Image();
    // this.img.src = "images/sprites/firetruck.png";
    this.imgRef = 0;
    this.target = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.moveSpeed = 35;
    this.alt = 0;
    this.spraySpriteIndex = -1;
    this.sprayOffset = 16;
    this.sprayCount = 0;

    this.sprayX = 0;
    this.sprayY = 0;

    FireTruck.prototype.Move = function() {
        //Don't move if the truck is stopped
        if(this.Stopped)return;

        //If at destination
        if(this.Pos == this.Path[this.target]){
            //If end of the path
            if(this.target == this.Path.length-1) {
                this.Stopped = true;
            }

            if(GameCanvas.onFire(this.target+1))
                this.Stopped = true;
            else
                this.target++;

            this.xOffset = 0;
            this.yOffset = 0;
        }else{
            var lineOffset = GameCanvas.canvasWidth/GameCanvas.blockSize;

            //Move closer to the target
            this.xOffset += ((Math.floor(this.Path[this.target]%lineOffset) - Math.floor(this.Pos%lineOffset))/GameCanvas.FPS)*this.moveSpeed;
            this.yOffset += ((Math.floor(this.Path[this.target]/lineOffset) - Math.floor(this.Pos/lineOffset))/GameCanvas.FPS)*this.moveSpeed;

            //Set the direction of the sprite
            if(this.xOffset > 0)
                this.imgRef = 0;
            else if(this.yOffset < 0)
                this.imgRef = 2;
            else if(this.xOffset < 0)
                this.imgRef = 4;
            else
                this.imgRef = 6;

            if(this.alt > GameCanvas.FPS/2)
                this.imgRef++;

            this.alt++;
            this.alt %= 30;



            //If aligned to the target, set that as the position
            if( Math.round(Math.abs(this.yOffset)) == lineOffset ||
                Math.round(Math.abs(this.xOffset)) == GameCanvas.blockSize ) {
                this.Pos = this.Path[this.target];

                this.Move();                
            }
            
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

    FireTruck.prototype.setSprayDirection = function(i) {
        /*
            6   7   8
            11  *   12
            15  16  17
        */

        if(this.sprayCount == 0) {
            i = parseInt(i);        //I hate javascript.
            this.sprayX = 0;
            this.sprayY = 0;

            this.spraySpriteIndex = i;

            if( [6,11,15].indexOf(i) != -1)
                this.sprayX = -this.sprayOffset;
            if( [8,12,17].indexOf(i) != -1)
                this.sprayX = this.sprayOffset;

            if( [6,7,8].indexOf(i) != -1)
                this.sprayY = -this.sprayOffset;
            if( [15,16,17].indexOf(i) != -1)
                this.sprayY = this.sprayOffset;
        }
    };

    FireTruck.prototype.Repaint = function(canvas) {
        var x = Math.floor( (this.Pos*GameCanvas.blockSize)%(GameCanvas.canvasWidth) );
        var y = ( Math.floor((this.Pos*GameCanvas.blockSize)/(GameCanvas.canvasWidth))*GameCanvas.blockSize );

        //Draw the truck
        canvas.drawImage(trucksImg[this.imgRef], Math.floor(x+this.xOffset), Math.floor(y+this.yOffset), GameCanvas.blockSize, GameCanvas.blockSize * (trucksImg[this.imgRef].height / trucksImg[this.imgRef].width));

        //Draw the spray if required
        if(this.Stopped && this.spraySpriteIndex >= 0 || this.sprayCount > 0) {
            if( sprayImg[this.spraySpriteIndex] != undefined)
                canvas.drawImage(sprayImg[this.spraySpriteIndex], Math.floor(x+this.sprayX), Math.floor(y+this.sprayY), GameCanvas.blockSize, GameCanvas.blockSize* (sprayImg[this.spraySpriteIndex].height/sprayImg[this.spraySpriteIndex].width));
            if(this.sprayCount++ == GameCanvas.FPS) this.sprayCount=0;
        }
    };
}