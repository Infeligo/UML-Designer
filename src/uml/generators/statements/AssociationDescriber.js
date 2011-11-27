define([
    "uml/generators/statements/_Describer",
    "uml/generators/statements/DescriberSupport"
],
function (_Describer, DescriberSupport) {

    return dojo.declare([_Describer, DescriberSupport], {
        
        constructor: function () {
            this._name = "Association describer";
        },
        
        canDescribe: function (obj) {
            return obj.getType() === "UML Association Item";
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

        describe: function (assoc) {
            var results = [],
                A = assoc.getElement().getConnectionA(),
                B = assoc.getElement().getConnectionB(),
                A2B = {
                    "subject": this._pluckName(A.getClassifier()),
                    "object": this._pluckName(B.getClassifier()),
                    "association": this._pluckName(assoc.getElement(), "verb")
                },
                B2A = {
                    "subject": this._pluckName(B.getClassifier()),
                    "object": this._pluckName(A.getClassifier()),
                    "association": this._pluckName(assoc.getElement(), "verb", { indirect: true })
                };

            if (A.hasMultiplicity()) {
                this._describeOne(A.getMultiplicity(), B2A, results);
            } else {
                results.push(this._createSentence("Association", A2B));
            }

            if (B.hasMultiplicity()) {
                this._describeOne(B.getMultiplicity(), A2B, results);
            }

            return results;
        }

    });

});