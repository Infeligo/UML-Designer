define([
    "verb/utils"
],
function (utils) {

    return dojo.declare(null, {

        constructor: function () {
            this._language = undefined;
            this._verbalizersByWordType = {};
            this._setupWordVerbalizers();
        },

        _setupWordVerbalizers: function () {
            this._verbalizersByWordType = {
                "noun"      : this._verbalizeNoun,
                "verb"      : this._verbalizeVerb,
                "list"      : this._verbalizeList
            };
        },

        getLanguage: function () { return this._language; },

        inflectNoun: function (noun, form, context) { return noun; },
        inflectAdjective: function (adj, form, context) { return adj; },
        conjugateVerb: function (verb, form, context) { return verb; },

        getConjunction: function (conj) {},
        getPronoun: function (pron) {},

        verbalize: function (sentences) {
            var text = "",
                self = this;
            if (!_.isArray( (sentences))) {
                 (sentences) = [ (sentences)];
            }
            _.each( (sentences), function (s) {
                text += self._verbalize(s) + " ";
            });

            return text;
        },

        _verbalize: function (s) {
            var self = this,
                str = s.getTemplate();

            str = str.replace(/\$\{(\w+)\}/gi, function (ph, param) {
               return self._verbalizeWord(s.getWord(param));
            });

            // Make a proper sentence
            return utils.capitalize(str) + ".";
        },

        _verbalizeWord: function (word) {
            var wv = this._verbalizersByWordType[word.type];
            if (typeof wv !== "function") {
                console.error("Unrecognized word type: %s", word.type, word);
                throw new Error("unrecognized word type");
            }
            return wv.call(this, word);
        },

        _verbalizeNoun: function (word) {
            return word.value;
        },

        _verbalizeVerb: function (word) {
            return word.value;
        },

        _verbalizeList: function (list) {
            var str = "";
            for (var i = 0, len = list.words.length; i < len; i++) {
                if (i === len-1 && len != 1) {
                    // Add conjunction before last word
                    str += " " + list.conjunction + " ";
                } else if (i < len-1 && i != 0) {
                    // Add comma between words
                    str += ", ";
                }
                str += this._verbalizeWord(list.words[i]);
            }
            return str;
        }


    });
});