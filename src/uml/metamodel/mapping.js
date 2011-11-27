/**
 *  Map classes to corresponding string types
 */

define([
    "uml/metamodel/Package",
    "uml/metamodel/Class",
    "uml/metamodel/Association",
    "uml/metamodel/Aggregation",
    "uml/metamodel/Generalization",
    "uml/metamodel/diagrams/ClassDiagram"
],
function (
    Package,
    Class,
    Association,
    Aggregation,
    Generalization,
    ClassDiagram
) {
    return {
        "UML Package Element"               : Package,
        "UML Class Element"                 : Class,
        "UML Association Element"           : Association,
        "UML Aggregation Element"           : Aggregation,
        "UML Generalization Element"        : Generalization,
        "UML Class Diagram"                 : ClassDiagram
    };
});