/**
 * Comment describer
 */

define([
    "uml/generators/statements/_Describer",
    "uml/generators/statements/DescriberSupport"
],
function (_Describer, DescriberSupport) {

    return dojo.declare(_Describer, {

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