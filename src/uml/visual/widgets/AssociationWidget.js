define([
    "uml/visual/widgets/RelationshipWidget"
],
function (RelationshipWidget) {

    return dojo.declare(RelationshipWidget, {
        
        constructor: function () {        
            this._multiplicities = [];
            this._initMultiplicities(this._multiplicities);
            this._roles = [];
            this._initRoles(this._roles);
        },
        
        _initMultiplicities: function () {
            for (var i = 0; i < this.getItem().getElement().getArity(); i++)
                this._multiplicities[i] = doodle.createText("").appendTo(this._sprite);
        },
        
        _initRoles: function () {
            for (var i = 0; i < this.getItem().getElement().getArity(); i++)
                this._roles[i] = doodle.createText("").appendTo(this._sprite);
        },
        
        _redraw: function () {
            this.inherited(arguments);
            this._drawMultiplicities();
        },
        
        _drawEndpoints: function () {
            this._drawArrow(this._endpoints[0]);
            this._drawArrow(this._endpoints[1]);
        },

        _drawArrow: function (sprite) {
            with (sprite) {
                graphics.lineStyle(1, "#000000", 1);
                graphics.beginPath();
                graphics.moveTo(-13, -4);
                graphics.lineTo(0, 0);
                graphics.lineTo(-13, 4);
                graphics.stroke();
            }
        },
        
        _drawMultiplicities: function () {
            this._layoutMultiplicities();
            var layout = this._layout.multiplicities;
            var connections = this.getItem().getElement().getConnections();
            for (var i = 0; i < 2; i++) {
                this._drawMultiplicity(this._multiplicities[i],
                    connections[i].getMultiplicityText(), layout[i]);
            }
        },

        _layoutMultiplicities: function () {
            /* Automatic layout
            var layout = this._layout.multiplicities = [],
                point, vector, dx, dy;
            for (var i = 0; i < this._multiplicities.length; i++) {
                point = this._layout.endpoints[i].point;
                vector = this._layout.endpoints[i].vector;
                dx = (Math.abs(vector.x) < 30) ? 20 : 0;
                dy = (Math.abs(vector.y) < 30) ? 20 : 0;
                layout[i] = { x: point.x + dx, y: point.y + dy };
            }*/
            var layout = this._layout.multiplicities = [];
            var conn = this.getItem()._connections;
            for (var i = 0; i < this._multiplicities.length; i++) {
                var point = this._layout.endpoints[i].point;
                layout[i] = {
                    x: point.x + conn[i].offsetX,
                    y: point.y + conn[i].offsetY
                };
            }
        },

        _drawMultiplicity: function (sprite, text, point) {
            with (sprite) {
                fontFamily = "Lucida Sans Unicode, Verdana";
                fontSize = 13;
                fontVariant = doodle.FontVariant.NORMAL;
                fontWeight = doodle.FontWeight.NORMAL;
                align = doodle.TextAlign.CENTER;
                strokeWidth = 1;
                strokeColor = doodle.utils.hex_to_rgb_str(0x000000, 0.0);
                x = point.x;
                y = point.y;
            }
            sprite.text = text;
        }

    });

});