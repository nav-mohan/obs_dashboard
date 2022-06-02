// BASH SCRIPTING STUFF
const { exec, spawn } = require('child_process');
const BASH_START_OBS = "nohup /Applications/OBS.app/Contents/MacOS/obs --minimize-to-tray &";

var fs = require('fs');						// WE NEED TO DEFINE Async LOG FILES FOR THE stdout stderr
var out = fs.openSync('../logs/out.log', 'a');	// I HOPE OBS WILL CONTINUE WRITING TO THEM EVEN IF NodeJS CRASHES
var err = fs.openSync('../logs/err.log', 'a');	// I HOPE NodeJS CAN CONINUE READING FROM THEM IN THE EVENT OF A RESTART OF NodeJS 
const startDetachedOBS = ()=>{
	const detachedOBS = spawn("/Applications/OBS.app/Contents/MacOS/obs" , ["--minimize-to-tray","&"],
	{ detached: true, stdio: [ 'ignore', out, err ] }
	);
	detachedOBS.on("error",function(err){
		console.log("detachedOBS error")
		console.log(err)
	})
	detachedOBS.on("close",function(close_code){
		console.log(`detachedOBS close_code ${close_code}`)
	})
	detachedOBS.unref();
}

module.exports = {startDetachedOBS}