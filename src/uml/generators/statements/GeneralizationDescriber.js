/**
 * Generalization describer
 */

define([
    "uml/generators/statements/_Describer",
    "uml/generators/statements/DescriberSupport"
],
function (_Describer, DescriberSupport) {

    return dojo.declare([_Describer, DescriberSupport], {

        canDescribe: function (what) {
            return what.getType ? what.getType() === "UML Generalization Item" : false;
        },

        describe: function (gener) {
            return this._createSentence("Generalization", {
                "child": this._pluckName(gener.getText()),
                "super": this._pluckName(gener.getSuper())
            });
        }

    });

});