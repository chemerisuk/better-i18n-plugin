# better-i18n<br>[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Bower version][fury-image]][fury-url]
> Internationalization plugin for [better-dom](https://github.com/chemerisuk/better-dom)

The project aims to solve the internationalization problem __on front-end side__. The technique used behind the scenes I call “CSS-driven internationalization” and there is a [deep article](http://www.smashingmagazine.com/2014/06/23/css-driven-internationalization-in-javascript/) about it.

_This project is still early alpha_

## Features

* does not require initionalization calls on initial page load
* dynamic language changing via the `lang` attribute
* ability to change language on a subset of DOM elements
* HTML strings support

NOTE: currently the project can't localize empty DOM elements or attribute values

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

Let's say we need to localize `"Hello world"` string to support multiple languages. All you need to do in your code is just to use `DOM.i18n` and set it as a `innerHTML` value:

```js
button.set( DOM.i18n("Hello world") );
```

If you need to add a support for a new language just register it. For example let's translate the string for the Russian web pages:

```js
DOM.importStrings("ru", "Hello world", "Привет мир");
```

Now for web pages where `<html lang="ru">` the button displays `"Привет мир"`.

### Variables support
You can specify variables via declaring `{param}` in your strings:

```js
button.set( DOM.i18n("Hello {user}", {user: "Maksim"}) );
// displays "Hello Maksim"
```

For a more compact syntax you can use arrays:

```js
button.set( DOM.i18n("Hello {0}", ["Maksim"]) );
// displays "Hello Maksim"
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
