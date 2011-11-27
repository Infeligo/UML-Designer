define([
    "uml/generators/statements/en/templates",
    "uml/generators/statements/ClassDiagramDescriber",
    "uml/generators/statements/ClassDescriber",
    "uml/generators/statements/AssociationDescriber",
    "uml/generators/statements/GeneralizationDescriber",
    "uml/generators/statements/CommentDescriber"
],
function (templates,
          ClassDiagramDescriber,
          ClassDescriber,
          AssociationDescriber,
          GeneralizationDescriber,
          CommentDescriber) {

    return dojo.declare(null, {

        constructor: function (verbalizer) {
            this._templates = templates;
            this._verbalizer = verbalizer;

            this._describers = [];
            this.setupDescribers();
        },

        setupDescribers: function () {
            this._classDiagramDescriber = new ClassDiagramDescriber(this._templates);
            this._classDescriber = new ClassDescriber(this._templates);
            this._associationDescriber = new AssociationDescriber(this._templates);
            this._generalizationDescriber = new GeneralizationDescriber(this._templates);
            this._commentDescriber = new CommentDescriber(this._templates);
        },

        generate: function (diagram) {
            this._sentences = [];
            // Generate descriptions
            this._generateIntro(diagram);
            this._generateClassDescriptions(diagram);
            this._generateAssociationDescriptions(diagram);
//            this._generateOutro(diagram);
            // Transform into natural language
            return this._verbalizer.verbalize(this._sentences);
        },

        _generateIntro: function (diagram) {
            var result;
            result = this._classDiagramDescriber.describe(diagram);
            this._mergeSentences(result);

            //result = this._commentDescriber.describe(topComments);
            //this._mergeSentences(result);
        },

        _generateClassDescriptions: function (diagram) {
            function isClass(el) {
                return el.getType() === "UML Class Item";
            }

            _.each(_.select(diagram.getItems(), isClass), function (clazz) {
                var result = this._classDescriber.describe(clazz);
                this._mergeSentences(result);
                //this._commentDescriber.describe(classRelatedComments);
            }, this);
        },

        _generateAssociationDescriptions: function (diagram) {
            function isAssociation(el) {
                return el.getType() === "UML Association Item";
            }
            var assocs = _.select(diagram.getItems(), isAssociation);

            _.each(assocs, function (assoc) {
                var result = this._associationDescriber.describe(assoc);
                this._mergeSentences(result);
                //this._commentDescriber.describe(associationComments);
            }, this);
        },

        _generateOutro: function (diagram) {
            //this._commentDescriber.describe(multirelatedComments);
            //this._commentDescriber.describe(bottomComments);
        },

        _mergeSentences: function (result) {
            if (!_.isArray(result)) result = [ result ];
            for (var i = 0; i < result.length; i++) {
                if (_.isObject(result[i])) {
                    this._sentences.push(result[i]);
                }
            }
        }

    });
});