define([
    "uml/visual/widgets/AssociationWidget"
],
function (AssociationWidget) {

    return dojo.declare(AssociationWidget, {

        _drawEndpoints: function (layout) {
            this._drawDiamond(this._endpoints[0]);
            //this._drawArrow(this._endpoints[1]);
        },

        _drawDiamond: function (sprite) {
            var color = this.isSelected() ? "#FF0000" : "#333333";
            with (sprite) {
                graphics.lineStyle(2, color, 1);
                graphics.beginFill("#ffffff");
                graphics.beginPath();
                graphics.moveTo(-20, 0);
                graphics.lineTo(-10, -5);
                graphics.lineTo(0, 0);
                graphics.lineTo(-10, 5);
                graphics.lineTo(-20, 0);
                graphics.closePath();
                graphics.stroke();
                graphics.endFill();
            }
        }

    });

});