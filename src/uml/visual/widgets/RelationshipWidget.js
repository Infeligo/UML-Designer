/**
 * UML Relationship widget
 * Implements drawing of binary relationships
 */

define([
    "uml/visual/widgets/Widget"
],
function (Widget) {

    return dojo.declare([Widget], {

        constructor: function () {
            this._endpoints = [];
            this._initEndpoints();
            this._title = doodle.createText("").appendTo(this._sprite);

        },
        
        _initStyle: function (style) {
            style.lineWidth = 1;
        },
        
        _initEndpoints: function () {
            var connections = this.getItem().getConnections();
            for (var i = 0; i < connections.length; i++) {
                this._endpoints.push(doodle.createSprite().appendTo(this._sprite));
            }
        },
        
        _redraw: function () {
            this._layout = {};            
            this._layoutEndpoints();
            
            for (var i = 0; i < 2; i++) {
                var point = this._layout.endpoints[i].point,
                    vector = this._layout.endpoints[i].vector;
                
                this._endpoints[i].x = point.x;
                this._endpoints[i].y = point.y;
                this._endpoints[i].rotation = Math.atan2(vector.y, vector.x) / Math.PI * 180;
            }
            
            this._sprite.graphics.clear();
            this._drawLine(this._sprite);
            this._drawEndpoints();

            /* Title */

            with (this._title) {
                text = this._item.getName();
                this._layoutTitle();
                x = this._layout.title.x;
                y = this._layout.title.y;
                fontFamily = "Lucida Sans Unicode, Verdana";
                fontSize = 13;
                fontVariant = doodle.FontVariant.NORMAL;
                fontWeight = doodle.FontWeight.NORMAL;
                //backgroundColor = "#FF0000"; // BUG: Doodle draws border in wrong place
                align = doodle.TextAlign.CENTER;
                strokeWidth = 1;
                strokeColor = doodle.utils.hex_to_rgb_str(0x000000, 0.0);
            }

            // Title background
            with (this._sprite) {
                graphics.beginFill("#FFFFFF");
                graphics.lineStyle(0, "#FFFFFF", 0.0);
                this._sprite.graphics.rect(
                    this._title.x - this._title.width / 2,
                    this._title.y - this._title.height / 2 - 6,
                    this._title.width,
                    this._title.height + 6
                );
                graphics.endFill();
                graphics.stroke();
            }

        },

        _drawEndpoints: function () { /* noop; */ },
        
        _drawLine: function (sprite) {        
            var a = this._layout.endpoints[0].point,
                b = this._layout.endpoints[1].point;
                
            with (sprite) {
                graphics.lineStyle(this._style.lineWidth, "#333333");
                graphics.beginPath();
                graphics.moveTo(a.x, a.y);
                graphics.lineTo(b.x, b.y);
                graphics.stroke();
            };
        },

        _getConnectionPoint: function (connection) {
            var c = this._diagramView.getWidget(connection.item).getConnectorById(connection.connector);
            return c.getConnectionPoint(this);
        },

        /**
          * Calculates endpoint positions and direction vectors for binary connection
          */
        _layoutEndpoints: function () {
            if (this.getItem().getArity() !== 2) {
                throw new Error("Unsupported relationship arity");
            }
            var connections = this.getItem().getConnections();
            
            var points = [
                this._getConnectionPoint(connections[0]),
                this._getConnectionPoint(connections[1])
            ];
            var vectors = [
                { x: points[0].x - points[1].x, y: points[0].y - points[1].y },
                { x: points[1].x - points[0].x, y: points[1].y - points[0].y }
            ];
            
            this._layout.endpoints = [
                { point: points[0], vector: vectors[0] },
                { point: points[1], vector: vectors[1] }
            ];
        },

        _layoutTitle: function () {
            var a = this._layout.endpoints[0].point,
                b = this._layout.endpoints[1].point;
                
            this._layout.title = {
                x: Math.min(a.x, b.x) + Math.round(Math.abs(a.x - b.x) / 2),
                y: Math.min(a.y, b.y) + Math.round(Math.abs(a.y - b.y) / 2)
            };
        }

    });
});