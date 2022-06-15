const express 			= require("express");
const { checkJwt } 		= require('../authAPI/check-jwt')
const { exec } 			= require('child_process');
const BASH_GET_OBS_PID 	= "ps aux | grep OBS.app | grep Applications | awk {'print $2'} ";
const pidRouter 		= express.Router()

pidRouter.get('/', checkJwt, function (req, res) {
	console.log("GETTING PID")
	message = { 'stdout': '', 'stderr': '', 'err': '' }
	exec(BASH_GET_OBS_PID, (err, stdout, stderr) => {
		message['err'] = err
		message['stderr'] = stderr
		if(stdout.split("\n").length > 2){
			
		}
		message['stdout'] = stdout.split("\n")
		res.send(message)

	});
})

module.exports = {
	pidRouter
}