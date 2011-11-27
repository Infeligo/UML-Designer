/**
 * Defines Comment class that represent UML metamodel comment
 */

define([
	"uml/metamodel/Element"
], 
function (Element) {
	
	return dojo.declare([Element], {
		
		constructor: function () {
			this._text = "";
		},

        getText: function () { return this._text; },
        setText: function (v) { this._text = v; },

		loadData: function (data) {
            this.inherited(arguments);
			this._text = data.text;
            return this;
		},

        getData: function () {
            return _.extend(this.inherited(arguments), {
                "text": this.getText()
            });
        }
		
	})
	
});