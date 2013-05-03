function GameCanvas() {
    //CONFIG Settings
    "use strict";
    GameCanvas.canvasWidth = 1024;
    GameCanvas.canvasHeight = 640;
    GameCanvas.blockSize = 32;          //Should be one of 1, 2, 4, 8, 16, 32, 64, 128
    var c = document.getElementById("game");
    var canvas = c.getContext("2d");
    var i, j;
    var highlightedPath = new Array();
    var time = 0;
    var winCondition = false;
    var initLevel = Array( (GameCanvas.canvasHeight/GameCanvas.blockSize) * (GameCanvas.canvasWidth/GameCanvas.blockSize) );
    var lastDragged;
    var maxTrucks = 1;
    var trucks = Array();

    //Core Variables
    var grid = initLevel.slice(0);

    var dragging = false;


    //Functions not methods (private)
    var CalculateIndex = function (pageX, pageY) {
        var x = pageX - c.offsetLeft;
        var y = pageY - c.offsetTop;

        var posX = Math.floor(x / GameCanvas.blockSize);
        var posY = Math.floor(y / GameCanvas.blockSize);

        return (posY) * (GameCanvas.canvasWidth / GameCanvas.blockSize) + (posX);
    };

    GameCanvas.UnhightlightAll = function () {
        for (i = 0; i < grid.length; i++) {
            grid[i].unHighlight();
        }
        GameCanvas.repaint();
    };

    var GetSurroundings = function (position) {
        var arr = [];
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);

        arr.push(position-1-lineOffset);    //TopLeft
        arr.push(position-0-lineOffset);    //Top
        arr.push(position+1-lineOffset);    //TopRight


        arr.push(position-1);               //Left
        // arr.push(position-0-lineOffset); //
        arr.push(position+1);               //Right

        arr.push(position-1+lineOffset);    //BotLeft
        arr.push(position-0+lineOffset);    //Bottom
        arr.push(position+1+lineOffset);    //BotRight

        //Check the top and bot boundries
        for(i = 0; i < arr.length; i++) {
            if ( arr[i] < 0 || arr[i] > grid.length-1 ) {
                delete arr[i];
            }
        }

        //Check the side boundries
        for(i = 0; i < arr.length; i++) {
            if ((position%lineOffset==lineOffset-1) && (arr[i]%lineOffset==0))
                delete arr[i];
            if ((position%lineOffset==0) && (arr[i]%lineOffset==lineOffset-1))
                delete arr[i];
        }

        // console.log(arr);

        return arr;
    };

    var GetDirectSurroundings = function (position) {
        var arr = [];
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);

        arr.push(position-0-lineOffset);    //Top

        arr.push(position-1);               //Left
        arr.push(position+1);               //Right

        arr.push(position-0+lineOffset);    //Bottom

        //Check the top and bot boundries
        for(i = 0; i < arr.length; i++) {
            if ( arr[i] < 0 || arr[i] > grid.length-1 ) {
                delete arr[i];
            }
        }

        //Check the side boundries
        for(i = 0; i < arr.length; i++) {
            if ((position%lineOffset==lineOffset-1) && (arr[i]%lineOffset==0))
                delete arr[i];
            if ((position%lineOffset==0) && (arr[i]%lineOffset==lineOffset-1))
                delete arr[i];
        }

        return arr;
    };

    var inArray = function (needle, haystack) {
        if ( needle.constructor !== Array) {
            needle = [needle];
        }

        for(i = 0; i < needle.length; i++) {
            for(j = 0; j < haystack.length; j++) {
                if( needle[i] === haystack[j] ) {
                    return true;
                }
            }
        }

        return false;
    };

    var timer = setInterval( function() {
        time++;
        var i, j;
        var foundTarget = false;
        var toBurn = Array();
        

        //Evaluate burn conditions
        //May need optimisation
        for(i in grid) {
            if (grid[i].onFire) {
                var sur = GetDirectSurroundings(grid[i].ID);
                for(j in sur)
                    if( grid[sur[j]].flammable != 0 && Math.random() < grid[sur[j]].flammable )
                        toBurn.push(sur[j]);
        } }

        //Update all the tiles
        for(i in grid) {
            grid[i].update();
            grid[i].repaint(canvas);
        }

        //Truck operations
        for(i in trucks) {
            if( trucks[i].Stopped == true ) {
                trucks[i].Repaint(canvas);
                var sur = GetSurroundings(trucks[i].last());
                for(j in sur)
                    if(!foundTarget && grid[sur[j]].onFire) {
                        foundTarget = true;
                        grid[sur[j]].sprayed();
                    }
            }else{
                trucks[i].Move();
                trucks[i].Repaint(canvas);
                if(trucks[i].last() != null)
                    grid[trucks[i].last()].repaint(canvas);
            }
        }

        //Burn the tiles required
        for(i in toBurn) {
            grid[toBurn[i]].burn();
            grid[toBurn[i]].repaint(canvas);
        }


        //Increment the timer
        var mins = Math.floor(time/60);
        var secs = Math.floor(time%60);

        //Clean up the time
        if(secs < 10) 
            secs = "0" + secs;
        document.getElementById("timer").innerHTML = mins +":"+ secs;
    }, 1000);

    var intToBlock = function (i, pos) {
        switch(i) {
            case(0): return new Grass(pos);
            case(1): return new Road(pos);
            case(2): return new Building(pos);
            case(3): return new FireStation(pos);
            case(4): return new GasStation(pos);
            case(5): return new River(pos);
            case(6): return new Traffic(pos);
            default:
                throw new Error("CRITICAL: Unable to match int to BlockType (" + i +")");
                return null;   //Will throw error
        }
    }



    //Methods (public)
    GameCanvas.prototype.restart = function () {
        this.start(initLevel);
    };

    GameCanvas.prototype.start = function (levelArr, trucks) {
        initLevel = levelArr.slice(0);
        maxTrucks = trucks;

        for(var i = 0; i < levelArr.length; i++) {
            grid[i] = intToBlock(levelArr[i], i);
            grid[i].init(i);
        }

        grid[Math.floor(Math.random() * grid.length) + 1].burn();

        winCondition = true;
    };

    GameCanvas.prototype.repaint = function () { GameCanvas.repaint(); };

    GameCanvas.repaint = function () {
        for (i = 0; i < grid.length; i++) {
            grid[i].repaint(canvas);
        }
    };

    GameCanvas.prototype.burn = function () {
        grid[Math.floor(Math.random() * grid.length)].burn();
    };

    var sleep = function (ms) {
        var dt = new Date();
        dt.setTime(dt.getTime() + ms);
        while ( new Date().getTime() < dt.getTime() ) {}
    };

    c.addEventListener("mousedown", function (e) {
        var index = CalculateIndex(e.pageX, e.pageY);
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);
        var surround = GetSurroundings(index);
        var fromStart = false;
        var i;
        highlightedPath = new Array();

        //Check that the initial start location is the firestation
        for ( i in surround ) {
            if( grid[surround[i]].className === "firestation") {
                fromStart = true;
            }
        }

        //Initialise the dragging code, After this the dragging code takes care of the highlighting
        if (fromStart) { dragging = true; }
    }, false);



    c.addEventListener("mouseup", function(e) {
        dragging = false;
        var count = 0;
        var i;
        var fireCount = 0;

        lastDragged = null;

        //Check for a fire next to the cells (ie, Didn't skip over a solid block)
        var surround = GetSurroundings(CalculateIndex(e.pageX, e.pageY));

        //Blink
        for(var j = 0; j < 7; j++) {
            for(i in highlightedPath) {
                if(j%2 == 0) {
                    grid[highlightedPath[i]].unHighlight();
                    console.log("Unhighlight");
                }else{
                    grid[highlightedPath[i]].highlight();
                    console.log("Highlight");
                }
                grid[highlightedPath[i]].repaint(canvas);
            }
            sleep(100);
        }

        //Check for a fire in the surroundings
        for(i in surround)
            if(grid[surround[i]].onFire)
                fireCount++;

        if(fireCount>0) {
            //Create fire truck
            if(trucks.length < maxTrucks) {
                console.log('Sending Truck');
                trucks.push(new FireTruck(highlightedPath));
                highlightedPath = Array();
            }
        }


    }, false);




    c.addEventListener("mousemove", function(e) {

        if ( dragging ) {
            var index = CalculateIndex(e.pageX, e.pageY);
            var surround = GetDirectSurroundings(index);
            var i;
            var count = 0;


            for ( i in surround ) {
                if (grid[surround[i]].highlighted || grid[surround[i]].className === "FireStation") {
                    count++;
                }
            }


            if ( !(grid[index].height > 0) && !grid[index].onFire && (e.pageX-c.offsetLeft) < GameCanvas.canvasWidth &&
                 (lastDragged == null || inArray(lastDragged, surround)) ) {
                if (highlightedPath.indexOf(index) == -1) {
                    highlightedPath.push(index);
                    lastDragged = index;
                }   
                grid[index].highlight();
                grid[index].repaint(canvas);
            }
        }
    });
}