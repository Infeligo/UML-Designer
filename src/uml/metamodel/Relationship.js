/**
 *  Defines Relationship class that represents UML relationship
 */

define([
    "uml/metamodel/Element"
],
function (Element) {

    return dojo.declare([Element], {

        constructor: function () {
            this._type = "UML Relationship Element";
			this._connections = [];
            this._arity = 2;
        },		
		
        getArity: function () { return this._arity; },
		
		getConnections: function () {
			return this._connections.clone();
		},

        loadData: function (data) {
            this.inherited(arguments);
            return this;
        }

    });
});