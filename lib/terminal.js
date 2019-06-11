#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { version } = require('./version');

class Terminal {

/**
 * Get the version argument passed to command line
 * @param {Array} arg list of argument received from command line
 * @returns {String} argument passed to the -v or --version flag or false if none
 */
  static getVersionArg(arg) {
    const version = Terminal.flagArgExist('-v', arg)
    return /^[0-9]\.[0-9]\.[0-9]$/.test(version) ? version : false;
  }

  /**
 * Verify that there is argument passed to the -v parameter
 * @param {Array} arg list of argument received from command line
 * @returns {String} Argument to -v or program exit(1) if argument 
 * does not match semantic schema
 */
  static verifyVersion(arg) {
    const version = Terminal.getVersionArg(arg);
    if (!version) {
      console.error('error: -v Argument must use semantic schema ');
      process.exit(1);
    }
    return version;
  };

  /**
   * check if the -v(version) flag was passed in command
   * @param {Array} arg List of argument received from command line
   * @returns {Boolean} True if -v exist in arg
   */
  static hasVersionFlag(arg){
    return Terminal.hasFlag('-v', arg);
  }

   /**
   * check if the -p(part) flag was passed in command
   * @param {Array} arg List of argument received from command line
   * @returns {Boolean} true if -p exist in arg
   */
  static hasPartFlag(arg) {
    return Terminal.hasFlag('-p', arg);
  }

  /**
 * Get the part argument passed to command line
 * @param {Array} arg List of argument received from command line
 * @returns {string} argument passed to the -p or --part flag and false if none
 */
  static getPartFlag(arg) {
    return /[012]/.test(Terminal.flagArgExist('-p', arg));
  }
  
    /**
 * Verify that there is argument passed to the -p parameter
 * @param {Array} arg list of argument received from command line
 * @returns {String} Argument to -p or program exit(1) if argument 
 * does not match semantic schema
 */
  static verifyPartArg(arg) {
    const part = /[012]/.test(Terminal.flagArgExist('-p', arg));
    if (!part) {
      console.error('error: -p argument must match any of [012]');
      process.exit(1);
    }
    return Terminal.flagArgExist('-p', arg);
  }

   /**
 * Get the file argument passed to command line
 * @param {Array} arg List of argument received from command line
 * @returns {string} File URL argument passed to the -f or --file flag and undefined if none
 */
  static getFileArg(arg) {
    return Terminal.flagArgExist('-f', arg);
  }

   /**
   * check if the -f(--file) flag was passed in command
   * @param {Array} arg List of argument received from command line
   * @returns {Boolean} true if -f or --file exist in arg
   */
  static hasFileFlag(arg) {
    return Terminal.hasFlag('-f', arg);
  }

    /**
 * Verify that there is argument passed to the -f or --file parameter
 * @param {Array} arg list of argument received from command line
 * @returns {String} Argument to -f(--file) or program exit(1) if argument 
 * does exist
 */
  static verifyFileArg(arg){
    if(!Terminal.flagArgExist('-f', arg)){
      console.error('error : -f arg is missing');
      process.exit(1);
    }
    return Terminal.getVersionFile(arg);
  }

  /**
   * Generic predicate to test if a flag is passed in command input
   * @param {String} flag Flag to check for 
   * @param {Array} arg List of argument received from command line 
   * @returns {Boolean} True if arg.indexOf(flag) !== -1
   */
  static hasFlag(flag, arg) {
    return arg.indexOf(flag) !== -1;
  }

   /**
   * Generic predicate to test if a flag argument is empty
   * @param {String} flag Flag to check for 
   * @param {Array} arg List of argument received from command line 
   * @returns {Boolean} True if arg[arg.indexOf(flag)+1) is a valid argument
   */
  static flagArgExist(flag, args) {
    const flagArg = args[args.indexOf(flag) + 1];
    return args.indexOf(flag) !== -1 && flagArg && !flagArg.startsWith("-") && flagArg;
  }

   /**
   * check if the -d(--delimeter) flag was passed in command
   * @param {Array} arg List of argument received from command line
   * @returns {Boolean} true if -d or --delimter exist in arg
   */
  static hasDelimeterFlag(arg) {
    return Terminal.hasFlag('-d', arg);
  }

 /**
 * Verify that there is argument passed to the -d or --delimeter parameter
 * @param {Array} arg list of argument received from command line
 * @returns {String} Argument to -d(--delimeter) or program exit(1) if argument 
 * does exist
 */
  static verifyDelimeterArg(arg){
    if(!Terminal.flagArgExist('-d', arg)){
      console.error('error : -d arg is missing');
      process.exit(1);
    }
    return true;
  }

 /**
 * Get the delimeter argument passed to command line
 * @param {Array} arg List of argument received from command line
 * @returns {string}  argument passed to the -d or --delimeter flag and undefined if none
 */
  static getDelimeterArg(arg) {
    return Terminal.flagArgExist('-d', arg);
  }

  /**
   * Read the file that points to the argument passed in to -f or --file argument
   * Exits(1) if no such file exist or is inaccesible
   * @param {Array} arg List of argument received from command line 
   */
  static getVersionFile(arg) {
    const fileArg = Terminal.getFileArg(arg);
    if (!fileArg) {
      console.error('error: -f argument must be path to a file');
      process.exit(1);
    }
    //TODO switch 'pwd on Linux and cwd on windows'
    const cwd = execSync('pwd').toString().replace('\n', '');
    const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(cwd, fileArg);
    try {
      const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
      return fileContent;
    } catch (e) {
      console.error('error: Cannot read ' + filePath);
      process.exit(0);
    }
  }

  /**
   * Update the version identified by argument to -f or --file flag
   * @param {*} data 
   * @param {*} delimter 
   * @param {*} path 
   */
  static updateVersionInFile(data, delimter, path) {
    throw new Error('Update file not implemented')
  }

  /**
   * Display the program command help/options to the user
   */
  static help() {
    console.log(
`Usage: 
\nversion [ -v semver ] [-p [ 0 => PATCH, 1 => MINOR, 2 => MAJOR ] ]
E.g version -v 0.2.3 -p 1 ## 0.3.3

version [ -f file   ] [ -d delimeter ]
    `);
  }

  static parseCommandArg() {
    const arg = process.argv;
    if (arg.length > 2 && Terminal.hasFlag('-h', arg)) {
      Terminal.help()
      process.exit(0);
    }
    if (Terminal.hasVersionFlag(arg) && Terminal.hasPartFlag(arg)) {

      //if using version and part flags, file and delimeter flags should not be permitted
      if (Terminal.hasDelimeterFlag(arg) || Terminal.hasFileFlag(arg)) {
        console.error('error : Cannot combine -d and -f flag with -v or -p flag');
        process.exit(1)
      }
      const versionArg = Terminal.verifyVersion(arg);
      const updateArg = Terminal.verifyPartArg(arg);
      console.log(version(versionArg).update(updateArg).toString());

    } else if (Terminal.hasDelimeterFlag(arg) || Terminal.hasFileFlag(arg)) {

      //if using file and delimeter flags, version and part flags should not be permitted
      if (Terminal.hasVersionFlag(arg) || Terminal.hasPartFlag(arg)) {
        console.error('error : Cannot combine -v and -p flag with -d or -f flag');
        process.exit(1)
      }
      const data =  Terminal.verifyFileArg(arg);
      const delimeter = Terminal.verifyDelimeterArg(arg);
      Terminal.updateVersionInFile(data, delimeter);
    } else {
      Terminal.help();
    }
  };
}
module.exports = Terminal.parseCommandArg;

