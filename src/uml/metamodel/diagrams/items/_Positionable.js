define(function () {

    return dojo.declare(null, {

        constructor: function () {
            this._top = 0;
            this._left = 0;
        },

        getTop: function () { return this._top; },
        setTop: function (v) { this._top = v; },

        getLeft: function () { return this._left; },
        setLeft: function (v) { this._left = v; },

        loadData: function (data) {
            this.inherited(arguments);
            this.setTop(data.top);
            this.setLeft(data.left);
            return this;
        },

        getData: function () {
            return this.inherited(arguments);
        }

    });

});