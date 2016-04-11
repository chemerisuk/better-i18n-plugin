(function(DOM) {
    "use strict";

    var strings = [],
        languages = [],
        HTML = DOM.get("documentElement");

    function formatKey(key, args, start = 0) {
        return key.replace(/%s/g, (str) => args[start++] || str);
    }

    class Entry {
        constructor(key, args) {
            languages.forEach((lang, index) => {
                var value = strings[index][key];

                if (value) {
                    this[lang] = args ? formatKey(value, args) : value;
                }
            });

            this._ = args ? formatKey(key, args) : key;
        }

        toString() {
            // "_" key should always be the last one
            return Object.keys(this)
                .sort((key) => key === "_" ? 1 : -1)
                .map((key) => `<span lang="${key}">${this[key]}</span>`)
                .join("");
        }

        toLocaleString(lang) {
            return this[lang || HTML.lang] || this._;
        }

        valueOf() {
            return `<span>${this.toString()}</span>`;
        }
    }

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

    DOM.__.esliteral = (parts, ...args) => {
        return new Entry(parts.join("%s"), args).toLocaleString();
    };
}(window.DOM));
