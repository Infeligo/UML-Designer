define([
    "uml/metamodel/Element"
],
function (Element) {

    return dojo.declare([Element], {

        constructor: function () {
            this._type = "UML Class Element";
            this._attributes = [];
            this._operations = [];
        },

        loadData: function (data) {
            var self = this;
            this.inherited(arguments);
            if (_.isArray(data.attributes)) {
                _.each(data.attributes, function (e) { self.loadAttribute(e); });
            }
            if (_.isArray(data.operations)) {
                _.each(data.operations, function (e) { self.loadOperation(e); });
            }
            return this;
        },

        loadAttribute: function (data) {
            this._attributes.push(data);
        },

        loadOperation: function (data) {
            this._operations.push(data);
        },

        getAttribute: function (name) {
            return _.detect(this._attributes, function (a) { return a.name === name; });
        },

        getAttributes: function () {
            return this._attributes.clone();
        },

        getOperations: function () {
            return this._operations.clone();
        }

    });
});