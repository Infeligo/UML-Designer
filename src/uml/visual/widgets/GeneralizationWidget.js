/**
 * UML generalization relationship widget
 */

define([
    "uml/visual/widgets/RelationshipWidget"
],
function (RelationshipWidget) {

    return dojo.declare(RelationshipWidget, {

        _drawEndpoints: function (layout) {
            this._drawLargeArrow(this._endpoints[0]);
        },

        _drawLargeArrow: function (sprite) {
            with (sprite) {
                graphics.lineStyle(2, "#000000", 1);
                graphics.beginFill("#ffffff");
                graphics.beginPath();
                graphics.moveTo(-10, -5);
                graphics.lineTo(0, 0);
                graphics.lineTo(-10, 5);
                graphics.lineTo(-10, -5);
                graphics.closePath();
                graphics.stroke();
                graphics.endFill();
            }
        }

    });

});
