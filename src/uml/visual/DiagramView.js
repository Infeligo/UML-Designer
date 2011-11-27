/**
 * Base class for all UML diagrams
 */

define([
    "uml/visual/widgets/mapping"
],
function (mapping) {

    var DEFAULT_WIDTH = 1100,
        DEFAULT_HEIGHT = 750;

    return dojo.declare(null, {

        constructor: function (diagram) {
            this._diagram = diagram;
            this._root = $("<div></div>").get(0);
            this._widgets = [];
            this._initialized = false;
            this._mapping = mapping;
        },

        init: function () {
            if (this._initialized) {
                return;
            } else {
                this._setupDisplay();
                this._setupWidgets();
                this._initialized = true;
            }
        },

        _setupDisplay: function () {
            // Disable text selection
            dojo.connect(this._root, "ondragstart",   dojo, "stopEvent");
            dojo.connect(this._root, "onselectstart", dojo, "stopEvent");

            $(this._root).css({
                backgroundColor: "#FFFFFF"
            });

            // Root must already be a part of DOM tree
            var parent = $(this._root).parent();
            //var width = parent.innerWidth() || 800,
            //    height = parent.innerHeight() || 600;
            var width = DEFAULT_WIDTH,
                height = DEFAULT_HEIGHT;

            this._display = doodle.createDisplay(this._root, {
                "width": width,
                "height": height,
                "frameRate": 12
            });
            this._activeLayer = this._display.createLayer();
        },

        /**
         *	Creates widgets from diagram items
         */
        _setupWidgets: function () {
            _.each(this._diagram.getItems(), function (e) {
                var widget = this.createWidget(e);
                if (widget) this._widgets.push(widget);
                widget.display();
            }, this);
        },

        getRoot: function () { return this._root; },

        _displayWidget: function (widget) {
            this._activeLayer.addChild(widget._sprite);
            widget._redraw();
        },

        getDiagram: function () { return this._diagram; },

        /**
         *	Returns widget by item or item ID
         */
        getWidget: function (item) {
            if (typeof item === "string") {
                item = this._diagram.getItemById(item);
            }
            return _.detect(this._widgets, function (w) {
                return w.getItem() === item;
            });
        },

        createWidget: function (item) {
            console.debug("Creating widget for item %s", item.getId());
            var WidgetClass = this._mapping[item.getType()];
            if (!WidgetClass) throw new Error("Could not find widget for item type %s", item.getType());
            try {
                return WidgetClass(this, item);
            } catch (e) {
                console.error("Could not instantiate widget of type %s", item.getType(), e);
                return null;
            }
        }

    });
});