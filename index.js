#!/usr/bin/env node

const { version, Versions } = require('./version');
const parseCommandArg = require('./command');

const fs = require('fs');

if (process.argv.length > 2) {
  const { versionArg, updateArg} = parseCommandArg();
  const v = version(versionArg).update(updateArg);
  console.log(v.toString());
}

module.exports = { version, Versions }
