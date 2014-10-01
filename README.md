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

Let's say we need to localise `"Hello world"` string to support multiple languages. All you need to do in your code is just to use `DOM.i18n` and set it as a `innerHTML` value:

```js
button.set(DOM.i18n("Hello world"));
```

If you need to add a support for a new language just register it. For example let's translate the string for the Russian web pages:

```js
DOM.importStrings("ru", "Hello world", "Привет мир");
```

Now for web pages where `<html lang="ru">` button displays `"Привет мир"`.

### Variables support
You can specify variables via declaring `{param}` in your strings:

```js
button.set( DOM.i18n("Hello {user}").toString({user: "Maksim"}) );
// displays "Hello Maksim"
```

For a more compact syntax you can use arrays:

```js
button.set( DOM.i18n("Hello {0}").toString(["Maksim"]) );
// displays "Hello Maksim"
```

## Browser support
#### Desktop
* Chrome
* Safari 6.0+
* Firefox 16+
* Opera 12.10+
* Internet Explorer 8+

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
