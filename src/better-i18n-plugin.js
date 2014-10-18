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
            DOM.importStyles(`:lang(${lang}) > [data-l10n="${lang}"]`, "display:inline");
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

    DOM.__ = (key, varMap) => new Entry(key, varMap);

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

    // grab all methods from String.prototype
    Entry.prototype = new String();
    Entry.prototype.constructor = Entry;

    Entry.prototype.toString = function() {
        return this[DOM.get("lang")] || this._;
    };

    Entry.prototype.toLocaleString = function(lang) {
        return lang ? this[lang] || this._ : this.toString();
    };

    Entry.prototype.l10n = function() {
        var result = "";

        Object.keys(this).forEach((key) => {
            var attrValue = key === "_" ? "" : key;

            result += `<span data-l10n="${attrValue}">${this[key]}</span>`;
        });

        return result;
    };
}(window.DOM));
