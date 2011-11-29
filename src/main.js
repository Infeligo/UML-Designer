require(["app/Application"], function (Application) {

    require.ready(function () {

        var app = new Application();
        app.init();

        /* Default project */

        dojo.connect(app, "onProjectLoaded", function () {
            app.setActiveDiagram("Order_diagram");
        });

        app.loadProject("test/data/shop-project.json");

        //showWelcomeArea();
        showProjectArea();

        /* Projects management */

        $("#btnProjectNew").click(app.createProject);
        $("#btnProjectOpen").click(showWelcomeArea);
        $("#Welcome .back-to-project").click(function () { showProjectArea(); return false; });

        function showWelcomeArea() {
            $('.screen-area').hide();
            $('#btnProjectOpen').button("disable");
            $('#Welcome').show();
            $(window).trigger('resize');
        }

        function showProjectArea() {
            $('.screen-area').hide();
            $('#btnProjectOpen').button("enable");
            $('#Project').show();
            $(window).trigger('resize');
        }

        $('ul > li', '#Welcome').click(function (e) {
            e.preventDefault();
            app.loadProject($(this).data("projectPath"));
            showProjectArea();
        });

        // Expose to global namespace
        window.app = app;

    });

});
