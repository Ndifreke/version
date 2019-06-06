
const getVersionArg = (arg) => {
  const versionIndex = arg.indexOf('-v');
  if (versionIndex !== -1 && /^[0-9]\.[0-9]\.[0-9]$/.test(arg[versionIndex + 1])) {
    return arg[versionIndex + 1];
  } else {
    console.error('-v Argument must use connical format ');
  }
  process.exit(1);
};

const parseCommandArg = () => {
  const args = process.argv;
  if (args.length > 2 && args.indexOf('-h') !== -1) {
    //requested help
    console.log(
      `\nusage: version -v (version) -p [012]
       \r\t-v = version number : E.g 1.0.1
       \r\t-p = part to update : 0 => patch, 1 => minor, 2 => major
       \r\tExample: version -v 0.8.4 -p 0
      `);
    process.exit(0);
  }
  const versionArg = getVersionArg(args);
  const updateArg = getPartArg(args);
  return { versionArg, updateArg };
};

const getPartArg = (arg) => {
  const partIndex = arg.indexOf('-p');
  if (partIndex !== -1 && /[012]/.test(arg[partIndex + 1])) {
    return arg[partIndex + 1];
  } else {
    console.error('-p argument must match any of [012]');
  }
  process.exit(1);
};

module.exports = parseCommandArg;
