"use strict";

exports.defaults = function() {
  return {
    jadeStatic: {
      extensions: [ "jade" ]
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  jadeStatic:               # config settings for the Jade compiler module\n" +
         "    lib: undefined    # use this property to provide a specific version of Jade\n" +
         "    extensions: [\"jade\"]  # default extensions for Jade files\n" +
         "    context: null # an object passed to the template when converting to static HTML." +
         " If it's a function, it's called and the result is used as a context.\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "jade config", config.jadeStatic ) ) {

    if ( !config.jadeStatic.lib ) {
      config.jadeStatic.lib = require( "jade" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "jadeStatic.extensions", config.jadeStatic.extensions ) ) {
      if (config.jadeStatic.extensions.length === 0) {
        errors.push( "jadeStatic.extensions cannot be an empty array");
      }
    }
  }

  return errors;
};
