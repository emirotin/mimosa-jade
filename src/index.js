"use strict";

var path = require( "path" )
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.jade.extensions;
  }
  , getIsStatic = function ( mimosaConfig ) {
    return !!mimosaConfig.jade.static;
  }
  , getStaticContext = function ( mimosaConfig ) {
    if ( !getIsStatic( mimosaConfig ) ) {
      return null;
    }
    var context = mimosaConfig.jade.staticContext;
    if (typeof context === 'function') {
      context = context();
    }
    return context || null;
  };

var prefix = function ( mimosaConfig, libraryPath ) {
  var isStatic = getIsStatic( mimosaConfig ),
    res;
  if ( mimosaConfig.template.wrapType === "amd" ) {
    res = "define([";
    if ( !isStatic ) {
      res += "'" + libraryPath + "'";
    }
    res += "], function (";
    if ( !isStatic ) {
      res += "jade";
    }
    res += "){ var templates = {};\n";
  } else if ( mimosaConfig.template.wrapType === "common" ) {
    res = "";
    if ( !isStatic ) {
      res += "var jade = require('" + mimosaConfig.template.commonLibPath + "');\n";
    }
    res += "var templates = {};\n";
  } else {
    res = "var templates = {};\n";
  }
  return res;
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
  var error
    , output
    , isStatic = getIsStatic( mimosaConfig )
    , staticContext;

  try {
    var opts = {
      compileDebug: false,
      filename: file.inputFileName
    };

    if ( !isStatic ) {
      output = mimosaConfig.jade.lib.compileClient( file.inputFileText, opts);
    } else {
      output = mimosaConfig.jade.lib.compile( file.inputFileText, opts);
      staticContext = getStaticContext( mimosaConfig );
      output = output( staticContext );
      output = JSON.stringify( output );
    }
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "jade",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "jade-runtime.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
