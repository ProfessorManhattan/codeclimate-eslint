#!/usr/src/app/bin/node_gc

const cliArgs = process.argv.slice(2)

const CODE_DIR = cliArgs[0] ? cliArgs[0] : '/code'
process.chdir(CODE_DIR)

const ESLint = require('../lib/eslint')
ESLint.run(console, { dir: CODE_DIR })
