define({

    capitalize: function (s) {
        return s.substr(0,1).toUpperCase() + s.substr(1);
    },

    /* Trim function implementation from jQuery */
    trim: String.prototype.trim ?
        function (text) {
            return text == null ? "" : String.prototype.trim.call(text);
        } :

        // Otherwise use our own trimming functionality
        function (text) {
            return text == null ? "" : text.toString().replace(/^\s+/, "").replace(/\s+$/, "");
        }

});