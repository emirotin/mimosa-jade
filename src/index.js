"use strict";

var path = require( "path" )
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.jadeStatic.extensions;
  }
  , getStaticContext = function ( mimosaConfig ) {
    var context = mimosaConfig.jadeStatic.staticContext;
    if (typeof context === 'function') {
      context = context();
    }
    return context || null;
  };

var prefix = function ( mimosaConfig, libraryPath ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    return "define([], function (){ var templates = {};\n";
  } else {
    return "var templates = {};\n";
  }
};

var suffix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    return "return templates; });";
  } else if ( mimosaConfig.template.wrapType === "common" ) {
    return "\nmodule.exports = templates;";
  } else {
    return "";
  }
};

var compile = function ( mimosaConfig, file, cb ) {
  var error, output, context;

  try {
    var opts = {
      compileDebug: false,
      filename: file.inputFileName
    };

    output = mimosaConfig.jadeStatic.lib.compile( file.inputFileText, opts);
    context = getStaticContext( mimosaConfig );
    output = output( context );
    output = JSON.stringify( output );
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "jadeStatic",
  compilerType: "template",
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
