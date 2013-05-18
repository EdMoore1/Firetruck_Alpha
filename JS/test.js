function MyClass(some) {
    var privateVar = "blah";
    this.publicVar = some;

    this.publicMethod = function() {}
    MyClass.staticMethod = function() {}
    MyClass.prototype.secondPublicMethod = function() {}
}