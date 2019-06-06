#!/usr/bin/env node
const fs = require('fs');
const Versions = {
	MAJOR:2,
	MINOR:1,
	PATCH:0,
};

const version = (version) => {
  
	class Version {
		constructor(version){
			const vParts = Version.parseVersion(version);
			this.major = vParts[0];
			this.minor = vParts[1];
			this.patch = vParts[2];
		}
    
		static parseVersion(arg){
			if(typeof arg === 'string' && /^[0-9]\.[0-9]\.[0-9]$/.test(arg.trim())){
				const value = arg.split('.');
				return [Number(value[0]), Number(value[1]), Number(value[2])];
			}else{
				throw `Version should be use cornical format \n
        containing only "major.minor.patch". E.g 0.1.9`;
			}
		}
    
		updateMinor(){
			if(this.minor >= 9){
				this.minor = 0;
				this.updateMajor();
			}else{
				this.minor += 1;
			}
		}
    
		updateMajor(){
			this.major += 1;
		}
    
		updatePatch(){
			if(this.patch >= 9){
				this.patch = 0;
				this.updateMinor();
			}else{
				this.patch += 1;
			}
		}
    
		update(versionPart){
			switch(Number(versionPart)){
			case Versions.MAJOR:
				this.updateMajor();
				break;
			case Versions.MINOR: 
				this.updateMinor();
				break;
			case Versions.PATCH:
				this.updatePatch();
				break;
			}
			return this;
		}
    
		toString(){
			return this.major+'.'+this.minor+'.'+this.patch;
		}
    
	}
  
	return new Version(version);
};

const getPartArg = (arg) => {
	const partIndex = arg.indexOf('-p');
	if(partIndex !== -1 && /[012]/.test(arg[partIndex+1])){
		return arg[partIndex+1];
	}else{
		console.error('-p argument must match any of [012]');
	}
	process.exit(1);
};

const getVersionArg = (arg) => {
	const versionIndex = arg.indexOf('-v');
	if(versionIndex !== -1 && /^[0-9]\.[0-9]\.[0-9]$/.test(arg[versionIndex+1])){
		return arg[versionIndex+1];
	}else{
		console.error('-v Argument must use cornical format');
	}
	process.exit(1);
};

const parseCommandArg = ()=> {
	const args = process.argv;
	if(args.length > 2 && args.indexOf('-h') !== -1){
		//requested help
		console.log('help comming soon');
		process.exit(0);
	}
	const ver = getVersionArg(args);
	const part = getPartArg(args);
	return {ver, part};
};

if(process.argv.length <= 2){
	const v = JSON.parse(fs.readFileSync('./package.json')).version;
	console.log(v);
	module.exports = { version , Versions };
}else{
	const { ver, part} = parseCommandArg();
	const v = version(ver).update(part);
	console.log(v.toString());
  
}






