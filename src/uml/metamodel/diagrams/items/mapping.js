/**
 *  Map classes to corresponding string types
 */

define([
    "uml/metamodel/diagrams/items/ClassItem",
    "uml/metamodel/diagrams/items/AssociationItem",
    "uml/metamodel/diagrams/items/AggregationItem",
    "uml/metamodel/diagrams/items/GeneralizationItem",
    "uml/metamodel/diagrams/items/CommentItem"
],
function (
    ClassItem,
    AssociationItem,
    AggregationItem,
    GeneralizationItem,
    CommentItem
) {
    return {
        "UML Class Item"                    : ClassItem,
        "UML Association Item"              : AssociationItem,
        "UML Aggregation Item"              : AggregationItem,
        "UML Generalization Item"           : GeneralizationItem,
        "UML Comment Item"                  : CommentItem
    };
});