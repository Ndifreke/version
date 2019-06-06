#!/usr/bin/env node

const { version, Versions } = require('./lib/version');
const parseCommandArg = require('./lib/terminal');

if (process.argv.length > 2) {
 // const { versionArg, updateArg} = 
  parseCommandArg();
  // const v = version(versionArg).update(updateArg);
  // console.log(v.toString());
}

module.exports = { version, Versions }
