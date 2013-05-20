function MyClass(some) {
    var privateVar = "blah";
    this.publicVar = some;

    this.publicMethod = function() {}
    MyClass.staticMethod = function() {}
    MyClass.prototype.secondPublicMethod = function() {}
    MyClass.prototype.modifyPubVar = function(blah) {
        console.log(this.publicVar);
    }
    this.test = function(blah) {
        console.log(this.publicVar);
    }
}

function MySuper() {

    this.publicSuperVar = "zyx";
}

MySuper.prototype.doStuff = function (some) {
    this.publicSuperVar = some;
}


MyClass.prototype = new MySuper();
