"use strict";

exports.defaults = function() {
  return {
    jade: {
      extensions: [ "jade" ],
      "static": false,
      staticContext: null
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  jade:               # config settings for the Jade compiler module\n" +
         "    lib: undefined    # use this property to provide a specific version of Jade\n" +
         "    extensions: [\"jade\"]  # default extensions for Jade files\n" +
         "    static: false # if set to true, templates are compiled to static HTML\n" +
         "    staticContext: null # an object passed to the template when converting to static HTML." +
         " If it's a function, it's called and the result is used as a context.\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "jade config", config.jade ) ) {

    if ( !config.jade.lib ) {
      config.jade.lib = require( "jade" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "jade.extensions", config.jade.extensions ) ) {
      if (config.jade.extensions.length === 0) {
        errors.push( "jade.extensions cannot be an empty array");
      }
    }
  }

  return errors;
};
