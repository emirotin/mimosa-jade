exports.config =
  modules: ["jshint"]
  watch:
    sourceDir: "src"
    compiledDir: "lib"
    javascriptDir: null
    exclude: ["client/jade-runtime.js"]
  jshint:
    rules:
      node: true
      laxcomma: true