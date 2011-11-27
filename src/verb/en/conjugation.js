define([

/**
 * Conjugation module for English language
 */
(function (export) {

var irregulars = {
	"go": [ "went", "gone" ]
};

/**
 *	Register irregular verb forms
 */
var irregular = export.irregular = function (present, pastSimple, pastPerfect) {
	irregulars[present] = [pastSimple, pastPerfect];
};

/**
 *	For regular case, returns past simple or past perfect
 */
var past = function (present) {
	return present + "ed";
};

var pastSimple = export.pastSimple = function (present) {
	return past(present);
};

var pastPerfect = export.pastPerfect = function (present) {
	return past(present);
};

var continuous = export.continuous = function (present) {
	return present + "ing";
};

})(verb.en.conjugation);
