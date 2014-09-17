describe("i18n", function() {
    "use strict";

    // it("should return data-i18n value if no arguments specified", function() {
    //     expect(DOM.create("span>span[data-i18n]>`test`").i18n()).toBe("test");
    // });

    // it("should set data-i18n if one argument", function() {
    //     var span = DOM.create("span");

    //     expect(span.i18n("key")).toBe(span);
    //     expect(span.get("data-i18n")).toBe("key");
    // });

    // it("should set data-i18n and args", function() {
    //     var span = DOM.create("span");

    //     expect(span.i18n("key {a1} and {a2}", {a1: "1", a2: "2"})).toBe(span);
    //     expect(span.get("data-i18n")).toBe("key 1 and 2");

    //     expect(span.i18n("new {0} and {1}", ["one", "two"])).toBe(span);
    //     expect(span.get("data-i18n")).toBe("new one and two");
    // });

    // it("should work for coolections", function() {
    //     var lis = DOM.create("li*3");

    //     lis.i18n("test {user}", {user: "Maksim"});

    //     lis.each(function(li) {
    //         expect(li).toHaveAttr("data-i18n", "test Maksim");
    //     });
    // });

    // it("should remove data-* attribute if value is null", function() {
    //     var span = DOM.create("span");

    //     expect(span.i18n("key0")).toBe(span);
    //     expect(span).toHaveAttr("data-i18n", "key0");

    //     expect(span.i18n(null)).toBe(span);
    //     expect(span).not.toHaveAttr("data-i18n");

    //     expect(span.i18n("key1"));
    //     expect(span).toHaveAttr("data-i18n", "key1");

    //     expect(span.i18n(null, {a: 7}));
    //     expect(span).not.toHaveAttr("data-i18n");
    // });

    it("should add i18n method", function() {
        expect(DOM.create("<span></span>").i18n).toBeDefined();
    });

    it("should throw error if arguments are invalid", function() {
        var span = DOM.create("<span></span>");

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

