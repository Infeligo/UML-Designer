define(

function () {
    return dojo.declare(null, {

        // Constructor
        constructor: function (model, parent) {
            this._model = model;
            this._parent = parent;
            this._type = "UML Element";
            this._id = undefined;
            this._name = "";
        },

        getModel: function () { return this._model; },

        getParent: function () { return this._parent; },
        _setParent: function (v) { this._parent = v; },

        getType: function () { return this._type; },
        _setType: function (type) { this._type = type; },

        getId: function () { return this._id; },
        setId: function (v) { this._id = v; this.onChange(); },

        getName: function () { return this._name; },
        setName: function (v) { this._name = v; this.onChange(); },

        // Data

        loadData: function (data) {
            this._setType(data.type);
            this.setId(data.id);
            this.setName(data.name);
            return this;
        },

        getData: function () {
            return {
                "id": this.getId(),
                "name": this.getName(),
                "type": this.getType()
            };
        },

        // Events
        onAfterLoad: function () { /* noop */ },
        onChange: function () {	/* noop; */ }

    });
});