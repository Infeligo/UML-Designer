/**
 *  Map classes to corresponding string types
 */

define([
    "verb/en/Verbalizer",
    "verb/et/Verbalizer"
],
function (
    VerbalizerEN,
    VerbalizerET
) {
    return {
        "en"    :   VerbalizerEN,
        "et"    :   VerbalizerET
    };
});