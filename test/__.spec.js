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

    it("allows to concat strings using operators", function() {
        var entry1 = DOM.__("test");
        var entry2 = DOM.__("test {0}");

        DOM.set("lang", "ru");

        expect(entry1 + "+" + entry2).toBe("ru_test+{0} ru_test");
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
});
