/* jshint quotmark: false */

describe("l10n", function() {
    "use strict";

    var el, randomString;

    beforeEach(function() {
        el = DOM.mock("label");
        randomString = Math.random().toString(32);
    });

    DOM.importStrings("ru", "test", "ru_test");
    DOM.importStrings("ru", "test {0}", "{0} ru_test");
    DOM.importStrings("ru", "test {value}", "ru_test {value}");

    it("should work for non-localized strings", function() {
        expect(el.l10n(randomString)).toBe(el);
        expect(el.get()).toBe('<span data-l10n="">' + randomString + '</span>');
    });

    it("should support variables", function() {
        var expectedHTML = '<span data-l10n="">' + randomString + '</span>';

        expect(el.l10n(randomString, ["abc"]).get()).toBe(expectedHTML);
        expect(el.l10n(randomString, {value: "123"}).get()).toBe(expectedHTML);

        expect(el.l10n("test {0}", ["abc"]).get()).toBe('<span data-l10n="ru">abc ru_test</span><span data-l10n="">test abc</span>');
        expect(el.l10n("test {0}", {value: "123"}).get()).toBe('<span data-l10n="ru">{0} ru_test</span><span data-l10n="">test {0}</span>');

        expect(el.l10n("test {value}", ["abc"]).get()).toBe('<span data-l10n="ru">ru_test {value}</span><span data-l10n="">test {value}</span>');
        expect(el.l10n("test {value}", {value: "123"}).get()).toBe('<span data-l10n="ru">ru_test 123</span><span data-l10n="">test 123</span>');
    });
});
