define(function () {

    return dojo.declare(null, {
    
        constructor: function (app) {
            this.app = app;
            this.el = $(this.app.ui.projectSettings);
            _.bindAll(this, "save", "close");
            this.init();
        },

        init: function () {
            var self = this;
            $(this.el).dialog({
                title: "Project settings",
                modal: true,
                width: 600,
                buttons: {
                    "Save": function () {
                        self.save();
                    },
                    "Close": function () {
                        self.close();
                    }
                },
                autoOpen: false
            });
        },

        render: function () {
            this.el.find('#ProjectName').val(this.app.project.getName());
            this.el.find('#ProjectDescription').val(this.app.project.getDescription());
            this.el.find('#ProjectLanguage').val(this.app.project.getLanguage());
        },
        
        save: function () {
            this.app.project.setName(this.el.find('#ProjectName').val());
            this.app.project.setDescription(this.el.find('#ProjectDescription').val());
            this.app.project.setLanguage(this.el.find('#ProjectLanguage').val());
            this.app.project.onChange();
        },
        
        show: function () {
            if (!this.app.project) return;
            this.render();
            $(this.el).dialog('open');
        },
        
        close: function () {
            $(this.el).dialog('close');
        }
    
    });

});