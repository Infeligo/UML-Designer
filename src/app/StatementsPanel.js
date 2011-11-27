define(function () {

    var StatementsPanel = function (app) {
        this.app = app;
        this.initialize();
    };

    _.extend(StatementsPanel.prototype, {

        initialize: function () {
            _.bindAll(this, "onClick");
            this.panel = $('.text-panel.statements', this.app.ui.diagramView);
            this.panel.delegate("span.related", "click", this.onClick);
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

    return StatementsPanel;

});