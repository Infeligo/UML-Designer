define([
    "uml/metamodel/Element"
],
function (Element) {

    return dojo.declare([Element], {

        constructor: function () {
            this._type = "UML Package Element";
            this._elements = [];
        },

        loadData: function (data) {
            this.inherited(arguments);
            this._elements = this.getModel().loadElements(data.elements);
            return this;
        },

        getElements: function () {
            return this._elements.clone();
        },

        onAfterLoad: function () {
            _.each(this._elements, function (e) { e.onAfterLoad(); });
        }
    });
});