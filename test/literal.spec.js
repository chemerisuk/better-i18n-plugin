describe("literal function", () => {
    "use strict";

    var i18n = DOM.i18nLiteral;

    it("constructs appropriate string", function() {
        var bar = "foo";

        expect(i18n`foo`).toBe("foo");
        expect(i18n`foo ${bar}`).toBe("foo foo");
        expect(i18n`foo ${bar} ${bar}`).toBe("foo foo foo");
    });

    it("returns localized value", function() {
        var bar = "foo";

        expect(i18n`foo ${bar}`).toBe("foo foo");

        DOM.importStrings("ru", "foo %s", "ru_foo %s");
        DOM.find("html").set("lang", "ru");

        expect(i18n`foo ${bar}`).toBe("ru_foo foo");

        DOM.importStrings("fr", "foo %s", "fr_foo %s!");
        DOM.find("html").set("lang", "fr");

        expect(i18n`foo ${bar}`).toBe("fr_foo foo!");
    });
});
