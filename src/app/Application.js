define([    // Application widgets    "app/ProjectTree",    "app/ProjectSettings",    "app/ClassElementEditor",    "app/StatementsPanel",    "app/TextView",    "app/DiagramManager",    "uml/Project",    "uml/metamodel/diagrams/Diagram",    "uml/visual/DiagramView",    // Statement generation    "verb/mapping",    "uml/generators/StatementGenerator",    "uml/generators/ClassDiagrStmtGenerator"],function (ProjectTree, ProjectSettings, ClassElementEditor, StatementsPanel, TextView, DiagramManager,          Project, Diagram, DiagramView, verbalizerMapping, StatementGenerator, ClassDiagrStmtGenerator) {    return dojo.declare(null, {        constructor: function () {            this.ui = {};            this._openedDiagrams = [];            this._activeDiagram = undefined;            this.verbalizer = null;            this.classDiagramStatementGenerator = null;            this.diagrams = new DiagramManager(this);        },        init: function () {            var self = this;            // UI elements            this.ui.textView = $("#TextView");            this.ui.diagramView = $("#DiagramView");            this.ui.projectTree = $("#ProjectTree");            this.ui.projectMenu = $("#ProjectMenu");            this.ui.projectSettings = $("#ProjectSettings");            this.ui.classElementEditor = $("ClassElementEditor");            // Widgets            this.projectTree = new ProjectTree(this);            this.statementPanel = new StatementsPanel(this);            this.textView = new TextView(this);            // Dialogs            this.projectSettings = new ProjectSettings(this);            this.classElementEditor = new ClassElementEditor(this);            this.diagrams.init();            $("#btnProjectSettings").click(function (e) { self.showProjectSettings(); });            $("#btnProjectClose").click(function (e) { self.closeProject(); } );            $("#btnDiagramNew").click(function () { self.createDiagram(); });            $('#btnDiagramRemove').click(function () { self.removeDiagram(); });            $("#linkSwitchToDiagramView").click(function () { self.toggleDiagramViews(); return false; });            $("#linkSwitchToTextView").click(function () { self.toggleDiagramViews(); return false; });            $(window).resize(function () { self.onWindowResize(); });        },                /**         *  Displays settings dialog for current project         */        showProjectSettings: function () {            this.projectSettings.show();        },        createProject: function () {            // Creating project actually loads new project template        },        loadProject: function (path) {            var self = this;            this.project = new Project();            return $.ajax({                url: path,                type: "GET",                dataType: "json"            })            .then(function (jsonData) {                    try {                        self.project.loadData(jsonData);                    } catch (e) {                        console.error("Error loading project data from %s", path);                        console.error(e);                    }                    self.onProjectLoaded();                })            .fail(function (jqXhr, err, ioArgs) {                console.log("Network error while trying to load project %s", path);            });        },                closeProject: function () {            var self = this;            _.each(this.getOpenedDiagrams(), function (d) { self.closeDiagram(d); });            this.project = null;        },        getProject: function () { return this.project; },        onProjectLoaded: function () {            var self = this;            this.renderProject();            // Statement generator            this._setupStatementGenerator();            dojo.connect(this.project, "onChange", function () {                self.renderProject();                // Update statements                this.updateStatements();            });        },        renderProject: function () {            if (this.project) {                $(this.ui.projectMenu).show();                $('.project-name', this.ui.projectMenu).text(this.project.getName());                // Project tree                this.projectTree.update();            } else {                $(this.ui.projectMenu).hide();                //this.projectTree.clear();            }        },        createDiagram: function () {            //        },        removeDiagram: function () {            //        },        openDiagram: function (id) {            console.debug("Opening diagram %s", id);            var diagramView = this.getOpenedDiagram(id);            if (diagramView) return diagramView;            var diagram = this.project.getModel().getElementById(id);            if (diagram === null || !diagram.isInstanceOf(Diagram)) {                console.error("Could not load diagram %s in %s project", name, this.project.getName());                return null;            }            diagramView = new DiagramView(diagram);            this._openedDiagrams.push(diagramView);            // Set open diagram names            $('.view-name', this.ui.diagramView).text(diagram.getName());            $('.view-name', this.ui.textView).text(diagram.getName());            return diagramView;        },                closeDiagram: function (diagramView) {            if (typeof diagramView === "string") {                diagramView = this.getOpenedDiagram(id);            }            if (!diagramView) return;            // Deactivate if active            if (this.getActiveDiagram() === diagramView) {                this.setActiveDiagram(null);            }            // Remove from opened diagrams            this._openedDiagrams = _.reject(this._openedDiagrams, function (dv) {                return dv === diagramView;            });        },        getActiveDiagram: function () {            return this._activeDiagram;        },        setActiveDiagram: function (diagramView) {            if (typeof diagramView === "string") {                diagramView = this.openDiagram(diagramView);            }            if (!diagramView) {                console.error("Could not find diagram to be set as active");                return;            }            this._activeDiagram = diagramView;            // Place and display            $('.diagram', this.ui.diagramView).html("");            if (diagramView != null) {                $('.diagram', this.ui.diagramView).append(diagramView.getRoot());                diagramView.init();            }            // Update application            this.update();        },        getOpenedDiagram: function (id) {            return _.detect(this._openedDiagrams, function (dv) {                return dv.getDiagram().getId() === id;            });        },        getOpenedDiagrams: function () {            return this._openedDiagrams;        },        _setupStatementGenerator: function () {            try {                this.classDiagramStatementGenerator = null;                if (!this.project) return;                if (this.verbalizer && this.verbalizer.getLanguage() !== this.project.getLanguage()) {                    this.verbalizer = null;                }                if (!this.verbalizer) {                    var VerbalizerClass = verbalizerMapping[this.project.getLanguage()];                    if (!VerbalizerClass) {                        console.error("Could not find verbalizer for language %s", this.project.getLanguage());                        this.updateStatements();                        return;                    }                    console.debug("Found verbalizer for language %s", this.project.getLanguage());                    this.verbalizer = new VerbalizerClass();                    this.classDiagramStatementGenerator = new ClassDiagrStmtGenerator(this.verbalizer);                }            } finally {                this.updateStatements();            }        },        toggleDiagramViews: function () {            $(this.ui.textView).toggle();            $(this.ui.diagramView).toggle();        },        update: function () {            this.updateStatements();        },        updateStatements: function () {            var diagramView = this.getActiveDiagram();            if (diagramView && this.classDiagramStatementGenerator) {                //this.statementPanel.setOutput(this.classDiagramStatementGenerator.generate(diagramView.getDiagram()));                this.textView.setOutput(this.classDiagramStatementGenerator.generate(diagramView.getDiagram()));            } else {                this.statementPanel.clear();            }        },        onWindowResize: function () { }    });    });