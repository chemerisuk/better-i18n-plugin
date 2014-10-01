/* jshint quotmark: false */

describe("i18n", function() {
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
        entry = DOM.i18n(randomString);
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({_: randomString}));

        entry = DOM.i18n("test");
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({ru: "ru_test", _: "test"}));
    });

    it("should support variables early", function() {
        var expectedHTML = '<span data-i18n="">' + randomString + '</span>';

        entry = DOM.i18n(randomString, ["abc"]);
        expect(entry.toString()).toBe(expectedHTML);

        entry = DOM.i18n(randomString, {value: "123"});
        expect(entry.toString()).toBe(expectedHTML);

        entry = DOM.i18n("test {0}", ["abc"]);
        expect(entry.toString()).toBe('<span data-i18n="ru">abc ru_test</span><span data-i18n="">test abc</span>');

        entry = DOM.i18n("test {0}", {value: "123"});
        expect(entry.toString()).toBe('<span data-i18n="ru">{0} ru_test</span><span data-i18n="">test {0}</span>');

        entry = DOM.i18n("test {value}", ["abc"]);
        expect(entry.toString()).toBe('<span data-i18n="ru">ru_test {value}</span><span data-i18n="">test {value}</span>');

        entry = DOM.i18n("test {value}", {value: "123"});
        expect(entry.toString()).toBe('<span data-i18n="ru">ru_test 123</span><span data-i18n="">test 123</span>');
    });

    describe("toString", function() {
        it("should be overriden", function() {
            entry = DOM.i18n(randomString);
            expect(entry.toString()).toBe('<span data-i18n="">' + randomString + '</span>');

            entry = DOM.i18n("test");
            expect(entry.toString()).toBe('<span data-i18n="ru">ru_test</span><span data-i18n="">test</span>');
        });

        it("should support variables", function() {
            var expectedHTML = '<span data-i18n="">' + randomString + '</span>';

            entry = DOM.i18n(randomString);
            expect(entry.toString(["abc"])).toBe(expectedHTML);
            expect(entry.toString({value: "123"})).toBe(expectedHTML);

            entry = DOM.i18n("test {0}");
            expect(entry.toString(["abc"])).toBe('<span data-i18n="ru">abc ru_test</span><span data-i18n="">test abc</span>');
            expect(entry.toString({value: "123"})).toBe('<span data-i18n="ru">{0} ru_test</span><span data-i18n="">test {0}</span>');

            entry = DOM.i18n("test {value}");
            expect(entry.toString(["abc"])).toBe('<span data-i18n="ru">ru_test {value}</span><span data-i18n="">test {value}</span>');
            expect(entry.toString({value: "123"})).toBe('<span data-i18n="ru">ru_test 123</span><span data-i18n="">test 123</span>');
        });
    });

    describe("toLocaleString", function() {
        it("should be overriden", function() {
            entry = DOM.i18n(randomString);
            expect(entry.toLocaleString()).toBe(randomString);

            entry = DOM.i18n("test");
            expect(entry.toLocaleString()).toBe("test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");

            DOM.set("lang", "ru");
            expect(entry.toLocaleString()).toBe("ru_test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");
        });

        it("should use current language by default", function() {
            entry = DOM.i18n("test");
            expect(entry.toLocaleString()).toBe("test");

            DOM.set("lang", "ru");
            expect(entry.toLocaleString()).toBe("ru_test");
        });
    });
});
