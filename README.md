Version is a command line utility that automates the process of document 
versioning using semantic version schema

### Limitation

Evemn though Version is based on semantic document versioning, there are some aspect of this system of version that is not yet supported. But there is a high chance that those features will be included in future realease. 

This section servers to document what is **Currently supported**. If you have any suggestions or feature request, feel free to make such as it is highly welcome.

### Usage

Version Exist for both usage of Linux based operating Systems including Mac OS. You can obtain the single combined source suitable as a standalone bundle that can be called on terminal or included in your path.

Another variant is the node_modules package that can be obtained from npm. This is suitable for inclusion in your Node.js based project.

#### On Terminal
`./lib/terminal -h `
```sh 
Usage: 
version [ -v semver ] [-p [ 0 => PATCH, 1 => MINOR, 2 => MAJOR ] ]
version [ -f file   ] [ -d delimeter ]
```

##### Example
`E.g version -v 0.2.3 -p 1 # 0.3.3`

#### As Node.js Module
```javascript
const { version, Version } = require('./index');

console.log(version('0.3.1').update(Version.MAJOR)) // 1.3.1
```

##### Example a

### Requirement
- Node.js Runtime 


### Platforms
- Mac Operating system
- Linux Flavours
- Windows Operating system

### Credit

## Changelog
### [ 0.5.0 ] - 10-06-2019
#### Added
- `-f` flag to specify File containing version on terminal
- `-p` flag to specify Part on terminal
- `-d` flag to specify version Delimeter on terminal
- `-v` flag to specify Version number on the terminal
- `-h` flag to display help command on the terminal
