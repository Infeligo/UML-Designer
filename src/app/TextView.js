define(function () {

    var TextView = function (app) {
        this.app = app;
        this.initialize();
    };

    _.extend(TextView.prototype, {

        initialize: function () {
            _.bindAll(this, "onClick");
            this.panel = $('.text.statements', this.app.ui.textView);
            this.panel.delegate("span", "click", this.onClick);
        },

        onClick: function (e) {
            console.log(e.target);
        },

        setOutput: function (text) {
            $(this.panel).html(text);
        },

        clear: function () {
            $(this.panel).html("");
        }

    });

    return TextView;

});