/**
 * Comment describer
 */

define([
    "uml/generators/statements/Describer",
    "uml/generators/statements/DescriberSupport"
],
function (Describer, DescriberSupport) {

    return dojo.declare(Describer, {

        canDescribe: function (what) {
            return what.getType ? what.getType() === "UML Comment Item" : false;
        },

        describe: function (comment) {
            return this._createSentence("Comment for diagram", {
                text: comment.getText()
            });
        }

    });

});