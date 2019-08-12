import { lexer } from '../src/lexer';

describe('lexer', () => {
	test('edge(\'a\', \'b\').', () => {
		lexer.reset("edge('a', 'b').");
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'edge' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'a' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'b' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });
		expect(lexer.next()).toMatchObject({ type: 'end' });
		expect(lexer.next()).toBeUndefined();
	});

	test('path(X, Y) :- edge(X, Y).', () => {
		lexer.reset('path(X, Y) :- edge(X, Y).');
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'path' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Y' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'seperator' });

		expect(lexer.next()).toMatchObject({ type: 'field', value: 'edge' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Y' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'end' });
		expect(lexer.next()).toBeUndefined();
	});

	test('?- ancestor(\'bill\', X).', () => {
		lexer.reset('?- ancestor(\'bill\', X).');
		expect(lexer.next()).toMatchObject({ type: 'query' });

		expect(lexer.next()).toMatchObject({ type: 'field', value: 'ancestor' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'string', value: 'bill' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'end' });
		expect(lexer.next()).toBeUndefined();
	});

	test('s(X, Y) :- arc(X, Z), arc(Z, Y), not arc(X, Y).', () => {
		lexer.reset('s(X, Y) :- arc(X, Z), arc(Z, Y), not arc(X, Y).');

		expect(lexer.next()).toMatchObject({ type: 'field', value: 's' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Y' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'seperator' });

		expect(lexer.next()).toMatchObject({ type: 'field', value: 'arc' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Z' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'comma' });

		expect(lexer.next()).toMatchObject({ type: 'field', value: 'arc' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Z' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Y' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'comma' });

		expect(lexer.next()).toMatchObject({ type: 'not' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'arc' });
		expect(lexer.next()).toMatchObject({ type: 'lparen' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'X' });
		expect(lexer.next()).toMatchObject({ type: 'comma' });
		expect(lexer.next()).toMatchObject({ type: 'field', value: 'Y' });
		expect(lexer.next()).toMatchObject({ type: 'rparen' });

		expect(lexer.next()).toMatchObject({ type: 'end' });
		expect(lexer.next()).toBeUndefined();
	});
});
