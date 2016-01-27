/* jshint quotmark: false */

describe("__", function() {
    "use strict";

    var entry, randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32);
    });

    afterEach(function() {
        DOM.find("html").set("lang", "");
    });

    DOM.importStrings("ru", "test", "ru_test");
    DOM.importStrings("ru", "test %s", "%s ru_test");

    it("should return an Entry object", function() {
        entry = DOM.__(randomString);
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({_: randomString}));

        entry = DOM.__("test");
        expect(JSON.stringify(entry)).toEqual(JSON.stringify({ru: "ru_test", _: "test"}));
    });

    it("supports arrays", function() {
        var entries = DOM.__(["test", "test %s"]);

        DOM.find("html").set("lang", "ru");

        expect(Array.isArray(entries)).toBe(true);
        expect(entries[0].toLocaleString()).toBe("ru_test");
        expect(entries[1].toLocaleString()).toBe("%s ru_test");
    });

    describe("toString", function() {
        it("should work for non-localized strings", function() {
            expect(DOM.__(randomString).toString()).toBe('<span lang="_">' + randomString + '</span>');
        });

        it("should support variables", function() {
            var expectedHTML = '<span lang="_">' + randomString + '</span>';

            expect(DOM.__(randomString, "abc").toString()).toBe(expectedHTML);
            expect(DOM.__(randomString, {value: "123"}).toString()).toBe(expectedHTML);

            expect(DOM.__("test %s", "abc").toString()).toBe('<span lang="ru">abc ru_test</span><span lang="_">test abc</span>');
            expect(DOM.__("test %s", "123").toString()).toBe('<span lang="ru">123 ru_test</span><span lang="_">test 123</span>');
        });
    });

    describe("valueOf", function() {
        it("wraps value with extra span", function() {
            expect(DOM.__(randomString).valueOf()).toBe('<span><span lang="_">' + randomString + '</span></span>');
            expect("wow " + DOM.__(randomString)).toBe('wow <span><span lang="_">' + randomString + '</span></span>');
        });
    });

    describe("toLocaleString", function() {
        it("should be overriden", function() {
            entry = DOM.__(randomString);
            expect(entry.toLocaleString()).toBe(randomString);

            entry = DOM.__("test");
            expect(entry.toLocaleString()).toBe("test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");

            DOM.find("html").set("lang", "ru");
            expect(entry.toLocaleString()).toBe("ru_test");
            expect(entry.toLocaleString("ru")).toBe("ru_test");
        });

        it("should use current language by default", function() {
            entry = DOM.__("test");
            expect(entry.toLocaleString()).toBe("test");

            DOM.find("html").set("lang", "ru");
            expect(entry.toLocaleString()).toBe("ru_test");
        });
    });
});
