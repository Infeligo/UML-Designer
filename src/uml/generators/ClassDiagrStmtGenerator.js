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
            this._text = "";
            this._sentences = [];
            // Generate descriptions
            this._generateIntro(diagram);
            this._generateClassDescriptions(diagram);
            this._generateAssociationDescriptions(diagram);
//            this._generateOutro(diagram);
            return this._text;
        },

        _generateIntro: function (diagram) {
            var result, text = "";
            result = this._classDiagramDescriber.describe(diagram);
            text += this._verbalize(result);
            //result = this._commentDescriber.describe(topComments);
            //text += this._verbalize(result);
            this._text += this._p(text);
        },

        _generateClassDescriptions: function (diagram) {
            var result;
            var items = diagram.getItems();
            var generalizations = _.select(items, this._generalizationDescriber.canDescribe);
            
            _.each(_.select(diagram.getItems(), this._classDescriber.canDescribe), function (clazz) {
                // Generalization
                var gen = _.detect(generalizations, function (el) { return el.getChildConnection().item === clazz; }), genText = ""
                if (gen) {
                    result = this._generalizationDescriber.describe(gen);
                    genText = this._verbalize(result);
                }
                // Attributes and operations
                result = this._classDescriber.describe(clazz);
                this._text += this._p(genText + this._verbalize(result));
                //this._commentDescriber.describe(classRelatedComments);
            }, this);
        },

        _generateAssociationDescriptions: function (diagram) {
            var assocs = _.select(diagram.getItems(), this._associationDescriber.canDescribe);

            _.each(assocs, function (assoc) {
                var result = this._associationDescriber.describe(assoc, { simple: true });
                this._text += this._p(this._verbalize(result));
                result = this._associationDescriber.describe(assoc, { simple: false });
                _.each(result, function (res) {
                    this._text += this._p(this._verbalize(res), "sub");
                }, this);
                //this._commentDescriber.describe(associationComments);
            }, this);
        },

        _generateOutro: function (diagram) {
            //this._commentDescriber.describe(multirelatedComments);
            //this._commentDescriber.describe(bottomComments);
        },
        
        // Wraps in paragraph
        _p: function (text, classes) {
            return '<p' + (classes ? ' class="' + classes + '">' : '>') + text + '</p>';
        },
        
        _verbalize: function (s) {
            return this._verbalizer.verbalize(s, this._wrapWord);
        },
        
        _wrapWord: function (text, word) {
            if (word.rel) {
                return '<span class="related" data-rel-"' + word.rel.getId() + '">' + text + '</span>';
            } else {
                return '<span>' + text + '</span>';
            }
        }

    });
});