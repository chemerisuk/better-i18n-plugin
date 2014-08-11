# better-i18n [![Build Status](https://api.travis-ci.org/chemerisuk/better-i18n.png?branch=master)](http://travis-ci.org/chemerisuk/better-i18n)
> I18n extension for [better-dom](https://github.com/chemerisuk/better-dom)

## Installing
Use [bower](http://bower.io/) to download this extension with all required dependencies.

    bower install better-i18n

This will clone the latest version of the __better-i18n__ into the `bower_components` directory at the root of your project.

Then append the following html elements on your page:

```html
<html>
<head>
    ...
    <!--[if IE]>
        <link href="bower_components/better-dom/dist/better-dom-legacy.htc" rel="htc"/>
        <script src="bower_components/better-dom/dist/better-dom-legacy.js"></script>
    <![endif]-->
</head>
<body>
    ...
    <script src="bower_components/better-dom/dist/better-dom.js"></script>
    <script src="bower_components/better-i18n/dist/better-i18n.js"></script>
</body>
</html>
```

## Browser support
* Chrome
* Safari 6.0+
* Firefox 16+
* Opera 12.10+
* IE8+