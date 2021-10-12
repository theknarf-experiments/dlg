import { parser } from '../src/parser';

describe('parser', () => {
	test('"a(\'b\')." parses successfully', () => {
		const newParser = parser();
		newParser.feed(`a('b').`);
		expect( newParser.results )
			.toEqual([ { a: 'b' } ] );
	});

	test('edge(\'a\', \'b\').', () => {
		const query = "edge('a', 'b').";
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('path(x, y) :- edge(x, y).', () => {
		const query = 'path(x, y) :- edge(x, y).';
		expect(() => parser().feed(query)).not.toThrow();
	});

	test('?- ancestor(\'bill\', x).', () => {
		const query = '?- ancestor(\'bill\', x).';
		//expect(() => parser().feed(query)).not.toThrow(); // TODO: fix this
	});

	test('s(x, y) :- arc(x, z), arc(z, y), not arc(x, y).', () => {
		const query = 's(x, y) :- arc(x, z), arc(z, y), not arc(x, y).';
		//expect(() => parser().feed(query)).not.toThrow(); // TODO: fix this
	});
});
