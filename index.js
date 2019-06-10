
const { version, Versions } = require('./lib/version');
const parseCommandArg = require('./lib/terminal');

if (process.argv.length > 2) {
  parseCommandArg();;
}

module.exports = { version, Versions }
