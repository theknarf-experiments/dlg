const moo = require('moo');

const lexer = moo.compile({
	WS:       /[ \t]+/,
	number:   /0|\-?[1-9][0-9]*/,
	string:   {
		match: [/"(?:\\["\\]|[^\n"\\])*"/, /'(?:\\['\\]|[^\n'\\])*'/],
		value: s => s.slice(1, -1),
	},
	lparen:      '(',
	rparen:      ')',
	seperator:   ':-',
	end:         '.',
	comma:       ',',
	query:       '?-',
	not:         'not',
	field:       /[A-Za-z0-9]+/,
	NL:          { match: /\n/, lineBreaks: true },
});

// Taken from: https://github.com/no-context/moo/issues/81#issuecomment-337582515
// this allows you to skip whitespace and comment tokens
// that way we wont need to bother about theese in the parser, nor in tests
lexer.next = (next => () => {
  let tok;
  while((tok = next.call(lexer)) && (tok.type === 'WS' || tok.type === 'NL'));
  return tok;
})(lexer.next);

module.exports = {
  lexer
};
