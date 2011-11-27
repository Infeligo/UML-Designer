define([
    "uml/metamodel/diagrams/Diagram"
],
function (Diagram) {

    return dojo.declare([Diagram], {

        constructor: function () {
            this._type = "UML Class Diagram";
        }

    });
});