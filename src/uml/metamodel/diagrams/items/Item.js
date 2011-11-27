/**
 * Diagram item
 */

define(
function () {

    return dojo.declare(null, {

        constructor: function (diagram) {
            this._diagram = diagram;
            this._id = null;
            this._type = "UML Item";
            this._element = null;
        },

        getType: function () { return this._type; },
        _setType: function (type) { this._type = type; },

        getId: function () { return this._id; },
        setId: function (id) { this._id = id; },

        getName: function () { return this.getElement().getName() },

        getElement: function () { return this._element; },
        _setElement: function (el) {
            assert(_.isObject(el), "Item element can not be empty.");
            this._element = el;
        },

        getParent: function () { return this._diagram; },

        getDiagram: function () { return this._diagram; },

        loadData: function (data) {
            console.debug("Loading item %s data", data.id);
            //this._setType(data.type);
            this.setId(data.id);
            this._element = data.element;
            return this;
        },

        onAfterLoad: function () {
            assert(_.isString(this._element), "Reference to '" + this.getId() + "' item's element must be a string.");
            this._setElement(this.getDiagram().getModel().getElementById(this._element));
        }

    });
});