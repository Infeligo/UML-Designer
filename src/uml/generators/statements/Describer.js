/**
 * Describer stub
 */
define(
function () {
    return dojo.declare(null, {
        /**
         * Determines if this describer can describe the specified object
         */
        canDescribe: function (obj) { /* noop; */ },

        /**
         * Describes (creates sentences for) the specified object
         *
         * @param obj Object to be described
         * @return Sentence or array of sentences or null
         */
        describe: function (obj) { /* noop; */  }
    });
}
);