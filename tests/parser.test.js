import { parser } from '../src/parser';

test('"a(\'b\')." parses successfully', () => {
	const newParser = parser();
	newParser.feed(`a('b').`);
	expect( newParser.results )
		.toEqual([ { a: 'b' } ] );
});
