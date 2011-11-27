/**
 * Generic diagram widget class
 */

define(

function () {

    return dojo.declare(null, {

        constructor: function (diagramView) {
            this._diagramView = diagramView;
            this._isRedrawingLocked = 0;
        },

        getDiagram: function () { return this._diagram; },

        display: function () {
            console.debug("Displaying widget %s", this._item.getId());
            this._diagramView._displayWidget(this);
        },

        /** Prevents execution of any calls to update untill unlocked */
        lockRedrawing: function () { this._isRedrawingLocked++; },

        unlockRedrawing: function () {
            if (this._isRedrawingLocked === 0) {
                throw new Error("Could not unlock redrawing because it was not locked. Wrong usage?");
            }
            this._isRedrawingLocked--;
        },

        isRedrawingLocked: function () { return this._isRedrawingLocked > 0; },

        update: function () {
            if (!this.isRedrawingLocked()) {
                this._redraw();
            }
        },

        _redraw: function () { /* noop; */ },

        isSelected: function () {
            return false;
        },

        isHighlighted: function () {
            return false;
        }
    });
});