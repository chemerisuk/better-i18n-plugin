/**
 * better-i18n-plugin: Internationalization plugin for better-dom
 * @version 2.0.0-beta.1 Wed, 27 Jan 2016 14:30:07 GMT
 * @link https://github.com/chemerisuk/better-emmet-plugin#readme
 * @copyright 2016 Maksim Chemerisuk
 * @license MIT
 */
/* jshint -W053 */
(function (DOM) {
    "use strict";

    var strings = [],
        languages = [];

    function formatKey(key, args) {
        var start = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        return key.replace(/%s/g, function (str) {
            return args[start++] || str;
        });
    }

    function Entry(key, args) {
        var _this = this;

        languages.forEach(function (lang, index) {
            var value = strings[index][key];

            if (value) {
                if (args) value = formatKey(value, args);

                _this[lang] = value;
            }
        });

        this._ = args ? formatKey(key, args) : key;
    }

    Entry.prototype.toString = function () {
        var _this2 = this;

        // "_" key should always be the last one
        var keys = Object.keys(this).sort(function (k) {
            return k === "_" ? 1 : -1;
        });

        return keys.map(function (key) {
            return "<span lang=\"" + key + "\">" + _this2[key] + "</span>";
        }).join("");
    };

    Entry.prototype.valueOf = function () {
        return "<span>" + this.toString() + "</span>";
    };

    Entry.prototype.toLocaleString = function (lang) {
        return this[lang || DOM.get("documentElement").lang] || this._;
    };

    DOM.importStrings = function (lang, key, value) {
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
            DOM.importStyles("span[lang=\"" + lang + "\"]", "display:none");
            // ... except current page language is `lang`
            DOM.importStyles(":lang(" + lang + ") > span[lang=\"" + lang + "\"]", "display:inline !important");
            // ... in such case hide default value too
            DOM.importStyles(":lang(" + lang + ") > span[lang=\"" + lang + "\"] ~ span[lang]", "display:none");
        }

        if (typeof key === "string") {
            stringsMap[key] = value;
        } else {
            Object.keys(key).forEach(function (x) {
                stringsMap[x] = key[x];
            });
        }
    };

    DOM.__ = function (key) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (Array.isArray(key)) {
            return key.map(function (key) {
                return new Entry(key, args);
            });
        } else {
            return new Entry(key, args);
        }
    };
})(window.DOM);