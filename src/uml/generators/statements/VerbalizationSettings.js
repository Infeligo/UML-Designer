/**
 * Verbalization settings holder
 */
define(
function () {

    return dojo.declare(null, {

        load: function (data) {
            this._settings = _.extend({}, data);
        },

        getLanguage: function () {
            return this._settings["language"]
        },

        getParameter: function (key) {
            return this._settings[key];
        },

        getDefaultNameForm: function (element) {
            var dnf = this._settings["defaultNameForms"];
            if (_.isObject(dnf) && dnf[element.getType()]) {
                return dnf[element.getType()];
            }
        }

    });

}
);