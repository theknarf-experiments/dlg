const nearley = require("nearley");
const grammar = require("./grammer.generated.js");

// Create a Parser object from our grammar.
const parser = () => new nearley.Parser(
	nearley.Grammar.fromCompiled(grammar)
);

module.exports = {
	default: parser
};
