function MyClass() {
    var privateVar = "blah";
    this.publicVar = "blha";

    this.publicMethod = function() {}
    MyClass.staticMethod = function() {}
    MyClass.prototype.secondPublicMethod = function() {}
}