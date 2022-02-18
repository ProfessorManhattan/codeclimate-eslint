#!/usr/src/app/bin/node_gc

const CODE_DIR = "/usr/src/app/test/example";
process.chdir(CODE_DIR);

const ESLint = require("../lib/eslint");
ESLint.run(console, { dir: CODE_DIR });
