/**
 * Verb conjugation module for English language
 */
define(function () {
    
    var irregulars = [
        ["be", "is"],
        ["have", "has"]
    ];
    
    function getSimpleInfinitive(verb, inForm) {
        if (inForm === "indic") {
            var matched = verb.match("(.*)s");
            if (matched.length == 2) {
                return matched[1];
            }
        }
        return verb;
    }
    
    function getIrregularInfinitive(verb, inForm) {
        var idx = inForm === "indic" ? 1 : 0;
        for (var i = 0; i < irregulars.length; i++) {
            if (irregulars[i][idx] === verb) { return irregulars[i][0]; }
        }
        return null;
    }
    
    return {        
        getInfinitive: function (verb, inForm) {
            // Split into parts
            var parts = verb.split(" ");
            var part0 = getIrregularInfinitive(parts[0], inForm);
            if (!part0) part0 = getSimpleInfinitive(parts[0], inForm);
            parts[0] = part0;
            return parts.join(" ");
        },
        
        conjugate: function (verb, inForm, toForm) {
            if (inForm === toForm) return verb;
            if (toForm === "infin") return this.getInfinitive(verb, inForm);
            return verb;
        }
    };

});
