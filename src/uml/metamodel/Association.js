define([
    "uml/metamodel/Relationship",
    "uml/metamodel/AssociationEnd"
],
function (Relationship, AssociationEnd) {

    return dojo.declare([Relationship], {
        
        constructor: function () {
            this._type = "UML Association Element";
            this._arity = 2;
            this._connectionA = null;
            this._connectionB = null;
        },

        getConnectionA: function () { return this._connectionA; },
        setConnectionA: function (v) { this._connectionA = v; },

        getConnectionB: function () { return this._connectionB; },
        setConnectionB: function (v) { this._connectionB = v; },

        getConnections: function () { 
            return [ this.getConnectionA(), this.getConnectionB() ]; 
        },
        
        loadData: function (data) {
            this.inherited(arguments);
            this.loadConnections(data);
            return this;
        },

        loadConnections: function (data) {
            this.setConnectionA(new AssociationEnd(this).loadData(data.connectionA));
            this.setConnectionB(new AssociationEnd(this).loadData(data.connectionB));
        },

        /**
         * Check if start equals to the end
         */
        isReflexive: function () {
            return false;
        },


        onAfterLoad: function () {
            this.inherited(arguments);
            // TODO safeCall(this.getConnectionA(), "onAfterLoad");
            if (this.getConnectionA()) this.getConnectionA().onAfterLoad();
            if (this.getConnectionB()) this.getConnectionB().onAfterLoad();
        }
        
    });

});