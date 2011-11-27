define([
    "uml/metamodel/diagrams/Diagram"
],
function (Diagram) {

    var nodeTempl = _.template(
        '<li<% if (cssClass) { %> class="<%=cssClass%>"<% } %>>' + 
        '<a href="<%=href%>" data-ref="<%=ref%>"><%=name%></a>' +
        '<% if (children) { %><ul><%=children%></ul><% } %>' + 
        '</li>');

    return dojo.declare(null, {

        constructor: function (app) {
            this.app = app;
            this.el = this.app.ui.projectTree;
            this.widget = undefined;
            this.bind();
        },

        update: function () {
            this.render();
            $.jstree._themes = "css/tree/";
            this.widget = $(this.el).jstree({
                plugins: [
                    "themes",
                    "html_data"
                ],
                core: {
                    animation: 200
                },
                themes: {
                    "theme" : "default",
                    "dots" : false,
                    "icons" : false
                }
            });
        },

        bind: function () {
            var self = this;
            // Prevent defaults
            $(this.el).delegate('a', 'click', function (e) {
                e.preventDefault();
            });

            $(this.el).delegate('.uml.diagram > a', 'click', function (e) {
                self.app.setActiveDiagram($(this).data("ref"));
            });
        },

        render: function () {
            if (this.app.project) {
                $(this.el).html(this._getRendering());
            } else {
                $(this.el).html("");
            }
        },

        _getRendering: function () {
            // Model is the root node
            var model = this.app.project.getModel();
            var tree = nodeTempl({
                "href": "#",
                "ref": "",
                "name": model.getName(),
                "cssClass": "uml model",
                "children": this._getPackageRendering(model)
            });

            return "<ul>" + tree + "</ul>";
        },

        _getPackageRendering: function (pckg) {
            var html = "";

            var diagrams = _.select(pckg.getElements(), function (e) {
                return e.getType() === "UML Class Diagram";
            });
            var classifiers = _.select(pckg.getElements(), function (e) {
                return e.getType() === "UML Class Element";
            });

            _.each(diagrams, function (e) {
                html += nodeTempl({
                    "href": "#",
                    "name": e.getName(),
                    "ref": e.getId(),
                    "cssClass": "uml diagram",
                    "children": null
                });
            });
            _.each(classifiers, function (e) {
                html += nodeTempl({
                    "href": "#",
                    "name": e.getName(),
                    "ref": e.getId(),
                    "cssClass": "uml element",
                    "children": null
                });
            });

            return html;
        }

    });

});