define([
    "uml/metamodel/diagrams/items/Item",
    "uml/metamodel/diagrams/items/_Positionable"
],
function (Item, _Positionable) {

    return dojo.declare([Item, _Positionable], {

        constructor: function () {
            this._type = "UML Comment Item";
            this._text = "";
        },

        loadData: function () {
            this.inherited(arguments);
            return this;
        },

        /* Text */
        getText: function () {	return this._text; },
        setText: function (v) { this._text = v; }

    });
});