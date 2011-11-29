/**
 * RelationshipItem introduces the notion of connection, which may be
 * any connection to other item.
 */

define([
    "uml/metamodel/diagrams/items/Item"
],
function (Item) {

    return dojo.declare([Item], {

        constructor: function () {
            this._type = "UML Relationship Item";
            this._connections = [];
        },

        getArity: function () { return 2; },

        getConnections: function () {
            return this._connections.clone();
        },
        
        loadData: function (data) {
            this.inherited(arguments);
            this.loadConnections(data);
            return this;
        },
        
        loadConnections: function (data) { /* noop; */ },
        
        /**
         * Resolves connection to a concrete item.
         */
        _resolveConnection: function (connection) {            
            var item = this.getDiagram().getItemById(connection.item);
            if (!_.isObject(item)) {
                console.debug("Could not resolve connection item for %o from connection data %o", this, connection);
                throw new Error("Could not resolve connection item");
            } else {
                connection.item = item;
            }
            if (!connection.connector) connection.connector = 0;
        },
            
        onAfterLoad: function () {
            this.inherited(arguments);
            var self = this;
            _.each(this._connections, function (c) {
                self._resolveConnection(c);
            });
        }

    });
});