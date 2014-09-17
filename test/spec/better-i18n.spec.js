describe("i18n", function() {
    "use strict";

    DOM.importStrings("ru", "test", "ru_test");
    DOM.importStrings("ru", "var {0}", "{0} ru_var");
    DOM.importStrings("ru", "test {value}", "ru_test {value}");

    it("should set innerHTML into appropriate value", function() {
        var p = DOM.mock("p");

        p.i18n("test_single");
        expect(p.get()).toBe("<span data-i18n=\"ru\">test_single</span><span data-i18n=\"\">test_single</span>");

        p.i18n("test");
        expect(p.get()).toBe("<span data-i18n=\"ru\">ru_test</span><span data-i18n=\"\">test</span>");
    });

    it("should support variables", function() {
        var p = DOM.mock("p");

        p.i18n("var {0}", [1]);
        expect(p.get()).toBe("<span data-i18n=\"ru\">1 ru_var</span><span data-i18n=\"\">var 1</span>");

        p.i18n("var {0}", ["abc"]);
        expect(p.get()).toBe("<span data-i18n=\"ru\">abc ru_var</span><span data-i18n=\"\">var abc</span>");

        p.i18n("test {value}", {value: "my"});
        expect(p.get()).toBe("<span data-i18n=\"ru\">ru_test my</span><span data-i18n=\"\">test my</span>");
    });

    it("should add i18n method", function() {
        expect(DOM.create("span").i18n).toBeDefined();
    });

    it("should throw error if arguments are invalid", function() {
        var span = DOM.create("span");

        expect(function() { span.i18n(1) }).toThrow();
        expect(function() { span.i18n(function() {}) }).toThrow();
        expect(function() { span.i18n("key", 1) }).toThrow();
        expect(function() { span.i18n("key", function() {}) }).toThrow();
    });
});

describe("DOM.importStrings", function(){
    "use strict";

    var randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32).split(".")[1];
    });

    it("should append global styles for new languages", function() {
        var importSpy = spyOn(DOM, "importStyles");

        DOM.importStrings("en", randomString, "");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > [data-i18n]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > [data-i18n=en]", "display:inline");

        DOM.importStrings("fr", randomString, "");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > [data-i18n]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > [data-i18n=fr]", "display:inline");
    });

    it("should support key/value map as argument", function() {
        var spy = spyOn(DOM, "importStrings").and.callThrough();

        DOM.importStrings("en", {a: "b", c: "d"});
        expect(spy).toHaveBeenCalledWith("en", "a", "b");
        expect(spy).toHaveBeenCalledWith("en", "c", "d");
    });

    // it("should update all existing localized strings", function() {
    //     var link = DOM.create("a");

    //     jasmine.sandbox.set(link);

    //     link.i18n(randomString).set("en");
    //     expect(link.get("data-i18n-en")).toBeNull();

    //     DOM.importStrings("en", randomString, "test");
    //     expect(link.get("data-i18n-en")).toBe("test");
    // });

    it("should throw error if arguments are invalid", function() {
        expect(function() { DOM.importStrings(1, 2, 3); }).toThrow();
        expect(function() { DOM.importStrings("a"); }).toThrow();
    });
});

