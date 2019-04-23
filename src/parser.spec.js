const parser = require('./parser').default;

test('"a(\'b\')." parses successfully', () => {
	const newParser = parser();
	newParser.feed(`a('b').`);
	expect( newParser.results )
		.toEqual([ { a: 'b' } ] );
});
