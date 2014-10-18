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

    describe("toHTMLString", function() {
        it("should be overriden", function() {
            entry = DOM.__(randomString);
            expect(entry.toHTMLString()).toBe('<span data-i18n="">' + randomString + '</span>');

            entry = DOM.__("test");
            expect(entry.toHTMLString()).toBe('<span data-i18n="ru">ru_test</span><span data-i18n="">test</span>');
        });

        it("should support variables", function() {
            var expectedHTML = '<span data-i18n="">' + randomString + '</span>';

            entry = DOM.__(randomString, ["abc"]);
            expect(entry.toHTMLString()).toBe(expectedHTML);

            entry = DOM.__(randomString, {value: "123"});
            expect(entry.toHTMLString()).toBe(expectedHTML);

            entry = DOM.__("test {0}", ["abc"]);
            expect(entry.toHTMLString()).toBe('<span data-i18n="ru">abc ru_test</span><span data-i18n="">test abc</span>');

            entry = DOM.__("test {0}", {value: "123"});
            expect(entry.toHTMLString()).toBe('<span data-i18n="ru">{0} ru_test</span><span data-i18n="">test {0}</span>');

            entry = DOM.__("test {value}", ["abc"]);
            expect(entry.toHTMLString()).toBe('<span data-i18n="ru">ru_test {value}</span><span data-i18n="">test {value}</span>');

            entry = DOM.__("test {value}", {value: "123"});
            expect(entry.toHTMLString()).toBe('<span data-i18n="ru">ru_test 123</span><span data-i18n="">test 123</span>');
        });
    });
});
