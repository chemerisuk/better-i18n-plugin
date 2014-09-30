(function(DOM) {
    "use strict";

    var strings = {},
        languages = [];

    /**
     * Import global i18n string(s)
     * @memberOf DOM
     * @param {String}         lang    target language
     * @param {String|Object}  key     english string to localize or key/value object
     * @param {String}         value   localized string
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
            Object.keys(key).forEach(function(x) {
                DOM.importStrings(lang, x, key[x]);
            });
        } else {
            throw TypeError("importStrings");
        }
    };

    DOM.i18n = function(key) {
        return new Entry(key);
    };

    function Entry(key) {
        languages.forEach(populateLang(key, this));

        this._ = key;
    }

    Entry.prototype.toString = function(varMap) {
        return Object.keys(this).map(formatLang(varMap, this)).join("");
    };

    Entry.prototype.toLocaleString = function(lang) {
        if (!lang) lang = DOM.get("lang");

        return lang in this ? this[lang] : this._;
    };

    function populateLang(key, obj) {
        var record = strings[key] || {};

        return function(lang, index) {
            if (index in record) {
                obj[lang] = record[index];
            }
        };
    }

    function formatLang(varMap, obj) {
        return function(key) {
            var lang = key === "_" ? "" : key,
                value = DOM.format(obj[key], varMap);

            return "<span data-i18n=\"" + lang + "\">" + value + "</span>";
        };
    }

    // by default just show data-i18n attribute value
    DOM.importStyles("[data-i18n]", "display:none");
    DOM.importStyles("[data-i18n='']", "display:inline");

}(window.DOM));
