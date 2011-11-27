define([
    "uml/generators/statements/Describer",
    "uml/generators/statements/DescriberSupport",
    "verb/Sentence",
    "uml/metamodel/diagrams/ClassDiagram"
],
function (Describer, DescriberSupport, Sentence, ClassDiagram) {

    return dojo.declare([Describer, DescriberSupport], {

        canDescribe: function (subj) {
            return subj.isInstanceOf(ClassDiagram);
        },

        describe: function (classDiagram) {

            function isClass(i) {
                return i.getType() === "UML Class Item";
            }

            return this._createSentence("Class diagram description", {
                "diagram": this._pluckName(classDiagram),
                "classes": this._pluckNames(_(classDiagram.getItems()).select(isClass))
            });
        }

    });
});