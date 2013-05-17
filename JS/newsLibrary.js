function NewsFeed() {
    //CONFIG Settings
    "use strict";
    NewsFeed.canvasWidth = 1024;
    NewsFeed.canvasHeight = 20;
    NewsFeed.moveSpeed = 2;
    NewsFeed.FPS = 30;
    var c = document.getElementById("news");
    var canvas = c.getContext("2d");
    var currentItem;
    var x;
    var y;
    var writing = false;
    var PIXELS_OVERFLOW = 50;

    var items = ["news 1", "news 2", "news 3"];



    NewsFeed.prototype.start = function() {
        newStream();
    }


    var newStream = function() {
        currentItem = Math.floor(Math.random() * items.length);
        x = 1024;
        y = 15;
        writing = true;
    };

    var timer = setInterval(function() {

        if( writing && !GameCanvas.paused() ) {
            canvas.font="18px Arial";
            canvas.fillStyle = "rgb(255,255,255);";
            canvas.fillRect(0, 0, NewsFeed.canvasWidth, NewsFeed.canvasHeight);
            canvas.fillStyle = "rgb(0,0,0);";
            canvas.fillText( items[currentItem], x, y );

            x -= (NewsFeed.moveSpeed);

            if ( x < -PIXELS_OVERFLOW ) {
                writing = false;
            }
        }else{
            newStream();
        }


    }, Math.round(1000/NewsFeed.FPS));


}