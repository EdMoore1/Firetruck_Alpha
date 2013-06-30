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
    var PIXELS_OVERFLOW = 500;
    var typo = false;

    var possible = "abcdefghijklmnopqrstuvwxyz";
    var correctedText = "Typo spotted!";

    //Got a lot of this from theonion.com
    var items = ["Martians invade earth!",
                 "Man loves cats so much, Adopts 30 Cats",
                 "Prime Minister Trapped!",
                 "Grandma turns 100!",
                 "Frog Convention",
                 "Lucky old womand getting wheeled around airport",
                 "Stanley Cup Shot 11 Times During Chicago Blackhawks Victory Parade",
                 "Stunning E3 Announcement Reveals New Video Game Consoles To Phase Out Graphics Entirely",
                 "New Ultra-Realistic Console Game Has Users Press B Repeatedly To Make Character Breathe",
                 "Scientists Probably Discover A New Species Of Frog",
                 "Scientific Breakthrough Reveals Stars Consist Primarily Of Twinkles",
                 "Strange New Culture Forming On Other End Of Office",
                 "Local Laundromat Employs Social Media Coordinator",
                 "Financial Sector Thinks It's About Ready To Ruin World Again",
                 "City Of Miami Delighted By Impromptu Parade",
                 "Singer Recovering In Intensive Care Unit After Being Badly Booed",
                 "15 Wounded in Mass Cliche",
                 "Everybody Wins National Spelling Bee",
                 "Poll: 4% of Americans Vampires",
                 "US Poetry Rate Soars to New High",
                 "Worker Replaced By Palm Tree, Gets Promoted.",
                 "Mutant Crabgrass Threatens Corn Crop",
                 "Jim Carrey named as head of the FBI",
                 "Man Wakes Up Speaking Morse Code",
                 "WHO Warns Of Vampire Pandemic",
                 "Bob Dylan and The Rolling Stones To Record An Album Together",
                 "Willie Nelson and Honey Boo Boo To Star In A Western",
                 "Facebook helps cops find their lost puppy",
                 "iPhone 6 images leaked - will it be a winner?",
                 "Earth splitting in two"];





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
        if( Math.random() < 0.20) {
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
            canvas.fillStyle = "rgb(255,255,255)";
            canvas.fillRect(0, 0, NewsFeed.canvasWidth, NewsFeed.canvasHeight);
            canvas.fillStyle = "rgb(0,0,0)";
            canvas.fillText( currentText, x, y );

            x -= (NewsFeed.moveSpeed);

            if ( x < -PIXELS_OVERFLOW ) {
                writing = false;
            }
        }else{
            newStream();
        }
    }

    NewsFeed.prototype.isTypo = function() {
        return typo;
    }

    NewsFeed.prototype.spotTypo = function() {
        if (typo) currentText = correctedText;
        typo = false;
    }
}