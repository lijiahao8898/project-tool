#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/';

const {resolve} = require('path');
const res = command => resolve(__dirname, '../commands/', command);
const program = require('commander');
const packageJSON = require('../package');
const isDir = require('../utils/isDir');


program.version(packageJSON.version, '-v, --version');
program.usage('<command> [options]');

program.command('init')
    .description('create a new project')
    .option('-i, --init [name]', 'init a new project')
    .alias('i')
    .action(async (name, cmd) => {
        if(typeof name === 'string') {
            await isDir(name);
        }
        require(res('init'));
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

