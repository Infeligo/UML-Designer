define([
    "uml/generators/statements/Describer",
    "uml/generators/statements/DescriberSupport"
],
function (Describer, DescriberSupport) {

    return dojo.declare([Describer, DescriberSupport], {
        
        constructor: function () {
            this._name = "Association describer";
        },
        
        canDescribe: function (obj) {
            return obj.getType() === "UML Association Item" || obj.getType() === "UML Aggregation Item";
        },

        _describeOne: function (multiplicity, words, results) {
            if (multiplicity.n == "1" && multiplicity.m == "1") {
                results.push(this._createSentence("Association with exactly one", words));
            } else {
                if (multiplicity.m == "*") {
                    results.push(this._createSentence("Association with many", words));
                }
                if (multiplicity.m == "1") {
                    results.push(this._createSentence("Association with at most one", words));
                }
                if (multiplicity.n == "0") {
                    results.push(this._createSentence("Association with none", words));
                }
                if (multiplicity.n == "1") {
                    results.push(this._createSentence("Association with at least one", words));
                }
            }
        },

        describe: function (assoc, options) {
            var results = [],
                A = assoc.getElement().getConnectionA(),
                B = assoc.getElement().getConnectionB(),
                A2B = {
                    "subject": this._pluckName(A.getClassifier()),
                    "object": this._pluckName(B.getClassifier()),
                    "association": this._pluckName(assoc.getElement(), "verb", { direct: true })
                },
                B2A = {
                    "subject": this._pluckName(B.getClassifier()),
                    "object": this._pluckName(A.getClassifier()),
                    "association": this._pluckName(assoc.getElement(), "verb", { indirect: true })
                };
                
                if (assoc.getType() === "UML Association Item" && !A2B.association.value) {
                    _.extend(A2B.association, this._templates["association"]);
                }
                if (assoc.getType() === "UML Association Item" && !B2A.association.value) {
                    _.extend(B2A.association, this._templates["association"]);
                }
                if (assoc.getType() === "UML Aggregation Item" && !A2B.association.value) {
                    _.extend(A2B.association, this._templates["aggregation direct"]);
                }
                if (assoc.getType() === "UML Aggregation Item" && !B2A.association.value) {
                    _.extend(B2A.association, this._templates["aggregation indirect"]);
                }

            if (A.hasMultiplicity() && !options.simple) {
                this._describeOne(A.getMultiplicity(), B2A, results);
            } else if (options.simple) {
                results.push(this._createSentence("Association", A2B));
            }

            if (B.hasMultiplicity() & !options.simple) {
                this._describeOne(B.getMultiplicity(), A2B, results);
            }

            return results;
        }

    });

});