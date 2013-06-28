function NewsFeed() {
    //CONFIG Settings
    "use strict";
    NewsFeed.canvasWidth = 1024;
    NewsFeed.canvasHeight = 20;
    NewsFeed.moveSpeed = (100/GameCanvas.FPS);
    NewsFeed.disabled = false;
    var c = document.getElementById("news");
    var canvas = c.getContext("2d");
    var currentItem;
    var currentText;
    var x;
    var y;
    var writing = false;
    var PIXELS_OVERFLOW = 50;
    var typo = false;

    var possible = "abcdefghijklmnopqrstuvwxyz";
    var items = ["news 1", "news 2", "news 3"];


    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    }

    NewsFeed.prototype.start = function() {
        newStream();
    }

    NewsFeed.prototype.destroy = function() {
        clearInterval(NewsFeed.timer);
        NewsFeed.disabled = true;   // shouldnt make a difference but it does..
        canvas.clearRect(0,0,GameCanvas.canvasWidth,GameCanvas.canvasHeight);
    }


    var newStream = function() {
        currentItem = Math.floor(Math.random() * items.length);
        if( Math.random() < 0.20 ) {
            //Insert typo
            var rep = Math.floor(Math.random()*items[currentItem].length+1);
            var randChar = possible.charAt(Math.floor(Math.random() * possible.length));

            typo = true;
            currentText = items[currentItem].replaceAt(rep, randChar);
        }
        else {
            typo = false;
            currentText = items[currentItem];
        }

        x = 1024;
        y = 15;
        writing = true;
    };

    NewsFeed.prototype.repaint = function() {
        if( writing && !GameCanvas.paused() && !NewsFeed.disabled ) {
            canvas.font="18px Arial";
            canvas.fillStyle = "rgb(255,255,255);";
            canvas.fillRect(0, 0, NewsFeed.canvasWidth, NewsFeed.canvasHeight);
            canvas.fillStyle = "rgb(0,0,0);";
            canvas.fillText( currentText, x, y );

            x -= (NewsFeed.moveSpeed);

            if ( x < -PIXELS_OVERFLOW ) {
                writing = false;
            }
        }else{
            newStream();
        }
    }


    //Catch key press
    
}