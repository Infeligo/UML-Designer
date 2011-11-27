define([
    "uml/metamodel/diagrams/items/Item",
    "uml/metamodel/diagrams/items/Positionable"
],
function (Item, Positionable) {

    return dojo.declare([Item, Positionable], {

        constructor: function () {
            this._type = "UML Class Item";
        },

        getAttributes: function () { return this.getElement().getAttributes(); },
        getOperations: function () { return this.getElement().getOperations(); },

        loadData: function (data) {
            this.inherited(arguments);
            return this;
        },

        toggleAttribute: function (attrName, show) {
//            var attr = this.getAttrbute(attrName);
//            if (!attr) return;
//
//            this._hiddenAttributes = _.reject(this._hiddenAttributes, function (it) { return it === attr; });
//            if (!show) this._hiddenAttributes.push(attr);
        }

    });
});