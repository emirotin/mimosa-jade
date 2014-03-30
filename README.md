mimosa-jade-static
===========

## Overview

This is a Jade to HTML compiler for the Mimosa build tool. This module is for use with Mimosa `2.0+`.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'jade-static'` to your list of modules. That's all!
Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

After that, start creating your .jade files in the `app/template` folder. This files will be converted to HTML strings
which are available on client-side through the `templates` object — the same as with other templating modules.

## Functionality

This module will compile Jade files to HTML during `mimosa watch` and `mimosa build`.

This module utilizes all of the built-in template behavior that comes with Mimosa's basic template compiler.
See the [mimosa website](http://mimosa.io/compilers.html#mt) for more information about how templates are treated
or check out the various [`template` configuration options](http://mimosa.io/configuration.html#templates).

## Default Config

```coffeescript
jade:
  lib: undefined
  extensions: [ "jade" ]
  context: null
```

* `lib`: You may want to use this module but may not be ready to use the latest version of Jade.
Using the `lib` property you can provide a specific version of Jade if the one being used by this module
isn't to your liking. To provide a specific version, you must have it `npm install`ed into your project and
then provide it to `lib`. For instance: `lib: require('jade')`.
* `extensions`: an array of strings, the extensions of your Jade files.
* `context`: an object passed to the compiled template function when generating HTML.
If `context` is a function itself, it's being executed and the result is used as a context for the template.

## How is it different from X?

There are several similar modules for Mimosa, let's see how do they differ from each other:

* [`mimosa-html-templates`](https://github.com/dbashford/mimosa-html-templates)
takes the `assets/javascripts/app/template/fileName.template` _HTML_ file and makes its content
available as a _string_ `templates['fileName']`.
* [`mimosa-jade`](https://github.com/dbashford/mimosa-jade)
takes the `assets/javascripts/app/template/fileName.jade` _Jade_ file and makes its content
available as a _function_ `templates['fileName']`. You can then call this function from your client-side
code.
* [`mimosa-client-jade-static`](https://github.com/dbashford/mimosa-client-jade-static)
takes the `assets/javascripts/app/template/fileName.html.jade` _Jade_ file and
_transforms_ it to `public/javascripts/app/template/fileName.html` _file_.
* **`mimosa-jade-static` (this module)**
takes the `assets/javascripts/app/template/fileName.jade` _Jade_ file and makes its content
available as an HTML _string_ `templates['fileName']`.

So, this module is basically the same as `mimosa-html-templates`,
but allowing you to write you code in Jade.

## Sample Use-Case

One particular use-case is when your framework allows
programmatically passing chunks of HTML (potentially containing some
client-side Mustache or EJS-like template instructions).
For example, Angular allows you to pass HTML for custom components,
and for "partials" — see [official examples](http://angularjs.org/)
"Javascript Projects" and "Todo", correspondingly.

A full-featured sample project using Mimosa, Angular, RequireJS and
this module can be found [here](https://github.com/emirotin/mimosa-angular-require-jade-bootstrap).
