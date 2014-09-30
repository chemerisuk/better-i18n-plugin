/* jshint quotmark: false */

describe("i18n", function() {
    "use strict";

    var entry, randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32);
    });

    DOM.importStrings("ru", "test", "ru_test");

    it("should return an Entry object", function() {
        entry = DOM.i18n(randomString);
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({_: randomString}));

        entry = DOM.i18n("test");
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({ru: "ru_test", _: "test"}));
    });

    it("should have overriden toString", function() {
        entry = DOM.i18n(randomString);
        expect(entry.toString()).toBe('<span data-i18n="">' + randomString + '</span>');

        entry = DOM.i18n("test");
        expect(entry.toString()).toBe('<span data-i18n="ru">ru_test</span><span data-i18n="">test</span>');
    });

    it("should have overriden toLocaleString", function() {
        entry = DOM.i18n(randomString);
        expect(entry.toLocaleString()).toBe(randomString);

        entry = DOM.i18n("test");
        expect(entry.toLocaleString()).toBe("test");
        expect(entry.toLocaleString("ru")).toBe("ru_test");

        DOM.set("lang", "ru");
        expect(entry.toLocaleString()).toBe("ru_test");
        expect(entry.toLocaleString("ru")).toBe("ru_test");
    });
});
