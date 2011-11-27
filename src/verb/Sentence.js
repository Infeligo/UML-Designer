define(function () {

    return dojo.declare(null, {

        DEFAULT_NOUN: {
            type: "noun"
        },
        DEFAULT_VERB: {
            type: "verb"
        },
        DEFAULT_LIST: {
            type: "list",
            of: "noun",
            conjunction: "and"
        },

        constructor: function (template) {
            this._data = this._loadTemplate(template);
        },

        _loadTemplate: function (tmpl) {
            // Using jQuery's deep copy
            var data = $.extend(true, {}, tmpl);
            data.placeholders = data.placeholders || {};
            _.each(data.placeholders, function (val, key, list) {
                if (typeof val === "string") {
                    var ex = this["DEFAULT_" + val.toUpperCase()];
                    if (!ex) throw new Error("Invalid template");
                    list[key] = $.extend(true, {}, ex);
                }
            }, this);
            data.words = $.extend(true, {}, data.placeholders);
            return data;
        },

        getData: function () { return this._data; },

        getTemplate: function () { return this._data.template; },

        getPlaceholders: function () { return this._data.placeholders; },

        getWords: function () { return this._data.words; },

        hasWord: function (name) { return !!this.getWords()[name]; },

        getWord: function (name) {
            if (!this.hasWord(name)) {
                console.error("Could not find word '%s' in sentence %o", name, this);
                throw new Error("Word not found");
            }
            return this.getWords()[name];
        },

        setWord: function (name, data) {
            var word = this.getWord(name);

            if (_.isString(data)) {
                word.name = data;
            } else if (_.isArray(data)) {
                word.words = data;
            } else {
                _.extend(word, data);
            }
        },

        addWord: function (name, data) {
            if (this.hasWord(name)) {
                throw new Error("Word is already defined");
            }
            this.getWords()[name] = data;
        }

    });

});