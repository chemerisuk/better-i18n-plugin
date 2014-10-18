describe("DOM.importStrings", function(){
    "use strict";

    var randomString;

    beforeEach(function() {
        randomString = Math.random().toString(32).split(".")[1];
    });

    it("should append global styles for new languages", function() {
        var importSpy = spyOn(DOM, "importStyles");

        DOM.importStrings("en", randomString, "");
        expect(importSpy).toHaveBeenCalledWith("[data-l10n=\"en\"]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > [data-l10n=\"en\"]", "display:inline");
        expect(importSpy).toHaveBeenCalledWith(":lang(en) > [data-l10n=\"en\"] ~ [data-l10n]", "display:none");

        DOM.importStrings("fr", randomString, "");
        expect(importSpy).toHaveBeenCalledWith("[data-l10n=\"fr\"]", "display:none");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > [data-l10n=\"fr\"]", "display:inline");
        expect(importSpy).toHaveBeenCalledWith(":lang(fr) > [data-l10n=\"fr\"] ~ [data-l10n]", "display:none");
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
    //     expect(link.get("data-l10n-en")).toBeNull();

    //     DOM.importStrings("en", randomString, "test");
    //     expect(link.get("data-l10n-en")).toBe("test");
    // });

    it("should throw error if arguments are invalid", function() {
        expect(function() { DOM.importStrings(1, 2, 3); }).toThrow();
        expect(function() { DOM.importStrings("a"); }).toThrow();
    });
});

