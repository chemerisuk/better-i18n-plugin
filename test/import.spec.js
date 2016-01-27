describe("DOM.importStrings", function(){
    "use strict";

    var randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32).split(".")[1];
    });

    it("should append global styles for new languages", function() {
        var importSpy = spyOn(DOM, "importStyles");

        DOM.importStrings("en", randomString, "");
        expect(importSpy).toHaveBeenCalledWith("span[lang=\"en\"]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > span[lang=\"en\"]", "display:inline !important");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > span[lang=\"en\"] ~ span[lang]", "display:none");

        DOM.importStrings("fr", randomString, "");
        expect(importSpy).toHaveBeenCalledWith("span[lang=\"fr\"]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > span[lang=\"fr\"]", "display:inline !important");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > span[lang=\"fr\"] ~ span[lang]", "display:none");
    });

    it("should support key/value map as argument", function() {
        DOM.importStrings("en", {a: "b", c: "d"});

        expect(DOM.__("a").en).toBe("b");
        expect(DOM.__("c").en).toBe("d");
    });

    // it("should update all existing localized strings", function() {
    //     var link = DOM.create("a");

    //     jasmine.sandbox.set(link);

    //     link.l10n(randomString).set("en");
    //     expect(link.get("lang-en")).toBeNull();

    //     DOM.importStrings("en", randomString, "test");
    //     expect(link.get("lang-en")).toBe("test");
    // });

    it("should throw error if arguments are invalid", function() {
        expect(function() { DOM.importStrings(1, 2, 3); }).toThrow();
        expect(function() { DOM.importStrings("a"); }).toThrow();
    });
});

