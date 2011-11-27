define(function () {

    var ClassElementEditor = function (app) {
        this.app = app;
        this.el = $(app.ui.classElementEditor);
        _.bindAll(this, "save", "close");
        this.initialize();
    };

    _.extend(ClassElementEditor.prototype, {

        initialize: function () {
            $(this.el).dialog({
                buttons: {
                    "Save": this.save,
                    "Close": this.close
                },
                autoOpen: false
            });
        },

        show: function (classElement) {
            $(el).dialog('open');
        },

        save: function () {
            //
        },

        close: function () {
            $(el).dialog('close');
        }

    });

    return ClassElementEditor;

});