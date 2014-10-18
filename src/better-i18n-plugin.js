(function(DOM) {
    "use strict";

    var strings = {},
        languages = [];

    DOM.importStrings = function(lang, key, value) {
        var keyType = typeof key,
            langIndex = languages.indexOf(lang);

        if (keyType === "string") {
            if (langIndex === -1) {
                langIndex = languages.push(lang) - 1;

                // add global rules to to able to switch to new language
                var prefix = `:lang(${lang}) > `;
                // by default localized strings should be hidden
                DOM.importStyles(`[data-i18n="${lang}"]`, "display:none");
                // ... except current page language is appropriate
                DOM.importStyles(`${prefix}[data-i18n="${lang}"]`, "display:inline");
                // ... in such case hide default string as well
                DOM.importStyles(`${prefix}[data-i18n="${lang}"] ~ [data-i18n]`, "display:none");
            }

            if (!strings[key]) strings[key] = [];

            // store localized string internally
            strings[key][langIndex] = value;
        } else if (keyType === "object") {
            Object.keys(key).forEach((x) => {
                DOM.importStrings(lang, x, key[x]);
            });
        } else {
            throw TypeError("importStrings");
        }
    };

    DOM.__ = (key, varMap) => new Entry(key, varMap);

    function Entry(key, varMap) {
        var record = strings[key] || {};

        languages.forEach((lang, index) => {
            var value = record[index];

            if (value) {
                if (varMap) value = DOM.format(value, varMap);

                this[lang] = value;
            }
        });

        this._ = varMap ? DOM.format(key, varMap) : key;
    }

    Entry.prototype = {
        toString(lang) {
            if (!lang) lang = DOM.get("lang");

            return this[lang] || this._;
        },

        toHTMLString() {
            var result = "";

            Object.keys(this).forEach((key) => {
                var lang = key === "_" ? "" : key;

                result += `<span data-i18n="${lang}">${this[key]}</span>`;
            });

            return result;
        }
    };
}(window.DOM));
