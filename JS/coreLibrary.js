/*global Building, Road, Grass, FireStation, EmptyBlock */

function GameCanvas() {
    //CONFIG Settings
    "use strict";
    GameCanvas.canvasWidth = 1024;
    GameCanvas.canvasHeight = 640;
    GameCanvas.blockSize = 32;          //Should be one of 1, 2, 4, 8, 16, 32, 64, 128
    var c = document.getElementById("game");
    var canvas = c.getContext("2d");
    var i, j;

    //Core Variables
    var grid = Array( (GameCanvas.canvasHeight/GameCanvas.blockSize) * (GameCanvas.canvasWidth/GameCanvas.blockSize) );

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

        console.log(arr);

        return arr;
    };

    var GetDirectSurroundings = function (position) {
        var arr = [];
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);

        arr.push(position-0-lineOffset);    //Top

        arr.push(position-1);               //Left
        arr.push(position+1);               //Right

        arr.push(position-0+lineOffset);    //Bottom

        for(i = 0; i < arr.length; i++) {
            if ( arr[i] < 0 || arr[i] > lineOffset*lineOffset ) {
                delete arr[i];
            }
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





    //Methods (public)
    GameCanvas.prototype.restart = function () {
        for (i = 0; i < grid.length; i++) {
            if (Math.floor((Math.random() * 10) + 1) === 1) {
                grid[i] = new Building(i, 1, 1, 30);
            } else if (Math.floor((Math.random() * 4) + 1) === 1) {
                grid[i] = new Road(i);
            } else {
                grid[i] = new Grass(i);
            }
        }


        //Put the firestation in the top left corner
        grid[0] = new FireStation(0);
        grid[1] = new FireStation(1);
        grid[GameCanvas.canvasWidth / GameCanvas.blockSize] = new FireStation( GameCanvas.canvasWidth / GameCanvas.blockSize );
        grid[GameCanvas.canvasWidth / GameCanvas.blockSize + 1] = new FireStation( GameCanvas.canvasWidth / GameCanvas.blockSize + 1 );
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








    c.addEventListener("mousedown", function (e) {
        var index = CalculateIndex(e.pageX, e.pageY);
        var lineOffset = (GameCanvas.canvasWidth/GameCanvas.blockSize);
        var surround = GetSurroundings(index);
        var fromStart = false;
        var i;

        //Check that the initial start location is the firestation
        for ( i in surround ) {
            if( grid[surround[i]].type === "FireStation") {
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

        //Check for a fire next to the cells (ie, Didn't skip over a solid block)
        var surround = GetSurroundings(CalculateIndex(e.pageX, e.pageY));

        // for(i = 0; i < surround.length; i++) {
        for (i in surround) {
            grid[surround[i]].highlight();
            grid[surround[i]].repaint(canvas);
        }

    }, false);




    c.addEventListener("mousemove", function(e) {

        if ( dragging ) {
            var index = CalculateIndex(e.pageX, e.pageY);
            var surround = GetDirectSurroundings(index);
            var i;
            var count = 0;

            for ( i in surround ) {
                if (grid[surround[i]].highlighted || grid[surround[i]].type === "FireStation") {
                    count++;
                }
            }

            if ( !grid[index].solid && count == 1 && (e.pageX-c.offsetLeft) != GameCanvas.canvasWidth+1 ) {
                grid[index].highlight();
                grid[index].repaint(canvas);
            }
        }
    });
}