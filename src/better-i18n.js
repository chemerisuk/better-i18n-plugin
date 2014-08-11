(function(DOM) {
    "use strict";

    var strings = {},
        languages = [];

    /**
     * Set inner content to a localized string
     * @memberOf $Element.prototype
     * @param  {String}       [key]     resource string key
     * @param  {Object|Array} [varMap]  resource string variables
     * @return {String|$Element}
     */
    DOM.extend("*", {
        i18n: function(key, varMap) {
            if (typeof key !== "string" || varMap && typeof varMap !== "object") throw TypeError("i18n");

            return this.set(languages.concat("").reduce(function(memo, lang, index) {
                var value = key in strings && strings[key][index] || key,
                    content = value && varMap ? DOM.format(value, varMap) : value;

                return memo + "<span data-i18n=" + lang + ">" + content + "</span>";
            }, ""));
        }
    });

    /**
     * Import global i18n string(s)
     * @memberOf DOM
     * @param {String}         lang    target language
     * @param {String|Object}  key     english string to localize or key/value object
     * @param {String}         value   localized string
     * @function
     */
    DOM.importStrings = function(lang, key, value) {
        var keyType = typeof key,
            langIndex = languages.indexOf(lang);

        if (keyType === "string") {
            if (langIndex === -1) {
                langIndex = languages.push(lang) - 1;
                // add global rule for the data-i18n-{lang} attribute
                DOM.importStyles(":lang(" + lang + ") > [data-i18n]", "display:none");
                DOM.importStyles(":lang(" + lang + ") > [data-i18n=" + lang + "]", "display:inline");
            }

            if (!strings[key]) strings[key] = [];
            // store localized string internally
            strings[key][langIndex] = value;
        } else if (keyType === "object") {
            Object.keys(key).forEach(function(x) { DOM.importStrings(lang, x, key[x]) });
        } else {
            throw TypeError("importStrings");
        }
    };

    // by default just show data-i18n attribute value
    DOM.importStyles("[data-i18n]", "display:none");
    DOM.importStyles("[data-i18n='']", "display:inline");

}(window.DOM));
