/**
 * Defines Project class that holds a single UML model and project settings
 */

define([
    "uml/Model"
],
function (Model) {

    return dojo.declare(null, {

        constructor: function () {
            this._type = "UML Project";
            this._model = new Model();
        },

        loadData: function (data) {
            assert(!_.isEmpty(data), "Project data can not be empty.");
            assert(data.type === this._type, "Only UML projects are supported, see 'type' property.");

            this.setName(data.name);
            this.setDescription(data.description || "");
            this.setLanguage(data.language);
            this.getModel().loadData(data.model);

            return this;
        },

        getData: function () {
            return {
                "type": this.getType(),
                "name": this.getName(),
                "description": this.getDescription(),
                "language": this.getLanguage(),
                "model": this.getModel().getData()
            }
        },

        getType: function () { return this._type; },

        getName: function () { return this._name; },
        setName: function (v) { this._name = v; },

        getDescription: function () { return this._description; },
        setDescription: function (v) { this._description = v; },

        getLanguage: function () { return this._language; },
        setLanguage: function (v) { this._language = v; },

        getModel: function () { return this._model; },

        onChange: function () {}
    });
});