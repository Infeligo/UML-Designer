/**
 * Generalization describer
 */

define([
    "uml/generators/statements/Describer",
    "uml/generators/statements/DescriberSupport"
],
function (Describer, DescriberSupport) {

    return dojo.declare([Describer, DescriberSupport], {

        canDescribe: function (what) {
            return what.getType ? what.getType() === "UML Generalization Item" : false;
        },

        describe: function (gener) {
            return this._createSentence("Generalization", {
                "child": this._pluckName(gener.getElement().getChild()),
                "super": this._pluckName(gener.getElement().getSuper())
            });
        }

    });

});