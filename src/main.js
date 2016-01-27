/* jshint -W053 */
(function(DOM) {
    "use strict";

    var strings = [],
        languages = [];

    DOM.importStrings = function(lang, key, value) {
        if (typeof lang !== "string") throw new TypeError("lang argument must be a string");

        var langIndex = languages.indexOf(lang),
            stringsMap = strings[langIndex];

        if (langIndex === -1) {
            langIndex = languages.push(lang) - 1;
            strings[langIndex] = stringsMap = {};

            // add global rules to to able to switch to new language

            // by default localized strings should be hidden
            DOM.importStyles(`[data-l10n="${lang}"]`, "display:none");
            // ... except current page language is `lang`
            DOM.importStyles(`:lang(${lang}) > [data-l10n="${lang}"]`, "display:inline !important");
            // ... in such case hide default value too
            DOM.importStyles(`:lang(${lang}) > [data-l10n="${lang}"] ~ [data-l10n]`, "display:none");
        }

        if (typeof key === "string") {
            stringsMap[key] = value;
        } else {
            Object.keys(key).forEach((x) => {
                stringsMap[x] = key[x];
            });
        }
    };

    DOM.__ = (key, varMap) => {
        if (Array.isArray(key)) {
            return key.map((key) => new Entry(key, varMap));
        } else {
            return new Entry(key, varMap);
        }
    };

    function Entry(key, varMap) {
        languages.forEach((lang, index) => {
            var value = strings[index][key];

            if (value) {
                if (varMap) value = DOM.format(value, varMap);

                this[lang] = value;
            }
        });

        this._ = varMap ? DOM.format(key, varMap) : key;
    }

    Entry.prototype.toString = function() {
        // "_" key should always be the last one
        var keys = Object.keys(this).sort((k) => k === "_" ? 1 : -1);

        return keys.map((key) =>
            `<span data-l10n="${key}">${this[key]}</span>`).join("");
    };

    Entry.prototype.toLocaleString = function(lang) {
        return this[lang || DOM.get("documentElement").lang] || this._;
    };
}(window.DOM));
