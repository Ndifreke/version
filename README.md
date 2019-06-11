Version is a command line utility that automates the process of document 
versioning using semantic version schema

#
### Limitation 

Even though Version is based on semantic document versioning, there are some aspect of this system of version that is not yet supported. But there is a high chance that those features will be included in future realease. 

This section serves to document what is **Currently supported**. If you have any suggestions or feature request, feel free to make such as it is highly welcome.

Version as from `0.5.0` supports semantic version number that can be matched by this regular expression `/[0-9]\.[0-0]\.[0-9]/` thus if your version number has more than one digit in any of the version places `"MAJOR.MINOR.PATCH"`, you will get an error that version does not match supported semantic schema 

- No extra work is done to trim the white space between version digits E.g ( ` 0 . 2 .5` ) which will lead to error with message that version does not match Semantic schema. 

- Bumping individual Part of the version is not currently supported. Version update follows progressive update of change not greater than 1. That is to say if you have `0.1.2`, you can't goto `0.1.4` without going through `0.1.3`  

#
### Usage

Version Exist for both usage of Linux based operating Systems including Mac OS. You can obtain the single combined source suitable as a standalone bundle that can be called on terminal or included in your path.

Another variant is the node_modules package that can be obtained from npm. This is suitable for inclusion in your Node.js based project.

#### On Terminal

```sh 
## Display help option

cver -h

Usage: 
cver [ -v semver ] [-p [ 0 => PATCH, 1 => MINOR, 2 => MAJOR ] ]
cver [ -f file   ] [ -d delimeter ]
```
Updating version on command line can be done in two ways.
1. Returning the output of the update to the console
2. Writing the result to the file that contains the version number

- #### Returning output to console 
Command: `cver [ -v semver ] [-p [ 0 => PATCH, 1 => MINOR, 2 => MAJOR ] ] `
This command takes the -v and -p argument and writes the result to the console 

**WHERE** `-v` is the Version argument that matches `/[0-9]\.[0-0]\.[0-9]/`

**WHERE** `-p` is the Part argument that matches any of `[012]` 0 = PATCH, 1 = MINOR, 2 = MAJOR

|command   | Version flag  | MAJOR   | MINOR  | PATCH  | Part flag| PART arg |
|----------|--------------|---------|--------|--------|---------|----------|
| cver     | -v           | 0       | 2      | 3      |-p       |1         |


##### Examples
```sh 
$ cver -v 0.2.3 -p 1
0.3.3

$ cver -v 9.9.9 -p 0
10.0.0

$ cver -v 9.9.90 -p 2
error: -v Argument must use semantic schema 

$ cver -v 9.9.9 -p 9
error: -p argument must match any of [012]

$ cver -v 9.9.90 -p 9 -f
error : Cannot combine -d and -f flag with -v or -p flag
 ```
The -v flag cannot be used with with -f or -d flag as operation with this flags writes to a file 

#### As Node.js Module
```javascript
const { version, Version } = require('./index');

console.log(version('0.3.1').update(Version.MAJOR)) // 1.3.1
```

##### Example a

#

### Requirement
- Node.js Runtime 

#

### Platforms
- Mac Operating system
- Linux Flavours
- Windows Operating system


#


####  Next Release Plan Update
- support more than 1 digt in MAJOR PART
- Return error code if command is run without any argument
- Allow using of -p flag with -f and -d flag

#

## Changelog
### [ 0.5.0 ] - 10-06-2019
#### Added
- `-f` flag to specify File containing version on terminal
- `-p` flag to specify Part on terminal
- `-d` flag to specify version Delimeter on terminal
- `-v` flag to specify Version number on the terminal
- `-h` flag to display help command on the terminal

