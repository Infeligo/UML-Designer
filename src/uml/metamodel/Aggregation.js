define([
    "uml/metamodel/Association",
    "uml/metamodel/AssociationEnd"
],
function (Association, AssociationEnd) {

    return dojo.declare([Association], {
        
        constructor: function () {
            this._type = "UML Aggregation Element";
            this._isCompostion = false;
            this._owner = null;
            this._belonging = null;
        },
        
        loadData: function (data) {
            this.inherited(arguments);
            this.loadConnections(data);
            this.setComposition(data.subtype === "Composition");
            return this;
        },

        loadConnections: function (data) {
            this._connectionA = this._owner = data.owner;
            this._connectionB = this._belonging = data.belonging;
            this.setConnectionA(new AssociationEnd(this).loadData(this._connectionA));
            this.setConnectionB(new AssociationEnd(this).loadData(this._connectionB));
        },
                
        getData: function () {
            var data = this.inherited(arguments);
            delete data.connectionA;
            delete data.connectionB;
            return _.extend(data, {
                "subtype": this.isComposition() ? "Composition" : "Aggregation",
                "owner": this.connectionA,
                "belonging": this.connectionB
            });
        },
        
        getOwner: function () { return this.getConnectionA(); },
        
        getBelonging: function () { return this.getConnectionB(); },
        
        isComposition: function () { return this._isComposition; },
        
        setComposition: function (v) { this._isComposition = v; }
        
    });
    
});