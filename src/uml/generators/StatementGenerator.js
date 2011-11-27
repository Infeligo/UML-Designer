define([
    "uml/generators/statements/en/templates",
    "uml/generators/statements/ClassDiagramDescriber",
    "uml/generators/statements/ClassDescriber",
    "uml/generators/statements/AssociationDescriber"
],
function (templates, ClassDiagramDescriber, ClassDescriber, AssociationDescriber) {

    return dojo.declare(null, {

        constructor: function (verbalizer) {
            this._templates = templates;
            this._verbalizer = verbalizer;

            this._describers = [];
            this.setupDescribers();
        },

        setupDescribers: function () {
            this.addDescriber(new ClassDiagramDescriber(this._templates));
            this.addDescriber(new ClassDescriber(this._templates));
            this.addDescriber(new AssociationDescriber(this._templates));
        },

        addDescriber: function (describer) {
           this._describers.push(describer);
        },

        generate: function (diagram) {
            var self = this,
                sentences = [];

            this._describe(diagram, sentences);
            _(diagram.getItems()).each(function (item) { self._describe(item, sentences); } );

            return this._verbalizer.verbalize(sentences);
        },

        _describe: function (item, sentences) {

            function addSentence(s) { sentences.push(s); };

            _.each(this._describers, function (describer) {
                if (describer.canDescribe(item)) {
                    try {
                        var result = describer.describe(item);
                    } catch (e) {
                        console.error("Verbalizer %o failed to describe %o with error %o", describer, item, e);
                        return;
                    }
                    if (result) {
                        if (!_.isArray(result)) result = [result];
                        _(result).each(addSentence);
                    }
                }
            });
        }

    });
});