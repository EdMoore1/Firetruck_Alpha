function PointsFeed() {
    //CONFIG Settings
    "use strict";
    PointsFeed.canvasWidth = 1024;
    PointsFeed.canvasHeight = 20;
    PointsFeed.disabled = false;
    var c = document.getElementById("points");
    var canvas = c.getContext("2d");
    var damageX = 75;
    var timerX = 505;
    var pointX = 950;
    var y = 15;
    var timer;
    var points;
    var damage;
    var maxDamage;

    //Constructor
    timer = 0;
    points = 0;
    damage = 0;
    maxDamage = 0;

    PointsFeed.prototype.setMaxDamage = function(max) {
        maxDamage = max;
    }

    PointsFeed.prototype.destroy = function() {
        clearInterval(PointsFeed.timer);
        PointsFeed.disabled = true;   // shouldnt make a difference but it does..
        canvas.clearRect(0,0,GameCanvas.canvasWidth,GameCanvas.canvasHeight);
    }

    PointsFeed.prototype.nextms = function() {
        timer+=(1000/GameCanvas.FPS);
    }


    PointsFeed.prototype.addPoint = function() {
        points++;
    }

    PointsFeed.prototype.addDamage = function(dmg) {
        damage += Math.ceil(dmg);
    }

    PointsFeed.prototype.getTime = function() {
        return Math.floor(timer/1000);
    }

    PointsFeed.prototype.getPoints = function() {
        return points;
    }

    PointsFeed.prototype.getms = function() {
        return timer;
    }


    PointsFeed.prototype.failed = function() {
        return damage >= maxDamage;
    }

    PointsFeed.prototype.repaint = function() {
        canvas.clearRect(0,0,PointsFeed.canvasWidth, PointsFeed.canvasHeight);

        var tmp = timer/1000;
        
        var mins = Math.floor(tmp/60);
        var secs = Math.floor(tmp%60);

        //Formatting bug fix
        if(secs < 10) secs = "0" + secs;

        canvas.font="14px Arial";
        canvas.fillStyle = "rgb(255,255,255);";

        //Print the info out
        canvas.fillText( "Damage ($): " + damage +"/"+ maxDamage, damageX, y);
        canvas.fillText( mins +":"+ secs, timerX, y);
        canvas.fillText( "Points: " + points, pointX, y);
    }
}