/** * UML Class widget */define([    "uml/visual/widgets/Widget"],function (Widget) {    return dojo.declare([Widget], {        constructor: function () {            this._width = null;            this._height = null;            this._title = doodle.createText("");            this._attributes = [];        },        _initStyle: function (style) {            this.inherited(arguments);            style.padding = 5;            style.minWidth = 80;        },        _redraw: function () {            var boxWidth = 0;                        this._sprite.graphics.clear();                        // Title            with (this._title) {                text = this._item.getName();                fontFamily = "Lucida Sans Unicode, Verdana";                fontSize = 15;                fontVariant = doodle.FontVariant.NORMAL;                fontWeight = doodle.FontWeight.NORMAL;                strokeWidth = 1;                strokeColor = doodle.utils.hex_to_rgb_str(0x000000, 0.0);                x = this._style.padding;                y = height + this._style.padding;                this._title.appendTo(this._sprite);            }            var titleBottom = this._style.padding * 2 + this._title.height;            boxWidth = this._title.width;            // Attributes            var attrs = this._item.getAttributes();            _.each(this._attributes, function (a) { this._sprite.removeChild(a); }, this);            this._attributes = [];            for (var i = 0; i < attrs.length; i++) {                var attr = doodle.createText("");                this._attributes.push(attr);                attr.text = attrs[i].name;                attr.fontSize = 12;                attr.strokeWidth = 1;                attr.strokeColor = doodle.utils.hex_to_rgb_str(0x000000, 0.0);                attr.x = this._style.padding;                attr.y = titleBottom + this._style.padding + (i+1) * attr.height;                boxWidth = Math.max(boxWidth, attr.width);                attr.appendTo(this._sprite);            }            var attrsHeight = this._attributes.length > 0 ? this._attributes.length * this._attributes[0].height : 0;            var attrsBottom = titleBottom + attrsHeight + this._style.padding * 2;            // operations            var operations = this._item.getOperations();            this._operations = [];            for (var j = 0; j < operations.length; j++) {                var operation = doodle.createText(operations[j].name);                operation.fontSize = 12;                operation.strokeWidth = 1;                operation.strokeColor = doodle.utils.hex_to_rgb_str(0x000000, 0.0);                operation.x = this._style.padding;                operation.y = attrsBottom + this._style.padding + (j+1) * operation.height;                boxWidth = Math.max(boxWidth, operation.width);                this._operations.push(operation);                operation.appendTo(this._sprite);            }            var operationsHeight = this._operations.length > 0 ? this._operations.length * this._operations[0].height : 0;            var operationsBottom = attrsBottom + operationsHeight + this._style.padding * 2;            boxWidth += this._style.padding * 2;            if (boxWidth < this._style.minWidth) boxWidth = this._style.minWidth;            this._width = boxWidth;            this._height = operationsBottom;            // Border and lines            with (this._sprite) {                graphics.clear();                graphics.lineStyle(1, "#777777");                if (this.isSelected()) {                    graphics.lineStyle(1, "#FF0000");                }                graphics.beginFill(0xffffee);                graphics.rect(0.5, 0.5, boxWidth, operationsBottom);                graphics.endFill();                // Line between title and attributes                graphics.beginPath();                graphics.moveTo(0, titleBottom + 0.5);                graphics.lineTo(boxWidth, titleBottom + 0.5);                graphics.stroke();                // Line between attributes and operations                graphics.beginPath();                graphics.moveTo(0, attrsBottom + 0.5);                graphics.lineTo(boxWidth, attrsBottom + 0.5);                graphics.stroke();                x = this.getLeft();                y = this.getTop();            }        },        getLeft: function () { return this._item.getLeft(); },        getTop: function () { return this._item.getTop(); },        getWidth: function () { return this._width+2; },        getHeight: function () { return this._height+2; }    });});