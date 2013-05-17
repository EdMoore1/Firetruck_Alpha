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
    var truckNo = -1;
    var fireFrequency = 30;
    var img = new Image();

    //Core Variables
    var grid = initLevel.slice(0);
    var DIST_SCALAR = 8;
    var MAX_BURN_COUNT = 5;
    var PAUSE_WHILE_DRAGGING = true;

    var dragging = false;
    var safeMode = false;    //Only allow trucks sent straight to fires


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
        var arr = GetFurtherSurroundings(position);

        //Remove things we don't need
        for(var i in arr) {
            if( Math.abs(arr[i] - position) > 35 )
                delete arr[i];
            if( Math.abs(arr[i] - position) == 2 )
                delete arr[i];
        }

        return arr;
    };

    var GetDirectSurroundings = function (position) {
        var arr = GetSurroundings(position);
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);

        //Remove things we don't need
        for(var i in arr) {
            if ( Math.floor(position/lineOffset) != Math.floor(arr[i]/lineOffset) &&
                 position%lineOffset != arr[i]%lineOffset )
                delete arr[i];
        }

        return arr;
    };


    var GetFurtherSurroundings = function (position) {
        var arr = [];
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);
        var farLeft = (position%lineOffset == 0);
        var farRght = (position%lineOffset == lineOffset-1);
        var inrLeft = (position%lineOffset == 1);
        var inrRght = (position%lineOffset == lineOffset-2);
        position = parseInt(position);  //Hack to make math work correctly

        /*
            0 1 2 3 4
            5 6 7 8 9
            0 1 * 2 3
            4 5 6 7 8
            9 0 1 2 3
        */

        if(!farLeft && !inrLeft)
            arr.push(position-2-lineOffset*2);  //0
        if(!farLeft)
            arr.push(position-1-lineOffset*2);  //1
        arr.push(position-0-lineOffset*2);  //2
        if(!farRght)
            arr.push(position+1-lineOffset*2);  //3
        if(!farRght && !inrRght)
            arr.push(position+2-lineOffset*2);  //4

        if(!farLeft && !inrLeft)
            arr.push(position-2-lineOffset*1);  //5
        if(!farLeft)
            arr.push(position-1-lineOffset*1);  //6
        arr.push(position-0-lineOffset*1);  //7
        if(!farRght)
            arr.push(position+1-lineOffset*1);  //8
        if(!farRght && !inrRght)
            arr.push(position+2-lineOffset*1);  //9

        if(!farLeft && !inrLeft)
            arr.push(position-2-lineOffset*0);  //0
        if(!farLeft)
            arr.push(position-1-lineOffset*0);  //1
                        /**/
        if(!farRght)
            arr.push(position+1-lineOffset*0);  //2
        if(!farRght && !inrRght)
            arr.push(position+2-lineOffset*0);  //3

        if(!farLeft && !inrLeft)
            arr.push(position-2+lineOffset*1);  //4
        if(!farLeft)
            arr.push(position-1+lineOffset*1);  //5
        arr.push(position-0+lineOffset*1);  //6
        if(!farRght)
            arr.push(position+1+lineOffset*1);  //7
        if(!farRght && !inrRght)
            arr.push(position+2+lineOffset*1);  //8

        if(!farLeft && !inrLeft)
            arr.push(position-2+lineOffset*2);  //9
        if(!farLeft)
            arr.push(position-1+lineOffset*2);  //0
        arr.push(position-0+lineOffset*2);  //1
        if(!farRght)
            arr.push(position+1+lineOffset*2);  //2
        if(!farRght && !inrRght)
            arr.push(position+2+lineOffset*2);  //3

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

            //Delete silly values
            if(arr[i] < 0 || arr[i] > grid.length)
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

    var restart = function () {
        this.start(initLevel);
    };

    var start = function (levelArr, trucks) {
        initLevel = levelArr.slice(0);
        maxTrucks = trucks;

        for(var i = 0; i < levelArr.length; i++) {
            grid[i] = intToBlock(levelArr[i], i);
            grid[i].init(i);
        }

        // grid[Math.floor(Math.random() * grid.length) + 1].burn();

        winCondition = true;
    };

    var end = function(won) {
        winCondition = false;
        clearInterval(timer);


        console.log('winnar');
        img.src = 'images/victory.jpg';
        // console.log(img.src);
        canvas.drawImage(img, 0,0);
    }


    //Methods (public)
    GameCanvas.prototype.start = function (levelArr, trucks) { start(levelArr, trucks); }
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


    GameCanvas.onFire = function (pos) {
        pos = parseInt(pos);
        if(pos < 0 || pos > (GameCanvas.canvasWidth/GameCanvas.blockSize * GameCanvas.canvasHeight/GameCanvas.blockSize) )
            return null;
        return grid[pos].onFire;
    }

    GameCanvas.paused = function () {
        return dragging;
    }
















    /* ACTION CODE */

    var timer = setInterval( function() {
        if (!(dragging && PAUSE_WHILE_DRAGGING)) {
            var i, j;
            var foundTarget = false;
            var toBurn = Array();
            var burnCount;
            var burnTarget = -1;
            

            //Evaluate burn conditions
            //May need optimisation
            for(i in grid) {
                if (grid[i].onFire) {
                    var sur = GetFurtherSurroundings(grid[i].ID);
                    burnCount = 0;
                    for(j in sur) {
                        if( grid[sur[j]].flammable != 0 && 
                            ([0,1,2,3,4,5,10,13,14,,18,19,20,21,22,23].indexOf(j) >= 0 && (Math.random() < (grid[sur[j]].flammable/DIST_SCALAR)) ||
                            (Math.random() < grid[sur[j]].flammable)))
                            if(burnCount++ < MAX_BURN_COUNT)
                                toBurn.push(sur[j]);
                    }
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
                    for(j in sur) {

                        if(!foundTarget && !isNaN(sur[j]) && grid[sur[j]].onFire) {
                            foundTarget = true;
                            grid[sur[j]].sprayed();
                        }
                    }
                }else{
                    trucks[i].Move();
                    trucks[i].Repaint(canvas);
                    // if(trucks[i].last() != null && !trucks[i].stopped)
                        // grid[trucks[i].last()].repaint(canvas);
                }
            }


            if(time%fireFrequency == 0) {
                while(burnTarget < 0 || grid[burnTarget].flammable == 0) {
                    burnTarget = Math.floor(Math.random() * grid.length);
                    for(i in trucks)
                        if(trucks[i].Pos == burnTarget)
                            burnTarget = -1;
                }
                toBurn.push(burnTarget);
            }

            //Dont burn tiles that a truck is on
            for(i in trucks)
                for(j in toBurn)
                    if(trucks[i].Pos == toBurn[j])
                        delete toBurn[j];

            //Burn the tiles required
            for(i in toBurn) {
                grid[toBurn[i]].burn();
                grid[toBurn[i]].repaint(canvas);
            }

            //Evaluate win conditions
            var noFires = true;
            for(i in grid) {
                if(grid[i].onFire) {
                    noFires = false;
                    break;
                }
            }

            if(noFires) {
                end(true);
            }

            //Increment the timer
            var mins = Math.floor(time/60);
            var secs = Math.floor(time%60);

            //Clean up the time
            if(secs < 10) 
                secs = "0" + secs;


            document.getElementById("timer").innerHTML = mins +":"+ secs;
            time++;
        }
    }, 1000);


    c.addEventListener("mousedown", MouseDownHandler, false);
    c.addEventListener("mouseup", MouseUpHandler, false);
    c.addEventListener("mousemove", MouseMoveHandler, false);
    c.addEventListener("touchstart", MouseDownHandler, false);
    c.addEventListener("touchend", MouseUpHandler, false);
    c.addEventListener("touchmove", MouseMoveHandler, false);

    function MouseDownHandler(e) {
        var index = CalculateIndex(e.pageX, e.pageY);
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);
        var surround = GetDirectSurroundings(index);
        var fromStart = false;
        truckNo = -1;
        var i;
        highlightedPath = new Array();
        e.preventDefault();

        //Check that the initial start location is the firestation
        for ( i in surround ) {
            if( grid[surround[i]].className === "firestation" ) {
                fromStart = true;
            }

            for( j in trucks )
                if( trucks[j].Pos == surround[i] && truckNo == -1)
                    truckNo = j;
        }

        //Initialise the dragging code, After this the dragging code takes care of the highlighting
        if (fromStart || truckNo > -1) { dragging = true; }
    }

    function MouseUpHandler(e) {
        dragging = false;
        var count = 0;
        var i;
        var fireCount = 0;
        e.preventDefault();

        lastDragged = null;

        //Check for a fire next to the cells (ie, Didn't skip over a solid block)
        var surround = GetSurroundings(CalculateIndex(e.pageX, e.pageY));

        //TODO: Write blink code
        for(var j = 0; j < 1; j++) {
            for(i in highlightedPath) {
                if(j%2 == 0) {
                    grid[highlightedPath[i]].unHighlight();
                }else{
                    grid[highlightedPath[i]].highlight();
                }
                grid[highlightedPath[i]].repaint(canvas);
            }
            sleep(100);
        }

        //Check for a fire in the surroundings
        for(i in surround)
            if(grid[surround[i]].onFire)
                fireCount++;

        if(fireCount>0 || !safeMode) {
            //Move or Create fire truck
            if(truckNo > -1) {
                trucks[truckNo].setPath(highlightedPath);
                highlightedPath = Array();
            }else if(trucks.length < maxTrucks) {
                trucks.push(new FireTruck(highlightedPath));
                highlightedPath = Array();
            }
        }
    }

    function MouseMoveHandler(e) {
        if ( dragging ) {
            var index = CalculateIndex(e.pageX, e.pageY);
            var surround = GetDirectSurroundings(index);
            var i;
            var count = 0;
            e.preventDefault();

            if(index < (GameCanvas.canvasWidth/GameCanvas.blockSize * GameCanvas.canvasHeight/GameCanvas.blockSize) ) {

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
        }
    }

    GameCanvas.StartDebugging = function (tile) { 
        for( var i in grid ) {
            grid[i] = new Grass();
            grid[i].init(i);
            grid[i].repaint(canvas);
        }

        grid[tile].burn();
    };
}