/* jshint quotmark: false */

describe("__", function() {
    "use strict";

    var entry, randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32);
    });

    afterEach(function() {
        DOM.set("lang", "");
    });

    DOM.importStrings("ru", "test", "ru_test");
    DOM.importStrings("ru", "test {0}", "{0} ru_test");
    DOM.importStrings("ru", "test {value}", "ru_test {value}");

    it("should return an Entry object", function() {
        entry = DOM.__(randomString);
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({_: randomString}));

        entry = DOM.__("test");
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({ru: "ru_test", _: "test"}));
    });

    it("grabs methods from String.prototype", function() {
        entry = DOM.__(randomString);
        expect(entry.split(",")).toEqual([randomString]);
        expect(entry.substr(1)).toEqual(randomString.substr(1));
        expect(entry.concat("foo")).toEqual(randomString + "foo");
    });

    describe("toString", function() {
        it("should use current language by default", function() {
            entry = DOM.__("test");
            expect(entry.toString()).toBe("test");

            DOM.set("lang", "ru");
            expect(entry.toString()).toBe("ru_test");
        });
    });

    describe("toLocaleString", function() {
        it("should be overriden", function() {
            entry = DOM.__(randomString);
            expect(entry.toLocaleString()).toBe(randomString);

            entry = DOM.__("test");
            expect(entry.toLocaleString()).toBe("test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");

            DOM.set("lang", "ru");
            expect(entry.toLocaleString()).toBe("ru_test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");
        });
    });

    describe("l10n", function() {
        it("should be overriden", function() {
            entry = DOM.__(randomString);
            expect(entry.l10n()).toBe('<span data-l10n="">' + randomString + '</span>');

            entry = DOM.__("test");
            expect(entry.l10n()).toBe('<span data-l10n="ru">ru_test</span><span data-l10n="">test</span>');
        });

        it("should support variables", function() {
            var expectedHTML = '<span data-l10n="">' + randomString + '</span>';

            entry = DOM.__(randomString, ["abc"]);
            expect(entry.l10n()).toBe(expectedHTML);

            entry = DOM.__(randomString, {value: "123"});
            expect(entry.l10n()).toBe(expectedHTML);

            entry = DOM.__("test {0}", ["abc"]);
            expect(entry.l10n()).toBe('<span data-l10n="ru">abc ru_test</span><span data-l10n="">test abc</span>');

            entry = DOM.__("test {0}", {value: "123"});
            expect(entry.l10n()).toBe('<span data-l10n="ru">{0} ru_test</span><span data-l10n="">test {0}</span>');

            entry = DOM.__("test {value}", ["abc"]);
            expect(entry.l10n()).toBe('<span data-l10n="ru">ru_test {value}</span><span data-l10n="">test {value}</span>');

            entry = DOM.__("test {value}", {value: "123"});
            expect(entry.l10n()).toBe('<span data-l10n="ru">ru_test 123</span><span data-l10n="">test 123</span>');
        });
    });
});
