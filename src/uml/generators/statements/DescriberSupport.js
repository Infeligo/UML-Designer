/**
 * DescriberSupport is a support class for describers.
 * It provides methods to construct sentences from templates and
 * extract information from the model.
 */
define([
    "verb/Sentence"
],
function (Sentence) {

    return dojo.declare(null, {

        constructor: function (templates, settings) {
            this._templates = templates;
            this._settings = settings;
        },

        /**
         * Checks if there is a template with specified name
         */
        _hasTemplate: function (name) {
            return this._templates && this._templates[name];
        },

        /**
         * Gets template by name
         */
        _getTemplate: function (name) {
            if (!this._hasTemplate(name)) {
                console.error("Could not find template %s", name);
                throw new Error("Template not found");
            }
            return this._templates[name];
        },

        /**
         * Creates a sentence from template and with specified words
         */
        _createSentence: function (template, words) {
            if (_.isString(template)) {
                template = this._getTemplate(template);
            }
            var sentence = new Sentence(template);

            if (sentence && words) {
                for (var word in words) {
                    sentence.setWord(word, words[word]);
                }
            }
            return sentence;
        },

        _getNameForm: function (element, partOfSpeech) {
            if (element.getTag) {
                var verb = element.getTag("verbalization");
                if (verb["name_form"]) {
                    return verb["name_form"];
                }
            }
            // TODO Support name forms
            //return this._settings.getDefaultNameForm(element);
            
            if (partOfSpeech === "noun") { return "sg-n"; }
            // Distinguish between relationship names and operation names
            if (partOfSpeech === "verb" && element.getType) { return "indic"; }
            if (partOfSpeech === "verb") { return "infin"; }
            return null;
        },

        /**
         * Extracts name from an element
         */
        _pluckName: function (element, partOfSpeech, options) {
            partOfSpeech = partOfSpeech || "noun";
            options = options || {};
            var word = {
                type: partOfSpeech,
                value: element.getName ? element.getName() : element.name,
                inForm: this._getNameForm(element, partOfSpeech),
                rel: element
            };
            if (partOfSpeech === "verb") {
                if (!options.indirect) {
                    if (word.value.indexOf("/") != -1) {
                        word.value = word.value.substr(0, word.value.indexOf("/"));
                    }
                } else {
                    if (word.value.indexOf("/") != -1) {
                        word.value = word.value.substr(word.value.indexOf("/")+1);
                    }
                }
            }
            return word;
        },

        /**
         * Extracts names from an array of elements.
         */
        _pluckNames: function (els, partOfSpeech, options) {
            return _(els.clone()).map(
                function (el) { return this._pluckName(el, partOfSpeech, options); },
                this
            );
        }


    });
});