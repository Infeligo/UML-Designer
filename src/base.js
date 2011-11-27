function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertType(variable, type, context) {
    throw new Error();
}

Array.prototype.clone = function () {
    //return this.filter(function () { return true });
    var arr = [];
    for (var i = 0, len = this.length; i < len; i++) arr[i] = this[i];
    return arr;
}

Math.sign = function (x) {
    return (x > 0) ? 1 : ( x < 0 ? -1 : 0 );
}

function safeCall(obj, method) {
    if (typeof obj[method] === "function") {        
        obj[method].call(obj, arguments.slice(3));
    }
}