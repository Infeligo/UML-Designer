/**
 * Defines Model class that is UML model representation
 */
define([
    "uml/metamodel/Element",
    "uml/metamodel/Package",
    "uml/metamodel/diagrams/Diagram",
    "uml/metamodel/mapping"
],
function (Element, Package, Diagram, mapping) {

    return dojo.declare([Package], {

        constructor: function (project) {
            this._project = project;
            this._model = this;
            this._mapping = mapping;
        },


        getProject: function () { return this._project; },

        loadData: function (data) {
            this.inherited(arguments);
            this.onAfterLoad();
            return this;
        },

        /**
         * Creates element and loads its data
         */
        loadElementData: function (data) {
            console.debug("Loading element data for %s", data.type);
            assert(!_.isEmpty(data), "Attempted to load element from empty data.");

            var element;
            try {
                return this.createElement(data.type).loadData(data);
            } catch (e) {
                console.error("Error loading element data", data);
                throw e;
            }
        },

        loadElements: function (dataArray) {
            return _(dataArray).map(this.loadElementData, this);
        },

        createElement: function (type) {
            if (!this._mapping[type]) throw new Error("Unknown element type: %s", type);
            return new this._mapping[type](this);
        },

        getElementById: function (id) {
            if (typeof id === "undefined") { console.trace(); }
            var el = _.detect(this._elements, function (el) { return el.getId() === id });
            if (!el) console.log("Could not find element '%s'.", id);
            return el;
        }

    });

});