#!/usr/bin/env node

var program = require('commander');

program
	.version('0.0.1', '-v, --version')
	.usage('[options] <files ...>');

program
	.command('init')
	.description('Initialize a new repo for use with dlg')
	.option('-b, --bare', 'Work with bare repo')
	.action((env, options) => {
		console.err('Not implemented yet');
	});

program
	.command('repl')
	.description('Run the repl')
	.action((env, options) => {
		console.log(`Welcome to the dlg repl\n`);
		require('../src/repl.js');
	});

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
