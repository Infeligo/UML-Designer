/**
 *  Map classes to corresponding string types
 */

define([
    "uml/visual/widgets/ClassWidget",
    "uml/visual/widgets/CommentWidget",
    "uml/visual/widgets/AssociationWidget",
    "uml/visual/widgets/AggregationWidget",
    "uml/visual/widgets/GeneralizationWidget"
],
function (ClassWidget, CommentWidget, AssociationWidget, AggregationWidget, GeneralizationWidget) {
    return {
        "UML Class Item"                    : ClassWidget,
        "UML Comment Item"                  : CommentWidget,
        "UML Association Item"              : AssociationWidget,
        "UML Aggregation Item"              : AggregationWidget,
        "UML Generalization Item"           : GeneralizationWidget
    };
});