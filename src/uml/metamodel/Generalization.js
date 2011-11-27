/**
 *  UML generalization relationship
 */
define([
    "uml/metamodel/Relationship"
],
function (Relationship) {

    return dojo.declare([Relationship], {
        
        constructor: function () {
            this._type = "UML Generalization Element";
            this._super = null;
            this._child = null;
        },        	
		
        getSuper: function () { return this._super },
        setSuper: function (v) { this._super = v; },
        
        getChild: function () { return this._child; },
        setChild: function (v) { this._child = v; },
		
		getConnections: function () {
			return [ this.getSuper(), this.getChild() ];
		},

        loadData: function (data) {
            this.inherited(arguments);
            this._super = data.super;
            this._child = data.child;
            return this;
        },

        getData: function () {
            return _.extend(this.inherited(arguments), {
                "super": this.getSuper(),
                "child": this.getChild()
            });
        },

        onAfterLoad: function () {
            // Resolve references
            this.setSuper(this.getModel().getElementById(this._super));
            this.setChild(this.getModel().getElementById(this._child));
        }
        
    });

});