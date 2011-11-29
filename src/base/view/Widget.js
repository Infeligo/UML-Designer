/**
 * Generic diagram widget class
 */

define(

function () {

    return dojo.declare(null, {

        constructor: function (diagramView) {
            this._diagramView = diagramView;
            this._isRedrawingLocked = 0;
            this._isSelected = false;
            this._isHighlighted = false;
        },

        getDiagram: function () { return this._diagram; },

        display: function () {
            console.debug("Displaying widget %s", this._item.getId());
            //this._sprite.addListener(doodle.events.MouseEvent.MOUSE_DOWN, dojo.hitch(this, this.handleMouseDownEvent));
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

        isSelected: function () { return this._isSelected; },
        setSelected: function (v) { 
            if (v !== this._isSelected) {
                this._isSelected = v; 
                this.update(); 
            }
        },

        isHighlighted: function () { return false; },
        setHighlighted: function (v) {
            if (v !== this._isHighlighted) {
                this._isHighlighted = v; 
                this.update();
            }
        },

        //handleMouseDownEvent: function (e) {
            //this.onMouseDownEvent(e, this);
        //},
        onMouseDownEvent: function () {}
    });
});