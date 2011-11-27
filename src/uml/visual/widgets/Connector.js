define(
function () {
    return dojo.declare(null, {

        constructor: function (parent, percentX, percentY) {
            this._parent = parent;
            this._percentX = percentX;
            this._percentY = percentY;
        },

        getParent: function () {
            return this._parent;
        },

        getConnectionPoint: function (widget) {
            return {
                "x": this._parent.getLeft() + Math.round(this._parent.getWidth() * this._percentX / 100),
                "y": this._parent.getTop() + Math.round(this._parent.getHeight() * this._percentY / 100)
            };
        }

    });
});