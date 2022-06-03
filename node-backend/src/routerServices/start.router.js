const express = require("express");
const {checkJwt} = require('../authAPI/check-jwt')
const { exec } = require('child_process');
// BASH SCRIPTING STUFF
const { spawn } = require('child_process');
const BASH_START_OBS = "/Applications/OBS.app/Contents/MacOS/obs";
const START_FLAGS = ["--minimize-to-tray", "&", "echo $! > ./pid.log"];

var fs = require('fs');						// WE NEED TO DEFINE Async LOG FILES FOR THE stdout stderr
var out = fs.openSync('./logs/out.log', 'a');	// I HOPE OBS WILL CONTINUE WRITING TO THEM EVEN IF NodeJS CRASHES
var err = fs.openSync('./logs/err.log', 'a');	// I HOPE NodeJS CAN CONINUE READING FROM THEM IN THE EVENT OF A RESTART OF NodeJS 

const startRouter = express.Router()

startRouter.get('/', checkJwt, function(req, res){
	message = {'stdout':'','stderr':'','err':''}
	const detachedOBS = spawn(BASH_START_OBS , START_FLAGS,
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
})

module.exports = {
	startRouter
}