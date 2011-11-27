define([
    "uml/metamodel/diagrams/items/AssociationItem"
],
function (AssociationItem) {

    return dojo.declare(AssociationItem, {

        constructor: function () {
            this._type = "UML Aggregation Item";
        },

        getOwnerConnection: function () { return this._connections[0]; },
        setOwnerConnection: function (connection) { this._connections[0] = connection; },

        getBelongingConnection: function () { return this._connections[1]; },
        setBelongingConnection: function (connection) { this._connections[1] = connection; },

        loadConnections: function (data) {
            this._connections.push(data.owner);
            this._connections.push(data.belonging);
        }

    });

});