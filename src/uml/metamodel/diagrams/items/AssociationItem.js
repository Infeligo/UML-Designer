define([
    "uml/metamodel/diagrams/items/RelationshipItem"
],
function (RelationshipItem) {

    return dojo.declare(RelationshipItem, {

        constructor: function () {
            this._type = "UML Association Item";
        },

        getConnectionA: function () { return this._connections[0]; },
        setConnectionA: function (connection) { this._connections[0] = connection; },

        getConnectionB: function () { return this._connections[1]; },
        setConnectionB: function (connection) { this._connections[1] = connection; },

        loadConnections: function (data) {
            this._connections.push(data.connectionA);
            this._connections.push(data.connectionB);
        }

    });

});