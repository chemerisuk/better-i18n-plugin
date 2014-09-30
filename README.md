# better-i18n<br>[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Bower version][fury-image]][fury-url]
> Internationalization plugin for [better-dom](https://github.com/chemerisuk/better-dom)

## Installing
Use [bower](http://bower.io/) to download this extension with all required dependencies.

    bower install better-i18n

This will clone the latest version of the __better-i18n__ into the `bower_components` directory at the root of your project.

Then append the following scripts on your page:

```html
<script src="bower_components/better-dom/dist/better-dom.js"></script>
<script src="bower_components/better-i18n/dist/better-i18n.js"></script>
```

## Usage
`DOM.importStrings` is used to register localized strings for a specific language. So the line below is used to make `"Hello World!"` strings to be `"Привет мир!"` on Russian-speaking web pages:

```js
DOM.importStrings("ru",  "Hello World!", "Привет мир!");
```

Whenever an element has a text string that varies depending on user language - use `$Element#i18n` with English form of the string. English strings have role of keys: 

```js
label.i18n("Hello World!"); // displays "Hello World!"
label.set("lang", "ru");    // now it displays "Привет мир!"
```

### Variables support
You can specify variables via `{param}`:

```js
label.i18n("Hello {user}", {user: "Maksim"}); // displays "Hello Maksim"
```

For a more compact syntax you can use arrays:

```js
label.i18n("Hello {0}", ["Maksim"]); // displays "Hello Maksim"
```

## Browser support
#### Desktop
* Chrome
* Safari 6.0+
* Firefox 16+
* Opera 12.10+
* Internet Explorer 8+ (see [notes](https://github.com/chemerisuk/better-dom#notes-about-old-ies))

#### Mobile
* iOS Safari 6+
* Android 2.3+
* Chrome for Android

[travis-url]: http://travis-ci.org/chemerisuk/better-i18n
[travis-image]: http://img.shields.io/travis/chemerisuk/better-i18n/master.svg

[coveralls-url]: https://coveralls.io/r/chemerisuk/better-i18n
[coveralls-image]: http://img.shields.io/coveralls/chemerisuk/better-i18n/master.svg

[fury-url]: http://badge.fury.io/bo/better-i18n
[fury-image]: https://badge.fury.io/bo/better-i18n.svg
