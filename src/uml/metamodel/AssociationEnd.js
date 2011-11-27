/**
 * Class for an endpoint of a relationship
 */
define(function () {

    return dojo.declare(null, {

        constructor: function (association) {
            this._association = association;
            this._classifier = null;
            this._multiplicity = null;
        },

        getAssociation: function () { return this._association; },

        getClassifier: function () { return this._classifier; },
        setClassifier: function (v) { this._classifier = v; },

        loadData: function (data) {
            try {
                if (!data.classifier) new Error("Association end classifier not specified");
                this._classifier = data.classifier;
                if (data.multiplicity) this.setMultiplicity(data.multiplicity);
            } catch (e) {
                console.error("Could not load association end data", data);
                throw e;
            }
            return this;
        },

        getData: function () {
            return {
                "classifier": this.getClassifier(),
                "role": "",
                "multiplicity": this.getMultiplicityText()
            };
        },

        getMultiplicityText: function () {
            if (!this._multiplicity) return null;
            if (this._multiplicity.n !== this._multiplicity.m) {
                return this._multiplicity.n + ".." + this._multiplicity.m;
            } else {
                return this._multiplicity.n;
            }
        },
        
        getMultiplicity: function () {
            return { 
                "n": this._multiplicity.n,
                "m": this._multiplicity.m
            };
        },

        setMultiplicity: function (n, m) {
            console.debug("Setting multiplicity to", n, m);
            var n0, m0, p;
            if (arguments.length == 1) {
                try {
                    p = n.indexOf("..");
                    if (p > -1) {
                        var splits = n.split("..");
                        n0 = splits[0];
                        m0 = splits[1];
                    } else {
                        n0 = m0 = n;
                    }
                } catch (e) {
                    throw new Error("Could not parse multiplicity");
                }
            } else {
                n0 = n; m0 = m;
            }
            // TODO Validate multiplicities
            // Set multiplicity
            this._multiplicity = { "n": n0, "m": m0 };
        },

        hasMultiplicity: function () { return this._multiplicity != null; },
        
        unsetMultiplicity: function () { this._multiplicity = null; },

        onAfterLoad: function () {
            var model = this.getAssociation().getModel();
            this.setClassifier(model.getElementById(this._classifier));
        }
    });

});