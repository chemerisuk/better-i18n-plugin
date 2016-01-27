/* jshint -W053 */
(function(DOM) {
    "use strict";

    var strings = [],
        languages = [];

    function formatKey(key, args, start = 0) {
        return key.replace(/%s/g, (str) => args[start++] || str);
    }

    function Entry(key, args) {
        languages.forEach((lang, index) => {
            var value = strings[index][key];

            if (value) {
                if (args) value = formatKey(value, args);

                this[lang] = value;
            }
        });

        this._ = args ? formatKey(key, args) : key;
    }

    Entry.prototype.toString = function() {
        // "_" key should always be the last one
        var keys = Object.keys(this).sort((k) => k === "_" ? 1 : -1);

        return keys.map((key) =>
            `<span lang="${key}">${this[key]}</span>`).join("");
    };

    Entry.prototype.valueOf = function() {
        return `<span>${this.toString()}</span>`;
    };

    Entry.prototype.toLocaleString = function(lang) {
        return this[lang || DOM.get("documentElement").lang] || this._;
    };

    DOM.importStrings = function(lang, key, value) {
        if (typeof lang !== "string") {
            throw new TypeError("lang argument must be a string");
        }

        var langIndex = languages.indexOf(lang),
            stringsMap = strings[langIndex];

        if (langIndex === -1) {
            langIndex = languages.push(lang) - 1;
            strings[langIndex] = stringsMap = {};

            // add global rules to to able to switch to new language

            // by default localized strings should be hidden
            DOM.importStyles(`span[lang="${lang}"]`, "display:none");
            // ... except current page language is `lang`
            DOM.importStyles(`:lang(${lang}) > span[lang="${lang}"]`, "display:inline !important");
            // ... in such case hide default value too
            DOM.importStyles(`:lang(${lang}) > span[lang="${lang}"] ~ span[lang]`, "display:none");
        }

        if (typeof key === "string") {
            stringsMap[key] = value;
        } else {
            Object.keys(key).forEach((x) => {
                stringsMap[x] = key[x];
            });
        }
    };

    DOM.__ = (key, ...args) => {
        if (Array.isArray(key)) {
            return key.map((key) => new Entry(key, args));
        } else {
            return new Entry(key, args);
        }
    };
}(window.DOM));
