define([
    "uml/metamodel/diagrams/items/RelationshipItem"
],
function (RelationshipItem) {

    return dojo.declare(RelationshipItem, {

        constructor: function () {
            this._type = "UML Generalization Item";
        },
        
        getSuperConnection: function () { return this._connections[0]; },
        setSuperConnection: function (connection) { this._connections[0] = connection; },

        getChildConnection: function () { return this._connections[1]; },
        setChildConnection: function (connection) { this._connections[1] = connection; },

        loadConnections: function (data) {
            this._connections.push(data["super"]);
            this._connections.push(data["child"]);
        },

    });

});