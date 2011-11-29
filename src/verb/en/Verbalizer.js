define([
    "verb/Verbalizer",
    "verb/en/helper",
    "verb/en/inflection",
    "verb/en/conjugation",
],
function (Verbalizer, helper, inflection, conjugation) {

    return dojo.declare([Verbalizer], {

        constructor: function () {
            this._language = "en";
            this._helper = helper;
            this._inflection = inflection;
            this._conjugation = conjugation;
        },

        inflectNoun: function (noun, inForm, toForm) {
            if (inForm === toForm) return noun;
            console.log(noun, inForm, toForm);
            if (inForm === "sg-n" && toForm === "pl-n") {
                return this._inflection.pluralize(noun);
            }
            return noun;
        },
        
        _verbalizeNoun: function (word) {
            word.value = word.value.substr(0,1).toLowerCase() + word.value.substr(1);
            if (!word.toForm) word.toForm = "sg-n";
            return this.inflectNoun(word.value, word.inForm, word.toForm);
        },
        
        inflectAdjective: function (adjective, form, context) {
            return adjective;
        },
        
        _verbalizeVerb: function (word) {
            return this.conjugateVerb(word.value, word.inForm, word.toForm);
        },

        conjugateVerb: function (verb, inForm, toForm) {
            return this._conjugation.conjugate(verb, inForm, toForm);
        },

        getConjunction: function (conj) {
            return this._helper.conjunctions[conj];
        }

    });
});