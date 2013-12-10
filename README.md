# termlog.js [![Build Status][buildstatus]][buildstatusurl] [![Deps Status][depstatus]][depstatusurl]

[![NPM][npm]](https://nodei.co/npm/termlog.js/)

Wraps browser console to display log messages in web terminal powered by [term.js][term.js]

## USAGE

Include `termlog.js` to your html page and call `console.terminal()` as part of initialization block like in example below.

``` js
window.onload = function() {
    console.terminal();
    console.log('log %s', 'message');
    console.warn('warn %s', 'message');
    console.error('error %s', 'message');
    console.debug('debug %s', 'message');
};
```

## Options

> TBD

## TODO

* Add more options presets

[buildstatus]: https://drone.io/github.com/sergeyt/termlog.js/status.png
[buildstatusurl]: https://drone.io/github.com/sergeyt/termlog.js/latest
[depstatus]: https://david-dm.org/sergeyt/termlog.js.png
[depstatusurl]: https://david-dm.org/sergeyt/termlog.js
[npm]: https://nodei.co/npm/termlog.js.png?downloads=true&stars=true
[term.js]: https://github.com/chjj/term.js/
