const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
	prompt: '> '
});

const parser = require('./parser.js').default,
		expand = require('datalog.js').expand;

let edb = [],
	 idb = [];

rl.on('line', function(line){
	if(line == 'exit') process.exit();

	try {
		const p = parser();
		p.feed( line );
		if( p.results.length > 1 ) {
			console.err("Parse error?");
		} else {
			const pr = p.results[0];
			console.log( pr );
			if(typeof pr.head !== 'undefined' && typeof pr.body !== 'undefined') {
				idb.push(pr);
			} else {
				edb.push(pr);
			}
			console.log(expand(edb, idb));
		}
	}
	catch( e ) {
		console.log(e);
	}
	rl.prompt();
});

rl.prompt();

