define(function () {

    return {
        
        "Class diagram description": {
            template: "${diagram} describes ${classes} and relationships between them",
            placeholders: {
                "diagram": "noun",
                "classes": "list"
            }
        },
        
        "Class attributes": {
            template: "${class} is characterized by ${attributes}",
            placeholders: {
                "class": "noun",
                "attributes": "list"
            }
        },

        "Class operations": {
            template: "${class} does ${operations}",
            placeholders: {
                "class": "noun",
                "operations": { type: "list", of: "verb", conjunction: "and" }
            }
        },
        
        "Association": {
            template: "${object} ${association} ${subject}",
            placeholders: {
                "object": "noun",
                "association": {
                    type: "verb",
                    name: "is associated with"
                },
                "subject": "noun"
            }
        },
        
        "Association with at least one": {
            template: "each ${subject} must ${association} at least one ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with at least N": {
            template: "each ${subject} must ${association} at least ${N} ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with exactly one": {
            template: "each ${subject} must ${association} exactly one ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with at most one": {
            template: "each ${subject} can ${association} at most one ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with at most N": {
            template: "each ${subject} can ${association} at most ${N} ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with many": {
            template: "each ${subject} can ${association} many ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Association with none": {
            template: "each ${subject} can ${association} none ${object}",
            placeholders: {
                "subject": "noun",
                "association": "verb",
                "object": "noun"
            }
        },
        
        "Generalization": {
            template: "{child} is {super}",
            placeholders: {
                "child": "noun",
                "super": "noun"
            }
        },
        
        "Generalization reverse": {
            template: "{super} can be {children}",
            placeholders: {
                "super": "noun",
                "children": { type: "list", of: "noun", conjunction: "and" }
            }
        },
        
        "Comment for diagram": {
            template: "${text}",
            placeholders: {
                "text": "text"
            }
        }

    };

});