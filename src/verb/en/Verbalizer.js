define([
    "verb/Verbalizer",
    "verb/en/helper",
    "verb/en/inflection"
],
function (Verbalizer, helper, inflection) {

    return dojo.declare([Verbalizer], {

        constructor: function () {
            this._language = "en";
            this._helper = helper;
            this._inflection = inflection;
        },

        inflectNoun: function (noun, form, context) {
            if (!form) return noun;

            switch (form) {
                case "pl_n":
                    return this._inflection.pluralize(noun);
                default:
                    console.debug("Verbalizer for language %s doesn't support form %s of the noun '%s'", this._lang, form, noun);
                    return noun + "?";
            }
        },

        inflectAdjective: function (adjective, form, context) {
            return adjective;
        },

        conjugateVerb: function (verb, form, context) {
            return verb;
        },

        getConjunction: function (conj) {
            return this._helper.conjunctions[conj];
        }

    });
});